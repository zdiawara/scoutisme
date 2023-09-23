<?php

use App\Models\Attribution;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('attributions', function (Blueprint $table) {
            //$table->string('type')->nullable();
        });

        Attribution::all()->each(function ($attribution) {
            $attribution->update([
                'type' => $attribution->fonction->code == 'scout' ?  'scout' : "direction"
            ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
    }
};
