"use strict";

const Task = use("Task");
const Helpers = use("Helpers");
const Credit = use("App/Models/Credit");
const User = use("App/Models/User");
const Store = use("App/Models/Store");
const xlsx = use("xlsx");

class Csv extends Task {
  static get schedule() {
    return "0 0 */6 * * *";
  }

  async handle() {
    const wb = await xlsx.readFile(Helpers.appRoot() + "/credits.csv");
    const credits = xlsx.utils.sheet_to_json(wb.Sheets.Sheet1);
    await Promise.all(
      credits.map(async (credit) => {
        const { email, amount, store: storeName } = credit;

        const store = await Store.findOrCreate({ name: storeName });
        const user = await User.findOrCreate({ email });

        const Credits = await Credit.findOrCreate(
          {
            store_id: store.id,
            user_id: user.id,
          },
          {
            store_id: store.id,
            user_id: user.id,
          }
        );
        Credits.amount = (Credits.amount || 0) + amount;
        await Credits.save();
      })
    );
  }
}

module.exports = Csv;
