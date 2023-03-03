
import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import {createResource, updateResource, useGetResourceSingle} from "../../Functions/api_calls";
import resourceLinks from "../../ResourceLinks";
import Preloader from "../../Preloader";
import {Button, Checkbox, Col, Form, Popconfirm, Space} from "antd";
import React, {useRef, useState} from "react";
import {t} from "i18next";
import FormInput from "../../Fragments/FormInput";
import Resources from "../../../store/Resources";
import {Row} from "antd/lib";
import DraftEditor from "../../Fragments/DraftEditor";
import {QuestionCircleOutlined} from "@ant-design/icons";

const resource = 'Offer';

function Offer() {
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
        values.expired_at = values?.expired_at?.format('YYYY-MM-DD')
        values.begins_at = values?.begins_at?.format('YYYY-MM-DD')
        values.top === true ? values.top = true : values.top = false;

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

    return(
        <div >
            {data?.name ? <h3 className={'create_apdate_btns'}>{t(`Editing Doctor - ${data?.name}`)}</h3 > : <h3 className={'create_apdate_btns'}>{t(`Add new Clinic`)}</h3>}
            {loading ? <Preloader/> : <Form
                name="edit"
                onFinish={onFinish}
                layout="vertical"
                ref={formRef}
            >
                <div className={'add_edit_content'}>
                    <FormInput label={t('title')} name={'title'} initialValue={data?.title} rules={[{required: true}]} />
                    <Form.Item name={'content'} label={t('content')}>
                        <DraftEditor initialValue={data?.content} formRef={formRef} name={'description'} />
                    </Form.Item>
                </div>
                <div className={'add_edit_content'}>
                    <Row>
                        <Col lg={12} className="gutter-row">
                            <FormInput label={t('Old price ')} name={'old_price'} initialValue={data?.old_price} rules={[{required: true}]} />
                            <FormInput label={t('New price')} name={'new_price'} initialValue={data?.new_price} rules={[{required: true}]} />
                            <FormInput label={t('Begins at')} name={'begins_at'} initialValue={data?.begins_at} inputType={'date'} rules={[{required: true}]} />
                            <FormInput label={t('Expired at')} name={'expired_at'} initialValue={data?.expired_at} inputType={'date'} rules={[{required: true}]} />
                            <FormInput label={t('Status')} name={'status'} inputType={'resourceSelect'}
                                       rules={[{required: true}]}
                                       initialValue={data?.status}
                                       initialData={Resources.Status}
                            />
                            <Form.Item label={t(`Top offer`)} name="top"  initialValue={data?.top}>
                                <Checkbox defaultChecked={true}/>
                            </Form.Item>
                            <FormInput label={t('Clinic')} name={'clinic_id'} inputType={'resourceSelect'}
                                       rules={[{required: true}]}
                                       initialValue={data?.clinic?.id}
                                       initialData={data?.clinic?[data.clinic]:[]}
                                       resource={'Clinic'}/>
                        </Col>
                        <Col lg={12} className="gutter-row">
                            <FormInput inputProps={{mode:'multiple'}} label={t('Doctors')} name={'doctors'} inputType={'resourceSelect'}
                                       rules={[{required: true}]}
                                       initialValue={data?.doctors?.map(e=>e.id)}
                                       initialData={data?.doctors??[]}
                                       resource={'Doctor'}
                            />
                            <FormInput label={t('Specialty')} name={'specialty_id'} inputType={'resourceSelect'}
                                       rules={[{required: true}]}
                                       initialValue={data?.specialty_id?.id}
                                       initialData={data?.specialty_id ?[data.specialty_id]:[]}
                                       resource={'Taxonomy'}/>

                            <FormInput inputProps={{mode:'multiple'}} label={t('Sub specialties')} name={'sub_specialties'} inputType={'resourceSelect'}
                                       rules={[{required: true}]}
                                       initialValue={data?.sub_specialties?.map(e=>e.id)}
                                       initialData={data?.sub_specialties ??[]}
                                       resource={'Taxonomy'}
                                       resourceParams={{type:Resources.TaxonomyTypes.SUB_SPECIALTY}}
                            />
                            <FormInput label={t('Category')} name={'category_id'} inputType={'resourceSelect'}
                                       rules={[{required: true}]}
                                       initialValue={data?.category?.id}
                                       initialData={data?.category ?[data.category]:[]}
                                       resource={'Category'}/>

                            <FormInput inputProps={{mode:'multiple'}} label={t('Sub categories')} name={'sub_categories'} inputType={'resourceSelect'}
                                       rules={[{required: true}]}
                                       initialValue={data?.sub_categories?.map(e=>e.id)}
                                       initialData={data?.sub_categories ??[]}
                                       resource={'SubCategory'}
                            />
                            <FormInput label={t('Service')} name={'service_id'} inputType={'resourceSelect'}
                                       rules={[{required: true}]}
                                       initialValue={data?.service?.id}
                                       initialData={data?.service ?[data.service]:[]}
                                       resource={'Service'}/>

                            <FormInput inputProps={{mode:'multiple'}} label={t('Sub services')} name={'sub_services'} inputType={'resourceSelect'}
                                       rules={[{required: true}]}
                                       initialValue={data?.sub_services?.map(e=>e.id)}
                                       initialData={data?.sub_services ??[]}
                                       resource={'SubService'}
                            />
                        </Col>
                    </Row>
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
export default Offer;
