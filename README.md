# Rick and Morty Characters Explorer

This is a React app that lets you browse and view details about characters from the Rick and Morty universe. It is built with React, TypeScript, and styled using Tailwind CSS.

## Project Structure & Main Components

- **App.tsx**: The main layout and theme switcher (light/dark mode).
- **CharacterList.tsx**: Shows a paginated table of characters. Click a row to see more details.
- **CharacterDetails.tsx**: Shows detailed information about a selected character.
- **router.tsx**: Handles navigation between the character list and details views.

## Tech Stack

- React + TypeScript
- @tanstack/react-query for data fetching and caching
- @tanstack/react-router for routing
- @tanstack/react-table for the character table
- Tailwind CSS for styling

## How to Run the Project

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set up environment:
   - Create a `.env` file in the root with:
     ```
     REACT_APP_API_URL=https://rickandmortyapi.com/api
     ```
3. Start the development server:
   ```bash
   npm start
   ```
   The app will open at [http://localhost:3000](http://localhost:3000)

4. Run tests:
   ```bash
   npm test
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## Features

- Browse all Rick and Morty characters
- Paginated table with images and quick info
- Click a character for full details
- Responsive design and dark mode support
- Fast, modern UI with real-time API data

---

Made with ❤️ for Rick and Morty fans!
