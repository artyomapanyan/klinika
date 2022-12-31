import React, {useMemo, useState} from 'react'
import {Content} from "antd/es/layout/layout";
import {Button, Col, Form, Popconfirm, Row, Space, Table, Typography} from "antd";
import {deleteResource, useGetResourceIndex} from "../Functions/api_calls";
import {DeleteOutlined, EditOutlined, PlusOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router";
import ResourceLinks from "../ResourceLinks";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";
import {clearObject, paramsToObject} from "../../functions";

function ResourceTable({resource, tableColumns, title,tableParams={},resourceLink=null}) {

    let [searchParams, setSearchParams] = useSearchParams();
    const [params, setParams] = useState({...paramsToObject(searchParams.entries()),
       ...tableParams
})
    let token = useSelector((state) => state?.auth?.token);
    let lngs = useSelector((state) => state?.app?.current_locale);

    const {t} = useTranslation()
    let navigate = useNavigate();


    const {loadingState, dataState} = useGetResourceIndex(resource, params)
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


    const onResourceEdit = (e) => {
        navigate(ResourceLinks[resourceLink??resource] + e)

    }
    const onResourceDelete = (e) => {

        setLoading(true)
        deleteResource(resource, e, token).then(resp => {
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
        }), {
            dataIndex: 'id', title: 'action', key: 'id', render: (e) => <Space>
                <Button onClick={() => onResourceEdit(e)} size={'small'}><EditOutlined/></Button>
                <Popconfirm
                    title={t("Are you sure to delete this entry?")}
                    onConfirm={() => onResourceDelete(e)}
                    okText={t("Yes")}
                    cancelText={t("No")}
                    icon={<QuestionCircleOutlined
                            style={{
                                color: 'red',
                            }}/>}>
                    <Button size={'small'}><DeleteOutlined/></Button>
                </Popconfirm>

            </Space>
        }]


    }, [tableColumns, params])
    const onAddNew = () => {
        navigate(ResourceLinks[resourceLink??resource] + 'new')
    }

        console.log(data)
    return (<Content className={'layout-conatiner'}>
        <Row className={'resource-header'}>
            <Col lg={12}>
                <Space>
                    <Typography.Title level={4}>{t(title)}</Typography.Title>
                    <Button type={'secondary'}>{t("Export to Excel")}</Button>
                    <Button type={'secondary'}>{t("Import to Database")}</Button>
                </Space>
            </Col>
            <Col lg={12}>
                <Button icon={<PlusOutlined/>} type={'primary'} onClick={onAddNew}>Add</Button>
            </Col>
        </Row>
        <Row style={{marginTop:30}}>
            <Col lg={24}>
                <Form>
                <Table
                    columns={columns}
                    loading={loading}
                    pagination={data.pagination}
                    onChange={handleTableChange}
                    dataSource={data?.items}
                    rowKey={e => e.id}
                    size={'small'}
                />
                </Form>
            </Col>
        </Row>
    </Content>)
}

export default ResourceTable
