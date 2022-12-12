
import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import {createResource, updateResource, useGetResourceSingle} from "../../Functions/api_calls";
import resourceLinks from "../../ResourceLinks";
import Preloader from "../../Preloader";
import {Button, Form, Input, Select, Space} from "antd";
import React from "react";

const resource = 'City';

function City() {

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
    return(
        <div>
            <h3>Add New City</h3>
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
                    label={'Area'}
                    name="City"
                    rules={[
                        {
                            required: true,
                        }
                    ]}>
                    onPopupScroll
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
export default City;
