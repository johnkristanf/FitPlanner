import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense } from 'react';


const ExerCise = React.lazy(() => import('./components/Exercise/Exercise'));
const MealPlans = React.lazy(() => import('./components/MealPlans/MealPlans'));
const CalorieCalculator = React.lazy(() => import('./components/CalorieCalculator/CalorieCalculator'));

const LoginForm = React.lazy(() => import('./components/Auth/LoginForm'));
const SignupForm = React.lazy(() => import('./components/Auth/SignUpForm'))



const App = () => {

    return(

    <BrowserRouter basename="/">
        
       <Suspense fallback={<div>Loading...</div>}>

            <Routes>
                   <Route path="/" Component={ExerCise} />
                   <Route path="/exercises" Component={ExerCise} />
                   <Route path="/meal-plans" Component={MealPlans} />
                   <Route path="/calorie-calculator" Component={CalorieCalculator} />

                   <Route path="/auth/login" Component={LoginForm} />
                   <Route path="/auth/signup" Component={SignupForm} />

            </Routes>

        </Suspense>

    </ BrowserRouter>
       
    );

}

export default App;