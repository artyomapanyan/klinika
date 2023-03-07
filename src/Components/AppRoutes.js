import React from 'react';
import {Route, Routes} from "react-router";
import General from "./Auth/General";
import AppLayout from "./AppLayout";
import AuthCheck from "./Fragments/AuthCheck";
import Reset from "./Auth/Reset";
import Forgot from "./Auth/Forgot";
import Login from "./Auth/Login/Login";
import AllOffers from "./AllOffers/AllOffers";

function AppRoutes(){
    return(<Routes>
                <Route path={'/'} element={<General/>}></Route>
                <Route path={'/password/reset/:token'} element={<Reset/>}></Route>
                <Route path={'forgot'} element={<Forgot/>}></Route>
                <Route path={'dashboard/*'} element={<AuthCheck><AppLayout/></AuthCheck>}></Route>
                <Route path={'login'} element={<Login/>}></Route>
                <Route path={'all-offers'} element={<AllOffers/>}></Route>

            </Routes>


    )
}
export default AppRoutes
