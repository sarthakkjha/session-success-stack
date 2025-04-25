# 🎯 Coincentrate – Transform your productivity with purpose

Welcome to **Coincentrate**, a productivity and accountability platform designed to help users stay focused, achieve their goals, and contribute to meaningful causes—all in one session.

## 🌟 What is Coincentrate?

Coincentrate is a desktop application where users **stake money** on their ability to **stay focused** during a self-defined work session. If they succeed, they get their money back. If they fail (due to distractions or early exit), their stake is used to fund education of under-privileged kids in rural India.

---

## 🧠 Why Coincentrate?

In today’s digital world, staying focused is harder than ever. Coincentrate helps:
- Boost productivity by introducing financial accountability.
- Reduce distractions by tracking app usage in real time.
- Support charitable causes even in failure.

---

## 🚀 How It Works

1. **Login & Wallet Connection**
   - Users sign in and connect their crypto wallet using the **Base** platform.

2. **Set Up a Focus Session**
   - Choose the amount of time to focus.
   - Decide how much money to stake.
   - Select apps to whitelist (allowed) or blacklist (not allowed) using ScreenPipe.

3. **Start Session**
   - Screenpipe monitors real-time activity.
   - If a user uses unapproved apps or exits early, they get up to 5 warnings.
   - Crossing the limit or quitting early results in session failure.

4. **During the Session**
   - Users get access to an AI assistant powered by **Groq AI** to help with tasks and queries.

5. **End of Session**
   - Success: Get back the staked money.
   - Failure: Stake is donated to a charity.

---

## 📊 Analytics & Dashboard

Users can access their personal dashboard with the following insights:
- Total focus hours
- Number of successful vs failed sessions
- Weekly focus trends
- Amount staked and donated
- App-wise success rates
- Recent session summaries

---

## 🛠️ Tech Stack

| Component        | Technology      |
|------------------|-----------------|
| Wallet & Blockchain | **Base**       |
| App Monitoring   | **ScreenPipe**   |
| AI Assistant     | **Groq AI**      |
| Frontend         | React.js         |
| Backend          | Node.js, Express |
| Database         | MongoDB (or alternative) |

---

## 🔮 Future Roadmap

We plan to expand Coincentrate with:
- Mobile app versions (iOS & Android)
- Gamified experience with leaderboards and badges
- Community focus challenges
- Enhanced charity support options
- Integration with productivity tools (Notion, Google Calendar, etc.)
- A Team/Groap Focus Session
- Focus Challenges sponsored by sponsors

---

## ❤️ Our Mission

Coincentrate is more than an app—it's a movement. We aim to:
- Build a focused and disciplined digital generation.
- Promote responsible digital behavior.
- Turn every lost moment into an opportunity to give back.

---

## 💻 Installation

To run this project locally, follow these steps:

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/sarthakkjha/session-success-stack.git
    cd session-success-stack
    ```
2.  **Install Dependencies:**
    Make sure you have Node.js installed on your machine. Then, install the required packages:
    ```bash
    npm install
    ```
3.  **Create .env File:**
    Set up your environment variables:
    ```bash
    cp .env.example .env
    ```
    Then, open the `.env` file and fill in the required values, VITE_PUBLIC_ONCHAINKIT_API_KEY, VITE_GROQ_API_KEY and VITE_SERVER_URL=http://localhost:5173.
    You can obtain onchain and groq api keys from the respective developer platforms.
5.  **Run the Development Server:**
    ```bash
    npm run electron:dev
    ```
    Your app will now run locally on your system!

---

## 🙌 Contributing

We welcome contributions, suggestions, and feedback! Whether you're a developer, designer, or enthusiast, feel free to fork this repo and make it even better.





