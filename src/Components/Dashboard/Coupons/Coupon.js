
import {useNavigate, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {createResource, updateResource, useGetResourceSingle} from "../../Functions/api_calls";
import Preloader from "../../Preloader";
import {Button, Col, Form, Space, Switch} from "antd";
import React, {useRef, useState} from "react";
import {t} from "i18next";
import FormInput from "../../Fragments/FormInput";
import {Row} from "antd/lib";
import Resources from "../../../store/Resources";
import {PercentageOutlined} from "@ant-design/icons";
import CancelComponent from "../../Fragments/CancelComponent";

const resource = 'Coupon';

function Coupon() {
    let dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const formRef = useRef();


    let token = useSelector((state) => state?.auth?.token);
    const {loadingState, dataState} = useGetResourceSingle(resource, params.id,{},(response)=>{
        setSwitchState(response?.discount_by_percentage)
        return response;
    })
    const {data, setData} = dataState;
    const {loading, setLoading} = loadingState
    const [saveLoading, setSaveLoading] = useState(false)
    const [switchState, setSwitchState] = useState(data?.discount_by_percentage)
    const [changeValuesState, setChangeValuesState] = useState({})



    const onFinish = (values) => {
        setSaveLoading(true)
        values.expired_at = values?.expired_at?.format('DD-MM-YYYY')
        values.discount_by_percentage ? values.discount_by_percentage = true : values.discount_by_percentage = false

        if(values?.description) {
            values.description = values.description
        } else {
            values.description = ''
        }

        setData((prevState)=>({
            ...prevState,
            ...values
        }))
        if (params.id) {
            updateResource(resource, params.id, values, token, true).then(response => {
                if(response?.id){
                    navigate(-1)
                }
            }).finally(() => {
                dispatch({
                    type: 'DASHBOARD_STATE',
                    payload: false
                })
                setSaveLoading(false)
            })
        } else {
            createResource(resource, values, token, true).then((response) => {
                if (response?.id) {
                    navigate(-1)
                }
            }).finally(() => {
                dispatch({
                    type: 'DASHBOARD_STATE',
                    payload: false
                })
                setSaveLoading(false)
            })
        }
    }
   const onChange = (checked) => {
       setSwitchState(checked)
   }

    const handleValuesChange = (changed)=>{
        setChangeValuesState(changed)

        if(Object.keys(changed).length > 0) {
            dispatch({
                type: 'DASHBOARD_STATE',
                payload: true
            })
        }
    }

    return(
        <div >
            {data?.name ? <h3 className={'create_apdate_btns'}>{t(`Editing - ${data?.name}`)}</h3 > : <h3 className={'create_apdate_btns'}>{t(`Add new Coupon`)}</h3>}
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
                        <Col lg={12} className="gutter-row">
                            <FormInput label={t('Name')} name={'name'} initialValue={data?.name} rules={[{required: true}]} />
                        </Col>
                        <Col lg={12} className="gutter-row">
                            <FormInput label={t('Redeem code')} name={'redeem_code'} initialValue={data?.redeem_code} rules={[{required: true}]} />
                        </Col>
                    </Row>
                    <div className="gutter-row">
                        <FormInput label={t('description')} name={'description'} inputType={'textArea'} initialValue={data?.description}/>
                    </div>
                </div>
                <div className={'add_edit_content'}>
                    <Row>
                        <Col lg={12} className="gutter-row">
                            <div>
                                <div style={{padding:25}}>
                                    Fixed amount {"   "}
                                    <Switch defaultChecked={switchState} onChange={onChange} name={'Discount by percentage'} /> {"   "}
                                    Percentage
                                </div>
                                {
                                    switchState ? <Row style={{paddingTop:10}}>
                                            <Col lg={1} className={'percentable'}>
                                                <PercentageOutlined style={{fontSize:20, }}/>
                                            </Col>
                                            <Col lg={23}>
                                                <FormInput max={100} min={0} inputNumberStyle={{width:'100%', borderRadius:'0px 6px 6px 0px'}} label={t('Discount by percentage')}  name={'discount_amount'} inputType={'number'}  />
                                            </Col>
                                        </Row> :
                                        <Row style={{paddingTop:10}}>
                                            <Col lg={1} className={'percentable'}>
                                                <div style={{fontWeight:600}}>SAR</div>
                                            </Col>
                                            <Col lg={23}>
                                                <FormInput  inputNumberStyle={{width:'100%', borderRadius:'0px 6px 6px 0px'}} label={t('Discount amount')} name={'discount_amount'} inputType={'number'} initialValue={data?.discount_amount} rules={[{required: true}]} />
                                            </Col>
                                        </Row>
                                }




                            </div>
                            <FormInput inputNumberStyle={{width:'100%'}} label={t('Min total value allowed')} name={'min_total_value_allowed'} inputType={'number'} initialValue={data?.min_total_value_allowed} rules={[
                                {required: true},
                                {
                                    validator:()=>{
                                        if (formRef?.current.getFieldValue()?.max_allowed_discount_amount) {
                                            if(formRef?.current.getFieldValue()?.max_allowed_discount_amount < formRef?.current.getFieldValue()?.min_total_value_allowed) {
                                                return Promise.reject('Begins at cannot be greater than expired at')
                                            }
                                        }

                                        return Promise.resolve();
                                    }
                                }
                            ]}/>
                            <FormInput inputNumberStyle={{width:'100%'}} label={t('Max allowed discount amount')} name={'max_allowed_discount_amount'} inputType={'number'} initialValue={data?.max_allowed_discount_amount} rules={[
                                {required: true},
                                {
                                    validator:()=>{
                                        if(formRef?.current.getFieldValue()?.max_allowed_discount_amount < formRef?.current.getFieldValue()?.min_total_value_allowed) {
                                            return Promise.reject('Expired at cannot be greater than begins at')
                                        }

                                        return Promise.resolve();
                                    }
                                }
                            ]}/>
                        </Col>
                        <Col lg={12} className="gutter-row">
                            <FormInput label={t('Expired at')} name={'expired_at'} initialValue={data?.expired_at} inputType={'date'} rules={[{required: true}]} />
                            <FormInput inputNumberStyle={{width:'100%'}} label={t('Max usable count')} name={'max_usable_count'} inputType={'number'} initialValue={data?.max_usable_count} rules={[{required: true}]}/>
                            <FormInput inputNumberStyle={{width:'100%'}} label={t('Total redeemed count')} name={'total_redeemed_count'} inputType={'number'} initialValue={data?.total_redeemed_count} rules={[{required: true}]}/>
                            <FormInput inputNumberStyle={{width:'100%'}} label={t('Max usable count by user')} name={'max_usable_count_by_user'} inputType={'number'} initialValue={data?.max_usable_count_by_user} rules={[{required: true}]}/>
                        </Col>
                    </Row>
                    <div className="gutter-row">
                        <FormInput label={t('Status')} name={'status'} inputType={'resourceSelect'}
                                   rules={[{required: true}]}
                                   initialValue={data?.status}
                                   initialData={Resources.Status}
                        />
                    </div>
                </div>
                <Space className={'create_apdate_btns'}>
                    <Button loading={saveLoading} size={'large'} type={'primary'} htmlType="submit">{t("Save")}</Button>
                    <CancelComponent changeValuesState={changeValuesState} resource={resource}/>
                </Space>
            </Form>}
        </div>
    )
}
export default Coupon;
