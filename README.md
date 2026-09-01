# Decision Deck

**Decision Deck** is a structured decision-making web application that helps users make difficult choices by breaking them down into options, criteria, weights, and scores.

Instead of relying on a simple pros-and-cons list, Decision Deck uses a **weighted decision matrix** to show how each option performs against the factors that matter most.

## Features

* Create and name a decision
* Add and compare multiple options
* Define custom decision criteria
* Assign importance weights to criteria
* Score each option from 1–10
* Calculate weighted decision results
* Rank options automatically
* Identify the top choice
* Get a rule-based **Decision Advisor** assessment
* Save completed decisions to MongoDB
* View previously saved decisions
* Delete saved decisions
* User registration and login with JWT authentication

## Decision Flow

```text
Create Decision
      ↓
Add Options
      ↓
Set Criteria & Weights
      ↓
Evaluate Options
      ↓
Calculate Results
      ↓
Decision Advisor
      ↓
Save Decision
```

## Tech Stack

**Frontend**

* React
* Vite
* React Router
* CSS

**Backend**

* Node.js
* Express
* MongoDB
* Mongoose

**Authentication**

* JWT
* bcryptjs

## How the Decision Calculation Works

Each option is evaluated against every criterion using a score from **1 to 10**.

Criteria are also given an importance weight from **1 to 10**.

The application combines these values to calculate a weighted score for each option and uses those scores to produce the final ranking.

The Decision Advisor then compares the top-ranked options and determines whether the result is:

* **Strong** — clear difference between the top options
* **Moderate** — noticeable difference
* **Close** — very small difference

This gives the user more context than simply showing which option received the highest score.

## Project Structure

```text
decision-deck/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── utils/
│   └── package.json
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── README.md
```

## Running the Project

### Backend

```bash
cd backend
npm install
node server.js
```

Backend:

```text
http://localhost:5000
```

### Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

## Environment Variables

Create a `.env` file inside `backend`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```


## Project Status

Decision Deck is currently a working full-stack application with decision evaluation, result calculation, persistence, and authentication implemented.

## Future Improvements

* Decision history and statistics
* More detailed result visualizations
* Decision comparison
* Sharing decisions
* Exporting results
* Additional decision-analysis features
* Deployment as a live web application

## Author

**Harini**



---

### Decision Deck

*Turn difficult choices into structured decisions.*
