import {useNavigate, useParams} from "react-router";
import React, {useRef, useState} from "react";
import {useSelector} from "react-redux";
import {createResource, useGetResourceSingle} from "../../Functions/api_calls";
import resourceLinks from "../../ResourceLinks";
import {Button, Form, Space, Row, Col} from "antd";
import {t} from "i18next";
import Preloader from "../../Preloader";
import FormInput from "../../Fragments/FormInput";
import Resources from "../../../store/Resources";
import {InboxOutlined} from "@ant-design/icons";
import FileManager from "../../Fragments/FileManager";


const resource = 'Clinic';



function Appointment() {
    const params = useParams();
    const navigate = useNavigate();
    const formRef = useRef();
    let token = useSelector((state) => state.auth.token);
    const {loadingState, dataState} = useGetResourceSingle(resource, params.id)
    const {data, setData} = dataState;
    const {loading, setLoading} = loadingState
    const [saveLoading, setSaveLoading] = useState(false)

    const onFinish = (values) => {
        setSaveLoading(true)
        setData((prevState)=>({
            ...prevState,
            ...values
        }))
            createResource(resource, values, token, true).then((response) => {
                if (response?.id) {
                    navigate(resourceLinks[resource])
                }
            }).finally(() => {
                setSaveLoading(false)
            })
        }


    const handleValuesChange = (e)=>{
        setData((prevState)=>({
            ...prevState,
            ...e
        }))
    }
    // useEffect(()=>{
    //
    //         postResource('Country','list',token,null,{per_page:5000}).then(responses => {
    //             setCountryCode(responses)
    //         })
    //
    // },[])
    const handleMapItems = (item,name)=>{
        name = item.phone_code?`(+${item.phone_code}) `:null
        item.id = '+'+item.phone_code
        return [name,item]
    }


    return(
        <div >
            {data?.name ? <h3 style={{marginTop:20}} className={'create_apdate_btns'}>{t(`Editing Doctor - ${data?.name}`)}</h3> : <h3 style={{marginTop:20}} className={'create_apdate_btns'}>{t(`Add new Clinic`)}</h3>}
            {loading ? <Preloader/> : <Form
                onValuesChange={handleValuesChange}
                name="edit"
                onFinish={onFinish}
                layout="vertical"
                ref={formRef}
            >
                <div >

                    <div className={'add_edit_content'}>
                        <div className="gutter-row">
                            <FormInput label={t('Select Patient (Search By phone number)')} name={'name'} initialValue={data?.name} rules={[{required: true}]} />
                        </div>
                        <Row>
                            <Col lg={6} className="gutter-row">
                                <FormInput label={t('Country Code  ')} name={'phone_country_code'} inputType={'resourceSelect'}
                                           rules={[{required: true}]}
                                           initialValue={`(+${data?.phone_country_code})`}
                                           handleMapItems={handleMapItems}
                                           resource={'Country'}/>
                            </Col>
                            <Col lg={18} className="gutter-row">
                                <FormInput label={t('Phone number')} name={'phone_number'} initialValue={data?.phone_number} />
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12} className="gutter-row">
                                <FormInput label={t('First Name')} name={'first'} rules={[{required: true}]} />
                            </Col>
                            <Col lg={12} className="gutter-row">
                                <FormInput label={t('Last Name')} name={'last'} rules={[{required: true}]} />
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={8} className="gutter-row">
                                <FormInput label={t('Email')} name={'email'} rules={[{required: true}]} />
                            </Col>
                            <Col lg={8} className="gutter-row">
                                <FormInput label={t('Date of Birth')} name={'dob'}  inputType={'date'} rules={[{required: true}]} />
                            </Col>
                            <Col lg={8} className="gutter-row">
                                <FormInput label={t('Gender')} name={'gender'} inputType={'resourceSelect'} initialData={Resources?.Gender}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12} className="gutter-row">
                                <FormInput label={t('Nationality')} name={'nationality'} inputType={'resourceSelect'}
                                           rules={[{required: true}]}
                                           initialData={data?.languages??[]}
                                           resource={'Country'}
                                />
                            </Col>
                            <Col lg={12} className="gutter-row">
                                <FormInput  label={t('Identification Number')} name={["identification_number"]} rules={[{required: true}]}/>
                            </Col>
                        </Row>
                    </div>
                    <div className={'add_edit_content'}>


                        <Row>
                            <Col lg={12} className="gutter-row">
                                <FormInput label={t('Clinic')} name={'clinic_id'} inputType={'resourceSelect'}
                                           rules={[{required: true}]}
                                           initialValue={null}
                                           initialData={[]}
                                           resource={'Clinic'}/>
                            </Col>
                            <Col lg={12} className="gutter-row">
                                <FormInput label={t('Appointment Date *')} name={'appointment_date *'}  inputType={'date'} rules={[{required: true}]} />
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12} className="gutter-row">
                                <FormInput label={t('Offer (Optional)')} name={'offer_id'} inputType={'resourceSelect'}
                                           initialValue={null}
                                           initialData={[]}
                                           resource={'Offer'}/>
                            </Col>
                            <Col lg={12} className="gutter-row">
                                <FormInput label={t('File Number')} name={'file_number'} rules={[{required: true}]} />
                            </Col>

                        </Row>
                        <div className="gutter-row">
                            <FormInput label={t('Description')} name={'description'} inputType={'textArea'} initialValue={data?.description}/>
                        </div>
                        <div className="gutter-row">
                            <FileManager text1={'Select or drag files'}
                                         text2={'+'}
                                         name={'gallery'}
                                         uploadIcon={<InboxOutlined/>}
                                         initialFileList={[data?.gallery]} limit={5} formRef={formRef} type={'drag'}/>
                        </div>

                    </div>
                </div>


                <Space className={'create_apdate_btns'}>
                    <Button loading={saveLoading} size={'large'} type={'primary'} htmlType="submit">{t("Save")}</Button>
                    <Button size={'large'} onClick={()=>(navigate(resourceLinks[resource]))} type={'secondary'} htmlType="submit">{t('Cancel')}</Button>
                </Space>
            </Form>}
        </div>
    )
}
export default Appointment;
