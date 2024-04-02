
import NavbarUser from "./componentsUser/NavbarUser.jsx";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import {Suspense} from "react";
import React from "react";
const SignUpUser = React.lazy(()=>import ('./componentsUser/SignUpUser.jsx'))
const SignInUser = React.lazy(()=> import ('./componentsUser/SignInUser.jsx'))
function App(){

    return <>
        <BrowserRouter>
            <NavbarUser/>
            <Routes>
                <Route path="/signinuser" element={<Suspense fallback={"...Loding"}><SignInUser/></Suspense> }/>
                <Route path="/signupuser" element={<Suspense fallback={"...Loding"}><SignUpUser/></Suspense> }/>

            </Routes>
        </BrowserRouter>
       
    </>
}

export default App