import React, { useState, useEffect } from 'react';
import { Outlet } from '@tanstack/react-router';
import './App.css';

export default function App() {
  const [dark, setDark] = useState(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200/80 via-gray-400/60 to-gray-600/80 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <header className="flex items-center justify-between px-6 py-4 shadow dark:shadow-lg bg-white/40 dark:bg-gray-800/40 backdrop-blur-md rounded-b-2xl border-b border-white/30 dark:border-gray-700/40">
        <h1 className="text-2xl font-bold tracking-tight drop-shadow-lg text-gray-800 dark:text-white">Rick and Morty Characters</h1>
        <button
          className="rounded px-3 py-1 bg-gray-200/70 dark:bg-gray-700/70 text-gray-800 dark:text-white hover:bg-gray-300/80 dark:hover:bg-gray-600/80 transition backdrop-blur-md"
          onClick={() => setDark((d) => !d)}
        >
          {dark ? 'Dark' : 'Light'}
        </button>
      </header>
      <main className="max-w-5xl mx-auto p-4 mt-8 bg-white/40 dark:bg-gray-800/40 rounded-2xl shadow-xl backdrop-blur-md border border-white/30 dark:border-gray-700/40 text-gray-800 dark:text-white">
        <Outlet />
      </main>
    </div>
  );
}