<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::unprepared('DROP TRIGGER IF EXISTS `001_COMPUTE_PARENTS_TRIGGER`');
        DB::unprepared('CREATE TRIGGER 001_COMPUTE_PARENTS_TRIGGER BEFORE UPDATE ON organisations 
            FOR EACH ROW BEGIN 
                SET NEW.parents = compute_parents(NEW.parent_id);
            END;
        ');

        DB::unprepared('DROP TRIGGER IF EXISTS `002_COMPUTE_PARENTS_TRIGGER`');
        DB::unprepared('CREATE TRIGGER 002_COMPUTE_PARENTS_TRIGGER BEFORE INSERT ON organisations 
            FOR EACH ROW BEGIN 
                SET NEW.parents = compute_parents(NEW.parent_id);
            END;
        ');

        DB::unprepared('DROP TRIGGER IF EXISTS `003_UPDATE_NOM_ORGANISATION`');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
    }
};
