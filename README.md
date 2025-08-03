# Pokedex App

Welcome to the **Pokédex App** – a beautiful and fully responsive React web application that lets users browse, search, and explore Pokémon in style!

---

## ⚡ Features

- 🔍 **Search Pokémon** by name or ID
- 🔄 **Load More Pokémon** with pagination
- 🎨 **Detailed Pokémon Pages** including:
  - Types
  - Category
  - Height & Weight
  - Abilities
  - Weaknesses (based on type relations)
  - Evolutions chain with navigation
- 🎯 **Smooth UI/UX** with animations and hover effects
- 🔄 **Next/Previous Navigation** on Pokémon detail page
- 💡 **Responsive Design** – works on mobile, tablet, and desktop
- 🌀 **Loading spinners** for better UX

---

## 🛠️ Tech Stack

- **React.js**
- **Tailwind CSS** for modern styling
- **React Router** for navigation
- **PokéAPI** – https://pokeapi.co/

---

## 📂 Folder Structure

```bash
src/
│
├── api/
│   └── Api.js             # Functions to fetch Pokémon data
│
├── components/
│   ├── TypeBadge.jsx      # UI for Pokémon types
│   ├── WeaknessBadge.jsx  # UI for weaknesses
│
├── pages/
│   ├── Pokemon.jsx        # Home/List page
│   └── PokemonDetail.jsx  # Detail page
│
├── App.jsx
└── main.jsx
```
