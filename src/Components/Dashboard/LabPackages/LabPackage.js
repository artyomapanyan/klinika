import {t} from "i18next";
import Preloader from "../../Preloader";
import {Button, Form, message, Space, Upload} from "antd";
import {createResource, updateResource, useGetResourceSingle} from "../../Functions/api_calls";
import resourceLinks from "../../ResourceLinks";
import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import FormInput from "../../Fragments/FormInput";
import {InboxOutlined} from "@ant-design/icons";
import React from "react";

const resource = 'LabPackage';

function LabPackage() {

    const params = useParams();
    const navigate = useNavigate();
    let token = useSelector((state) => state.auth.token);
    const {loadingState, dataState} = useGetResourceSingle(resource, params.id)
    const {data, setData} = dataState;
    const {loading, setLoading} = loadingState
    const onFinish = (values) => {
        setLoading(true)
        const formData = new FormData();
        for (const name in values) {
            formData.append(name, values[name]); // there should be values.avatar which is a File object
        }
        if (params.id) {
            updateResource(resource, params.id, formData, token).then(response => {
                if(response?.id){
                    setData(response)
                }

            }).finally(() => {
                setLoading(false)
            })
        } else {
            createResource(resource, formData, token).then((response) => {
                if (response?.id) {
                    navigate(resourceLinks[resource] + response.id)
                }

            }).finally(() => {
                setLoading(false)
            })
        }
    }


    return (
        <div className={"add_edit_content"}>
            <h3>{t('Add New Strings')}</h3>
            {loading ? <Preloader/> : <Form

                name="edit"
                onFinish={onFinish}
                layout="vertical"
                initialValues={data}
            >
                <FormInput label={t('name')} name={'name'} initialValue={data?.name}/>
                <Form.Item name={'file'}  getValueFromEvent={({file}) => file.originFileObj}>
                    <Upload.Dragger
                        name={'file'}
                        multiple={true}
                        listType={'picture'}
                        onChange={(info) => {
                           console.log(info)

                        }}
                        customRequest={(e) => {
                            console.log(e.file)
                            e.onSuccess({})
                            return Promise.resolve()
                        }}

                        onDrop={(e) => {
                            console.log('Dropped files', e.dataTransfer.files);
                        }}
                    >
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined/>
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">
                            Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                            band files
                        </p>
                    </Upload.Dragger>
                </Form.Item>
                <Space>
                    <Button type={'primary'} htmlType="submit">{t('Save')}</Button>

                </Space>
            </Form>}
        </div>

    )
}

export default LabPackage;
