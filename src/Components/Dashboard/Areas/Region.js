import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import {createResource, updateResource, useGetResourceIndex, useGetResourceSingle} from "../../Functions/api_calls";
import resourceLinks from "../../ResourceLinks";
import Preloader from "../../Preloader";
import {Button, Form, Input, Select, Space} from "antd";
import React, {useEffect} from "react";
import {GetAll} from "../../Functions/get_all";
import axios from "axios";
import api from "../../../Api";

const resource = 'Region';

function Region() {

    const params = useParams();
    const navigate = useNavigate();
    let token = useSelector((state) => state.auth.token);
    const {loadingState, dataState} = useGetResourceSingle(resource, params.id)
    const {data, setData} = dataState;
    const {loading, setLoading} = loadingState

    useEffect(()=>{
        axios.get(`${api.apiEndpoint}${api.version}/regions?order_by=name->en`).then(response=>{
            console.log(response)
        })
    },[])

    const onFinish = (values) => {
        setLoading(true)
        if (params.id) {
            updateResource(resource, params.id, values, token).then(response => {
                setData(response)
            }).finally(() => {
                setLoading(false)
            })
        } else {
            createResource(resource, values, token).then((response) => {
                if (response?.id) {
                    navigate(resourceLinks[resource] + response.id)
                }

            }).finally(() => {
                setLoading(false)
            })
        }

    }
    return(
        <div>
            <h3>Add New Area</h3>
            {loading ? <Preloader/> : <Form
                name="edit"
                onFinish={onFinish}
                layout="vertical"
                initialValues={data}
            >
                <Form.Item label={'Name'} name={'name'}>
                    <Input/>
                </Form.Item>
                <Form.Item
                    label={'Country'}
                    name="Region"
                    rules={[
                        {
                            required: true,
                        }
                    ]}>
                    <Select>

                    </Select>
                </Form.Item>

                <Space>
                    <Button type={'primary'} htmlType="submit">Save</Button>

                </Space>
            </Form>}
        </div>
    )
}
export default Region;