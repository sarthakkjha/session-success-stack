![github-submission-banner](https://github.com/user-attachments/assets/a1493b84-e4e2-456e-a791-ce35ee2bcf2f)

# 🚀 Coincentrate

> Transform your Productivity with Purpose

---

## 📌 Problem Statement

**Problem Statement 5 – Capture screen-based data to build smart, secure productivity tools**

---

## 🎯 Objective

Our project helps people stay focused and avoid distractions while working or studying. It is designed for students, professionals, or anyone who wants to improve their focus and productivity.

The app allows users to start a "focus session" by selecting which apps they are allowed to use, how long they want to stay focused, and how much money they want to stake. If they succeed, they get their money back. If they get distracted too many times or leave the session early, their money is donated to a charity that supports education for underprivileged children in rural areas.

This system adds real motivation for users to stay focused and productive, while also contributing to a good cause if they fail. It also provides helpful analytics and a built-in AI assistant to support users during their session.

---

## 🧠 Team & Approach

### Team Name:  
`We are Groot`

### Team Members:  
- Anas Nadeem [LinkedIn](https://www.linkedin.com/in/anas-nadeem-8888bb223?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app) 
- Ayush [LinkedIn](https://www.linkedin.com/in/its-ayush543?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app)
- Sarthak Jha [LinkedIn](https://www.linkedin.com/in/srthk19?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app)
- Akshdeep Singh [LinkedIn](https://www.linkedin.com/in/akshdeep-singh-a03821282?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app)

### Your Approach:  
- Why we chose this problem:
  In the age of digital distraction, staying focused has become a real challenge. We aimed to tackle this by blending technology with behavioral psychology—encouraging focus    through financial commitment and offering users a meaningful way to improve their productivity. If they fail, the money supports a charitable cause, making the outcome        impactful either way.

- Key challenges we addressed:
  - Real-Time App Monitoring
    Challenge: Tracking user activity in real-time without significant performance overhead.
    Solution: Used lightweight libraries like ScreenPipe for app monitoring and optimized the monitoring frequency to reduce CPU usage. Implemented caching to avoid redundant     checks.
  
  - Session State Management
    Challenge: Accurately tracking session states and handling edge cases like app crashes or unexpected user behavior.
    Solution: Implemented a robust state management system using React Context and Redux. Added fallback mechanisms to save session data locally in case of crashes.
    
  - Blockchain Integration
    Challenge: Ensuring secure wallet connections and handling transaction failures.
    Solution: Used wagmi and ethers.js for wallet integration via Base’s Onchain Kit. Added retry logic for failed transactions and provided clear feedback to users.

  - AI Assistant Integration
    Challenge: Ensuring the AI assistant provides accurate and context-aware responses.
    Solution: Integrated Grok AI with custom prompts tailored to user productivity use-cases. Added fallback responses for API rate limits or outages.

  - Error Handling
    Challenge: Handling uncaught exceptions and network failures gracefully.
    Solution: Implemented global error handlers in both Electron's main process and the React frontend. Added retry logic and displayed user-friendly error messages.

  - Cross-Platform Compatibility
    Challenge: Ensuring the Electron app works seamlessly on Windows, macOS, and Linux.
    Solution: Used Electron’s platform APIs with conditional logic for platform-specific behavior. Verified builds on all platforms during development.

  - User Privacy
    Challenge: Balancing productivity tracking with privacy.
    Solution: Ensured all monitoring using ScreenPipe is local—no sensitive data is sent externally. Provided a clear privacy policy and opt-out options.

- Pivots, brainstorms, or breakthroughs we got during hacking:
  - We initially thought of deducting a percentage of users' staked money on failure, but we pivoted to a more purposeful outcome—donating the full amount to a charity for        underprivileged children’s education
    
  - While exploring various distraction detection tools, we chose ScreenPipe because of its ability to perform local monitoring, which significantly helped us maintain user       privacy.
    
  - Integrating an AI assistant within the session (using Grok AI) was a key breakthrough—users no longer need to break focus to search for help or ideas.
    
  - Building a comprehensive analytics dashboard evolved from a basic log to a powerful feature that keeps users engaged by visualizing their focus patterns and progress.

---

## 🛠️ Tech Stack

### Core Technologies Used:
- Frontend: ReactJS, ElectronJS
- Backend: NodeJS (local backend)
- APIs: Groq API, Base Onchain API

### Sponsor Technologies Used (if any):
- ✅ **Groq:** Our focus-tracking app integrates Groq AI to power a productivity assistant chatbot. It provides real-time help with tasks like answering questions, summarizing content, and generating code snippets, all within the app. This keeps users engaged, reduces distractions, and improves their focus. 
- ✅ **Base:** Our app uses OnchainKit for secure payments. Users lock funds before a session, which are refunded if they stay focused. If distracted, funds are donated to an NGO. This system promotes transparency, accountability, and focus through financial incentives. 
- ✅ **Screenpipe:** Coincentrate integrates Screenpipe for real-time screen monitoring and local data storage, aligning with Screenpipe's goals. This integration enables efficient debugging, performance optimization, and a privacy-conscious approach, ensuring a secure and responsive user experience.
---

## ✨ Key Features

Highlighting the most important features of our project:

✅ Focus-Based Staking Mechanism
Users stake ETH on their ability to stay focused. If they succeed, they get their money back; if they fail, the money goes to charity—adding real accountability to productivity.
![SessionCreation](https://github.com/user-attachments/assets/5de50793-f23d-498d-9e15-0c239cc410b8)

✅ On-Chain Wallet Integration (Base Onchain Kit)
Seamless and secure wallet connection using Base’s Onchain Kit for logging in and handling all crypto transactions directly on the blockchain.
![image](https://github.com/user-attachments/assets/277fa899-7538-42bb-8a3e-fab10a1fda98)

✅ Real-Time Distraction Monitoring (ScreenPipe)
Live tracking of app usage to ensure users stay on whitelisted apps during a focus session. Alerts are issued for every distraction, with failure rules enforced automatically.
<p align="left">
  <img width="322" alt="focusAlert" src="https://github.com/user-attachments/assets/0aac0603-bf3a-48cc-a3df-9de333e334f0" />
</p>

✅ AI-Powered Focus Assistant (Grok AI)
Integrated AI chatbot to help users with coding, writing, and brainstorming tasks in real-time—without needing to exit their focus session.
![FocusSession](https://github.com/user-attachments/assets/057d461c-127b-49ed-9918-091409edf8de)

✅ Charity-Powered Motivation Model
If users fail their session, their staked ETH is donated to educational charities supporting underprivileged children in rural areas, giving the app a strong social impact.
![SessionFailed](https://github.com/user-attachments/assets/a7bd4a52-33d4-4737-ba62-b01af8e517dc)

✅ Interactive Analytics Dashboard
Users get detailed insights including success/failure stats, total hours focused, ETH staked, weekly performance, app-wise success rate, and recent sessions.
![dashboard](https://github.com/user-attachments/assets/1b37fe6c-6c06-400f-a151-8f71ac532d83)

✅ Customizable Focus Sessions
Users can set their session duration, stake amount, and whitelist or blacklist specific apps to tailor their focus environment.
![SessionCreation](https://github.com/user-attachments/assets/5de50793-f23d-498d-9e15-0c239cc410b8)


✅ Cross-Platform Support via Electron
Designed to work smoothly across Windows, macOS, and Linux through an Electron-based desktop application.

Add images, GIFs, or screenshots if helpful!

---

## 📽️ Demo & Deliverables

- **Demo Video Link:** [https://youtu.be/uHFlMRPbpEc?si=2WPnC4a7gJqJpA0I]  
- **Pitch Deck / PPT Link:** [https://docs.google.com/presentation/d/1pMDrv1Zh3rINT_Dg_dtJxX17L8lT6Hvw/edit?usp=drivesdk&ouid=100273704381396850560&rtpof=true&sd=true]  
---

## ✅ Tasks & Bonus Checklist

- ✅ **All members of the team completed the mandatory task - Followed at least 2 of our social channels and filled the form**
- ✅ **All members of the team completed Bonus Task 2 - Signing up for Sprint.dev and filled the form (3 points)**

---

## 🧪 How to Run the Project

### Requirements:
- Node.js, Screenpipe
- Groq, Coinbase Developer API key
- In the .env file, fill in the required values, VITE_PUBLIC_ONCHAINKIT_API_KEY, VITE_GROQ_API_KEY and VITE_SERVER_URL=http://localhost:5173.

### Local Setup:
```bash
# Clone the repo
git clone https://github.com/sarthakkjha/session-success-stack.git

# Install dependencies
cd session-success-stack
npm install

# Start development server
npm run electron:dev
```
---

## 🧬 Future Scope

List improvements, extensions, or follow-up features:

- Mobile App Launch: iOS and Android versions to increase accessibility.
- Gamification: Leaderboards, badges, and streaks to boost motivation.
- Community Challenges: Group sessions with pooled stakes and shared goals.
- Productivity Tool Integration: Sync with Google Calendar, Notion, and more.
- Charity Expansion: Partnering with global NGOs for broader social impact.

---

## 📎 Resources / Credits

- ElectronJS official documentation [Link](https://www.electronjs.org/docs/latest)
- Screenpipe official documentation [Link](https://docs.screenpi.pe/home) 
- Base official documentation [Link](https://docs.base.org/)
- Groq API reference [Link](https://console.groq.com/docs/api-reference#chat-create)

---

## 🏁 Final Words
What a ride this hackathon has been! We started with a simple idea—can we help people stay focused in a world full of distractions? Along the way, it turned into something much more powerful: a tool that not only boosts productivity but also contributes to a meaningful cause.

There were plenty of challenges—from figuring out real-time monitoring without breaching user privacy, to making blockchain transactions seamless for non-technical users. We had our fair share of sleepless nights, bug hunts, and “a-ha!” moments (like realizing ScreenPipe could handle local-only monitoring and protect user data) or even releasing sometimes we ourselves might need the help of our project which motivated us to work on it for more than just to win this hackathon.

One of our biggest takeaways? Tech is at its best when it improves lives and does good in the world. The thought that someone's failed focus session could help a child in a rural village access education—that kept us going.

Big shout-out to the hackathon organisers and the amazing folks behind Base, ScreenPipe, and Grok AI—your tools made this possible and namespace for organizing such an amazing hackathon.

---
