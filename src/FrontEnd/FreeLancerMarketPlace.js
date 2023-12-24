import Navebar from '../Components/Navebar';
import FreeLancerCard from '../Components/FreeLancer/FreeLancerCard';
function Orders() {
  // Retrieve the token from localStorage
  const token = localStorage.getItem('token');
  // <p>Token: {token}</p>
  return (
    <>
      <div>
        <Navebar />
      </div>
      <div>
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" style={{ width: '200px', marginBottom: '10px', marginTop: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px', transition: 'border-color 0.3s ease-in-out', }} />
      </div>
      <div>
        <h2 style={{ borderTop: '2px solid #ccc', padding: '10px' }} >FreeLancerMarketPlace</h2>
      </div>
      <div>
        < FreeLancerCard />
      </div>

    </>
  );
}
export default Orders;