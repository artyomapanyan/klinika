
import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import {createResource, updateResource, useGetResourceSingle} from "../../Functions/api_calls";
import resourceLinks from "../../ResourceLinks";
import Preloader from "../../Preloader";
import {Button, Form, Space} from "antd";
import React, {useRef} from "react";
import {t} from "i18next";
import FormInput from "../../Fragments/FormInput";
import Resources from "../../../store/Resources";
import FileManager from "../../Fragments/FileManager";


const resource = 'PaymentMethod';

function PaymentMethod() {
    const params = useParams();
    const navigate = useNavigate();
    const formRef = useRef();
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
        <div className={'add_edit_content'}>
            <h3>{t('Add New Lab Test')}</h3>
            {loading ? <Preloader/> : <Form
                name="edit"
                onFinish={onFinish}
                layout="vertical"
                ref={formRef}
                initialValues={{
                    name:data?.name
                }}
            >
                <FormInput label={t('name')} name={'name'}/>

                <FormInput label={t('Payment method Type')} name={'PaymentMethodKeys'} inputType={'resourceSelect'}
                           rules={[{required: true}]}
                           initialValue={data?.status}
                           initialData={Resources.PaymentMethodKeys}
                />

                <FormInput label={t('Status')} name={'status'} inputType={'resourceSelect'}
                           rules={[{required: true}]}
                           initialValue={data?.status}
                           initialData={Resources.Status}
                />
                <FileManager text1={'Logo'}
                             text2={''}
                             name={'cover'}
                             initialFileList={[data.cover]} limit={1} formRef={formRef} type={'drag'}/>



                <Space>
                    <Button type={'primary'} htmlType="submit">{t("Save")}</Button>

                </Space>
            </Form>}
        </div>
    )
}
export default PaymentMethod;

