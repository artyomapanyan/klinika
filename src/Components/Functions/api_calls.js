import {useEffect, useState} from "react";
import axios from "axios";
import api from "../../Api";
import {useSelector} from "react-redux";

export const useGetResourceIndex = (resource,params, isInited = false ,needsInit=false,resourceData) => {
    const [loading, setLoading] = useState(false)
    const [data,setData] = useState({
        items:[],
        pagination:{
            pageSize:15,
            current:1,
            total:5,
            last_page:1
        }
    })
    let token = useSelector((state) => state.auth.token);
    useEffect(()=>{
        if(resource && !resourceData){
            if(needsInit && !isInited){
                return;
            }
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
                            pageSize:15,
                            current:response.current_page,
                            total:response.total_items,
                            last_page:response.last_page
                        }
                    })
                }


            }).finally(()=>{
                setLoading(false)
            })
        }else if(resourceData){
            setData({
                items:resourceData,
                pagination:{
                    pageSize:15,
                    current:1,
                    total:5,
                    last_page:1
                }
            })
        }

    }, [resource,params,token,isInited,needsInit])

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
export const useGetResourceSingle = (resource,id,additionals={
},filterResponse = null)=>{
    const [loading, setLoading] = useState(true)
    const [data,setData] = useState({})
    const [addData,setAddData] = useState({})
    let token = useSelector((state) => state.auth.token);
    useEffect(()=>{
        setLoading(true)
        let dataResources  =Object.keys(additionals);
        Promise.all([
            id?axios.request({
                url:api[resource].single.url+id,
                method:api[resource].single.method,
                headers: {
                    'Authorization': token,
                }
            }):{},
            ...dataResources.map(resourceKey=>axios.request({
                url:api[resourceKey].list.url,
                method:api[resourceKey].list.method,
                params:additionals[resourceKey],
                headers: {
                    'Authorization': token,
                }
            }))
        ]).then(responses=>{
            let response = responses[0]
            if(response?.id){
                if(filterResponse){
                    response = filterResponse(response)
                }
                setData(response)
            }else{
                setData({})
            }
            if(dataResources.length){
                let dataObj = {}
                dataResources.forEach((e,key)=>{
                    dataObj[e] = responses[key+1]
                })
                setAddData(dataObj)
            }
        }).finally(()=>{
            setTimeout(()=>{
                setLoading(false)
            })
        })

    }, [resource,id,token])

    const loadingState = {
        loading,
        setLoading
    }
    const dataState = {
        data,
        setData
    }
    const addDataState = {
        addData,
        setAddData
    }

    return {loadingState,dataState,addDataState}
}

function hGOD(formData,name,object){
    Object.keys(object).forEach(key=>{
        if(typeof object[key]==='object'){
            hGOD(formData,name+'['+key+']',object[key])
        }else{
            formData.append(name+'['+key+']',object[key])
        }
    })

}
function handleGenerateFD(values,method){
    let formData = new FormData();
    if(method){
        formData.append('_method',method)
    }
    for (const name in values) {
        if(Array.isArray(values[name])){
            values[name].map(e=>formData.append(name+'[]', e))
        }else{
            if(name.includes('_deleted')){
                if(values[name]){
                    formData.append(name, values[name]);
                }
            }else{
                values[name] = values[name]===true?1:values[name]===false?0: values[name]
                if(typeof values[name] === "object"){
                    hGOD(formData,name,values[name])
                }else{
                    formData.append(name, values[name]);
                }

            }

        }
    }
    return formData
}
export const updateResource = (resource,id,values,token,withFormData=false)=>{
    let formData = {}
    if(withFormData){
        formData = handleGenerateFD(values,"PUT")
    }else{
        formData = values;
    }

    return  axios.request({
            url:api[resource].update.url+id,
            method:withFormData?'POST':api[resource].update.method,
            data:formData,
            headers: {
                'Authorization': token,
            }
        })
}
export const deleteResource = (resource,id,token)=>{
    return  axios.request({
        url:api[resource].delete.url+id,
        method:api[resource].delete.method,
        headers: {
            'Authorization': token,
        }
    })
}
export const postResource = (resource,param,token,id=null,params)=>{
    const method = api[resource][param].method;

    return  axios.request({
        url:`${api[resource][param].url}${id??''}`,
        method,
    ...(method!=='GET'?{
        data:params
    }:{params}),
        headers: {
            'Authorization': token,
        }
    })
}
export const createResource = (resource,values,token,withFormData=false)=>{
    let formData = {}
    if(withFormData){
        formData =  handleGenerateFD(values,null)
    }else{
        formData = values;
    }
    return  axios.request({
        url:api[resource].create.url,
        method:api[resource].create.method,
        data:formData,
        headers: {
            'Authorization': token,
        }
    })
}
