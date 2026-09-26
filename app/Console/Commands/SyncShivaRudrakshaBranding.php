<?php

namespace App\Console\Commands;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class SyncShivaRudrakshaBranding extends Command
{
    protected $signature = 'shivarudraksha:sync';
    protected $description = 'Sync site branding to Shiva Rudraksha and clean up inactive/demo categories';

    public function handle(): int
    {
        $this->info('Starting Shiva Rudraksha branding sync...');

        // 1. Update business settings
        $settings = [
            'website_name' => 'Shiva Rudraksha',
            'site_name' => 'Shiva Rudraksha',
            'system_name' => 'Shiva Rudraksha',
            'frontend_title' => 'Shiva Rudraksha',
            'site_motto' => 'Authentic Certified Rudraksha from Nepal',
            'meta_title' => 'Shiva Rudraksha | Authentic Certified Rudraksha from Nepal',
            'meta_description' => 'Authentic, lab-certified Nepal Rudraksha beads and malas (1 to 21 Mukhi). Shop sacred Rudraksha online with worldwide shipping from Shiva Rudraksha.',
            'meta_keywords' => 'shiva rudraksha, nepal rudraksha, certified rudraksha, authentic rudraksha, 1 to 21 mukhi, siddha mala, gauri shankar',
        ];

        foreach ($settings as $type => $value) {
            DB::table('business_settings')->updateOrInsert(
                ['type' => $type],
                ['value' => $value, 'updated_at' => now()]
            );
        }

        // 2. Remove demo Supplements category and its products
        $supplementCat = Category::where('slug', 'supplements')->orWhere('name', 'LIKE', '%Supplement%')->first();
        if ($supplementCat) {
            Product::where('category_id', $supplementCat->id)->delete();
            $supplementCat->delete();
            $this->warn('Removed Supplements category and associated demo products.');
        }

        Product::whereIn('slug', ['whey-protein', 'creatine'])->delete();

        // 3. Clear relevant caches
        Cache::forget('business_settings');
        Cache::forget('featured_categories');
        Cache::forget('hot_categories');
        Cache::forget('newest_products');

        $this->info('Shiva Rudraksha branding & catalogue sync completed successfully!');
        return self::SUCCESS;
    }
}
