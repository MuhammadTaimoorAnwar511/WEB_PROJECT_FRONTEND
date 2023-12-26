import Navebar from '../Components/Navebar';
import FreeLancerCard from '../Components/FreeLancer/FreeLancerCard';
function Orders() {
  
  return (
    <>
      <div>
        <Navebar />
      </div>
      <div style={{ background: 'linear-gradient(to right, #000000, #3533CD)', padding: '20px', minHeight: '15vh', fontFamily: 'Arial, sans-serif', color: '#ffffff', }}>
    
        < FreeLancerCard />
      </div>

    </>
  );
}
export default Orders;