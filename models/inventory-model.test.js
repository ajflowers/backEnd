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
            await add({ item: "kale" })

            const inventory = await db("inventory");
            expect(inventory).toHaveLength(1);
        });

        it("should add the provided produce item", async function() {
            await add({ item: "chard" });
            await add({ item: "turnips" })

            const inventory = await db("inventory");

            expect(inventory).toHaveLength(2);
            expect(inventory[0].item).toBe("chard");
            expect(inventory[1].item).toBe("turnips");
        });

        it("should return the added produce item", async function() {
            let inventory = await add({ item: "chard" });

            expect(inventory.item).toBe("chard");
            expect(inventory.id).toBeDefined();

            inventory = await add({ item: "turnips" });
            expect(inventory.item).toBe("turnips");
            expect(inventory.id).toBeDefined();
        });
    });

    describe("findBy()", function() {

        it("should use findBy as a filter", async function() {
            await findBy({ item: "kale" })
            await findBy({ item_id })

            const inventory = await db("inventory");
            expect(inventory).toHaveLength(1);
        });

        it("should findBy the provided produce item", async function() {
            await findBy({ item: "chard" });
            await findBy({ item: "turnips" })

            const inventory = await db("inventory");

            expect(inventory).toHaveLength(2);
            expect(inventory[0].item).toBe("chard");
            expect(inventory[1].item).toBe("turnips");
        });

        it("should return the added produce item", async function() {
            let inventory = await findBy({ item: "chard" });

            expect(inventory.item).toBe("chard");
            expect(inventory.id).toBeDefined();

            inventory = await findBy({ item: "turnips" });
            expect(inventory.item).toBe("turnips");
            expect(inventory.id).toBeDefined();
        });
    })
})