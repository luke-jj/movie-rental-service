# Movie Rental Service API
The Video Rental Software implementing this api runs locally in a video store.

## Installation

## API Documentation

    POST    /api/customers
    GET     /api/customers
    GET     /api/customers/{id}
    PUT     /api/customers/{id}
    DELETE  /api/customers/{id}

    POST    /api/genres
    GET     /api/genres
    GET     /api/genres/{id}
    PUT     /api/genres/{id}
    DELETE  /api/genres/{id}

    POST    /api/movies
    GET     /api/movies
    GET     /api/movies/{id}
    PUT     /api/movies/{id}
    DELETE  /api/movies/{id}

    POST    /api/rentals
    GET     /api/rentals

    POST    /api/users
    POST    /api/auth


## Data Model
Mongoose validates the persistence model and Joi validates the user input model.
isGold may be used to calculate the rental fee.

