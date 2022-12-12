import React, {useState, useTransition} from 'react'
import {Content} from "antd/es/layout/layout";
import {Button, Col, Row, Space, Table, Typography} from "antd";
import {deleteResource, useGetResourceIndex} from "../Functions/api_calls";
import {DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router";
import ResourceLinks from "../ResourceLinks";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";

function ResourceTable({resource,tableColumns,title}){
    const [params,setParams] = useState({})
    let token = useSelector((state) => state?.auth?.token);
    const {t} = useTranslation()
    let navigate = useNavigate();

    const handleTableChange = (pagination,filters,sorter)=>{
        setParams({
            page:pagination.current
        })
    }
    const  {loadingState,dataState}= useGetResourceIndex(resource,params)
    const {setLoading,loading} = loadingState;
    const {setData,data} = dataState



    const onResourceEdit = (e) => {
        navigate(ResourceLinks[resource]+e)

    }
    const onResourceDelete = (e)=>{
        setLoading(true)

        deleteResource(resource,e,token).then(resp=>{
            setData({
                ...data,
                items:data?.items.filter(e=>e.id!==resp.id)
            })
            setLoading(false)
        })
    }

    const columns = [
        ...tableColumns,
        {
            dataIndex:'id',
            title:'action',
            key:'id',
            render:(e)=><div>
                <Button onClick={() => onResourceEdit(e)} size={'small'}><EditOutlined /></Button>
                <Button onClick={() => onResourceDelete(e)} size={'small'}><DeleteOutlined /></Button>
            </div>
        }

    ];
   const onAddNew = ()=>{
        navigate(ResourceLinks[resource]+'new')
    }


    return(
        <Content className={'layout-conatiner'}>
            <Row className={'resource-header'}>
                <Col lg={12}>
                    <Space>
                        <Typography.Title level={4}>{t(title)}</Typography.Title>
                        <Button type={'secondary'}>Export to Excel</Button>
                        <Button type={'secondary'}>Import to Database</Button>
                    </Space>
                </Col>
                <Col lg={12}>
                    <Button icon={<PlusOutlined />} type={'primary'} onClick={onAddNew}>Add</Button>
                </Col>
            </Row>
            <Row>
                <Col lg={24}>
                    <Table
                        columns={columns}
                        loading={loading}
                        pagination={data.pagination}
                        onChange={handleTableChange}
                        dataSource={data?.items}
                        rowKey={e=>e.id}
                    />
                </Col>
            </Row>
        </Content>
    )
}
export default ResourceTable
