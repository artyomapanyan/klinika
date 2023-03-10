import React, {useEffect, useMemo, useRef, useState} from 'react'
import {Select, Spin, Form} from "antd";
import {useGetResourceIndex} from "../Functions/api_calls";
import {makeUnique} from "../../functions";

function ResourceSelectPaginated({
                                   initialData = [],
                                   resource = null,
                                   name,
                                   options,
                                   label,
                                   rules,
                                   inputProps = {},
                                   formItemClass,
                                   resourceParams = {},
                                   initialValue = null,
                                   disableClear = false,
                                   updateLoading = false,
                                   resourceSelectStyle,
                                   resourceData,
                                   disabled,
                                   handleMapItems = null
                                 }) {
  const timeout = useRef(null);
  const [params, setParams] = useState({page: 1, ...resourceParams})
  const [localData, setLocalData] = useState(initialData)

  const [isInitedState, setIsInitedState] = useState(false)

  const {loadingState, dataState} = useGetResourceIndex(resource, params, isInitedState, true, resourceData)
  const {loading} = loadingState;
  const {data} = dataState;

    // useEffect(()=>{
    //     if(JSON.stringify(resourceParams)!==JSON.stringify(params)){
    //         console.log(JSON.stringify(resourceParams),JSON.stringify(params))
    //         console.log(resourceParams,resource)
    //         setParams(resourceParams)
    //     }
    //
    //
    // },[resourceParams])
  const handleGenerateOptions = (data) => {
    return data.map((item, key) => {
      let name = item.name ?? item.title
      if (resource === 'User' || resource === 'Doctor') {
        name = `${item.first} ${item.last}`
      }
        if (resource === 'ClinicDoctor') {
            name = `${item.doctor.first} ${item.doctor.last}`
        }
      if (handleMapItems) {
        let [newName, newItem] = handleMapItems(item, name)
        name = newName;
        item = newItem
      }


      return name ? <Select.Option key={key} value={item.id} name={name}>{name}</Select.Option> : null
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
    if (resource) {
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

  }

  const itemOptions = useMemo(() => handleGenerateOptions(localData ?? []), [localData])

  const SelectItem = <Select
    {...inputProps}
      disabled={disabled}

    loading={loading || updateLoading}
    onPopupScroll={handleScroll}
    onSearch={handleSearch}
    showSearch
    allowClear={!disableClear}
    options={options}
    optionFilterProp={'name'}
    onDropdownVisibleChange={() => !isInitedState ? setIsInitedState(true) : null}
  >
    {itemOptions}
    {loading ?
      <Select.Option value={999} style={{textAlign: 'center'}}
                     name={params.name}><Spin/></Select.Option> : null}

  </Select>;


  return name ? <Form.Item
    className={formItemClass}
    label={label}
    name={name}
    rules={rules}
    {...(initialValue ? {
      initialValue: initialValue
    } : {})}
  >
    {SelectItem}
  </Form.Item> : SelectItem
}

export default ResourceSelectPaginated
