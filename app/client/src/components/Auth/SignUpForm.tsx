import { NavBar } from "../Exercise/parts/NavBar";
import { Signup } from "../../services/user/signup";

import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import Swal from 'sweetalert2';


export default () => {

    const [FormData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData({
            ...FormData,
            [name]: value
        })
    }

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        const signup = await Signup(FormData);

        if(signup){

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Sign Up Successful!",
                showConfirmButton: false,
                timer: 1500
            }); 
    
            setTimeout(() => {
              navigate("/auth/login"); 
            }, 1500)
        }

      }

    return(

        <>
    
          <NavBar />
    
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-24 lg:px-8">
    
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              
                  <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                   Sign Up to FitPlanner
                  </h2>
                  
                </div>
    
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm flex flex-col">
    
              <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
    
                <div>
    
                  <label htmlFor="fname" className="block text-sm font-medium leading-6 text-gray-900">
                    First Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="fname"
                      name="firstName"
                      type="text"
                      autoComplete="fname"
                      onChange={handleInputChange}
                      
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
    
                </div>
    
                <div>
    
                  <div className="flex items-center justify-between">
    
                    <label htmlFor="lname" className="block text-sm font-medium leading-6 text-gray-900">
                      Last Name
                    </label>

                  </div>
    
                  <div className="mt-2">
                    <input
                      id="lname"
                      name="lastName"
                      type="text"
                      onChange={handleInputChange}
                      autoComplete="lname"
                      
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
    
                </div>


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
    
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="password"
                      onChange={handleInputChange}
                      
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
    
                </div>
    
                <div>
    
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm font-bold leading-6 text-white shadow-sm hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign up
                  </button>
    
                </div>
    
              </form><br />

              <a href="/exercises"><button className="bg-slate-800 text-white font-bold p-2 rounded-md w-full">
                      Cancel
                    </button></a>
    
            </div>
    
          </div>
        </>
        )
}