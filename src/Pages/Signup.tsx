import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const response = await fetch("https://dishdash-backend-v9is.onrender.com/api/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation }),
    });

    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Enter valid credentials");
    }
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
      <div className="absolute top-0 left-0 w-full h-full">
        <span className="absolute bg-blue-500 rounded-full w-96 h-96 -top-16 -left-16 opacity-30 z-0"></span>
        <span className="absolute bg-blue-700 rounded-full w-48 h-48 top-24 left-24 opacity-20 z-0"></span>
      </div>
      <div className="bg-white shadow-lg rounded-lg flex overflow-hidden w-full max-w-4xl relative z-10">
        <div className="w-full md:w-1/2 p-8">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <h1 className="text-2xl font-semibold mb-4">Create Account</h1>
            <input type="text" placeholder="Name" name="name" value={credentials.name} onChange={onChange} className="p-2 border border-gray-300 rounded z-10" />
            <input type="email" placeholder="Email" name="email" value={credentials.email} onChange={onChange} className="p-2 border border-gray-300 rounded z-10" />
            <input type="password" placeholder="Password" name="password" value={credentials.password} onChange={onChange} className="p-2 border border-gray-300 rounded z-10" />
            <input type="text" placeholder="Address" name="geolocation" value={credentials.geolocation} onChange={onChange} className="p-2 border border-gray-300 rounded z-10" />
            <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 z-10">Sign Up</button>
          </form>
        </div>
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-tr from-blue-500 to-blue-700 text-white p-8 items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Welcome Back!</h1>
            <p className="mt-2">To keep connected with us please login with your personal info</p>
            <Link to="/signin" className="mt-4 bg-white text-blue-700 p-2 rounded hover:bg-gray-100">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
