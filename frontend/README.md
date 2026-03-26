import { useEffect, useState } from "react";

import {
  getPlans,
  joinPlan,
  withdrawPlan,
  deletePlan
} from "../api/plan";

import { Link } from "react-router-dom";

import Avatar from "../components/Avatar";
import Navbar from "../components/Navbar";


function Home() {

  const [plans, setPlans] = useState([]);

  const [filter, setFilter] = useState("all");

  const [tab, setTab] = useState("all");


  const user = JSON.parse(localStorage.getItem("user"));


  useEffect(() => {

    fetchPlans();

  }, []);


  const fetchPlans = async () => {

    try {

      const res = await getPlans();

      setPlans(res.data);

    }

    catch (error) {

      console.log(error);

    }

  };


  const handleJoin = async (planId) => {

    await joinPlan(planId, user._id);

    fetchPlans();

  };


  const handleWithdraw = async (planId) => {

    await withdrawPlan(planId, user._id);

    fetchPlans();

  };


  const handleDelete = async (planId) => {

    await deletePlan(planId);

    fetchPlans();

  };


  return (

    <div className="bg-gray-100 min-h-screen">

      <Navbar />


      <div className="max-w-xl mx-auto mt-6">


        {/* TABS */}

        <div className="flex gap-3 mb-4">

          <button
            onClick={()=>setTab("all")}
            className={`px-3 py-1 rounded ${
              tab==="all"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
            }`}
          >
            All Plans
          </button>


          <button
            onClick={()=>setTab("created")}
            className={`px-3 py-1 rounded ${
              tab==="created"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
            }`}
          >
            My Plans
          </button>


          <button
            onClick={()=>setTab("joined")}
            className={`px-3 py-1 rounded ${
              tab==="joined"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
            }`}
          >
            Joined
          </button>

        </div>


        {/* FILTER */}

        <div className="flex gap-2 mb-4">

          <button
            onClick={()=>setFilter("all")}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            All
          </button>


          <button
            onClick={()=>setFilter("girls")}
            className="px-3 py-1 bg-pink-200 rounded"
          >
            Girls
          </button>


          <button
            onClick={()=>setFilter("boys")}
            className="px-3 py-1 bg-blue-200 rounded"
          >
            Boys
          </button>


          <button
            onClick={()=>setFilter("anyone")}
            className="px-3 py-1 bg-green-200 rounded"
          >
            Anyone
          </button>

        </div>


        {/* PLANS */}

        {plans

        .filter(plan => {

          // filter by group type
            const planDate = new Date(plan.dateTime);
            const now = new Date();

            // hide past plans
            if(planDate < now){
              return false;
            }

            // group filter
            if(filter !== "all" && plan.groupType !== filter){
              return false;
            }


          // tab filtering

          if(tab === "created"){

            return plan.createdBy?._id === user._id;

          }


          if(tab === "joined"){

            return plan.participants.some(

              p => p._id === user._id

            );

          }


          return true;

        })


        .map(plan => {


          const alreadyJoined =

          plan.participants.some(

            p => p._id === user._id

          );


          const isCreator =

          plan.createdBy?._id === user._id;


          return (

            <div
              key={plan._id}
              className="bg-white rounded-2xl shadow-md p-5 mb-5"
            >


              {/* CREATOR */}

              <div className="flex items-center gap-3 mb-3">

                <Avatar
                  name={plan.createdBy?.name}
                  image={plan.createdBy?.profilePic}
                />


                <div>

                  <p className="font-semibold">

                    {plan.createdBy?.name || "User"}

                  </p>


                  <p className="text-xs text-gray-500">

                    {new Date(plan.createdAt).toLocaleString()}

                  </p>

                </div>

              </div>


              {/* PLAN IMAGE */}

              {plan.image && (

                <img
                  src={plan.image}
                  alt="plan"
                  className="w-full h-48 object-cover rounded-xl mb-3"
                />

              )}


              {/* PLAN DETAILS */}

              <h2 className="text-lg font-bold">

                {plan.title}

              </h2>


              <p className="text-gray-600 mb-2">

                {plan.description}

              </p>


              <div className="text-sm text-gray-500">

                📍 {plan.location}

              </div>


              <div className="text-sm text-gray-500">

                🕒 {plan.dateTime}

              </div>


              <div className="text-sm font-medium mt-2">

                Group: {plan.groupType}

              </div>


              {/* PARTICIPANTS */}

              <div className="text-sm text-gray-500 mt-2">

                👥 {plan.participants.length} joined

              </div>


              <div className="flex flex-wrap gap-2 mt-2">

                {plan.participants.map(p => (

                  <span
                    key={p._id}
                    className="text-xs bg-gray-200 px-2 py-1 rounded-full"
                  >

                    {p.name}

                  </span>

                ))}

              </div>


              {/* BUTTONS */}

              <div className="flex gap-2 mt-4">


                {

                alreadyJoined ? (

                  <button
                    onClick={()=>handleWithdraw(plan._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg"
                  >

                    Withdraw

                  </button>

                )

                :

                (

                  <button
                    onClick={()=>handleJoin(plan._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded-lg"
                  >

                    Join

                  </button>

                )

                }


                <Link
                  to={`/chat/${plan._id}`}
                  className="bg-purple-500 text-white px-3 py-1 rounded-lg"
                >

                  Chat

                </Link>


                {

                isCreator && (

                  <button
                    onClick={()=>handleDelete(plan._id)}
                    className="bg-black text-white px-3 py-1 rounded-lg"
                  >

                    Delete

                  </button>

                )

                }


              </div>

            </div>

          );

        })}


        {/* CREATE BUTTON */}

        <Link
          to="/create"
          className="fixed bottom-6 right-6 bg-blue-500 text-white px-5 py-3 rounded-full shadow-lg"
        >

          +

        </Link>


      </div>

    </div>

  );

}


export default Home;