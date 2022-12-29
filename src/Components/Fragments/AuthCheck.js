import React, {useMemo} from 'react'
import {useSelector} from "react-redux";
import {Navigate} from "react-router";
function AuthCheck({children,permission}){
   let auth =  useSelector(state=>state.auth)
    const handleCheckAuth=()=>{
       if(permission){
           return auth.user?.id && auth.user?.permissions?.includes(permission)
       }else{
           return auth.user?.id
       }

    }
    const cachedValue = useMemo(handleCheckAuth,[auth,permission])

    return cachedValue?children:<Navigate to={'/'}/>
}
export default AuthCheck
