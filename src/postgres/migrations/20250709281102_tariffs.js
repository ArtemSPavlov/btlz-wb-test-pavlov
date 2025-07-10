/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function up(knex) {
    if (await knex.schema.hasTable('tariffs')) {
        return;
    }

    return knex.schema.createTable('tariffs', (table) => {
        table.increments('id').primary();

        table.date('validity_day').notNullable();
        table.string('warehouse_name').notNullable();
        table.integer('box_delivery_and_storage_expr').notNullable();
        table.float('box_delivery_base', 2);
        table.float('box_delivery_liter', 2);
        table.float('box_storage_base', 2);
        table.float('box_storage_liter', 2);
        table.timestamps(true, true);

        table.unique(
            [ 'validity_day', 'warehouse_name' ],
            {
                indexName: 'unique_by_day_and_warehouse',
            }
        );
    });
};

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function down(knex) {
    return knex.schema.dropTableIfExists("tariffs");
}