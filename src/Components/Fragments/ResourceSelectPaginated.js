import React, {useEffect, useMemo, useRef, useState} from 'react'
import {Select, Spin, Form} from "antd";
import {useGetResourceIndex} from "../Functions/api_calls";
import {makeUnique} from "../../functions";

function ResourceSelectPaginated({
                                   initialData = [],
                                   resource = null,
                                   name,
                                   options,
                                     searchConfigs={},
                                   label,
                                   rules,
                                   inputProps = {},
                                   formItemClass,
                                     extra,
                                   resourceParams = {},
                                   initialValue = null,
                                   disableClear = false,
                                   updateLoading = false,
                                   notFoundContent=null,
                                     customSearchKey,
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

    useEffect(()=>{
        if(JSON.stringify(resourceParams)!==JSON.stringify(params)){
            setParams(resourceParams)
        }


    },[resourceParams])
  const handleGenerateOptions = (data) => {
    return data.map((item, key) => {
      let name = item.name ?? item.title
      if (resource === 'User' || resource === 'Doctor') {
        name = `${item.first} ${item.last} ${item.phone_number}`
      }
        if (resource === 'ClinicDoctor') {
            name = `${item.doctor.first} ${item.doctor.last}`
        }
      if (handleMapItems) {
        let [newName, newItem,searchData] = handleMapItems(item, name,data)
        name = newName;
        item = newItem
          if(typeof item==='object'){
              item.searchData = searchData;
          }

      }


      return name ? <Select.Option key={key} value={item.id} name={item.searchData??name}>{name}</Select.Option> : null
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
      if (data.pagination.last_page >= (params.page??1) + 1) {
        timeout.current = setTimeout(() => {
          setParams({
            ...params, page: (params.page??1)+ 1
          })

        }, 300)
      }
    }
  }
  const handleSearch = (e) => {
        if(searchConfigs.minLength){
            if(e.length<searchConfigs.minLength){
                setIsInitedState(false)
            }else{
                setIsInitedState(true)
            }
        }


    if (resource) {
      if (timeout.current) {
        clearTimeout(timeout.current)
      }
      timeout.current = setTimeout(() => {
        setLocalData([])
        setParams({
          page: 1, [customSearchKey??'name']: e
        })
      }, 500)
    }

  }

  const itemOptions = useMemo(() => handleGenerateOptions(localData ?? []), [localData])

  const SelectItem = <Select
    {...inputProps}
      disabled={disabled}
    filterOption={false}

    loading={loading || updateLoading}
    onPopupScroll={handleScroll}
    onSearch={handleSearch}
    showSearch
    notFoundContent={notFoundContent??null}

    allowClear={!disableClear}
    options={options}
    optionFilterProp={'name'}
    onDropdownVisibleChange={() => !isInitedState && !searchConfigs.minLength ? setIsInitedState(true) : params[customSearchKey??'name']?.length>=searchConfigs.minLength?setIsInitedState(true):null}
  >
    {itemOptions}

    {loading ?
      <Select.Option disabled={true} value={999} style={{textAlign: 'center'}}
                     name={params[customSearchKey??'name']}><Spin/></Select.Option> :null}

  </Select>;


  return name ? <Form.Item
    extra={extra}
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
