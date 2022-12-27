import React, {useRef} from "react";
import {t} from "i18next";
import Preloader from "../../../Preloader";
import {Button, Form, Space} from "antd";
import FormInput from "../../../Fragments/FormInput";
import Resources from "../../../../store/Resources";
import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import {createResource, updateResource, useGetResourceIndex, useGetResourceSingle} from "../../../Functions/api_calls";
import resourceLinks from "../../../ResourceLinks";

const resource = 'Role';
function Role() {
    const params = useParams();
    const navigate = useNavigate();
    const formRef = useRef();
    let token = useSelector((state) => state.auth.token);
    const {loadingState, dataState,addDataState} = useGetResourceSingle(resource, params.id,{
        Permission: {},
    })
    const {data, setData} = dataState;
    const {loading, setLoading} = loadingState
    const {addData, setAddData} = addDataState

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
        <div className={'add_edit_content'}>
            <h3>{t('Add New Role')}</h3>
            {loading ? <Preloader/> : <Form
                name="edit"
                onFinish={onFinish}
                layout="vertical"
                ref={formRef}
            >

                <FormInput label={t('name')} name={'name'} initialValue={data?.name}/>
                <Space>
                    <Button type={'primary'} htmlType="submit">{t("Save")}</Button>

                </Space>
            </Form>}
        </div>
    )
}
export default Role;