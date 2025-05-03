
# Project Name: User Management API

This is a simple User Management API built using Next.js 13/14, MongoDB, and Mongoose. It allows you to create, read, update, and delete user data. The API handles basic CRUD operations.

## Features

- **Create a user**
- **Read user details**
- **Update user details**
- **Delete a user**

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/kbimsara/simple-backend-next.git
   cd simple-backend-next
   ```

2. **Install dependencies**:

   Make sure you have [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/) installed.

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the root of your project and add the following:

   ```bash
   MONGODB_URI=mongodb://localhost:27017/crud
   ```

4. **Run the development server**:

   ```bash
   npm run dev
   ```

   Your server will be running at `http://localhost:3000`.

## API Routes

### `GET /api/users`

- **Description**: Fetch all users.
- **Response**: Returns a list of users in JSON format.

### `GET /api/users/:id`

- **Description**: Fetch a user by their `id`.
- **Response**: Returns the user data in JSON format.

### `POST /api/users`

- **Description**: Create a new user.
- **Body**: 
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com"
  }
  ```

- **Response**: Returns the created user data in JSON format.

### `PUT /api/users/:id`

- **Description**: Update user details by `id`.
- **Body**:
  ```json
  {
    "name": "Updated Name",
    "email": "updatedemail@example.com"
  }
  ```

- **Response**: Returns the updated user data in JSON format.

### `DELETE /api/users/:id`

- **Description**: Delete a user by `id`.
- **Response**: Returns a message confirming the deletion.

