import Navebar from '../Components/Navebar';

function Dashboard() {
      // Retrieve the token from localStorage
      const token = localStorage.getItem('token');
    return (
      <>
      <div>
        <Navebar />
      </div>
    <div>
      
      <h1>Dashboard PAGE</h1>
      <p>Token: {token}</p>
    </div>
    </>
    );
  }
  export default Dashboard;