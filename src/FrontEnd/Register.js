import React , { useState }from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/client/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          FullName: fullName,
          Email: email,
          Password: password,
        }),
      });

      // Check if the registration was successful based on the response status
      if (response.ok) {
        const data = await response.json();
        console.log('Registration successful:', data);

        // Redirect to the home page or any other page after successful registration
        navigate('/');
      } else {
        console.error('Registration failed:', response.statusText);
        // Handle registration failure (e.g., show an error message to the user)
      }
    } catch (error) {
      console.error('Error during registration:', error);
      // Handle any unexpected error during registration
    }
  };


  return (
    <section className="vh-100" style={{ backgroundColor: '#9A616D' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: '1rem' }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: '1rem 0 0 1rem' }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
                        <span className="h1 fw-bold mb-0">SASTA FIVERR</span>
                      </div>
                      <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>
                        Signup your account
                      </h5>
                      <div className="form-outline mb-4">
                        <input type="text" id="form2ExampleUsername" className="form-control form-control-lg" value={fullName}   onChange={(e) => setFullName(e.target.value)} />
                        <label className="form-label" htmlFor="form2ExampleUsername">
                          Fullname
                        </label>
                      </div>
                      <div className="form-outline mb-4">
                        <input type="email" id="form2ExampleEmail" className="form-control form-control-lg"    value={email}   onChange={(e) => setEmail(e.target.value)} />
                        <label className="form-label" htmlFor="form2ExampleEmail">
                          Email address
                        </label>
                      </div>
                      <div className="form-outline mb-4">
                        <input type="password" id="form2ExamplePassword" className="form-control form-control-lg" value={password}   onChange={(e) => setPassword(e.target.value)} />
                        <label className="form-label" htmlFor="form2ExamplePassword">
                          Password
                        </label>
                      </div>
                      <div className="pt-1 mb-4">
                        <button className="btn btn-dark btn-lg btn-block" type="button" onClick={handleRegistration}>
                          Register
                        </button>
                      </div>                      
                      <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                      Already have an account? {' '}
                        <Link to="/" style={{ color: '#393f81' }}>
                        Sign in here
                        </Link>
                      </p>
                      <a href="#!" className="small text-muted">
                        Terms of use.
                      </a>
                      <a href="#!" className="small text-muted">
                        Privacy policy
                      </a>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationPage;
