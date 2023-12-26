import Navebar from '../Components/Navebar';
import SellerCard from '../Components/Seller/SellerCard';

function Dashboard() {
  // Retrieve the token from localStorage
  return (
    <>
      <div>
        <Navebar />
      </div>
      <div style={{ background: 'linear-gradient(to right, #000000, #3533CD)', padding: '20px', minHeight: '15vh', fontFamily: 'Arial, sans-serif', color: '#ffffff', }}>
        <SellerCard />
      </div>
    </>
  );
}
export default Dashboard;