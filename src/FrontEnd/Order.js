import Navebar from '../Components/Navebar';

function Orders() {
      // Retrieve the token from localStorage
      const token = localStorage.getItem('token');
    return (
      <>
      <div>
        <Navebar />
      </div>
    <div>
      
      <h1>ORDER PAGE</h1>
      <p>Token: {token}</p>
    </div>
    </>
    );
  }
  export default Orders;