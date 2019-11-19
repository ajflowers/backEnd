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


## Protected endpoints for users logged in as farmer:

- `GET /api/farms` returns list of farms (excluding those with `farm_name: null`)