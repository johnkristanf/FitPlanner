import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

import { NavBar } from "../Exercise/parts/NavBar";
import { Login } from "../../services/user/login";

// import { useNavigate } from "react-router-dom";



export default () => {

      const [FormData, setFormData] = useState({
        email: '',
        password: ''

      });

      // const navigate = useNavigate();


      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target;

        setFormData({
          ...FormData,
          [name]: value

        });

      }


      const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        const login = await Login(FormData);

        if(login) window.location.href = "/meal-plans";

      }

      
    return(

    <>

      <NavBar />

    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-24 lg:px-8">

            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                className="mx-auto h-10 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
              />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
               Login to FitPlanner
              </h2>
            </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm flex flex-col">

          <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>

            <div>

              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  onChange={handleInputChange}
                  
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

            </div>

            <div>

              <div className="flex items-center justify-between">

                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>

                <div className="text-sm">
                  <a href="#" className="font-semibold text-orange-500 hover:opacity-75">
                    Forgot password?
                  </a>
                </div>
              </div>

              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleInputChange}
                  autoComplete="current-password"
                  
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

            </div>

            <div>

              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm font-bold leading-6 text-white shadow-sm hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>

            </div>

          </form>


            <div className="self-center text-center w-full mt-10">

                <h1 className="mb-4 font-semibold">Login with your Social Media Accounts</h1>

                    <a href="https://fitplanner-server.onrender.com/auth/google"><button className="bg-slate-800 text-white font-bold p-2 rounded-md w-full">
                      <FontAwesomeIcon icon={faGoogle} className="mr-2"/> 
                      Login using Google

                    </button></a>
            </div>

        </div>

      </div>
    </>
    )
}