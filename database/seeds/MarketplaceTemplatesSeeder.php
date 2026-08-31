<?php

namespace Database\Seeders;

use App\Models\Attribute;
use App\Models\AttributeValue;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductStock;
use App\Models\User;
use Illuminate\Database\Seeder;

/**
 * Seeds the products behind the 10 marketplace storefront templates
 * (VOLT/CRAVE/THREAD/STRIDE/SPEX/LUXE/NEST/AURUM/APEX/PAGE).
 *
 * Everything the templates show comes from here — no price/id is hardcoded in a page.
 * Each product is a real AE variant product: choice_options (attribute -> values) +
 * one product_stock row per attribute COMBINATION (cartesian), with its own price.
 * Variant strings are built exactly like CartUtility::create_cart_variant
 * (each value space-stripped, joined by '-', in attribute order), so /cart/addtocart resolves.
 *
 * Idempotent: updateOrCreate by slug, stocks rebuilt each run.
 */
class MarketplaceTemplatesSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::where('user_type', 'admin')->first();
        $adminId = $admin ? $admin->id : 1;

        // niche categories (slug drives the storefront route -> product query)
        $categories = [
            'electronics'   => 'Electronics',
            'food-beverage' => 'Food & Beverage',
            'clothing'      => 'Clothing',
            'footwear'      => 'Footwear',
            'eyewear'       => 'Eyewear',
            'beauty'        => 'Beauty',
            'furniture'     => 'Furniture',
            'jewelry'       => 'Jewelry',
            'fitness'       => 'Fitness',
            'stationery'    => 'Stationery',
        ];
        $catIds = [];
        foreach ($categories as $slug => $name) {
            $c = Category::firstOrCreate(['slug' => $slug], ['name' => $name, 'order_level' => 1, 'digital' => 0, 'level' => 0]);
            $catIds[$slug] = $c->id;
        }

        // catalog: category => [ product ]. Each product: slug,name,desc,base price,
        // options (ORDERED assoc: Attribute name => [values]), optional add (per value price delta).
        $catalog = $this->catalog();

        $attrCache = [];
        $total = 0;
        foreach ($catalog as $catSlug => $products) {
            foreach ($products as $p) {
                // resolve/create attributes + values
                $optionOrder = array_keys($p['options']);
                $attrIds = [];
                $choiceOptions = [];
                foreach ($optionOrder as $attrName) {
                    if (!isset($attrCache[$attrName])) {
                        $attrCache[$attrName] = Attribute::firstOrCreate(['name' => $attrName])->id;
                    }
                    $aid = $attrCache[$attrName];
                    $attrIds[] = $aid;
                    foreach ($p['options'][$attrName] as $val) {
                        AttributeValue::firstOrCreate(['attribute_id' => $aid, 'value' => $val]);
                    }
                    $choiceOptions[] = ['attribute_id' => $aid, 'values' => $p['options'][$attrName]];
                }

                // cartesian product of all option values (in attribute order)
                $combos = [[]];
                foreach ($optionOrder as $attrName) {
                    $next = [];
                    foreach ($combos as $combo) {
                        foreach ($p['options'][$attrName] as $val) {
                            $next[] = array_merge($combo, [$val]);
                        }
                    }
                    $combos = $next;
                }

                $prices = [];
                foreach ($combos as $combo) {
                    $price = $p['price'];
                    foreach ($combo as $val) {
                        $price += ($p['add'][$val] ?? 0);
                    }
                    $variant = implode('-', array_map(fn ($v) => str_replace(' ', '', $v), $combo));
                    $prices[$variant] = $price;
                }

                $product = Product::updateOrCreate(
                    ['slug' => $p['slug']],
                    [
                        'name'                   => $p['name'],
                        'added_by'               => 'admin',
                        'user_id'                => $adminId,
                        'category_id'            => $catIds[$catSlug],
                        'description'            => $p['desc'],
                        'unit_price'             => min($prices),
                        'purchase_price'         => 0,
                        'unit'                   => $p['unit'] ?? 'pcs',
                        'min_qty'                => 1,
                        'current_stock'          => 100 * count($prices),
                        'variant_product'        => 1,
                        'attributes'             => json_encode($attrIds),
                        'choice_options'         => json_encode($choiceOptions, JSON_UNESCAPED_UNICODE),
                        'colors'                 => json_encode([]),
                        'published'              => 1,
                        'approved'               => 1,
                        'draft'                  => 0,
                        'stock_visibility_state' => 'quantity',
                        'cash_on_delivery'       => 1,
                        'digital'                => 0,
                        'auction_product'        => 0,
                        'wholesale_product'      => 0,
                        'tax'                    => 0,
                        'tax_type'               => 'amount',
                        'shipping_type'          => 'free',
                        'shipping_cost'          => 0,
                        'meta_title'             => $p['name'],
                        'meta_description'       => $p['desc'],
                        'rating'                 => 0,
                        'num_of_sale'            => 0,
                    ]
                );
                $product->categories()->sync([$catIds[$catSlug]]);

                ProductStock::where('product_id', $product->id)->delete();
                $i = 0;
                foreach ($prices as $variant => $price) {
                    ProductStock::create([
                        'product_id' => $product->id,
                        'variant'    => $variant,
                        'sku'        => strtoupper(substr($p['slug'], 0, 8)) . '-' . (++$i),
                        'price'      => $price,
                        'qty'        => 100,
                        'image'      => null,
                    ]);
                }
                $total++;
                $this->command->info("  {$p['name']} (id={$product->id}) — " . count($prices) . ' variants');
            }
        }
        $this->command->info("Seeded {$total} products across " . count($categories) . ' niche categories.');
    }

    /** All 10 niches × 3 products, priced in INR. */
    private function catalog(): array
    {
        return [
            'electronics' => [
                ['slug' => 'volt-earbuds', 'name' => 'Pulse Wireless Earbuds', 'desc' => 'ANC true-wireless earbuds, 32h battery.', 'price' => 2999,
                    'options' => ['Color' => ['Midnight', 'Ivory', 'Coral']]],
                ['slug' => 'volt-smartwatch', 'name' => 'Volt Smartwatch', 'desc' => 'AMOLED fitness smartwatch, GPS + SpO2.', 'price' => 5999,
                    'options' => ['Color' => ['Graphite', 'Silver'], 'Band Size' => ['S/M', 'L']], 'add' => ['L' => 200]],
                ['slug' => 'volt-phone', 'name' => 'Volt Edge Phone', 'desc' => '6.7" 120Hz, 5000mAh, flagship camera.', 'price' => 24999,
                    'options' => ['Color' => ['Obsidian', 'Aurora'], 'Storage' => ['128 GB', '256 GB']], 'add' => ['256 GB' => 3000]],
            ],
            'food-beverage' => [
                ['slug' => 'crave-coffee', 'name' => 'Single-Origin Coffee', 'desc' => 'Small-batch specialty beans.', 'price' => 549,
                    'options' => ['Roast' => ['Light', 'Medium', 'Dark'], 'Weight' => ['250 G', '500 G']], 'add' => ['500 G' => 400]],
                ['slug' => 'crave-hotsauce', 'name' => 'Craft Hot Sauce', 'desc' => 'Small-batch fermented chilli sauce.', 'price' => 299,
                    'options' => ['Heat Level' => ['Mild', 'Medium', 'Hot', 'Reaper']], 'add' => ['Reaper' => 100]],
                ['slug' => 'crave-granola', 'name' => 'Toasted Granola', 'desc' => 'Baked oats, nuts, honey.', 'price' => 399,
                    'options' => ['Flavor' => ['Original', 'Berry', 'Cacao'], 'Weight' => ['400 G', '800 G']], 'add' => ['800 G' => 300]],
            ],
            'clothing' => [
                ['slug' => 'thread-tee', 'name' => 'Heavyweight Tee', 'desc' => '240gsm combed cotton tee.', 'price' => 899,
                    'options' => ['Size' => ['S', 'M', 'L', 'XL', 'XXL'], 'Color' => ['Black', 'White', 'Sand']], 'add' => ['XXL' => 100]],
                ['slug' => 'thread-hoodie', 'name' => 'Fleece Hoodie', 'desc' => 'Brushed-back heavyweight hoodie.', 'price' => 1999,
                    'options' => ['Size' => ['S', 'M', 'L', 'XL', 'XXL'], 'Color' => ['Charcoal', 'Olive']], 'add' => ['XXL' => 150]],
                ['slug' => 'thread-jacket', 'name' => 'Coach Jacket', 'desc' => 'Water-resistant coach jacket.', 'price' => 2999,
                    'options' => ['Size' => ['S', 'M', 'L', 'XL'], 'Color' => ['Black', 'Navy']]],
            ],
            'footwear' => [
                ['slug' => 'stride-runner', 'name' => 'Aero Runner', 'desc' => 'Lightweight daily running shoe.', 'price' => 3499,
                    'options' => ['Size' => ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'], 'Color' => ['Volt', 'Slate']]],
                ['slug' => 'stride-sneaker', 'name' => 'Court Sneaker', 'desc' => 'Retro leather court sneaker.', 'price' => 4299,
                    'options' => ['Size' => ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10'], 'Color' => ['White', 'Black']]],
                ['slug' => 'stride-boot', 'name' => 'Trail Boot', 'desc' => 'Waterproof trail boot.', 'price' => 5499,
                    'options' => ['Size' => ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'], 'Width' => ['Regular', 'Wide']], 'add' => ['Wide' => 150]],
            ],
            'eyewear' => [
                ['slug' => 'spex-sun', 'name' => 'Aviator Sunglasses', 'desc' => 'Polarized aviator, UV400.', 'price' => 1999,
                    'options' => ['Frame Color' => ['Gold', 'Gunmetal', 'Black'], 'Lens' => ['Green', 'Brown', 'Mirror']], 'add' => ['Mirror' => 300]],
                ['slug' => 'spex-blue', 'name' => 'Blue-Cut Glasses', 'desc' => 'Anti blue-light computer glasses.', 'price' => 1499,
                    'options' => ['Frame Color' => ['Tortoise', 'Black', 'Clear'], 'Size' => ['Regular', 'Wide']], 'add' => ['Wide' => 100]],
                ['slug' => 'spex-optical', 'name' => 'Round Optical Frame', 'desc' => 'Lightweight acetate optical frame.', 'price' => 1799,
                    'options' => ['Frame Color' => ['Amber', 'Forest', 'Ink'], 'Lens' => ['Clear', 'Blue-Cut']], 'add' => ['Blue-Cut' => 250]],
            ],
            'beauty' => [
                ['slug' => 'luxe-lipstick', 'name' => 'Velvet Matte Lipstick', 'desc' => 'Long-wear matte lip colour.', 'price' => 699,
                    'options' => ['Shade' => ['Rosewood', 'Brick', 'Crimson', 'Mauve', 'Nude']]],
                ['slug' => 'luxe-serum', 'name' => 'Vitamin C Serum', 'desc' => 'Brightening 15% vitamin C serum.', 'price' => 1299,
                    'options' => ['Size' => ['15 ML', '30 ML']], 'add' => ['30 ML' => 600]],
                ['slug' => 'luxe-foundation', 'name' => 'Skin Glow Foundation', 'desc' => 'Buildable natural-finish foundation.', 'price' => 1099,
                    'options' => ['Shade' => ['Porcelain', 'Sand', 'Honey', 'Amber', 'Espresso'], 'Finish' => ['Matte', 'Dewy']]],
            ],
            'furniture' => [
                ['slug' => 'nest-chair', 'name' => 'Lounge Chair', 'desc' => 'Mid-century lounge chair.', 'price' => 12999,
                    'options' => ['Material' => ['Oak', 'Walnut'], 'Color' => ['Sand', 'Charcoal', 'Forest']], 'add' => ['Walnut' => 2000]],
                ['slug' => 'nest-lamp', 'name' => 'Arc Floor Lamp', 'desc' => 'Brass arc floor lamp.', 'price' => 6499,
                    'options' => ['Finish' => ['Brass', 'Matte Black']]],
                ['slug' => 'nest-table', 'name' => 'Nesting Table Set', 'desc' => 'Set of two nesting tables.', 'price' => 8999,
                    'options' => ['Material' => ['Oak', 'Walnut'], 'Color' => ['Natural', 'Espresso']], 'add' => ['Walnut' => 1500]],
            ],
            'jewelry' => [
                ['slug' => 'aurum-ring', 'name' => 'Signet Ring', 'desc' => 'Hand-finished signet ring.', 'price' => 4999,
                    'options' => ['Metal' => ['Silver', 'Gold Vermeil'], 'Ring Size' => ['6', '7', '8', '9', '10']], 'add' => ['Gold Vermeil' => 2500]],
                ['slug' => 'aurum-watch', 'name' => 'Automatic Watch', 'desc' => '38mm automatic dress watch.', 'price' => 18999,
                    'options' => ['Dial' => ['Silver', 'Blue', 'Black'], 'Metal' => ['Steel', 'Gold Tone']], 'add' => ['Gold Tone' => 4000]],
                ['slug' => 'aurum-pendant', 'name' => 'Layered Pendant', 'desc' => 'Delicate layered chain pendant.', 'price' => 2999,
                    'options' => ['Metal' => ['Silver', 'Gold Vermeil'], 'Length' => ['16 in', '18 in']], 'add' => ['Gold Vermeil' => 1500]],
            ],
            'fitness' => [
                ['slug' => 'apex-dumbbell', 'name' => 'Adjustable Dumbbell', 'desc' => 'Quick-adjust dumbbell (single).', 'price' => 4999,
                    'options' => ['Weight' => ['12 KG', '24 KG', '32 KG'], 'Color' => ['Black', 'Steel']], 'add' => ['24 KG' => 1500, '32 KG' => 3000]],
                ['slug' => 'apex-mat', 'name' => 'Pro Yoga Mat', 'desc' => '6mm non-slip yoga mat.', 'price' => 1499,
                    'options' => ['Color' => ['Charcoal', 'Teal', 'Terracotta'], 'Length' => ['Standard', 'Long']], 'add' => ['Long' => 300]],
                ['slug' => 'apex-shaker', 'name' => 'Steel Shaker', 'desc' => 'Insulated stainless shaker.', 'price' => 899,
                    'options' => ['Color' => ['Black', 'Silver', 'Blue'], 'Size' => ['500 ML', '750 ML']], 'add' => ['750 ML' => 150]],
            ],
            'stationery' => [
                ['slug' => 'page-notebook', 'name' => 'Hardcover Notebook', 'desc' => '200gsm hardcover notebook.', 'price' => 499,
                    'options' => ['Cover' => ['Ink', 'Sage', 'Terracotta'], 'Ruling' => ['Dotted', 'Ruled', 'Plain']]],
                ['slug' => 'page-pens', 'name' => 'Fineliner Set', 'desc' => 'Set of fineliner pens.', 'price' => 649,
                    'options' => ['Ink' => ['Black', 'Assorted'], 'Size' => ['6-Pack', '12-Pack']], 'add' => ['12-Pack' => 300]],
                ['slug' => 'page-planner', 'name' => 'Weekly Planner', 'desc' => 'Undated weekly planner.', 'price' => 799,
                    'options' => ['Cover' => ['Kraft', 'Navy', 'Blush']]],
            ],
        ];
    }
}
