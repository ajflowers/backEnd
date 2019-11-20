# backEnd

# Endpoints

## Unprotected endpoints: Registration/login

Each takes a JSON object with `username` and `password` keys:
- `POST /api/farmers/register`
    - farmer registration has optional `farm_name` and `farm_address` keys (farm info can be provided w/ registration, or can default to null for farmer to add info later)
- `POST /api/farmers/login`
- `POST /api/customers/register`
- `POST /api/customers/login`



## Protected endpoints for users logged in as farmer:

- `GET /api/farms` returns farmer/farm info for logged-in user 
  - example: ```{
  "id": 1,
  "username": "test1",
  "farm_name": "Happy Valley Farms",
  "farm_address": "123 Fake St, Anytown, USA"
}```

- `PUT /api/farms/`
    - Updates farm info; farm ID will be provided by farmer token. takes `farm_name` and/or `farm_address` key/value pairs in JSON object.

- `POST /api/inventory`
    - adds new inventory item, example: `{ item: "apples", quantity: 100 } - returns new inventory item with unique id (inventory id numbers are unique to each entry and are not repeated between farmers)

- `GET /api/inventory`
    - returns all inventory items for logged-in user

- `PUT /api/inventory/:inventoryID`
    - update inventory info

- `DELETE /api/inventory/:inventoryID`

- `PUT /api/orders/:orderID` update order status (boolean, default false on all new orders):
    - `{"filled" : true}` when order is filled and ready to pick up
    - `{"picked_up": true }` when order has been picked up by customer

## Protected endpoints for users logged in as customer:

- `GET /api/farms` returns list of farms (excluding those with `farm_name: null`)

- `GET /api/inventory/:farmID` returns all inventory for specified farm ID

- `POST /api/orders` creates new order by taking an object of the type:
```js
{
    "farm_id": 2, //farm being ordered from
    "customer_name": "Alice",
    "customer_email": "alice@isp.net",
    "items_ordered": [ //array cannot be empty
        {
            "inventory_id": 3, // unique inventory ID
            "item": "potatoes",
            "quantity": 12
        },
                {
            "inventory_id": 8,
            "item": "pumpkins",
            "quantity": 2
        }
    ] 
}
```

## Protected endpoints for either user type:

- `GET /api/orders` returns all orders for logged in customer or farmer

- `GET /api/orders/:orderID` returns order details including items for single order
    - must be logged in as the customer who placed the order or as the farmer who received the order; will reject other users