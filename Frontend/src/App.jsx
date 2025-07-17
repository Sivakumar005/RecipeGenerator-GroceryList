import { useState } from 'react'
import {Routes,Route} from 'react-router-dom';
import {Home} from './pages/Home';
import GroceryListPage from './pages/Grocery';

function App() {
  

  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/grocery' element={<GroceryListPage/>}/>
    </Routes>
  )
}

export default App
