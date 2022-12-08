import {useEffect, useState} from "react";
import axios from "axios";
import api from "../../Api";
import {useSelector} from "react-redux";

export const useGetResourceIndex = (resource,params) => {
    const [loading, setLoading] = useState(false)
    const [data,setData] = useState({})
    let token = useSelector((state) => state.auth.token);
    useEffect(()=>{
        setLoading(true)
        axios.request({
            url:api[resource].list.url,
            method:api[resource].list.method,
            params:params,
            headers: {
                'Authorization': token,
            }
        }).then(response=>{
            if(response){
                setData({
                    items:response.items,
                    pagination:{
                        pageSize:response.page_items,
                        current:response.current_page,
                        total:response.total_items,
                    }
                })
            }


        }).finally(()=>{
            setLoading(false)
        })
    }, [resource,params])

    const loadingState = {
        loading,
        setLoading
    }

    return {loadingState,data}
}
