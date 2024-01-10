<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (!App::environment('prod')) {
            DB::unprepared("SET GLOBAL log_bin_trust_function_creators = 1;");
        }
        DB::unprepared('DROP FUNCTION IF EXISTS compute_parents');
        DB::unprepared('CREATE FUNCTION compute_parents(organisationId char(36))
            RETURNS JSON
            BEGIN
                DECLARE v_parents JSON;
                WITH RECURSIVE cte AS (
                    SELECT uo.id, uo.nom,
                        JSON_ARRAY(
                            JSON_OBJECT(
                                "id",
                                CAST(uo.id AS CHAR(200)),
                                "nom",
                                uo.nom,
                                "nature",
                                n.code
                            )
                        ) as parents
                    FROM organisations uo
                    INNER JOIN natures n on n.id = uo.nature_id
                        WHERE parent_id is null
                    UNION ALL
                    SELECT c.id, c.nom,
                        JSON_MERGE_PRESERVE(
                            cte.parents,
                            JSON_ARRAY(
                                JSON_OBJECT(
                                    "id",
                                    CAST(c.id AS CHAR(200)),
                                    "nom",
                                    c.nom,
                                    "nature",
                                    n.code
                                )
                            )
                        ) as parents
                    FROM organisations c
                    INNER JOIN natures n on n.id = c.nature_id
                        JOIN cte ON cte.id = c.parent_id
                )
                SELECT parents into v_parents
                FROM cte
                WHERE
                    cte.id COLLATE utf8mb4_unicode_ci = organisationId;
                
                RETURN v_parents;
            END
        ');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
    }
};
