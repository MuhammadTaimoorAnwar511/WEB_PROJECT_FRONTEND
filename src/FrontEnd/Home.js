import Navebar from '../Components/Navebar';
import ProjectCard from '../Components/Home/ProjectCard'
function Home() {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');
    return (
      <>
      <div>
        <Navebar />
      </div>
    <div>
      <ProjectCard />
    </div>
    </>
    );
  }
  export default Home;