import React, {useEffect, useMemo, useState} from 'react'
import {Content} from "antd/es/layout/layout";
import {Button, Col, Form, Popconfirm, Row, Space, Table, Typography, Tooltip} from "antd";
import {deleteResource, useGetResourceIndex} from "../Functions/api_calls";
import {DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router";
import ResourceLinks from "../ResourceLinks";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";
import {clearObject, paramsToObject} from "../../functions";
import axios from "axios";
import api from "../../Api";
import PermCheck from "./PermCheck";

function ResourceTable ({
    resource, tableColumns,
    title, tableParams = {},
    resourceLink = null,
    hideActions = false,
    exportButton = true,
    except = {},
    handleTableBelowData,
    getAll = false,
    noHeader = false,
    eyeShow = false,
    customActions,
    initialParams = {},
    buttonAdd = true,
    showHeader = true,
    editBtnStyle = {},
    tableSFilters,
    customTableButton,
    customHeader=null,
    resourceTablemarginTop=false,
    noData= false
}) {

    let [searchParams, setSearchParams] = useSearchParams();
    const [params, setParams] = useState({...paramsToObject(searchParams.entries()),
       ...tableParams,
        ...initialParams,
        ...(getAll?{per_page:9999}:{})
})
    let token = useSelector((state) => state?.auth?.token);
    let lngs = useSelector((state) => state?.app?.current_locale);

    const {t} = useTranslation()
    let navigate = useNavigate();


    const {loadingState, dataState} = useGetResourceIndex(resource, params,false,false,false,getAll)
    const handleTableChange = (pagination, filters, sorter) => {
        let data = {
            ...params,
            ...filters,
            ...tableParams,
            order_by: sorter.order?sorter?.column?.translatable ? `${sorter.columnKey}->${lngs}` : sorter.columnKey:null,
            order: sorter.order ? sorter.order === 'ascend' ? 'asc' : 'desc' : null,
            page: pagination.current,
            per_page: pagination.pageSize
        }
        clearObject(data)
        setSearchParams(data)
        setParams(data)

    }
    useEffect(()=>{
        if(tableSFilters && Object.keys(tableSFilters).length){
            setParams((prevState)=>({
                ...prevState,
                ...(tableSFilters??{})
            }))
            clearObject(params)
            setSearchParams({
                ...params,
                ...(tableSFilters??{})
            })
            setParams({
                ...params,
                ...(tableSFilters??{})
            })
        }

    },[tableSFilters])
    const {setLoading, loading} = loadingState;
    const {setData, data} = dataState


    const onResourceEdit = (record) => {

        if(customActions?.edit){
            return customActions.edit(record)
        }
        navigate(ResourceLinks[resourceLink??resource] + record.id)

    }
    const onResourceShow = (record) => {

        if(customActions?.show){
            return customActions.show(record)
        }
        navigate(ResourceLinks[resourceLink??resource] + record.id+'/show')

    }
    const onResourceDelete = (record) => {

        setLoading(true)
        deleteResource(resource, record.id, token).then(resp => {
            setData((prevState)=>({
                ...prevState, items: prevState?.items?.slice(0)?.filter(e => e.id !== resp.id)
            }))
            setLoading(false)
        })
    }
    useEffect(()=>{
        if(getAll){
            getAll(data.items)
        }

    },[data])

    const columns = useMemo(() => {
            let filterKeys = Object.keys(params);
        return [...tableColumns?.map(e => {
            if (params.order_by?.includes(e.key)) {
                e = {
                    ...e, defaultSortOrder: params.order === 'asc' ? 'ascend' : 'descend'
                }
            }
            if(filterKeys.includes(e.key)){
                e = {
                    ...e,
                    defaultFilteredValue:params[e.key]
                }
            }
            return e
        }),

            ...(hideActions?[]:[{
            dataIndex: 'id', title: 'action', key: 'id', render: (e,record) => <Space>

                    {!except.edit ? <Tooltip title="Update">
                    <Button
                      type={editBtnStyle ? editBtnStyle.type : {}}
                      onClick={() => onResourceEdit(record)}
                      size={editBtnStyle?.size ? editBtnStyle?.size : 'small'}
                      style={editBtnStyle?.btnStyle ? editBtnStyle.btnStyle : {}}
                    >
                        <EditOutlined style={editBtnStyle?.iconStyle ? editBtnStyle?.iconStyle : {}}/>
                    </Button>
                </Tooltip> :  <div></div>}
                {!except.delete&&<Tooltip title="Delete">
                    <Popconfirm
                        title={t("Are you sure to delete this entry?")}
                        onConfirm={() => onResourceDelete(record)}
                        okText={t("Yes")}
                        cancelText={t("No")}
                        icon={<QuestionCircleOutlined style={{color: 'red'}}/>}>
                        <Button size={'small'}><DeleteOutlined/></Button>
                    </Popconfirm>
                </Tooltip>}
                    {
                        eyeShow ? <Tooltip title="Show">
                            <Button style={{border:'none'}} onClick={() => onResourceShow(record)} ><EyeOutlined style={{color: '#c98a1e'}} /></Button>
                        </Tooltip> : <div></div>
                    }

            </Space>
        }])
        ]


    }, [tableColumns, params])
    const onAddNew = () => {
        navigate(ResourceLinks[resourceLink??resource] + 'new')
    }

    const handleExportExcel =()=>{
        axios.request({
            url: api[resource].exportExcel.url,
            method: api[resource].exportExcel.method,
            headers: {
                'Authorization': token,
            },
            responseType: 'blob',

        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', resource+'.xlsx');
            document.body.appendChild(link);
            link.click();
        });
    }


    return (<Content className={'layout-conatiner'}>
        {customHeader?<Row>
            <Col lg={24}>{customHeader({
                setParams,
                params
            })}</Col>
        </Row>:null}
        {!noHeader&&<Row className={'resource-header'}>
            <Col lg={11}>
                <div style={{display:'flex', gap: 4}}>
                    <div className={'recource_table_title'}>{t(title)}:</div>
                    {PermCheck(`${resource}:create`)?<Tooltip title="Add new entry">
                            <Button style={{marginLeft:10}} className={'resource_table_btn'} icon={<PlusOutlined/>} type={'primary'} onClick={onAddNew}>Add</Button>
                    </Tooltip>:<div></div>}
                    {
                        exportButton ? <Button className={'resource_table_btn'} onClick={handleExportExcel} type={'secondary'}>{t("Export to Excel")}</Button>
                        : null
                    }


                        <Button className={'resource_table_btn'} type={'secondary'}>{t("Import to Database")}</Button>

                </div>
            </Col>

        </Row>}
        <Row style={{marginTop: resourceTablemarginTop ? 10 : 42}}>
            <Col lg={24}>
                <Form>
                    {noData && data?.items?.length===0 && !loading?noData():<Table
                    columns={columns}
                    loading={loading}
                    pagination={{
                        ...data.pagination,
                        showTotal: (total) =>handleTableBelowData?handleTableBelowData(dataState,loadingState,total):null,
                        pageSize: data.pagination.pageSize,
                        showSizeChanger:true
                    }}
                    showHeader={showHeader}
                    onChange={handleTableChange}
                    dataSource={data?.items}
                    rowKey={e => e.id}
                    size={'small'}
                />}
                </Form>
                {customTableButton?<Button loading={loading} type={'primary'} size={'large'} style={{margin:20}} icon={customTableButton.icon} onClick={()=>customTableButton.onClick()}>{customTableButton.title}</Button>:null}
            </Col>
        </Row>
    </Content>)
}

export default ResourceTable
