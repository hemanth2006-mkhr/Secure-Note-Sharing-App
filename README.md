# Secure Note Sharing App 🚀

A robust and secure backend application designed to facilitate the creation, management, and sharing of notes with advanced access controls. Users can register, log in, create personal notes, and securely share them with others using unique share tokens, access keys, and time-based expiry.

## Table of Contents

-   [Key Features & Benefits](#key-features--benefits)
-   [Technologies Used](#technologies-used)
-   [Prerequisites](#prerequisites)
-   [Installation & Setup](#installation--setup)
-   [Configuration](#configuration)
-   [API Endpoints](#api-endpoints)
-   [Project Structure](#project-structure)
-   [Contributing](#contributing)
-   [License](#license)
-   [Acknowledgments](#acknowledgments)

## Key Features & Benefits

This application provides a secure and flexible platform for note management and sharing:

-   **User Authentication**: Secure user registration and login system using JWT for authenticated sessions.
-   **Note Management**: Create, view, update, and delete personal notes.
-   **Flexible Access Types**: Define notes as private or public.
-   **Advanced Sharing Options**:
    -   Generate unique share tokens for public access.
    -   Set access keys for password-protected notes.
    -   Specify expiry dates for shared notes.
    -   Ability to revoke shared note access at any time.
-   **Secure Data Handling**: Passwords are hashed using bcrypt. Sensitive information is managed securely.
-   **API-driven**: A RESTful API provides a clean interface for integration with front-end applications.
-   **Rate Limiting**: Protects against abusive requests and brute-force attacks.

## Technologies Used

The project is built using modern JavaScript technologies and tools:

### Languages

-   JavaScript
-   TypeScript (for potential future enhancements or type definitions)

### Tools & Technologies

-   **Node.js**: As the runtime environment.
-   **Express.js**: For building the RESTful API.
-   **MongoDB (via Mongoose)**: For database management and object data modeling.
-   **bcryptjs**: For password hashing.
-   **jsonwebtoken**: For secure user authentication (JWT).
-   **dotenv**: For managing environment variables.
-   **crypto**: Node.js built-in module for cryptographic functionalities.
-   **GitHub Actions**: For continuous integration and deployment workflows.
-   **Nodemon**: (Likely used for development) for automatic server restarts.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

-   **Node.js**: (LTS version recommended)
    -   [Download & Install Node.js](https://nodejs.org/en/download/)
-   **npm** (Node Package Manager): Comes bundled with Node.js.
-   **MongoDB**:
    -   [Download & Install MongoDB Community Server](https://www.mongodb.com/try/download/community)
    -   Alternatively, use a cloud-based MongoDB service like MongoDB Atlas.
-   **Git**: For cloning the repository.
    -   [Download & Install Git](https://git-scm.com/downloads)

## Installation & Setup

Follow these steps to get the project up and running on your local machine:

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/hemanth2006-mkhr/Secure-Note-Sharing-App.git
    cd Secure-Note-Sharing-App/Backend
    ```

2.  **Install Dependencies**:
    Navigate into the `Backend` directory and install the necessary Node.js packages:
    ```bash
    npm install
    ```

3.  **Set Up Environment Variables**:
    Create a `.env` file in the `Backend/` directory and add the following environment variables. Replace the placeholder values with your actual configuration.

    ```
    PORT=5000
    DB_URL=mongodb://localhost:27017/securenotes
    JWT_SECRET=your_jwt_secret_key_here
    JWT_EXPIRE=30d
    ACCESS_KEY_SECRET=a_strong_access_key_secret
    RATE_LIMIT_WINDOW_MS=60000
    RATE_LIMIT_MAX_REQUESTS=100
    ```
    -   `PORT`: The port on which the server will run.
    -   `DB_URL`: Your MongoDB connection string.
    -   `JWT_SECRET`: A strong, secret key for signing JWT tokens.
    -   `JWT_EXPIRE`: The expiry time for JWT tokens (e.g., `30d` for 30 days).
    -   `ACCESS_KEY_SECRET`: A secret key used for hashing access keys.
    -   `RATE_LIMIT_WINDOW_MS`: The time window in milliseconds for rate limiting.
    -   `RATE_LIMIT_MAX_REQUESTS`: The maximum number of requests allowed within the rate limit window.

4.  **Start the Server**:
    Once the environment variables are set, you can start the development server:
    ```bash
    npm start
    ```
    The server should now be running, typically on `http://localhost:5000` (or the port specified in your `.env` file). The console will display a message indicating a successful database connection.

## Configuration

All configurable settings are managed through environment variables in the `.env` file. Refer to the [Set Up Environment Variables](#set-up-environment-variables) section for details on each variable.

## API Endpoints

The API is designed to be RESTful and is structured around user authentication, note management, and sharing functionalities. All endpoints are expected to be prefixed with `/api/v1` (an assumption based on typical API versioning).

### Authentication

-   **`POST /api/v1/auth/register`**
    -   **Description**: Registers a new user.
    -   **Body**: `{ "username": "...", "email": "...", "password": "..." }`
    -   **Response**: `{"success": true, "message": "User registered successfully", "token": "..."}`

-   **`POST /api/v1/auth/login`**
    -   **Description**: Logs in an existing user.
    -   **Body**: `{ "email": "...", "password": "..." }`
    -   **Response**: `{"success": true, "message": "Login successful", "token": "..."}`

### Notes

*(Requires `Authorization: Bearer <token>` header for all authenticated requests)*

-   **`POST /api/v1/notes`**
    -   **Description**: Creates a new note.
    -   **Body**: `{ "title": "...", "content": "...", "accessType": "public|private", "shareType": "link|password", "expiryDate": "YYYY-MM-DDTHH:MM:SSZ" }` (shareType and expiryDate are optional, depending on accessType).
    -   **Response**: `{"success": true, "message": "Note created successfully", "note": {...}}`

-   **`GET /api/v1/notes`**
    -   **Description**: Retrieves all notes belonging to the authenticated user.
    -   **Response**: `{"success": true, "notes": [...]}`

-   **`GET /api/v1/notes/:id`**
    -   **Description**: Retrieves a specific note by ID for the authenticated user.
    -   **Response**: `{"success": true, "note": {...}}`

-   **`PUT /api/v1/notes/:id`**
    -   **Description**: Updates an existing note by ID for the authenticated user.
    -   **Body**: `{ "title": "...", "content": "...", ... }` (partial update)
    -   **Response**: `{"success": true, "message": "Note updated successfully", "note": {...}}`

-   **`DELETE /api/v1/notes/:id`**
    -   **Description**: Deletes a note by ID for the authenticated user.
    -   **Response**: `{"success": true, "message": "Note deleted successfully"}`

### Sharing

-   **`GET /api/v1/share/:token`**
    -   **Description**: Accesses a shared note using its unique share token.
    -   **Query Params**: `?accessKey=your_access_key` (if the note requires an access key)
    -   **Response**: `{"success": true, "note": {...}}`

## Project Structure

The project follows a modular structure, primarily focused on the `Backend` directory:

```
└── Backend/
├── .env                          # Environment variables
├── config/                       # Database connection and other configs
│   └── connectDB.js              # Mongoose database connection setup
├── controllers/                  # Logic for handling API requests
│   ├── AuthController.js         # User authentication (register, login)
│   ├── NoteController.js         # Note creation, retrieval, update, deletion
│   └── ShareController.js        # Logic for sharing and accessing shared notes
├── middleware/                   # Express middleware functions
│   ├── AuthMiddleware.js         # JWT authentication middleware
│   └── rateLimiter.js            # API rate limiting middleware
├── models/                       # Mongoose schemas and models
│   ├── NoteModel.js              # Schema for notes
│   └── UserModel.js              # Schema for users
├── node_modules/                 # Installed Node.js packages
│   └── .bin/
│       ├── bcrypt
│       ├── nodemon
│       ├── nodetouch
│       └── semver
└── utils/                        # Utility functions (e.g., token generation)
    ├── generateAccessKey.js      # Utility to generate access keys
    └── generateToken.js          # Utility to generate JWTs
    └── generateShareToken.js     # Utility to generate share tokens
```

*(Note: The `utils` directory is inferred from controller imports like `generateToken`, `generateAccessKey`, `generateShareToken`)*

## Contributing

Contributions are welcome! If you'd like to improve this project, please follow these steps:

1.  **Fork** the repository.
2.  **Clone** your forked repository: `git clone https://github.com/YOUR_USERNAME/Secure-Note-Sharing-App.git`
3.  **Create a new branch**: `git checkout -b feature/your-feature-name`
4.  **Make your changes** and commit them with descriptive messages.
5.  **Push** your branch to your fork: `git push origin feature/your-feature-name`
6.  **Open a Pull Request** to the `main` branch of the original repository.

Please ensure your code adheres to standard JavaScript best practices and includes appropriate tests if applicable.

## License

This project currently has **No License Specified**.

It is highly recommended to add a license to clarify how others can use, distribute, and contribute to your project. Common choices include MIT, Apache 2.0, or GPLv3.

## Acknowledgments

-   Thanks to the developers of **Node.js**, **Express.js**, and **Mongoose** for providing powerful tools for building web applications.
-   Credit to **bcryptjs** for secure password hashing.
-   Thanks to **jsonwebtoken** for robust authentication.
-   Utilizes **dotenv** for easy environment variable management.
