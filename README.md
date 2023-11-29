### MainStack

Re: Backend Engineer Test

## Prerequisites

Node.js version 16.x.x or higher

## Built With

Express.js - Web Framework
Typescript - Programming language
MongoDB/Mongoose - Database

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
