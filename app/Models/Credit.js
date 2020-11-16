"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Credit extends Model {
  user() {
    return this.belongsTo("App/Models/User");
  }

  store() {
    return this.belongsTo("App/Models/Store");
  }
}

module.exports = Credit;
