import { useState } from "react";
import { createPlan } from "../api/plan";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function CreatePlan() {

  const navigate = useNavigate();

  const [image, setImage] = useState(null);

  const [formData, setFormData] = useState({

    title: "",
    description: "",
    location: "",
    dateTime: "",
    groupType: "anyone"

  });


  const handleChange = (e) => {

    setFormData({

      ...formData,
      [e.target.name]: e.target.value

    });

  };


const handleSubmit = async () => {

  try{

    const user = JSON.parse(localStorage.getItem("user"));

    const data = new FormData();

    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("location", formData.location);
    data.append("dateTime", formData.dateTime);
    data.append("groupType", formData.groupType);
    data.append("image", image);

    // VERY IMPORTANT
    data.append("createdBy", user._id);

    await createPlan(data);

    alert("Plan created 🎉");

    navigate("/home");

  }

  catch(error){

    alert("Error creating plan");

  }

};


  return (

    <div className="bg-gray-100 min-h-screen">

      <Navbar />

      <div className="p-6 max-w-xl mx-auto bg-white mt-6 rounded-xl shadow">

        <h2 className="text-2xl font-bold mb-4">

          Create Plan

        </h2>


        {/* image upload */}

        <input

          type="file"

          onChange={(e)=>setImage(e.target.files[0])}

          className="mb-3"

        />


        <input

          name="title"

          placeholder="Title"

          onChange={handleChange}

          className="w-full mb-3 p-2 border rounded-lg"

        />


        <textarea

          name="description"

          placeholder="Description"

          onChange={handleChange}

          className="w-full mb-3 p-2 border rounded-lg"

        />


        <input

          name="location"

          placeholder="Location"

          onChange={handleChange}

          className="w-full mb-3 p-2 border rounded-lg"

        />


        <input

          type="datetime-local"

          name="dateTime"

          onChange={handleChange}

          className="w-full mb-3 p-2 border rounded-lg"

        />


      <select
      name="groupType"
      onChange={handleChange}
      className="w-full mb-3 p-2 border rounded-lg"
      >

      <option value="anyone">Anyone</option>

      <option value="boys">Boys</option>

      <option value="girls">Girls</option>

      </select>


        <button

          onClick={handleSubmit}

          className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full"

        >

          Post Plan

        </button>

      </div>

    </div>

  );

}

export default CreatePlan;