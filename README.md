

# Space Debris Tracking API

This is a **Space Debris Tracking API** built with **Node.js** and **TypeScript**. The idea is to check the risk level of space debris based on its orbit height and store each check in a database to retrieve later. 

---

##  Setup Instructions

1. **Clone the repo**:
   ```bash
   git clone https://github.com/Ramreddy237/space-debris
   cd space-debris
   ```

2. **Environment Setup**: 
   Create a `.env` file in the project root with the following:
   ```env
   PORT=3000
   MONGO_URI=mongodb://mongo:27017/spaceDebrisDB
   ```

3. **With Docker**: Easiest way to get everything up and running!
   - Run the containers:
     ```bash
     docker-compose up --build
     ```
   - This will set up both the **app** and **MongoDB** containers. Access the API at [http://localhost:3000](http://localhost:3000).

4. **Without Docker** (if you have Node.js and MongoDB installed locally):
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start MongoDB on your machine.
   - Run the app:
     ```bash
     npx tsc
     npm start
     ```
   - The API will be available at [http://localhost:3000](http://localhost:3000).

---

## Design Rationale

**Tech Stack**: Built with **Node.js** and **TypeScript** for fast, reliable performance. **Express** handles routing, while **MongoDB** stores each orbit check with flexible fields.


**API Design**:
   - **Orbit Risk Check** (`/debris/status/:orbit_height`): Evaluates risk based on orbit height and logs each check.
   - **Detection History** (`/debris/history`): Provides a log of all checks for easy tracking.

**Error Handling**: Manages invalid inputs and database connection issues gracefully, ensuring the API remains stable and user-friendly.

---

## Example Usage of API

### 1. Check the Risk Level

- **Endpoint**: `GET /debris/status/:orbit_height`
- **How to Use**: Pass the orbit height to see the risk level.
- **Example**:
  ```bash
  curl http://localhost:3000/debris/status/500
  ```
- **Sample Response**:
  ```json
  {
    "message": "Space debris detected at 500 kilometers. Current risk level: MEDIUM"
  }
  ```

### 2. Retrieve Detection History

- **Endpoint**: `GET /debris/history`
- **How to Use**: Call this endpoint to get a list of all past checks.
- **Example**:
  ```bash
  curl http://localhost:3000/debris/history
  ```
- **Sample Response**:
  ```json
  [
    {
      "orbitHeight": 500,
      "riskLevel": "MEDIUM",
      "timestamp": "2024-10-28T14:00:00Z"
    },
    {
      "orbitHeight": 900,
      "riskLevel": "HIGH",
      "timestamp": "2024-10-28T14:05:00Z"
    }
  ]
  ```
