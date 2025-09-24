# 🧠 Quiz App

A responsive quiz application built with React, Firebase, and Styled Components. Users can register, log in, and take randomized quizzes on frontend development topics like JavaScript, React, HTML, and CSS. The app tracks progress and supports role-based access for uploading new quiz data.

## 🚀 Features

- Firebase Authentication (register, login, logout)
- Randomized quizzes with 10 questions per session
- User progress tracking (score, category stats)
- Light/Dark theme toggle
- Admin-only upload tool for adding questions via Excel
- Unit tests with Jest and React Testing Library

## 🛠 Tech Stack

- **Frontend:** React + Vite + TypeScript
- **Styling:** Styled Components
- **State Management:** React Context + Hooks
- **Backend:** Firebase Auth + Firestore
- **Testing:** Jest + React Testing Library

## 🧪 Running Locally

Clone the repo and install dependencies:

```bash
git clone https://github.com/your-username/quiz-app.git
cd quiz-app
yarn install
```

Start the development server:

```bash
yarn dev
```

To run tests:

```bash
yarn test
```

## 🔒 Firebase Setup

1. Create a Firebase project and enable **Authentication** (Email/Password)
2. Enable **Firestore Database**
3. Add your Firebase config to a `.env` file:

```env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=sender_id
VITE_FIREBASE_APP_ID=app_id
```

4. Set Firestore rules appropriately for user and quiz access.

## ✨ Admin Access

Users with an administrator email address can access the question uploader to import `.xlsx` files into Firestore.

## 🤝 Contributing

Feel free to fork this repo and submit a pull request. Suggestions and improvements are welcome!

## 📄 License

This project is licensed under the MIT License.
