import Navebar from '../Components/Navebar';
import SellerCard from '../Components/Seller/SellerCard';

function Dashboard() {
      // Retrieve the token from localStorage
      const token = localStorage.getItem('token');
    return (
      <>
      <div>
        <Navebar />
      </div>
    <div>
      <SellerCard/>
      
    </div>
    </>
    );
  }
  export default Dashboard;