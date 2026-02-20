# EchoSphere

> A social platform where voices spread and conversations resonate.

EchoSphere is a full-stack social media web app inspired by the core experiences of Instagram and LinkedIn — sharing moments, engaging with content, and building a profile that represents you. Built as a personal project to explore modern frontend architecture and RESTful API design.

🔗 **Live App:** [echosphere.vercel.app](https://echo-sphere-frontend.vercel.app/)

---

## Features

- **Auth** — Register & login with JWT-based session management
- **Feed** — Create posts with images, like, save, and comment
- **Comments** — Nested replies with delete support
- **Profile** — View your posts, edit bio, avatar, location, and website
- **Dark Mode** — System-wide theme toggle persisted via Redux
- **Protected Routes** — Auth-guarded navigation with redirect logic

---
<br/>

## Pages

### Register

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/bd5ba0a5-c379-44bc-8767-fd19cab2303e" />

<br/><br/><br/>

### Login

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/935b75df-690a-45b1-9348-939cb0898334" />

<br/><br/><br/>

### Home/Feed page

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/43943841-2633-442b-84b1-81e9fb2d7f75" />

<br/><br/><br/>

### Create Post

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/3244f212-bd9c-4406-b0f3-0bcc8b54cf0d" />

<br/><br/><br/>

### Profile

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/21a4b4a0-b078-4bbb-aacf-c23a8808ad61" />

<br/><br/><br/>

### Edit Profile

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/cdd54767-6a09-4a2c-aae1-7b493cbd0e6a" />

<br/><br/>

---

## Tech Stack

### Frontend 
| Tool | Purpose |
|---|---|
| React 19 + Vite | UI & blazing-fast build tooling |
| Redux Toolkit | Global state — auth, posts, comments, theme |
| React Router v7 | Client-side routing & navigation guards |
| Tailwind CSS | Utility-first styling with full dark mode |
| Axios | Centralized HTTP client with request/response interceptors |
| Lucide React | Consistent icon system |
| React Hot Toast | Non-intrusive notifications |

### Backend
| Tool | Purpose |
|---|---|
| Flask (Python) | Lightweight REST API |
| PyMongo | MongoDB driver |
| PyJWT + bcrypt | Token auth & password hashing |

### Infrastructure
| Service | Role |
|---|---|
| MongoDB Atlas | Cloud-hosted database |
| Render | Backend deployment |
| Vercel | Frontend deployment (auto-deploy from GitHub `main`) |

---

## Frontend Architecture

```
src/
├── app/              # Redux store config
├── api/              # Axios instance + API modules
├── features/         # Redux slices — auth, posts, comments, theme
├── components/       # Reusable UI — Navbar, PostCard, Comments, etc.
└── pages/            # Route views — Feed, Profile, Login, Register
```

Key patterns used:
- **Centralized Axios instance** with auth interceptors and error handling
- **Public & Protected Routes** with back/forward navigation restriction
- **Slice-based state** — each feature owns its own reducer, actions, and async thunks

---

## Roadmap

- [ ] MinIO for image & video storage
- [ ] Notifications — likes, comments, follow requests
- [ ] Real-time chat with online status (WebSocket)
- [ ] Search with debouncing & throttling
- [ ] Dashboard analytics
- [ ] Smart feed suggestions — based on location, activity, mutual connections

---

## Getting Started

```bash
# Clone & install
git clone https://github.com/pawankallem/EchoSphere_frontend.git
cd echosphere-frontend
npm install

# Set environment variable
echo "VITE_API_URL=http://localhost:5000" > .env

# Start dev server
npm run dev
```

---
<br/>
<br/>

