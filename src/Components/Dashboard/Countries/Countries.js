import React, { useState} from 'react'
import {Content} from "antd/es/layout/layout";
import {Button, Col, Row, Space, Table, Typography} from "antd";
import {useGetResourceIndex} from "../../Functions/api_calls";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router";
function Countries(){
    const [params,setParams] = useState({})
    const handleTableChange = (pagination,filters,sorter)=>{
        setParams({
            page:pagination.current
        })
    }
    const  {loadingState,data}= useGetResourceIndex('Country',params)

    let navigate = useNavigate();

    const onCountryEdit = (e, v) => {
        navigate("/dashboard/country/" + v.id)

    }

    const columns = [
        {
            dataIndex:'name',
            title:'Name',
            key:'name',
        },
        {
            dataIndex:'name',
            title:'action',
            key:'name',
            render:(e, v)=><div>
                <Button onClick={() => onCountryEdit(e, v)}><EditOutlined /></Button>
                <Button><DeleteOutlined /></Button>
            </div>
        }

    ];



    return(
        <Content className={'layout-conatiner'}>
            <Row className={'resource-header'}>
                <Col lg={12}>
                    <Space>
                        <Typography.Title level={4}>Countries</Typography.Title>
                        <Button type={'secondary'}>Export to Excel</Button>
                        <Button type={'secondary'}>Import to Database</Button>
                    </Space>
                </Col>
                <Col lg={12}>
                    <Button type={'primary'}>Add</Button>
                </Col>
            </Row>
            <Row>
                <Col lg={24}>
                    <Table
                        columns={columns}
                        loading={loadingState.loading}
                        pagination={data.pagination}
                        onChange={handleTableChange}
                        dataSource={data?.items}
                    />

                </Col>
            </Row>
        </Content>
    )
}
export default Countries
