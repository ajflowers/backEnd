const db = require('../data/dbConfig.js');

const { add,
    find,
    findBy,
    findById,
    update,
    remove } = require('./inventory_model.js');

describe("inventory model", function() {
    beforeAll(async () => {
            await db("inventory").truncate();
        });

    describe("add()", function() {
        it("should add a produce item", async function() {
            await add({ item: "kale", farm_id: 1, quantity: 5 })

            const inventory = await db("inventory");
            expect(inventory).toHaveLength(1);
        });

        it("should add the provided produce item", async function() {
            await add({ item: "chard", farm_id: 1, quantity: 5 });
            await add({ item: "turnips",farm_id: 1, quantity: 5 })

            const inventory = await db("inventory");

            expect(inventory).toHaveLength(3);
            expect(inventory[1].item).toBe("chard");
            expect(inventory[2].item).toBe("turnips");
        });

        it("should return the added produce item", async function() {
            let inventory = await add({ item: "carrots", farm_id: 2, quantity: 5 });

            expect(inventory.item).toBe("carrots");
            expect(inventory.id).toBeDefined();

            inventory = await add({ item: "turnips", farm_id: 2, quantity: 5 });
            expect(inventory.item).toBe("turnips");
            expect(inventory.id).toBeDefined();
        });
    });

    describe("findBy()", function() {

        it("should use findBy as a filter", async function() {
            const inventory = await findBy({farm_id: 2});
            expect(inventory).toHaveLength(2);
        });

        it("should findBy the provided produce item", async function() {
            const inventory = await db("inventory");

            expect(inventory).toHaveLength(5);
            expect(inventory[3].item).toBe("carrots");
            expect(inventory[4].item).toBe("turnips");
        });

    })
})