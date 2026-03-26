import { useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Avatar from "../components/Avatar";

function Profile() {

  const userData = JSON.parse(localStorage.getItem("user"));

  const [image, setImage] = useState(null);

  const [user, setUser] = useState(userData);


  const uploadImage = async () => {

    if(!image) return alert("Select image first");


    const formData = new FormData();

    formData.append("image", image);

    formData.append("userId", user._id);


    try{

      const res = await axios.post(

        "http://localhost:5000/api/upload/profile",

        formData

      );


      localStorage.setItem("user", JSON.stringify(res.data));

      setUser(res.data);


      alert("Profile photo updated 🎉");

    }

    catch(error){

      alert("Upload failed");

    }

  };


  return (

    <div className="bg-gray-100 min-h-screen">

      <Navbar />


      <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow">

        <div className="flex flex-col items-center gap-3">


          <Avatar
            name={user.name}
            image={user.profilePic}
          />


          <h2 className="text-xl font-bold">

            {user.name}

          </h2>


          <p className="text-gray-500">

            {user.email}

          </p>


          <input
            type="file"
            onChange={(e)=>setImage(e.target.files[0])}
            className="mt-3"
          />


          <button
            onClick={uploadImage}
            className="bg-blue-500 text-white px-4 py-1 rounded-lg"
          >

            Change Photo

          </button>


        </div>

      </div>

    </div>

  );

}

export default Profile;