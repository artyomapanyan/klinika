import React, {useMemo} from 'react'
import {useSelector} from "react-redux";
function PermCheck(permission){
    let user =  useSelector(state=>state.auth.user)
    const handleCheckAuth=()=>{
        if(permission){
            return user?.id && user?.permissions?.includes(permission)
        }else{
            return user?.id
        }

    }


    return useMemo(handleCheckAuth,[user,permission])
}
export default PermCheck
