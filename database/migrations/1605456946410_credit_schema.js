"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CreditSchema extends Schema {
  up() {
    this.create("credits", (table) => {
      table.increments();
      table.integer('amount').defaultTo(0);
      table.integer("user_id").unsigned().references("id").inTable("users");
      table.integer("store_id").unsigned().references("id").inTable("stores");
      table.timestamps();
    });
  }

  down() {
    this.drop("credits");
  }
}

module.exports = CreditSchema;
