import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link , useNavigate  } from 'react-router-dom';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const navigate=useNavigate();

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    const response = await fetch('https://dishdash-backend-v9is.onrender.com/api/signinUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();
    console.log(json);
    if (json.success) {
      setName(json.name);  // Assuming the response contains a `name` field
      setIsLoggedIn(true);
      console.log(email);
      localStorage.setItem("email",email);
      localStorage.setItem("token",json.token);
      navigate("/");

    } else {
      alert('Enter valid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
      <div className="absolute top-0 left-0 w-full h-full">
        <span className="absolute bg-blue-500 rounded-full w-96 h-96 -top-16 -left-16 opacity-30 z-0"></span>
        <span className="absolute bg-blue-700 rounded-full w-48 h-48 top-24 left-24 opacity-20 z-0"></span>
      </div>
      <div className="bg-white shadow-lg rounded-lg flex overflow-hidden w-full max-w-4xl relative z-10">
        <div className="w-full md:w-1/2 p-8">
          {isLoggedIn ? (
            <div className="text-center">
              <h1 className="text-2xl font-semibold mb-4">Welcome, {name}!</h1>
              <p className="text-gray-600">You are now logged in.</p>
            </div>
          ) : (
            <form onSubmit={handleSignIn} className="flex flex-col space-y-4">
              <h1 className="text-2xl font-semibold mb-4">Sign in</h1>
              
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 border border-gray-300 rounded z-10"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 border border-gray-300 rounded z-10"
              />
              <a href="#" className="text-blue-500 text-sm text-right">Forgot your password?</a>
              <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 z-10">Sign In</button>
            </form>
          )}
        </div>
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-tr from-blue-500 to-blue-700 text-white p-8 items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Hello, Friend!</h1>
            <p className="mt-2">Enter your personal details and start your journey with us</p>
            <Link to="/signup" className="mt-4 bg-white text-blue-700 p-2 rounded hover:bg-gray-100">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
