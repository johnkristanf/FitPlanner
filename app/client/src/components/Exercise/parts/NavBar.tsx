import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
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

     <div className="flex gap-10 max-md:flex-col max-md:w-full max-md:mt-5">

          <Link to='/auth/login'><button className="bg-orange-500 rounded-md p-2 text-white hover:opacity-75 max-md:w-full">
            Login
          </button></Link>

          <Link to="/auth/signup"><button className="bg-slate-400 rounded-md p-2 text-white  hover:opacity-75 max-md:w-full">
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

  const [MenuPopUp, setMenuPopup] = useState(false);

  useEffect(() => {

    userData().then((user) => {
      setUserData(user)
      
    });
        
  }, [])
 

  return (

  <>

    <ResponsivePopUp MenuPopUp={MenuPopUp} setMenuPopup={setMenuPopup} />
    

    <nav className="w-full font-bold h-36 absolute top-0 bg-slate-700 
                   flex items-center justify-between px-20 pb-10 pt-1 z-50
                   max-md:hidden">

                 
      
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

  </>
  );

};

const ResponsivePopUp = ({ MenuPopUp, setMenuPopup }: any) => {

  return(
  <>

    <div 
        className='max-md:block text-5xl ml-4 mt-3 hover:opacity-75 hover:cursor-pointer' 
        onClick={() => setMenuPopup(true)}
        >
        <FontAwesomeIcon icon={faBars} />
    </div>  


    { MenuPopUp && <MenuPopUpModal setMenuPopup={setMenuPopup}/> }

      

  </>

  )
}


const MenuPopUpModal = ({ setMenuPopup }: any) => {

  return(

    <div className='max-md:block w-full h-screen bg-slate-800 absolute top-0 z-50'>

          <FontAwesomeIcon 
            className="text-5xl hover:opacity-75 text-white cursor-pointer absolute right-4 top-2"
            icon={faTimes} 
            onClick={() => setMenuPopup(false)}
            />


          <div className="flex flex-col items-center justify-start p-20 h-full gap-10 inset-0">

            <h1 className="text-white text-5xl">
              <FontAwesomeIcon className="text-orange-500" icon={faDumbbell} /> FitPlanner
            </h1>

              <ul className="flex flex-col gap-8 text-white">

                  { menu.map((item) => (

                    <li key={item.name}>

                        <Link
                            to={item.to}

                            className={ item.current ? 'current' 
                               : 'text-lg p-2 rounded-md hover:bg-orange-500 hover:opacity-100'
                            } >

                            {item.name}

                        </Link>

                   </li>

                  ))}

              </ul>

              <AuthButtons />

          </div>
          
      </div>
  )
}
