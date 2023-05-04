import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import {createResource, updateResource, useGetResourceSingle} from "../../Functions/api_calls";
import resourceLinks from "../../ResourceLinks";
import Preloader from "../../Preloader";
import {Button, Col, Form, Popconfirm, Row, Space} from "antd";
import React, {useRef, useState} from "react";
import {t} from "i18next";
import FormInput from "../../Fragments/FormInput";
import Resources from "../../../store/Resources";
import FileManager from "../../Fragments/FileManager";
import {InboxOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import CancelComponent from "../../Fragments/CancelComponent";


const resource = 'PaymentMethod';

function PaymentMethod() {
    const params = useParams();
    const navigate = useNavigate();
    const formRef = useRef();
    let token = useSelector((state) => state.auth.token);
    const {loadingState, dataState} = useGetResourceSingle(resource, params.id)
    const {data, setData} = dataState;
    const {loading, setLoading} = loadingState
    const [saveLoading, setSaveLoading] = useState(false)
    const [changeValuesState, setChangeValuesState] = useState({})



    const onFinish = (values) => {
        setSaveLoading(true)
        setData((prevState)=>({
            ...prevState,
            ...values
        }))

        if (params.id) {
            updateResource(resource, params.id, values, token,true).then(response => {
                if(response?.id){
                    navigate(-1)
                }
            }).finally(() => {
                setSaveLoading(false)
            })
        } else {
            createResource(resource, values, token,true).then((response) => {
                if (response?.id) {
                    navigate(-1)
                }

            }).finally(() => {
                setSaveLoading(false)
            })
        }
    }
    const handleValuesChange = (changed)=>{
        setChangeValuesState(changed)
    }



    return(
        <div>
            {data?.title ? <h3 className={'create_apdate_btns'}>{t(`Editing Payment Method - ${data?.title}`)}</h3> : <h3 className={'create_apdate_btns'}>{t(`Add new Payment Method`)}</h3>}
            {loading ? <Preloader/> : <Form
                name="edit"
                onFinish={onFinish}
                onValuesChange={handleValuesChange}
                layout="vertical"
                ref={formRef}
                className={'add_create_form'}
            >
                <div className={'add_edit_content'}>
                    <Row>
                        <Col lg={18} className="gutter-row">
                            <FormInput label={t('Name')} name={'title'} initialValue={data?.title} rules={[{required: true}]}/>
                            <FormInput label={t('Payment method Type')} name={'key'} inputType={'resourceSelect'}
                                       rules={[{required: true}]}
                                       initialValue={data?.key}
                                       initialData={Resources.PaymentMethodKeys}
                            />

                            <FormInput label={t('Status')} name={'status'} inputType={'resourceSelect'}
                                       rules={[{required: true}]}
                                       initialValue={data?.status}
                                       initialData={Resources.Status}
                            />
                        </Col>
                        <Col lg={6} className="gutter-row">
                                <FileManager text1={'Logo'}
                                             text2={'Click or drag file to this area to upload'}
                                             uploadIcon={<InboxOutlined/>}
                                             name={'logo'}
                                             initialFileList={[data.logo]} limit={1} formRef={formRef} type={'drag'}/>

                        </Col>
                    </Row>
                    <FormInput label={t('Description')} name={'description'} inputType={'textArea'} initialValue={data?.description}/>
                    <FormInput label={t('instructions')} name={'instructions'} inputType={'textArea'} initialValue={data?.instructions}/>
                </div>
                <Space className={'create_apdate_btns'}>
                    <Button loading={saveLoading} size={'large'} type={'primary'} htmlType="submit">{t("Save")}</Button>
                    <CancelComponent changeValuesState={changeValuesState} resource={resource}/>
                </Space>
            </Form>}
        </div>
    )
}
export default PaymentMethod;

