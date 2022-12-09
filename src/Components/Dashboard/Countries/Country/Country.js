import React from 'react';
import {Button, Form, Input,Space} from 'antd';
import "./Country.sass"
import {createResource, updateResource, useGetResourceSingle} from "../../../Functions/api_calls";
import {useNavigate, useParams} from "react-router";
import Preloader from "../../../Preloader";
import {useSelector} from "react-redux";
import resourceLinks from "../../../ResourceLinks";

const resource = 'Country';

function Country() {
    const params = useParams();
    const navigate = useNavigate();
    let token = useSelector((state) => state.auth.token);
    const {loadingState, dataState} = useGetResourceSingle(resource, params.id)
    const {data, setData} = dataState;
    const {loading, setLoading} = loadingState

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

    return (
        <div className={"country_content"}>
            <h3>Editing Country - {data?.name}</h3>
            {loading ? <Preloader/> : <Form
                name="edit"
                onFinish={onFinish}
                layout="vertical"
                initialValues={data}
            >
                <Form.Item label={'Name'} name={'name'}>
                    <Input/>
                </Form.Item>
                <Form.Item label={'Alpha2 code  *'} name={'alpha2_code'}>
                    <Input/>
                </Form.Item>

                <Form.Item label={'Alpha3 code  *'} name={'alpha3_code'} >
                    <Input/>
                </Form.Item>
                <Space>
                    <Button type={'primary'} htmlType="submit">Save</Button>

                </Space>
            </Form>}
        </div>

    )
}

export default Country;
