import React, {useEffect, useRef, useState} from 'react'
import {Select, Spin} from "antd";
import {useGetResourceIndex} from "../Functions/api_calls";

function ResourceSelectPaginated({initialData = [], resource}) {
    const timeout = useRef(null);
    const [params, setParams] = useState({page:1})
    const [localData, setLocalData] = useState([])

    const {loadingState, dataState} = useGetResourceIndex(resource, params)
    const {loading, setLoading} = loadingState;
    const {data, setData} = dataState;
    const handleGenerateOptions = (data) => {
        return data.map(item => {
            return <Select.Option key={item.id} value={item.id} name={item.name}>{item.name}</Select.Option>
        })
    }
    useEffect(()=>{
        setLocalData([...localData,...(data?.items??[])])
    },[data])

    const handleScroll = (event) => {
        let target = event.target
        if (target.scrollTop + target.offsetHeight === (target.scrollHeight)) {
            if(timeout.current){
                clearTimeout(timeout.current)
            }
            if(data.pagination.last_page>=params.page+1){
                timeout.current = setTimeout(()=>{
                    setParams({
                        ...params,
                        page:params.page+1
                    })

                },300)
            }
        }
    }
    const handleSearch = (e)=>{
        if(timeout.current){
            clearTimeout(timeout.current)
        }
        timeout.current = setTimeout(()=>{
            setParams({
                page:1,
                name:e
            })

        },500)

    }
    return <Select loading={loading} onPopupScroll={handleScroll} onSearch={handleSearch} showSearch optionFilterProp={'name'}>
        {handleGenerateOptions(localData ?? [])}
        {loading ? <Select.Option value={999} style={{textAlign: 'center'}} name={params.name}><Spin/></Select.Option> : null}


    </Select>
}

export default ResourceSelectPaginated
