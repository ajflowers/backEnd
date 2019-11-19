# backEnd

# Endpoints

## Unprotected endpoints: Registration/login

Each takes a JSON object with `username` and `password` keys:
- `POST /api/farmers/register`
- `POST /api/farmers/login`
- `POST /api/customers/register`
- `POST /api/customers/login`


## Protected endpoints for users logged in as farmer:

- `POST /api/farms`
    - Takes a JSON object with `name` (farm name) and `address` keys and a single string for each value. Returns the newly created farm object, including a farm ID and the ID of the linked farmer user (farmer user ID is obtained from the JWT token).
- `PUT /api/farms/:id`
    - Updates farm info; must specify farm ID in URL params.
