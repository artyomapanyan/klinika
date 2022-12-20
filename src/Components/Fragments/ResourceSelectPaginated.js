import React, {useEffect, useRef, useState} from 'react'
import {Select, Spin, Form} from "antd";
import {useGetResourceIndex} from "../Functions/api_calls";
import {makeUnique} from "../../functions";

function ResourceSelectPaginated({initialData = [], resource, name, label, rules,inputProps={},formItemClass}) {
    const timeout = useRef(null);
    const [params, setParams] = useState({page: 1})
    const [localData, setLocalData] = useState(initialData)

    const {loadingState, dataState} = useGetResourceIndex(resource, params)
    const {loading} = loadingState;
    const {data} = dataState;
    const handleGenerateOptions = (data) => {
        return data.map(item => {
            return <Select.Option key={item.id} value={item.id} name={item.name}>{item.name}</Select.Option>
        })
    }
    useEffect(() => {
        setLocalData(makeUnique([...localData, ...(data?.items ?? [])], 'id'))
    }, [data])

    const handleScroll = (event) => {
        let target = event.target
        if (target.scrollTop + target.offsetHeight === (target.scrollHeight)) {
            if (timeout.current) {
                clearTimeout(timeout.current)
            }
            if (data.pagination.last_page >= params.page + 1) {
                timeout.current = setTimeout(() => {
                    setParams({
                        ...params, page: params.page + 1
                    })

                }, 300)
            }
        }
    }
    const handleSearch = (e) => {
        if (timeout.current) {
            clearTimeout(timeout.current)
        }
        timeout.current = setTimeout(() => {
            setLocalData([])
            setParams({
                page: 1, name: e
            })
        }, 500)
    }
    const SelectItem = <Select
                                {...inputProps}
                               loading={loading}
                               onPopupScroll={handleScroll}
                               onSearch={handleSearch}
                               showSearch
                               allowClear
                               optionFilterProp={'name'}
                        >
        {handleGenerateOptions(localData ?? [])}
        {loading ?
            <Select.Option value={999} style={{textAlign: 'center'}}
                           name={params.name}><Spin/></Select.Option> : null}

    </Select>;
    return name?<Form.Item
        className={formItemClass}
        label={label}
        name={name}
        rules={rules}
    >
        {SelectItem}
    </Form.Item>:SelectItem
}

export default ResourceSelectPaginated
