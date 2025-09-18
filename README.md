# Labour Hire Backend

## Description
The Labour Hire Backend is the server-side of the full-stack **Labour Hire** project, where users can:
- Sign up and log in (authentication using JWT and bcrypt)
- Mark themselves as available for work
- Create and manage tasks visible to other users
- Interact with tasks created by others by submitting offers and approving/rejecting proposals

The backend is built with **Node.js, Express, and MongoDB**, following best practices with **controllers, models, routes, and middlewares**.

---

## Technologies Used
- Node.js
- Express
- MongoDB + Mongoose
- JWT (JSON Web Tokens) for authentication
- bcrypt for password hashing
- Axios (for internal API calls if needed)
- Stripe (initial integration for payments)
- Vite + React (frontend, separate)

---

## Backend Structure
backend/
├─ controllers/          # Business logic for routes (auth, tasks, availableUsers)
├─ models/               # MongoDB schemas (User, Task, Offer, Payment, AvailableUser)
├─ routes/               # Route definitions (authRoutes.js, taskRoutes.js, availableUserRoutes.js)
├─ middlewares/          # Authentication and role-based access control
├─ .env.example          # Example of environment variables
├─ package.json
└─ server.js             # Main entry point

### Controllers
- **authController.js**: login, signup, get logged-in user
- **taskController.js**: create, list, delete tasks
- **availableUserController.js**: create, list, delete available users
- **offerController.js** (partial): create, accept, reject offers

### Middlewares
- **authMiddleware.js**: verifies if the user is authenticated via JWT
- **roleMiddleware.js**: controls access based on user roles (when needed)

### Models
- **User.js**: user with email and hashed password
- **Task.js**: tasks with title, description, rate, duration, date/time
- **Offer.js**: offers made by other users on tasks
- **AvailableUser.js**: users available for work
- **Payment.js**: payment information (Stripe integration in progress)

---

## Environment Variables
Create a `.env` file locally with your real secrets (do **not** commit). Use `.env.example` for reference:

PORT=5000
JWT_SECRET=<your_jwt_secret_here>
STRIPE_SECRET_KEY=<your_stripe_secret_here>
MONGO_URI=<your_mongo_uri_here>

---

## Running the Backend Locally
1. Install dependencies:
npm install

2. Run the server in development mode:
npm run dev

- The backend will be available at `http://localhost:5000`

---

## Security
- Passwords are **hashed with bcrypt** before storing in the database
- Authentication is handled via **JWT**
- Sensitive environment variables (JWT_SECRET, MONGO_URI, STRIPE_SECRET_KEY) are **not committed** and remain in `.env`
- `.env.example` serves as a reference for anyone running the project

---

## Best Practices
- Organized structure: **controllers, routes, models, middlewares**
- `.gitignore` configured to ignore:
  - `node_modules/`
  - `.env`
  - `dist/`
  - log files (`npm-debug.log*`)
  - editor settings (`.vscode/`, `.idea/`)
- Backend can be deployed on **Render or Railway**, with environment variables configured on the platform

---

## Next Steps
- Complete Stripe payment integration
- Add endpoints for task and payment history
- Implement unit and integration tests for controllers

---

## Links
- GitHub Repository: [insert public GitHub link here]
- Frontend Repository: [insert frontend link here]
