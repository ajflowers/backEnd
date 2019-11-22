// const db = require('../data/dbConfig.js');

// const { 
//   add,
//   find,
//   findBy,
//   findById } = require('./customer-users-model.js');

// describe("customer-user", function() {
//     beforeAll(async () => {
//             await db('order_details').truncate();
//             await db('orders').truncate();
//             await db("customers").truncate();
//         });

//     describe("add()", function() {
//         it("should add a new customer", async function() {
//             await add({ name: "scooby", password: "doo" })

//             const customers = await db("customers");
//             expect(customers).toHaveLength(1);
//         });
//     });

//     describe("findBy()", function() {

//         it("should use findBy as a filter", async function() {
//             await findBy({ item: "kale" })
//             await findBy({ item_id })

//             const customers = await db("customers");
//             expect(customers).toHaveLength(1);
//         });

//         it("should findBy the provided produce item", async function() {
//             await findBy({ item: "chard" });
//             await findBy({ item: "turnips" })

//             const inventory = await db("inventory");

//             expect(inventory).toHaveLength(2);
//             expect(inventory[0].item).toBe("chard");
//             expect(inventory[1].item).toBe("turnips");
//         });

//         it("should return the added produce item", async function() {
//             let inventory = await findBy({ item: "chard" });

//             expect(inventory.item).toBe("chard");
//             expect(inventory.id).toBeDefined();

//             inventory = await findBy({ item: "turnips" });
//             expect(inventory.item).toBe("turnips");
//             expect(inventory.id).toBeDefined();
//         });
//     })
// })