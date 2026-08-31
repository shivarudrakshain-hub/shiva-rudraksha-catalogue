<?php

namespace Database\Seeders;

use App\Models\Attribute;
use App\Models\AttributeValue;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductStock;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

/**
 * Seeds the two supplement products that back the /forge 3D storefront
 * (public/forge/index.html). Idempotent: safe to run repeatedly.
 *
 * Variant strings are built exactly like ProductUtility::get_combination_string /
 * CartUtility::create_cart_variant (attribute values with spaces stripped, joined by
 * '-', flavor first then size), so /cart/addtocart resolves the stock correctly.
 */
class ForgeSupplementsSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::where('user_type', 'admin')->first();
        $adminId = $admin ? $admin->id : 1;

        $category = Category::firstOrCreate(
            ['slug' => 'supplements'],
            ['name' => 'Supplements', 'order_level' => 1, 'digital' => 0, 'level' => 0]
        );

        $flavor = Attribute::firstOrCreate(['name' => 'Flavor']);
        $size   = Attribute::firstOrCreate(['name' => 'Size']);

        $products = [
            [
                'slug'    => 'whey-protein',
                'name'    => 'Whey Protein',
                'desc'    => 'Premium whey protein — 25g protein per serving. Fuel the work.',
                'flavors' => ['Chocolate Cream', 'Matcha', 'Peanut', 'Strawberry'],
                'sizes'   => ['907 G' => 1999, '2.27 KG' => 3799],
                'unit'    => 'pcs',
            ],
            [
                'slug'    => 'creatine',
                'name'    => 'Creatine',
                'desc'    => 'Micronised creatine monohydrate — 5g per serving. Power and charge.',
                'flavors' => ['Unflavored', 'Fruit Punch', 'Blue Razz'],
                'sizes'   => ['300 G' => 899, '500 G' => 1399],
                'unit'    => 'pcs',
            ],
        ];

        foreach ($products as $p) {
            foreach ($p['flavors'] as $v) {
                AttributeValue::firstOrCreate(['attribute_id' => $flavor->id, 'value' => $v]);
            }
            foreach (array_keys($p['sizes']) as $v) {
                AttributeValue::firstOrCreate(['attribute_id' => $size->id, 'value' => $v]);
            }

            $choiceOptions = [
                ['attribute_id' => $flavor->id, 'values' => $p['flavors']],
                ['attribute_id' => $size->id,   'values' => array_keys($p['sizes'])],
            ];

            $basePrice = min(array_values($p['sizes']));

            $product = Product::updateOrCreate(
                ['slug' => $p['slug']],
                [
                    'name'                   => $p['name'],
                    'added_by'               => 'admin',
                    'user_id'                => $adminId,
                    'category_id'            => $category->id,
                    'description'            => $p['desc'],
                    'unit_price'             => $basePrice,
                    'purchase_price'         => 0,
                    'unit'                   => $p['unit'],
                    'min_qty'                => 1,
                    'current_stock'          => 100 * count($p['flavors']) * count($p['sizes']),
                    'variant_product'        => 1,
                    'attributes'             => json_encode([$flavor->id, $size->id]),
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

            $product->categories()->sync([$category->id]);

            ProductStock::where('product_id', $product->id)->delete();
            $i = 0;
            foreach ($p['flavors'] as $fl) {
                foreach ($p['sizes'] as $sz => $price) {
                    $variant = str_replace(' ', '', $fl) . '-' . str_replace(' ', '', $sz);
                    ProductStock::create([
                        'product_id' => $product->id,
                        'variant'    => $variant,
                        'sku'        => ($p['slug'] === 'whey-protein' ? 'WHEY' : 'CREA') . '-' . (++$i),
                        'price'      => $price,
                        'qty'        => 100,
                        'image'      => null,
                    ]);
                }
            }

            $this->command->info("Seeded {$p['name']} (id={$product->id}) with " . ProductStock::where('product_id', $product->id)->count() . ' variants.');
        }

        $this->command->info('Flavor attribute id=' . $flavor->id . ', Size attribute id=' . $size->id);
    }
}
