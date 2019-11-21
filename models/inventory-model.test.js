const db = require('../data/dbConfig.js');

const { add,
    find,
    findBy,
    findById,
    update,
    remove } = require('./inventory_model.js');

describe("inventory model", function() {
    describe("add()", function() {
        beforeEach(async () => {
            await db("inventory").truncate();
        });

        it("should add a produce item", async function() {
            await insert({ item: kale })

            const inventory = await db("inventory");
            expect(inventory).toHaveLength(1);
        });

        it("should add the provided produce item", async function() {
            await insert({ item: "chard" });
            await insert({ item: "turnips" })

            const inventory = await db("inventory");

            expect(inventory).tohaveLength(2);
            expect(inventory[0].item).toBe("chard");
            expect(inventory[1].item).toBe("turnips");
        });

        it("should return the added produce item", async function() {
            let inventory = await insert({ item: "chard" });

            expect(inventory.item).toBe("chard");
            expect(inventory.id).toBeDefined();

            inventory = await insert({ item: "turnips" });
            expect(inventory.item).toBe("turnips");
            expect(inventory.id).toBeDefined();
        });
    })
})