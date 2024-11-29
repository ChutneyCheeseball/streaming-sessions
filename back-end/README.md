# streaming-sessions back-end

This is a NodeJS server using the [Fastify](https://fastify.dev/) framework and [Sequelize](https://sequelize.org/) ORM.

The server runs locally on port 3001. If the port number is changed, the React application must change as well.

## Prerequisites

[Docker](https://www.docker.com/) was used to provide some components of the solution, specifically:

- The MySQL server
- [Adminer](https://www.adminer.org/) - a convenient browser-based tool for viewing and editing the database

Refer to `docker-compose.yml` for specifics.

Start the blank database with:

### `docker compose up`

Install the required node modules with:

### `npm install`

Run the server in development mode with:

### `npm run dev`

The server will test the connection to the MySQL server, and if good, perform a database sync. This creates the sessions table in the database if it does not exist yet.

## Database structure

The database has a single table named sessions, with the following columns:

- **id** - a 36-character string for storing UUIDs
- **start** - a floating point number for storing the session start time
- **end** - a floating point number for the session end time
- **createdAt** - creation time of the session (added by Sequelize)
- **updatedAt** - time of last update (added by Sequelize)

Note that start and end are limited to the range 0..24 to represent the 24-hours of the day.

## API routes

### `GET http://127.0.0.1:3001/sessions`

This returns all sessions as a JSON array.

Sample response:

```
[
  {
    "id": "37681551-2338-4638-bb21-8e06843361ea",
    "start": 12,
    "end": 18,
    "createdAt": "2024-11-29T08:53:11.000Z",
    "updatedAt": "2024-11-29T08:53:11.000Z"
  },
  {
    "id": "a0b1c48b-645e-4d9e-bbd1-d51e9d4cee7e",
    "start": 10,
    "end": 14.5,
    "createdAt": "2024-11-29T08:52:40.000Z",
    "updatedAt": "2024-11-29T08:53:06.000Z"
  }
]
```

### `GET http://127.0.0.1:3001/sessions/<session_id>`

Returns a specific session by ID.

Sample response:

```
{
  "id": "37681551-2338-4638-bb21-8e06843361ea",
  "start": 12,
  "end": 18,
  "createdAt": "2024-11-29T08:53:11.000Z",
  "updatedAt": "2024-11-29T08:53:11.000Z"
}
```

### `DELETE http://127.0.0.1:3001/sessions/<session_id>`

Delete a specific session by ID.

Sample response:

```
{ "message" : "Session deleted" }
```

### `POST http://127.0.0.1:3001/sessions`

Create or update a session.

Sample payload:

```
{
  "id": "8a5ede17-deaf-4da5-ab69-5f4177b16ce0",
  "start": 12,
  "end": 14.166666666666666
}
```

**Note** the ID is not set automatically by the database, it must be provided.

Sample response:

```
{ "message": "Session created" }
```
