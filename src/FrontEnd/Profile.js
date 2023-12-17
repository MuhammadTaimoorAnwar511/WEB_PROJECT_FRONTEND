import Navebar from '../Components/Navebar';

function Profile() {
      // Retrieve the token from localStorage
      const token = localStorage.getItem('token');
      return (
        <>
        <div>
          <Navebar />
        </div>
      <div>
        
        <h1>Profile PAGE</h1>
        <p>Token: {token}</p>
      </div>
      </>
      );
    }
export default Profile;  
