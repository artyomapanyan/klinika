import React from 'react';
import {Route, Routes} from "react-router";
import Login from "./Auth/Login";
import AppLayout from "./AppLayout";
import AuthCheck from "./Fragments/AuthCheck";
import Reset from "./Auth/Reset";
import Forgot from "./Auth/Forgot";
function AppRoutes(){
    return(
        <Routes>
            <Route path={'/'} element={<Login/>}></Route>
            <Route path={'/password/reset/:token'} element={<Reset/>}></Route>
            <Route path={'forgot'} element={<Forgot/>}></Route>
            <Route path={'dashboard/*'} element={<AuthCheck><AppLayout/></AuthCheck>}></Route>

        </Routes>
    )
}
export default AppRoutes
