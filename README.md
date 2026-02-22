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
- **Notifications** — Send notifications on likes and comments 
- **Protected Routes** — Auth-guarded navigation with redirect logic

---
<br/>

## Pages

### Register
<br/>
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/6226950d-d75c-46f4-9edb-28367322ca14" />

<br/><br/>
### Login
<br/>
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/08abb1fa-c7b2-4d38-8f4a-1b696bcd6d49" />

<br/><br/>
### Home
<br/>
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e0097b79-9cc6-4f3b-a7ca-9d611f04fdeb" />

<br/><br/>
### Home ( Mobile view )
<br/>
<img width="390" height="1003" alt="image" src="https://github.com/user-attachments/assets/37adcb1f-29f4-4ef7-bdb4-f8255b04a09e" />

<br/><br/>
### Home ( Light mode & Notifications )
<br/>
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/9a1b6630-c395-4c7b-a3c6-90063f3c5b8c" />

<br/><br/>
### Profile
<br/>
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/4bd96fbf-6c90-4236-a9d8-04b07011bf6c" />

<br/><br/>
### Single Post View
<br/>
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/deeec5a1-93da-40d9-8f8b-5e2a18fb7e9e" />

<br/><br/>
### Edit Profile
<br/>
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/c2fbbdc4-7a6c-4798-8514-a180cd5b384b" />

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
- [ ] Notifications — follows, mentions, and system alerts
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

> 🚧 Active Development
> EchoSphere is actively evolving with new features, performance improvements, and UI refinements underway.

