import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Home } from './pages/Home';
import GroceryListPage from './pages/Grocery';
import SavedRecipesPage from './pages/Saved';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/grocery" element={<GroceryListPage />} />
        <Route path="/savedrecipes" element={<SavedRecipesPage />} />
      </Routes>
    </>
  );
}

export default App;
