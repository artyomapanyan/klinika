import React, {useEffect, useMemo, useRef, useState} from 'react'
import {Select, Spin, Form} from "antd";
import {useGetResourceIndex} from "../Functions/api_calls";
import {makeUnique} from "../../functions";
import {useDispatch} from "react-redux";

function ResourceSelectPaginated({
                                     resourceSelectStyle,
                                   initialData = [],
                                   resource = null,
                                   name,
                                   options,
                                     searchConfigs={},
                                     suffixIcon,
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
                                   handleMapItems = null,
                                     handleStatus=null,
                                     searchByTitle=false
                                 }) {
  const timeout = useRef(null);
  const [params, setParams] = useState({page: 1, ...resourceParams})
  const [localData, setLocalData] = useState(initialData)
    let dispatch = useDispatch()

  const [isInitedState, setIsInitedState] = useState(false)

  const {loadingState, dataState} = useGetResourceIndex(resource, params, isInitedState, true, resourceData)
  const {loading} = loadingState;
  const {data} = dataState;



    useEffect(()=>{
        let needsUpdate = false
        Object.keys(resourceParams).forEach(key=>{
            if(resourceParams[key]!==params[key]){
                needsUpdate = true

            }
        })
        if(needsUpdate){
            setLocalData([])
            setParams(resourceParams)
        }

    },[resourceParams])
    useEffect(()=>{
        if(initialData.length>20){
            setLocalData(initialData)
        }
    },[initialData])
  const handleGenerateOptions = (data1) => {

      if(data1) {
          if (handleStatus) {
              dispatch({
                  type:'STATUS_CODE',
                  payload: data?.status ? data?.status : 200
              })
          }

          return data1?.map((item, key) => {

              let name = item?.name ?? item?.title
              if (resource === 'User' || resource === 'Doctor' || 'MedicalStaff') {
                  name = `${item?.first} ${item?.last} ${item?.phone_number??''}`
              }
              if (resource === 'ClinicDoctor') {
                  name = `${item?.doctor?.first} ${item?.doctor?.last}`
              }
              if (handleMapItems) {
                  let [newName, newItem,searchData] = handleMapItems(item, name,data1, )
                  name = newName;
                  item = newItem;

                  if(typeof item==='object'){
                      item.searchData = searchData;
                  }

              }




              return name ? <Select.Option key={key} value={item.id}  name={item.searchData??name}>{name}</Select.Option> : null
          })
      }

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
        if(inputProps.onSearch){
            inputProps.onSearch(e)
        }



    if (resource) {
      if (timeout.current) {
        clearTimeout(timeout.current)
      }
      timeout.current = setTimeout(() => {

          if(searchConfigs.minLength){
              if(e.length<searchConfigs.minLength){
                  setIsInitedState(false)
              }else{
                  setIsInitedState(true)
              }
          }
        setLocalData([])
          if(searchByTitle) {
              setParams((prevState)=>({
                  ...prevState,
                  page: 1, [customSearchKey??'title']: e,

              }))
          }
        setParams((prevState)=>({
            ...prevState,
          page: 1, [customSearchKey??'name']: e,

        }))
      }, 850)
    }

  }

	const handleClear = () => {
    if(params[customSearchKey ?? 'name']){
      setLocalData([])
      params[customSearchKey ?? 'name'] = '';
      setIsInitedState(false)
    }
	}

  const itemOptions = useMemo(() => handleGenerateOptions(localData ?? []), [localData])

  const SelectItem = <Select
    {...inputProps}
      onChange={(e)=>inputProps.onChange(e,localData)}
      disabled={disabled}
    style={resourceSelectStyle??null}

    filterOption={false}

    loading={suffixIcon?true:false}
    onPopupScroll={handleScroll}
    onSearch={handleSearch}
    onClear={handleClear}
    showSearch
    notFoundContent={notFoundContent??null}
    suffixIcon={suffixIcon??null}

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
