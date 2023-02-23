import React, {useMemo, useState} from 'react'
import {Content} from "antd/es/layout/layout";
import {Button, Col, Form, Popconfirm, Row, Space, Table, Typography, Tooltip} from "antd";
import {deleteResource, useGetResourceIndex} from "../Functions/api_calls";
import {DeleteOutlined, EditOutlined, PlusOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router";
import ResourceLinks from "../ResourceLinks";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";
import {clearObject, paramsToObject} from "../../functions";
import axios from "axios";
import api from "../../Api";

function ResourceTable({resource, tableColumns,
                           title,tableParams={},
                           resourceLink=null,
                           hideActions=false,
                           exportButton = true,
                           except={},
                           handleTableBelowData,
                           getAll=false,
                           noHeader=false,
                           customActions,
    customTableButton
                       }) {

    let [searchParams, setSearchParams] = useSearchParams();
    const [params, setParams] = useState({...paramsToObject(searchParams.entries()),
       ...tableParams,
        ...(getAll?{per_page:9999}:{})
})
    let token = useSelector((state) => state?.auth?.token);
    let lngs = useSelector((state) => state?.app?.current_locale);

    const {t} = useTranslation()
    let navigate = useNavigate();


    const {loadingState, dataState} = useGetResourceIndex(resource, params,false,false,false,getAll)
    const handleTableChange = (pagination, filters, sorter) => {
        let params = {
            ...filters,
            ...tableParams,
            order_by: sorter.order?sorter?.column?.translatable ? `${sorter.columnKey}->${lngs}` : sorter.columnKey:null,
            order: sorter.order ? sorter.order === 'ascend' ? 'asc' : 'desc' : null,
            page: pagination.current
        }
        clearObject(params)
        setSearchParams(params)
        setParams(params)

    }
    const {setLoading, loading} = loadingState;
    const {setData, data} = dataState


    const onResourceEdit = (record) => {
        if(customActions.edit){
            return customActions.edit(record)
        }
        navigate(ResourceLinks[resourceLink??resource] + record.id)

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
                    {!except.edit&&<Tooltip title="Update">
                    <Button onClick={() => onResourceEdit(record)} size={'small'}><EditOutlined/></Button>
                </Tooltip>}
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
        {!noHeader&&<Row className={'resource-header'}>
            <Col lg={12}>
                <Space>
                    <Typography.Title level={4}>{t(title)}</Typography.Title>
                    {
                        exportButton ? <Tooltip title="prompt text">
                            <Button onClick={handleExportExcel} type={'secondary'}>{t("Export to Excel")}</Button>
                        </Tooltip> : null
                    }

                    <Tooltip title="prompt text">
                        <Button type={'secondary'}>{t("Import to Database")}</Button>
                    </Tooltip>
                </Space>
            </Col>
            <Col lg={12}>
                <Tooltip title="Add new entry">
                    <Button icon={<PlusOutlined/>} type={'primary'} onClick={onAddNew}>Add</Button>
                </Tooltip>
            </Col>
        </Row>}
        <Row style={{marginTop:30}}>
            <Col lg={24}>
                <Form>
                <Table
                    columns={columns}
                    loading={loading}
                    pagination={{
                        ...data.pagination,
                        showTotal: (total) =>handleTableBelowData?handleTableBelowData(dataState,loadingState,total):null
                    }}
                    onChange={handleTableChange}
                    dataSource={data?.items}
                    rowKey={e => e.id}
                    size={'small'}
                />
                </Form>
                {customTableButton?<Button type={'primary'} size={'large'} style={{margin:20}} icon={customTableButton.icon} onClick={()=>customTableButton.onClick()}>{customTableButton.title}</Button>:null}
            </Col>
        </Row>
    </Content>)
}

export default ResourceTable
