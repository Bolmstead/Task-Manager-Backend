# API for the TaxRise Client and Task Managment Application

The API that enables Administrators to assign tasks to Clients and for Clients to complete and update these Tasks.

# Table of Contents

1. [How to Run the Project](#run-project)
2. [Authorization Routes](#Authorization-Routes)
3. [User Routes](#User-Route)
4. [Task Routes](#Task-Route)
5. [Assignment Routes](#Assignment-Routes)
6. [Contact](#Contact)

<a name="run-project"></a>

# How to Run the Project

### Clone the Repo

This API requires [Node.JS](https://nodejs.org/) v18.17+ to run. To get a local copy up and running follow these steps:

1. Clone the backend repo to a separate directory by entering the following in a CLI:
   ```sh
   git clone https://github.com/Bolmstead/taxrise-backend.git
   ```
2. Install the libraries in the backend directory

   ```sh
   npm install
   ```

### Create a MondoDB Cluster

3. Create a [MongoDB](https://www.mongodb.com/) account and create your own cluster.
4. Create a MONGO_URI environment variable in your backend repository using your cluster's connection string as the value.

### Create Other Environment Variables in Backend Repository

5. If working in a local environment, set your NODE_ENV environment variable to "development". If working in production, set it to "production".
6. Set a JWT_SECRET environment variable to a secure key of your choice.

### Start your project

7. Run your local server in your backend repository:

   ```sh
   npm start
   ```

# ------------------------

<a name="Authorization-Routes"></a>

## Authorization Routes

## Signup

Provides JSON web token

`POST /auth/signup`

#### Request Body:

    {
      "username": "username",
      "password": "password",
      "isClient": true
    }

### Response:

    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    }

## Login

Provides JSON web token

`POST /auth/login`

#### Request Body:

    {
      "username": "username",
      "password": "password",
      "isClient": true
    }

### Response:

    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    }

<a name="User-Routes"></a>

# User Routes

### Get All Clients

`GET /users/all-clients/`

#### Headers:

    {
      "Authorization": "Bearer {{JSONWebToken}}"
    }

#### Response:

    [
      {
        "username": "John Doe",
        "isClient": true,
        "assignments": [{assignment}, {assignment},...]
      },
      {
        "username": "Bob Smith",
        "isClient": true,
        "assignments": [{assignment}, {assignment},...]
      },
    ]

### Get a User's Details

`GET /users/:username`

#### Headers:

    {
      "Authorization": "Bearer {{JSONWebToken}}"
    }

#### Response:

      {
        "username": "Bob Smith",
        "isClient": true,
        "assignments": [{assignment}, {assignment},...]
      }

<a name="Task-Routes"></a>

# Task Routes

## Get all Tasks

Must be an admin to request

### Request:

`GET /tasks/all`

#### Headers:

    {
      "Authorization": "Bearer {{JSONWebToken}}"
    }

### Response:

    [
        {
            "title": "Work on coding assessment",
            "description": "Be meticulous",
            "assignments": [{assignment}, {assignment},...]
        },
        {
            "title": "Buy a coffee",
            "description": "Light roast",
            "assignments": [{assignment}, {assignment},...]
        }
    ]

## Get all of a Client's Tasks

Must be an admin or the client that is requesting

### Request:

`GET /tasks/all-clients-tasks/:username`

#### Headers:

    {
      "Authorization": "Bearer {{JSONWebToken}}"
    }

### Response:

    [
        {
            "title": "Work on coding assessment",
            "description": "Be meticulous",
            "assignments": [{assignment}, {assignment},...]
        },
        {
            "title": "Buy a coffee",
            "description": "Extra caffeine",
            "assignments": [{assignment}, {assignment},...]
        }
    ]

## Get Task Details

Must be an admin or the client that is requesting

### Request:

`GET /tasks/task-details/:id`

#### Headers:

    {
      "Authorization": "Bearer {{JSONWebToken}}"
    }

### Response:

    {
        "title": "Work on coding assessment",
        "description": "Be  meticulous",
        "assignments": [{assignment}, {assignment},...]
    }

## Create Task

Must be an admin

### Request:

`POST /tasks`

#### Headers:

    {
      "Authorization": "Bearer {{JSONWebToken}}"
    }

#### Request:

    {
        "title": "Go for a workout",
        "description": "Don't skip it",
        "assignments": [{assignment}, {assignment}]
    }

### Response:

    {
        "status": "success",
        "message": "Task created"
    }

<a name="Assignment-Routes"></a>

# Assignment Route

## Get all Assignments

Must be an Admin

### Request:

`GET /assignments/all/`

#### Headers:

    {
      "Authorization": "Bearer {{JSONWebToken}}"
    }

### Response:

    [
        {
            "task": {...Task},
            "user": {...User},
            "status": "To Do",
            "fileUploads": ["www.asdf.com/link"]
            "responses": ["Will start task"]
        },
        {
            "task": {...Task},
            "user": {...User},
            "status": "In Progress",
            "fileUploads": ["www.asdf.com/link", "www.asdf.com/link"]
            "responses": ["Starting task now", "Almost completed"]
        },
    ]

## Get all of a Client's Assignments

Must be an Admin or the Client that is requesting

### Request:

`GET /assignments/all/:clientId`

#### Headers:

    {
      "Authorization": "Bearer {{JSONWebToken}}"
    }

### Response:

    [
        {
            "task": {...Task},
            "user": {...User},
            "status": "To Do",
            "fileUploads": ["www.asdf.com/link"]
            "responses": ["Will start task"]
        },
        {
            "task": {...Task},
            "user": {...User},
            "status": "In Progress",
            "fileUploads": ["www.asdf.com/link", "www.asdf.com/link"]
            "responses": ["Starting task now", "Almost completed"]
        },
    ]

## Get an Assignment's Details

Must be an Admin or the Client that is requesting

### Request:

`GET /assignments/details/:assignmentId`

#### Headers:

    {
      "Authorization": "Bearer {{JSONWebToken}}"
    }

### Response:

    {
        "task": {...Task},
        "user": {...User},
        "status": "In Progress",
        "fileUploads": ["www.asdf.com/link", "www.asdf.com/link"]
        "responses": ["Starting task now", "Almost completed"]
    }

## Edit an Assignment

Must be an Admin or the Client that is requesting. Only need to include one task, user, status field in the body of the request. Can include more than one.

### Request:

`PUT /assignments/edit/:assignmentId`

#### Headers:

    {
      "Authorization": "Bearer {{JSONWebToken}}"
    }

### Request:

    {
        "status": "Done"
        "fileUpload": "www.finished.com/done"
        "response": "Completed!"
    }

### Response:

    {
        "task": {...Task},
        "user": {...User},
        "status": "Done",
        "fileUploads": ["www.asdf.com/link", "www.asdf.com/link", "www.finished.com/done"]
        "responses": ["Starting task now", "Almost completed", "Completed!"]
    }

<a name="Contact"></a>

# Contact

Berkley Olmstead - olms2074@gmail.com - [Linkedin](https://www.linkedin.com/in/berkleyolmstead/)

Project Links:

- [Live Site](https://freebay.netlify.app/)
- [https://github.com/Bolmstead/taxrise-frontend](https://github.com/Bolmstead/taxrise-frontend)
- [https://github.com/Bolmstead/taxrise-backend](https://github.com/Bolmstead/taxrise-backend)

[node.js]: http://nodejs.org
[React Bootstrap]: https://react-bootstrap.netlify.app/
[Express.JS]: http://expressjs.com
[ReactJS]: https://react.dev/
[JSON Web Tokens]: https://www.npmjs.com/package/jsonwebtoken
[UUID]: https://www.npmjs.com/package/uuid
[Bcrypt]: https://www.npmjs.com/package/bcrypt
[JSON Schema]: https://www.npmjs.com/package/jsonschema
[Mongoose]: https://www.npmjs.com/package/mongoose
[Firebase]: https://firebase.google.com/
