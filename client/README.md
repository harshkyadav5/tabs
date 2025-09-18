# Tabs – Client (Web App)

This is the **frontend** of the Tabs project, built with **React.js**, **Vite**, and **Tailwind CSS**.  
It provides the user interface for authentication, notes, bookmarks, clipboard, screenshots, and color picker functionalities.  

## 🚀 Features  

- **User Authentication** (Sign up, login, logout)  
- **Bookmarks Management**  
- **Notes** (create, edit, delete)  
- **Clipboard Manager**  
- **Color Picker** (save Hex & RGB values)  
- **Screenshots Handling**  
- **Responsive UI** built with Tailwind CSS  

## 📂 Folder Structure  

```bash
client/
├── public/             # Static assets (icons, logo, profile pics, etc.)
├── src/
│   ├── assets/         # Images, icons, other static assets
│   ├── components/     # Reusable UI components
│   ├── context/        # React Context for global state
│   ├── hooks/          # Custom React hooks
│   ├── layouts/        # Layout wrappers for pages
│   ├── pages/          # Application pages (Login, Notes, etc.)
│   ├── services/       # API calls and service functions
│   ├── utils/          # Utility functions/helpers
│   ├── App.jsx         # Root component
│   ├── App.css         # Global styles
│   ├── index.css       # Tailwind entry styles
│   ├── main.jsx        # Entry point for React app
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
└── tailwind.config.js  # Tailwind CSS configuration  
```

## ⚙️ Tech Stack  

- **Framework**: React.js + Vite  
- **Styling**: Tailwind CSS  
- **State Management**: React Context API & Hooks  
- **API Communication**: REST APIs (Express.js backend)  

## 📌 Future Enhancements  

- Advanced search and filtering for bookmarks/notes  
- Improved screenshot annotation tools    