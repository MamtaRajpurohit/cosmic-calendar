# 🪐 COSMIC EVENTS EXPLORER  
**Explore Important Space Events and Scientists in History**

---

## 🚀 Overview  

**Cosmic Events Explorer** is a full-stack web application that allows users to explore important dates, events, and personalities in space exploration history.  
It provides users with:  

- 🛰️ **Key space missions** and their impact  
- 🧑‍🚀 **Famous scientists and astronomers** who shaped our understanding of the universe  
- 📅 Ability to **search by date** to discover what happened in space on that day  

---

## 🏗️ Project Structure  

```

COSMIC-EVENTS/
│
├── backend/        → Node.js + Express server for API routes
│   ├── src/        → Backend logic, routes, and controllers
│   ├── .env        → Contains API keys and secrets (not committed)
│   ├── server.js   → Entry point for backend
│
├── frontend/       → React + Vite frontend
│   ├── src/        → Components, pages, and logic
│   ├── index.html  → Main HTML template
│   ├── vite.config.ts → Vite configuration file
│
├── .gitignore      → Ignore unnecessary files from git
├── LICENSE         → License for open-source use
└── README.md       → Project documentation

````

---

## 🧠 Features  

- 🔭 Search **space events by date**  
- 🧑‍🚀 Learn about **scientists** and their major contributions  
- 🛰️ Integration with **backend API** for dynamic data  
- 🌍 Distinguishes between **Indian and global** events  
- 🎨 Modern, responsive UI using **React + Tailwind CSS**  
- ⚙️ Robust backend powered by **Node.js + Express**  

---

## 🧩 Tech Stack  

| Layer | Technology |
|-------|-------------|
| **Frontend** | React.js, Vite, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Language** | JavaScript, TypeScript (Vite config) |
| **Environment** | .env for secrets |
| **Version Control** | Git + GitHub |

---

## ⚙️ Installation & Setup  

### 1️⃣ Clone the repository  
```bash
git clone https://github.com/yourusername/cosmic-events.git
cd cosmic-events
````

---

### 2️⃣ Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` folder and add:

```
PORT=3001
API_KEY=your_api_key_here
```

Start the backend server:

```bash
npm start
```

Backend runs at 👉 **[http://localhost:5000](http://localhost:5000)**

---

### 3️⃣ Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs at 👉 **http://localhost:5173**

---

## 🌌 Example API Routes

| Route            | Method | Description                              |
| ---------------- | ------ | ---------------------------------------- |
| `/api/event`     | `POST` | Fetches space event for a given date     |
| `/api/scientist` | `POST` | Returns scientist info by country        |
| `/api/random`    | `GET`  | Returns a random space event for testing |

---

## 🧪 Sample Request (Event)

**Request:**

```json
POST /api/event
{
  "date": "1969-07-20"
}
```

**Response:**

```json
{
  "year": "1969",
  "title": "Apollo 11 Moon Landing",
  "description": "Neil Armstrong became the first human to step on the Moon.",
  "found": true,
  "isIndian": false
}
```

---

## 🧭 Folder Highlights

| Folder                    | Purpose                                  |
| ------------------------- | ---------------------------------------- |
| `backend/src/`            | Contains routes, logic, and API handlers |
| `frontend/src/`           | Contains UI components and pages         |
| `frontend/vite.config.ts` | Configures Vite for build and dev server |
| `.env`                    | Stores sensitive keys (ignored by Git)   |

---

## 🧰 Scripts

| Command         | Description                               |
| --------------- | ----------------------------------------- |
| `npm run dev`   | Starts frontend (Vite) development server |
| `npm start`     | Starts backend server                     |
| `npm run build` | Builds production-ready frontend          |

---

## 🧑‍💻 Author

**Developed by:** [Vyom Voyage](#)
🌐 *“Exploring the universe, one API call at a time.”*

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

