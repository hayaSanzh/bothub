# Feedback and Voting Application

This project is a web application for managing feedback and votes. It allows users to create, update, delete, filter, and sort feedback entries. Users can also vote on feedback entries, and the application provides functionality for user authentication.

## Features

- **Feedback Management**: Create, update, delete feedback.
- **Voting System**: Users can upvote feedback.
- **Filtering and Sorting**: Filter feedback by category and status, and sort by votes or creation date.
- **User Authentication**: Secure login and session handling.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 16.x or later)
- [MongoDB](https://www.mongodb.com/) (version 4.x or later)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo-name.git
   cd your-repo-name
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:

   Create a `.env` file in the root directory and add the following variables:

   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/feedbackdb
   JWT_SECRET=your_jwt_secret
   ```

## Running the Application

1. Start the MongoDB server:

   ```bash
   mongod
   ```

2. Run the application:

   ```bash
   npm start
   ```

3. Open your browser and navigate to:

   ```
   http://localhost:3000
   ```

## Development

To run the application in development mode with hot reloading, use:

```bash
npm run dev
```

## API Documentation

The API documentation is available in the [API Documentation](#api-documentation) section.

## Project Structure

```
project-root/
├── app.js              # Main application file
├── models/             # Mongoose models
├── controllers/        # Route handlers
├── routes/             # Express routes
├── public/             # Static files
├── views/              # Frontend templates
├── .env                # Environment variables
├── package.json        # Node.js dependencies and scripts
```

## API Documentation

### Base URL

```
http://localhost:3000/api
```

### Endpoints

#### 1. Get All Feedbacks

**GET** `/feedbacks`

Query Parameters:

- `category` (optional): Filter by category (e.g., `Bug`, `UI`).
- `status` (optional): Filter by status (e.g., `Idea`, `In Progress`).
- `sortBy` (optional): Sort by `votes` or `date`.
- `sortOrder` (optional): Sort order (`asc` or `desc`).

Response:

```json
[
  {
    "id": 1,
    "title": "Improve UI",
    "description": "The dashboard UI needs improvement.",
    "category": "UI",
    "status": "Idea",
    "votes": 5,
    "author_id": "user123",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
]
```

#### 2. Create Feedback

**POST** `/feedbacks`

Body:

```json
{
  "title": "Feedback Title",
  "description": "Feedback Description",
  "category": "Bug"
}
```

Response:

```json
{
  "message": "Feedback created successfully."
}
```

#### 3. Update Feedback

**PUT** `/feedbacks/:id`

Body:

```json
{
  "title": "Updated Title",
  "description": "Updated Description",
  "category": "UI"
}
```

Response:

```json
{
  "message": "Feedback updated successfully."
}
```

#### 4. Delete Feedback

**DELETE** `/feedbacks/:id`

Response:

```json
{
  "message": "Feedback deleted successfully."
}
```

#### 5. Vote Feedback

**POST** `/feedbacks/:id/vote`

Response:

```json
{
  "votes": 10
}
```

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

