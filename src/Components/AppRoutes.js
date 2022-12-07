import React from 'react';
import {Route, Routes} from "react-router";
import Login from "./Auth/Login";
import AppLayout from "./AppLayout";
import {useSelector} from "react-redux";
import AuthCheck from "./Fragments/AuthCheck";
import Reset from "./Auth/Reset";
function AppRoutes(){
    let auth = useSelector(state=>state.auth)
    return(
        <Routes>
            <Route path={'/'} element={<Login/>}></Route>
            <Route path={'/password/reset/:token'} element={<Reset/>}></Route>
            <Route path={'dashboard/*'} element={<AuthCheck><AppLayout/></AuthCheck>}></Route>
        </Routes>
    )
}
export default AppRoutes
