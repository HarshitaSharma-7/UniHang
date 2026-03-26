import { Link, useNavigate } from "react-router-dom";

import Avatar from "./Avatar";

import { useEffect, useState } from "react";

import { getNotifications } from "../api/notification";


function Navbar() {

  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));


  const logout = () => {

    localStorage.removeItem("user");

    navigate("/");

  };


  useEffect(() => {

    fetchNotifications();

  }, []);


  const fetchNotifications = async () => {

    try{

      const res = await getNotifications(user._id);

      setNotifications(res.data);

    }

    catch(error){

      console.log(error);

    }

  };


  return (

    <div className="bg-white shadow-md px-6 py-3 flex justify-between items-center">

      
      {/* APP NAME */}

      <h1 className="text-xl font-bold text-blue-600">

        UniHang

      </h1>


      {/* NAV LINKS */}

      <div className="flex items-center gap-4">


        <Link to="/home">

          Home

        </Link>


        <Link to="/create">

          Create

        </Link>


        <Link to="/profile">

          Profile

        </Link>


        {/* NOTIFICATION ICON */}

        <div className="relative">

          <span className="text-xl">

            🔔

          </span>


          {

          notifications.length > 0 && (

            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">

              {notifications.length}

            </span>

          )

          }

        </div>


        {/* USER AVATAR */}

        <Avatar

          name={user?.name}

          image={user?.profilePic}

        />


        {/* LOGOUT */}

        <button

          onClick={logout}

          className="text-red-500"

        >

          Logout

        </button>


      </div>


    </div>

  );

}


export default Navbar;