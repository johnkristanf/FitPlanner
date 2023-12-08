import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { UserType } from '../../../lib/types/User';
import { userData } from '../../../services/user/fetchUserData'; 


const menu = [
  {
    name: 'Exercises',
    to: '/exercises', 
    current: false,
  },

  {
    name: 'Meal Plans Generator',
    to: '/meal-plans',
    current: false,
  },

  {
    name: 'Calorie Calculator',
    to: '/calorie-calculator',
    current: false,
  }

];


const AuthButtons = () => {

  return(
     <div className="flex gap-10">

          <Link to='/auth/login'><button className="bg-red-500 rounded-md p-2 text-white hover:opacity-75">
            Login
          </button></Link>

          <Link to="/auth/signup"><button className="bg-slate-400 rounded-md p-2 text-white  hover:opacity-75">
            Signup
          </button></Link>

      </div>
  )
}


const RenderUserData = ({ UserData } : any) => {

  return(

    <div className='flex items-center gap-5 w-1/4'>
      <img src={UserData.picture} className='rounded-full w-1/4'/>
      <p className='text-white'>{ UserData.fullname} </p>

    </div>

  )
}

export const NavBar = () => {

  const [UserData, setUserData] = useState<UserType>();

  useEffect(() => {

    userData().then((user) => {
      setUserData(user)
      
    });
        
  }, [])
 

  return (

    <nav className="w-full font-bold h-36 absolute top-0 bg-slate-700 flex items-center justify-between px-20 pb-10 pt-1 z-50">
      
      <div className="Logo&Menu flex flex-col">

        <h1 className="text-white my-10 text-4xl">
          <FontAwesomeIcon className="text-orange-500" icon={faDumbbell} /> FitPlanner

        </h1>

        <ul className="flex gap-8 text-white">

          {menu.map((item) => (

                <li key={item.name}>
                    <Link
                        to={item.to}

                        className={item.current ? 'current' 
                           : 'opacity-75 p-2 rounded-md hover:bg-orange-500 hover:opacity-100'
                        } >

                        {item.name}

                    </Link>

                </li>
          ))}

        </ul>
        
      </div>

     
      { UserData ? <RenderUserData UserData={UserData}/> : <AuthButtons /> }


    </nav>
  );

};
