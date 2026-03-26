import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signupUser } from "../api/auth";

function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    name: "",
    email: "",
    password: ""

  });


  const handleChange = (e) => {

    setFormData({

      ...formData,
      [e.target.name]: e.target.value

    });

  };


  const handleSubmit = async () => {

    try {

       await signupUser(formData);

      alert("Signup successful 🎉");

      navigate("/");

    } catch (error) {

  console.log(error.response);

  alert(error.response?.data?.message || "Signup failed");

}

  };


  return (

    <div className="flex items-center justify-center h-screen">

      <div className="bg-white p-8 rounded-2xl shadow-md w-80">

        <h2 className="text-2xl font-bold mb-4 text-center">

          Signup

        </h2>


        <input

          name="name"

          placeholder="Name"

          onChange={handleChange}

          className="w-full mb-3 p-2 border rounded-lg"

        />


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

          onClick={handleSubmit}

          className="w-full bg-green-500 text-white p-2 rounded-lg"

        >

          Create account

        </button>


        <p className="text-sm mt-3 text-center">

          Already have account?

          <Link to="/" className="text-blue-500 ml-1">

            Login

          </Link>

        </p>

      </div>

    </div>

  );

}

export default Signup;