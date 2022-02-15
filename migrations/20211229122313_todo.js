
exports.up = function(knex) {
    return knex.schema.createTable('todo_table', (table)=>{
        table.increments('id').primary();
       table.string('name', 255).notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("todo_table");
  
};
