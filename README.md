# 🗳️ Election Explainer

**Learn. Vote. Shape the Future.**

Election Explainer is a modern, interactive web application designed to simplify the Indian election process. From registration guidelines to a step-by-step voter checklist, the platform empowers citizens with the knowledge they need to participate effectively in the world's largest democracy.

---

## ✨ Key Features

- **🤖 CivicBot Assistant**: An AI-powered chatbot built with Google Gemini that answers all your election-related queries in real-time.
- **📅 Interactive Timeline**: A visual roadmap of the election phases, ensuring you never miss an important date.
- **✅ Voter Checklist**: A comprehensive guide to the documents and steps required for a seamless voting experience.
- **📱 Responsive Design**: A premium, mobile-first UI built with Framer Motion for smooth animations and transitions.
- **🛡️ Secure & Validated**: Robust input validation and security measures for the AI interface.

## 🚀 Tech Stack

- **Frontend**: [React 19](https://react.dev/), [Vite](https://vitejs.dev/)
- **Styling**: Vanilla CSS (Custom Design System), [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **AI Engine**: [Google Gemini API](https://ai.google.dev/)
- **Backend**: Node.js / Express (Serverless Functions)

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Google Gemini API Key ([Get it here](https://aistudio.google.com/))

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Code-Beaker/h2s-election-explainer.git
   cd 01-election-explainer
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env` file in the root directory and add your API key:
   ```env
   VITE_GEMINI_API_KEY=your_api_key_here
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

## 📂 Project Structure

```text
├── api/                # Serverless API functions (CivicBot)
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components (Hero, ChatBot, Timeline, etc.)
│   ├── pages/          # Page-level components
│   ├── assets/         # Images and icons
│   ├── App.jsx         # Main application entry
│   └── index.css       # Global styles & design tokens
├── netlify.toml        # Deployment configuration
└── vite.config.js      # Vite configuration
```

---

Built with ❤️ for a stronger democracy.
