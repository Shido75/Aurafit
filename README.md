Aurafit
# AuraFit - The AI Fitness System

**AuraFit** is a next-generation web application that transforms fitness into an immersive, gamified experience. Combining conversational AI powered by Google Gemini and realistic text-to-speech from ElevenLabs, AuraFit acts as your personal fitness coach, guiding you through custom workout plans and tracking your progress as if you were leveling up in an RPG.

---

## Table of Contents

* [Features](#features)
* [Demo](#demo)
* [Technology Stack](#technology-stack)
* [Getting Started](#getting-started)

  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Environment Variables](#environment-variables)
  * [Running the App](#running-the-app)
* [Usage](#usage)
* [Project Structure](#project-structure)
* [Testing](#testing)
* [Contributing](#contributing)
* [Roadmap](#roadmap)
* [License](#license)

---

## Features

* **Voice-First Onboarding**: Natural conversation replaces tedious forms using ElevenLabs SDK.
* **AI-Powered Workout Plans**: Personalized exercise plans generated dynamically via Google Gemini API.
* **RPG-Style Gamification**: Earn XP, level up, and track STR, END, CON stats.
* **Immersive UI**: Dark theme with electric blue and crimson accents, inspired by the Solo Leveling "System" aesthetic.
* **Interactive Workouts**: Voice-guided prompts and real-time progress logging.

---

## Demo

*Screenshots and a live demo link (if available) can be added here.*

---

## Technology Stack

* **Frontend**: Next.js, React, Tailwind CSS, Zustand
* **Backend**: FastAPI (Python)
* **Database**: PostgreSQL
* **AI Services**: Google Gemini API, ElevenLabs API
* **Deployment**: Vercel (Frontend), Railway/Render (Backend & DB)

---

## Getting Started

### Prerequisites

* Node.js (v14+)
* Python 3.9+
* PostgreSQL

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/<your-username>/aurafit.git
   cd aurafit
   ```
2. Install frontend dependencies:

   ```bash
   cd frontend
   npm install
   ```
3. Install backend dependencies:

   ```bash
   cd ../backend
   pip install -r requirements.txt
   ```

### Environment Variables

Create a `.env` file in the `backend` directory with the following:

```bash
DATABASE_URL=postgresql://user:password@host:port/dbname
GEMINI_API_KEY=<your-google-gemini-key>
ELEVENLABS_API_KEY=<your-elevenlabs-key>
```

### Running the App

1. Start the backend server:

   ```bash
   cd backend
   uvicorn main:app --reload
   ```
2. Start the frontend:

   ```bash
   cd ../frontend
   npm run dev
   ```
3. Open your browser and navigate to `http://localhost:3000`.

---

## Usage

1. Click **Begin** to start voice-first onboarding.
2. Answer a series of questions to generate your custom workout plan.
3. Click **Begin Workout** to start an exercise session. Log sets, reps, and rest periods via voice commands or UI.
4. Earn XP, level up, and track your progress on the dashboard.

---

## Project Structure

```
/aurafit
├── backend                # FastAPI server, workout logic, database models
├── frontend               # Next.js & React app
│   ├── components         # UI components (StatusWindow, DungeonHUD)
│   ├── pages              # Next.js pages
│   └── styles             # Tailwind CSS config
├── scripts                # Deployment and utility scripts
├── README.md              # This file
└── LICENSE
```

---

## Testing

Automated and manual tests include:

* **Unit Tests** for backend endpoints and AI integration
* **Integration Tests** for end-to-end onboarding and workout flows
* **Manual QA** on different browsers and devices

---

## Contributing

Contributions are welcome! Please:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m "Add YourFeature"`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details.

---

## Roadmap

* Nutrition tracking module
* Real-time form correction with MediaPipe
* Social integration and leaderboards
* Wearable device sync (Apple Watch, Garmin)

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
