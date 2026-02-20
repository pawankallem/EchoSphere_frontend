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

## Tech Stack

### Frontend _(primary focus)_
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
git clone https://github.com/your-username/echosphere-frontend
cd echosphere-frontend
npm install

# Set environment variable
echo "VITE_API_URL=http://localhost:5000" > .env

# Start dev server
npm run dev
```

---

## Screenshots

_Add screenshots here_

---

## License

MIT