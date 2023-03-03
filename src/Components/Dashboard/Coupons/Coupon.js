
import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import {createResource, updateResource, useGetResourceSingle} from "../../Functions/api_calls";
import resourceLinks from "../../ResourceLinks";
import Preloader from "../../Preloader";
import {Button, Col, Form, Popconfirm, Space, Switch} from "antd";
import React, {useRef, useState} from "react";
import {t} from "i18next";
import FormInput from "../../Fragments/FormInput";
import {Row} from "antd/lib";
import Resources from "../../../store/Resources";
import {PercentageOutlined, QuestionCircleOutlined} from "@ant-design/icons";

const resource = 'Coupon';

function Coupon() {
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



    const onFinish = (values) => {
        setSaveLoading(true)
        values.license_number_expired_at = values?.license_number_expired_at?.format('YYYY-MM-DD')
        values.discount_by_percentage = switchState

        setData((prevState)=>({
            ...prevState,
            ...values
        }))
        if (params.id) {
            updateResource(resource, params.id, values, token, true).then(response => {
                if(response?.id){
                    navigate(resourceLinks[resource])
                }
            }).finally(() => {
                setSaveLoading(false)
            })
        } else {
            createResource(resource, values, token, true).then((response) => {
                if (response?.id) {
                    navigate(resourceLinks[resource])
                }
            }).finally(() => {
                setSaveLoading(false)
            })
        }
    }
   const onChange = (checked) => {
       setSwitchState(checked)
   }

    return(
        <div >
            {data?.name ? <h3 className={'create_apdate_btns'}>{t(`Editing - ${data?.name}`)}</h3 > : <h3 className={'create_apdate_btns'}>{t(`Add new Coupon`)}</h3>}
            {loading ? <Preloader/> : <Form
                name="edit"
                onFinish={onFinish}
                layout="vertical"
                ref={formRef}
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
                                    <Switch defaultChecked={switchState} onChange={onChange}  /> {"   "}
                                    Percentage
                                </div>

                                {
                                    switchState ? <Row style={{paddingTop:10}}>
                                        <Col lg={1} className={'percentable'}>
                                            <PercentageOutlined style={{fontSize:20, }}/>
                                        </Col>
                                        <Col lg={23}>
                                            <FormInput inputNumberStyle={{width:'100%', borderRadius:'0px 6px 6px 0px'}} label={t('Discount by percentage')}  name={'discount_amount'} inputType={'number'} initialValue={data?.discount_amount} rules={[{required: true}]}/>
                                        </Col>
                                    </Row> : <Row style={{paddingTop:10}}>
                                        <Col lg={1} className={'percentable'}>
                                            <div style={{fontWeight:600}}>SAR</div>
                                        </Col>
                                        <Col lg={23}>
                                            <FormInput inputNumberStyle={{width:'100%', borderRadius:'0px 6px 6px 0px'}} label={t('Discount amount')} name={'discount_amount'} inputType={'number'} initialValue={data?.discount_amount} rules={[{required: true}]} />
                                        </Col>
                                    </Row>
                                }

                            </div>
                            <FormInput inputNumberStyle={{width:'100%'}} label={t('Min total value allowed')} name={'min_total_value_allowed'} inputType={'number'} initialValue={data?.min_total_value_allowed} rules={[{required: true}]}/>
                            <FormInput inputNumberStyle={{width:'100%'}} label={t('Max allowed discount amount')} name={'max_allowed_discount_amount'} inputType={'number'} initialValue={data?.max_allowed_discount_amount} rules={[{required: true}]}/>
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
                    <Popconfirm
                        title={t("Your hours will not be protected")}
                        onConfirm={() => navigate(resourceLinks[resource]) }
                        okText={t("Yes")}
                        cancelText={t("No")}
                        icon={<QuestionCircleOutlined style={{color: 'red'}}/>}>
                        <Button size={'large'} type={'secondary'} htmlType="submit">{t('Cancel')}</Button>
                    </Popconfirm>
                </Space>
            </Form>}
        </div>
    )
}
export default Coupon;
