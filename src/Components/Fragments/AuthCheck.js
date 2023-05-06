import React, {useMemo} from 'react'
import {useSelector} from "react-redux";
import {Navigate} from "react-router";
function AuthCheck({children,permission,roleKey}){
   let auth =  useSelector(state=>state.auth)
    const handleCheckAuth=()=>{
       if(permission){
           return auth.user?.id && auth.user?.permissions?.includes(permission)
       }else if(roleKey){
           return auth.selected_role.key===roleKey
       }else{
           return auth.user?.id
       }

    }
    const cachedValue = useMemo(handleCheckAuth,[auth,permission])

    return cachedValue?children: auth.user?.id?<Navigate to={'/dashboard'}/>:<Navigate to={'/login'}/>
}
export default AuthCheck
