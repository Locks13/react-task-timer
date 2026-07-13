# ⏱️ React Chronos Pomodoro

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)](https://vitejs.dev/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Vercel](https://img.shields.io/badge/Live-Demo-000?logo=vercel)](https://react-chronos-pomodoro-one.vercel.app/)

**React Chronos Pomodoro** is a productivity timer built with React, TypeScript, and vanilla CSS.  
It combines the Pomodoro technique with task management, allowing you to organize your workflow and track your focus sessions.

## 🚀 Live Demo

👉 **[react-chronos-pomodoro-one.vercel.app](https://react-chronos-pomodoro-one.vercel.app/)**

## 🧠 Features

- 🍅 **Pomodoro Timer** — 25-minute focus sessions with a circular progress ring and audio alerts
- ✅ **Task Management** — Add, complete, and delete tasks with localStorage persistence
- 📋 **Sortable Task List** — Sort tasks by name, status, or creation date with a single click
- 📊 **Session History** — View completed focus sessions with timestamps
- 🔊 **Audio Notifications** — Sound feedback when a session ends
- 🌐 **Accessibility (a11y)** — Semantic HTML, keyboard navigable, focus indicators, and ARIA labels
- 📱 **Responsive Design** — Pixel-accurate responsive layout built with vanilla CSS (mobile-first approach)

## 🛠️ Tech Stack

| Category         | Technology                                                     |
| ---------------- | -------------------------------------------------------------- |
| Framework        | React 19                                                       |
| Language         | TypeScript                                                     |
| Build Tool       | Vite                                                           |
| Styling          | Vanilla CSS3 (custom properties, flexbox, grid, media queries) |
| State Management | React Context API                                              |
| Routing          | React Router 7                                                 |
| Testing          | Vitest + React Testing Library                                 |
| Icons            | Lucide React                                                   |
| Linting          | ESLint + Prettier                                              |
| Deployment       | Vercel                                                         |

## 🧱 Project Structure

src/
├── components/ # Reusable UI components
│ ├── AudioPlayer.tsx # Audio feedback handler
│ ├── Header.tsx # App header with navigation
│ ├── ProgressRing.tsx # Circular timer progress (SVG)
│ ├── TaskForm.tsx # Add task input
│ ├── TaskItem.tsx # Individual task row
│ └── TaskList.tsx # Sortable task list with empty state
├── context/
│ └── TaskContext.tsx # Global state management
├── hooks/
│ ├── useLocalStorage.ts # Persistent state hook
│ └── useTask.ts # Task CRUD operations
├── pages/
│ ├── History.tsx # Completed sessions log
│ ├── NotFound.tsx # 404 page
│ └── Timer.tsx # Main timer + task view
├── types/
│ └── task.ts # TypeScript interfaces & types
├── App.tsx
└── main.tsx

## 🎯 Design & Accessibility

- **Pixel-accurate UI** with consistent spacing and typography scale
- **Responsive layout** built with vanilla CSS: flexbox, grid, and media queries
- **Accessible (a11y):**
  - Semantic HTML (`<main>`, `<nav>`, `<button>`, not `<div>` for everything)
  - ARIA labels on interactive elements
  - Visible focus rings for keyboard navigation
  - Full keyboard operability (Tab, Enter, Escape)
  - `prefers-reduced-motion` media query support
- **Interactive sorting:** click column headers (Name, Status, Date) to reorder tasks

## 🧪 Running Locally

```bash
git clone https://github.com/Locks13/react-task-timer.git
cd react-task-timer
npm install
npm run dev
```
