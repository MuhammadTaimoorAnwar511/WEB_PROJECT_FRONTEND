import Navebar from '../Components/Navebar';

function Home() {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');
    return (
      <>
      <div>
        <Navebar />
      </div>
    <div>
      
      <h1>HOME PAGE</h1>
      {/* <p>Token: {token}</p> */}
    </div>
    </>
    );
  }
  export default Home;