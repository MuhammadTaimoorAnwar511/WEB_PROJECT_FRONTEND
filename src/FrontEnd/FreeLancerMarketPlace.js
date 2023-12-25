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
        < FreeLancerCard />
      </div>

    </>
  );
}
export default Orders;