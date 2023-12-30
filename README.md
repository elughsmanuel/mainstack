# MainStack


## Overview

This project is the backend server for an eCommerce platform, providing essential functionalities for users to interact with products and perform common operations.

## Features

- **User Authentication:** Secure user authentication for a personalized shopping experience.
- **Product Management:** Browse, search, and retrieve detailed information about available products.
- **Category and Tag Filtering:** Efficiently filter products based on categories and tags.

## API Documentation

For detailed API documentation, you can refer to the [Postman Documentation.](https://documenter.getpostman.com/view/27688954/2s9YeG5rDf#intro)

## Live URL

Check out the live URL [here.](https://mainstack-production.up.railway.app/api/v1)

## Built With

Express.js - Web Framework  
Typescript - Programming language  
MongoDB/Mongoose - Database

## Prerequisites

Node.js version 16.x.x or higher

## Installation

1. Clone the repository and navigate to the project directory

2. Run the following command to clone:

```bash
  git clone https://github.com/elughsmanuel/mainstack.git

```

3. Create a `.env` file in the root directory and set the environment variables, see `.env.example` file for an example.

## Database Configuration

This application uses MongoDB as its database. To configure the database, add the following environment variables to a .env file in the root directory of the project:

```bash
NODE_ENV=node_environment
HOST=server_host
PORT=server_port
DATABASE_CONNECTION=database_connection_url
DATABASE_PASSWORD=database_password
```

Replace node_environment, server_host, server_port, database_connection_url and database_password with your values.

## Install app dependencies

```bash
npm install
```

It will install all modules listed as dependencies in package.json.

## Running the app

```bash
npm run start
```

## Start up server

When you see...

[1] [DATABASE] - Database connection has been established successfully.  
[1] - - - - - - - - - -  
[1] 🌟 🛠️  [SERVER] - Server is listening on http://${host}:${port}  

...server is up and running.
