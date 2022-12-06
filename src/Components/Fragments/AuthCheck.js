import React, {useMemo} from 'react'
import {useSelector} from "react-redux";
import {Navigate} from "react-router";
function AuthCheck({children}){
   let auth =  useSelector(state=>state.auth)
    const handleCheckAuth=()=>{
       return auth.user?.id
    }
    const cachedValue = useMemo(handleCheckAuth,[auth])
    return cachedValue?children:<Navigate to={'/'}/>
}
export default AuthCheck
