# Tabs  

Tabs is a **full-stack web application** with a companion **browser extension** designed to enhance productivity by combining bookmarking, note-taking, clipboard management, screenshots, Shazam-like music recognition, and a color picker in one place.  

The project is built with a **React.js frontend**, **Express.js backend**, and **PostgreSQL database**, with Tailwind CSS for styling.  


## 🚀 Features  

- **User Authentication** (Sign up, login, secure sessions)  
- **Bookmarks Management** via web & extension  
- **Shazam-like Music Recognition** (identify songs directly)  
- **Clipboard Manager** (sync & manage copied text)  
- **Color Picker** (save Hex & RGB values)  
- **Screenshots** (capture and save)  
- **Notes** (create, edit, delete)  


## 🏗️ Project Structure  

```bash
tabs-app/
├── client/       # React frontend (web app)
├── extension/    # Browser extension (React + Vite)
├── server/       # Express.js backend + PostgreSQL
├── package.json  # Root dependencies
└── README.md     # Project documentation  
```
---

## Client (Web App)  

- Built with **React + Vite + Tailwind CSS**  
- Pages, components, layouts, hooks, services, and utils organized in `src/`  
- Handles authentication, dashboard, notes, bookmarks, clipboard, and color picker  


## Extension (Browser Extension)  

- Built with **React + Vite**  
- Provides quick access to bookmarks, clipboard, and other productivity tools  
- Includes `manifest.json`, icons, background script  


## Server (Backend)  

- **Express.js** for API development
- **PostgreSQL** as the database  
- Controllers for auth, clipboard, music recognition, and suggestions  
- Middleware for authentication  
- Routes for modular API endpoints  
- `db/schema.sql` contains initial database schema  


## ⚙️ Tech Stack  

- **Frontend**: React.js, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Extension**: React.js + Vite
- **Other Tools**: JWT Authentication, Winston (logging), REST APIs