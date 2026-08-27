# ProPerks

A simple MERN employee benefits platform (MVP).

## What it does

A registered user can:
1. Register
2. Login
3. View available benefits
4. Claim a benefit
5. See claimed benefits in **My Claims**
6. Remove a claim
7. View/update their profile
8. Logout

There are exactly **2 benefits**: Health Insurance and Gym.

There is no Admin, no RBAC, no approval workflow, and no AI in this MVP.
A claim exists = claimed. There is no Pending/Approved/Rejected state.

## Tech Stack

- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt
- **Frontend:** React (Vite), Tailwind CSS, React Router, Axios, React Hot Toast, Lucide React

## Project Structure

```
ProPerks/
├── backend/
│   ├── config/db.js
│   ├── controllers/{authController,benefitController,claimController}.js
│   ├── middleware/{asynchandler,authMiddleware,errorMiddleware}.js
│   ├── models/{User,Benefit,Claim}.js
│   ├── routes/{authRoutes,benefitRoutes,claimRoutes}.js
│   ├── seed.js
│   └── server.js
└── frontend/
    └── src/
        ├── api/api.js
        ├── components/
        ├── pages/
        └── App.jsx
```

## Setup

### 1. Backend

```bash
cd backend
npm install
```

Create/edit `.env`:

```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

Seed the two benefits into MongoDB (run once):

```bash
npm run seed
```

Start the server:

```bash
npm run dev
```

API runs at `http://localhost:5000`.

### 2. Frontend

```bash
cd frontend
npm install
```

Create `.env` (see `.env.example`):

```
VITE_API_URL=http://localhost:5000/api
```

Start the app:

```bash
npm run dev
```

App runs at `http://localhost:5173`.

## API Reference

| Method | Endpoint              | Access  | Description             |
|--------|------------------------|---------|--------------------------|
| POST   | /api/auth/register     | Public  | Register a new user     |
| POST   | /api/auth/login        | Public  | Login                   |
| GET    | /api/auth/profile      | Private | Get profile             |
| PUT    | /api/auth/profile      | Private | Update profile          |
| DELETE | /api/auth/profile      | Private | Delete account          |
| GET    | /api/benefits          | Private | List all benefits       |
| POST   | /api/claims/:benefitId | Private | Claim a benefit         |
| GET    | /api/claims            | Private | Get my claims           |
| DELETE | /api/claims/:claimId   | Private | Remove a claim          |

## Deployment

- Deploy `backend/` (e.g. Render, Railway) — set the env vars from `.env`.
- Deploy `frontend/` (e.g. Vercel, Netlify) — set `VITE_API_URL` to your deployed backend URL, and set `CLIENT_URL` on the backend to your deployed frontend URL.
- Use MongoDB Atlas for the database.

## Roadmap (post-deployment only)

AI features (benefit advisor, summaries, insights) and additional benefits are intentionally **out of scope** for this MVP and can be considered after deployment.
