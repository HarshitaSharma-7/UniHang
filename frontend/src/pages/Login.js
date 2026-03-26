import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../api/auth";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    email: "",
    password: ""

  });


  const handleChange = (e) => {

    setFormData({

      ...formData,
      [e.target.name]: e.target.value

    });

  };


  const handleLogin = async () => {

    try {

      const res = await loginUser(formData);
        localStorage.setItem(
            "user",
            JSON.stringify(res.data.user)
            );
      alert("Login successful 🎉");

   


      navigate("/home");

    } catch (error) {

      alert(error.response?.data?.message || "Login failed");

    }

  };


  return (

    <div className="flex items-center justify-center h-screen">

      <div className="bg-white p-8 rounded-2xl shadow-md w-80">

        <h2 className="text-2xl font-bold mb-4 text-center">

          Login

        </h2>


        <input

          name="email"

          placeholder="Email"

          onChange={handleChange}

          className="w-full mb-3 p-2 border rounded-lg"

        />


        <input

          name="password"

          type="password"

          placeholder="Password"

          onChange={handleChange}

          className="w-full mb-3 p-2 border rounded-lg"

        />


        <button

          onClick={handleLogin}

          className="w-full bg-blue-500 text-white p-2 rounded-lg"

        >

          Login

        </button>


        <p className="text-sm mt-3 text-center">

          Don't have account?

          <Link to="/signup" className="text-blue-500 ml-1">

            Signup

          </Link>

        </p>

      </div>

    </div>

  );

}

export default Login;