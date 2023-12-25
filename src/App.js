import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './FrontEnd/Home';
import SellerMarketPlace from './FrontEnd/SellerMarketPlace';
import FreeLancerMarketPlace from './FrontEnd/FreeLancerMarketPlace';
import Profile from './FrontEnd/Profile';
import LoginPage from './FrontEnd/Login';
import Register from './FrontEnd/Register';
import PurchasedProduct from './FrontEnd/PurchasedProduct';
function App() {
  return (
  
      <div>
        
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/SellerMarketPlace" element={<SellerMarketPlace />} />
          <Route path="/FreeLancerMarketPlace" element={<FreeLancerMarketPlace />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/PurchasedProduct" element={<PurchasedProduct />} />

        </Routes>
      </div>
   
  );
}

export default App;