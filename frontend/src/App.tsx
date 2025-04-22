import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import InventoryPage from './pages/InventoryPage';
import EditInventoryPage from './pages/EditInventoryPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/inventory/edit/:id" element={<EditInventoryPage />} />
        <Route path="/inventory/new" element={<EditInventoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
