import React from 'react';
import {Route, Routes} from "react-router";
import Login from "./Auth/Login";
import AppLayout from "./AppLayout";
import {useSelector} from "react-redux";
import AuthCheck from "./Fragments/AuthCheck";
function AppRoutes(){
    let auth = useSelector(state=>state.auth)
    return(
        <Routes>
            <Route path={'/'} element={<Login/>}></Route>
            <Route path={'dashboard/*'} element={<AuthCheck><AppLayout/></AuthCheck>}></Route>
        </Routes>
    )
}
export default AppRoutes
