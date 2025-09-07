# RoamGo Travels: Explore the World Your Way ✈️

## Overview
RoamGo Travels is a modern full-stack travel platform built with Next.js, designed to connect adventurers with unique group and private trip experiences. It features a robust authentication system, dynamic trip browsing with advanced filtering, and a responsive user interface, all powered by a MySQL database managed with Prisma ORM.

## Features
-   **User Authentication**: Secure user registration, login, and session management using JWT.
-   **Protected Routes**: Role-based access control for user dashboards and administrative panels via Next.js middleware.
-   **Group & Private Trip Discovery**: Browse a diverse catalog of pre-planned group and customizable private travel experiences.
-   **Advanced Trip Filtering**: Dynamically filter trips by continent, year, month, trip style, and a customizable price range.
-   **Responsive User Interface**: Enjoy a seamless experience across all devices with a modern design crafted using Tailwind CSS, Radix UI, and Framer Motion.
-   **Detailed Trip Information**: View comprehensive details for individual group trips, including overview, itinerary, perks, and costs.
-   **Efficient Data Management**: Backend operations are handled efficiently with Next.js API routes and Prisma ORM for database interactions.

## Getting Started

### Installation
To set up RoamGo Travels locally, follow these steps:

1.  **Clone the Repository**:
    ```bash
    git clone git@github.com:luggardubochi/Roamgotravels.git
    ```
2.  **Navigate to Project Directory**:
    ```bash
    cd Roamgotravels
    ```
3.  **Install Dependencies**:
    ```bash
    npm install
    # or yarn install
    ```
4.  **Generate Prisma Client**:
    ```bash
    npx prisma generate
    ```
5.  **Run Database Migrations**: Ensure your MySQL database is configured and accessible via `DATABASE_URL` in your `.env` file.
    ```bash
    npx prisma migrate dev --name init
    ```

### Environment Variables
Create a `.env` file in the root of the project and populate it with the following variables:

-   `DATABASE_URL`: Connection string for your MySQL database.
    -   Example: `DATABASE_URL="mysql://user:password@localhost:3306/roamgotravels_db"`
-   `TOKEN_NAME`: The name of the HTTP-only cookie used to store the JWT.
    -   Example: `TOKEN_NAME="roamgo_auth_token"`
-   `JWT_SECRET`: A strong secret key used to sign and verify JWTs.
    -   Example: `JWT_SECRET="super_secret_jwt_key_that_is_very_long_and_complex"`

## API Documentation

### Base URL
The base URL for authentication-related API endpoints is `/api/auth`.

### Endpoints

#### `POST /api/auth/signup`
Handles user registration.
**Request**:
```json
{
  "name": "string",
  "email": "string (email format)",
  "password": "string"
}
```

**Response**:
```json
{
  "message": "User created",
  "user": {
    "id": "string (UUID)",
    "email": "string (email format)"
  }
}
```

**Errors**:
-   `400 Bad Request`: Missing fields (`name`, `email`, or `password`).
-   `409 Conflict`: User with the provided email already exists.
-   `500 Internal Server Error`: An unexpected server-side error occurred during signup.

#### `POST /api/auth/login`
Handles user login and issues an authentication token.
**Request**:
```json
{
  "email": "string (email format)",
  "password": "string"
}
```

**Response**:
```json
{
  "message": "Login successful"
}
```
*A successful login sets an HTTP-only cookie named by `TOKEN_NAME` containing the JWT.*

**Errors**:
-   `401 Unauthorized`: Invalid email or password credentials.
-   `500 Internal Server Error`: An unexpected server-side error occurred during login.

#### `POST /api/auth/logout`
Handles user logout by clearing the authentication token cookie.
**Request**:
*This endpoint does not require a request body.*

**Response**:
```json
{
  "message": "Logout successful"
}
```
*This action typically clears the `TOKEN_NAME` HTTP-only cookie, effectively logging out the user.*

**Errors**:
-   `500 Internal Server Error`: An unexpected error occurred while attempting to clear the session cookie.

## Usage
To run the application in development mode:

```bash
npm run dev
# or yarn dev
```

The application will be accessible at `http://localhost:3000`.

-   **Browse Trips**: Navigate to `/grouptrip` to explore available group travel options.
-   **Apply Filters**: Use the filter bar at the top of the group trips page to refine your search by various criteria.
-   **Authentication**:
    -   Sign up for a new account at `/auth/signup`.
    -   Log in to an existing account at `/auth/login`.
    -   Access the user dashboard at `/dashboard` after logging in.
    -   (Future: Access the admin panel at `/admin` for users with `admin` role).

## Technologies Used

| Category   | Technology   | Version      | Description                                | Link                                          |
| :--------- | :----------- | :----------- | :----------------------------------------- | :-------------------------------------------- |
| **Frontend** | Next.js      | 15.5.0       | React framework for full-stack applications | [nextjs.org](https://nextjs.org/)             |
|            | React        | 19.1.0       | JavaScript library for building user interfaces | [react.dev](https://react.dev/)               |
|            | TypeScript   | 5            | Typed superset of JavaScript               | [typescriptlang.org](https://www.typescriptlang.org/) |
|            | Tailwind CSS | 4.1.12       | Utility-first CSS framework                | [tailwindcss.com](https://tailwindcss.com/)   |
|            | Framer Motion | 12.23.12     | Production-ready motion library for React  | [framer.com/motion](https://www.framer.com/motion/) |
|            | Radix UI     | 3.2.1        | Unstyled UI components for React           | [radix-ui.com](https://www.radix-ui.com/)     |
| **Backend**  | Next.js API Routes | 15.5.0       | API endpoints for server-side logic        | [nextjs.org/docs/app/building-your-application/routing/route-handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) |
|            | Prisma ORM   | 6.14.0       | Next-generation Node.js and TypeScript ORM | [prisma.io](https://www.prisma.io/)           |
|            | MySQL        | (External)   | Relational database system                 | [mysql.com](https://www.mysql.com/)           |
|            | bcryptjs     | 3.0.2        | Password hashing library                   | [npmjs.com/package/bcryptjs](https://www.npmjs.com/package/bcryptjs) |
|            | jsonwebtoken | 9.0.2        | JSON Web Token implementation for Node.js  | [npmjs.com/package/jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) |
| **Tooling**  | ESLint       | 9            | Pluggable JavaScript linter                | [eslint.org](https://eslint.org/)             |
|            | Node.js      | 20.x         | JavaScript runtime environment             | [nodejs.org](https://nodejs.org/en)           |

## License
Distributed under the MIT License.

## Author Info
-   **Your Name**: [Your LinkedIn Profile] | [Your Twitter Handle] | [Your Portfolio Link]

---

![Next.js](https://img.shields.io/badge/Next.js-Black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=prisma&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)