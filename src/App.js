import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './FrontEnd/Home';
import Dashboard from './FrontEnd/Dashboard';
import Order from './FrontEnd/Order';
import Profile from './FrontEnd/Profile';
import LoginPage from './FrontEnd/Login';
import Register from './FrontEnd/Register';

function App() {
  return (
  
      <div>
        
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
   
  );
}

export default App;