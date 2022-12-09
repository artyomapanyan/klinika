import {useCallback, useEffect, useState} from "react";
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
export const useGetResourceSingle = (resource,id)=>{
    const [loading, setLoading] = useState(false)
    const [data,setData] = useState({})
    let token = useSelector((state) => state.auth.token);
    useEffect(()=>{
        if(id){
            setLoading(true)
            axios.request({
                url:api[resource].single.url+id,
                method:api[resource].single.method,
                headers: {
                    'Authorization': token,
                }
            }).then(response=>{
                if(response){
                    setData(response)
                }


            }).finally(()=>{
                setLoading(false)
            })
        }else{
            setData({})
        }

    }, [resource,id])

    const loadingState = {
        loading,
        setLoading
    }
    const dataState = {
        data,
        setData
    }

    return {loadingState,dataState}
}
export const updateResource = (resource,id,values,token)=>{
    return  axios.request({
            url:api[resource].update.url+id,
            method:api[resource].update.method,
            data:values,
            headers: {
                'Authorization': token,
            }
        })
}
export const createResource = (resource,values,token)=>{
    return  axios.request({
        url:api[resource].create.url,
        method:api[resource].create.method,
        data:values,
        headers: {
            'Authorization': token,
        }
    })
}
