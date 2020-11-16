"use strict";

const { validate } = use("Validator");
const Credit = use("App/Models/Credit");
const User = use("App/Models/User");
const Store = use("App/Models/Store");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with credits
 */
class CreditController {
  /**
   * Adds credits from a user to a store.
   * POST add
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async add({ request, response }) {
    const rules = {
      email: "required|email",
      amount: "required|integer",
      store: "required|string",
    };

    const validation = await validate(request.post(), rules);

    if (validation.fails()) {
      return response.badRequest(validation.messages());
    }

    const { email, amount, store: storeName } = request.post();

    const store = await Store.findOrCreate({ name: storeName });
    const user = await User.findOrCreate({ email });

    const credits = await Credit.findOrCreate(
      {
        store_id: store.id,
        user_id: user.id,
      },
      {
        store_id: store.id,
        user_id: user.id,
      }
    );
    credits.amount = (credits.amount || 0) + amount;
    await credits.save();

    return credits;
  }

  /**
   * Reduces a user's credits in a store.
   * POST remove
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async remove({ request, response }) {
    const rules = {
      email: "required|email",
      amount: "required|integer",
      store: "required|string",
    };

    const validation = await validate(request.post(), rules);

    if (validation.fails()) {
      return response.badRequest(validation.messages());
    }

    const { email, amount, store: storeName } = request.post();

    const store = await Store.findOrCreate({ name: storeName });
    const user = await User.findOrCreate({ email });

    const credits = await Credit.findOrCreate(
      {
        store_id: store.id,
        user_id: user.id,
      },
      {
        store_id: store.id,
        user_id: user.id,
      }
    );
    credits.amount = (credits.amount || 0) - amount;
    await credits.save();

    return credits;
  }

  /**
   * Displays a user's credits in a store.
   * GET /
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const rules = {
      email: "required|email",
      store: "required|string",
    };

    const validation = await validate(request.post(), rules);

    if (validation.fails()) {
      return response.badRequest(validation.messages());
    }

    const { email, store: storeName } = request.post();

    const store = await Store.findOrCreate({ name: storeName });
    const user = await User.findOrCreate({ email });

    const credits = await Credit.findOrCreate(
      {
        store_id: store.id,
        user_id: user.id,
      },
      {
        store_id: store.id,
        user_id: user.id,
        amount: 0,
      }
    );

    return credits;
  }
}

module.exports = CreditController;
