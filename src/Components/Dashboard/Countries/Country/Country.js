import React, {useState} from 'react';
import {Button, Col, Form, Popconfirm, Row, Space} from 'antd';
import {createResource, updateResource, useGetResourceSingle} from "../../../Functions/api_calls";
import {useNavigate, useParams} from "react-router";
import Preloader from "../../../Preloader";
import {useSelector} from "react-redux";
import resourceLinks from "../../../ResourceLinks";
import {t} from "i18next";
import FormInput from "../../../Fragments/FormInput";
import "../../../../dist/styles/Styles.sass";
import {QuestionCircleOutlined} from "@ant-design/icons";
import CancelComponent from "../../../Fragments/CancelComponent";

const resource = 'Country';

function Country() {
    const params = useParams();
    const navigate = useNavigate();
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
            updateResource(resource, params.id, values, token).then(response => {
                if(response?.id){
                    navigate(-1)
                }
            }).finally(() => {
                setSaveLoading(false)
            })
        } else {
            createResource(resource, values, token).then((response) => {
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
        changed.length = 5
    }


    return (
        <div>
            {data?.name ? <h3 className={'create_apdate_btns'}>{t(`Editing Country - ${data?.name}`)}</h3> : <h3 className={'create_apdate_btns'}>{t(`Add new Country`)}</h3>}
            {loading ? <Preloader/> : <Form

                name="edit"
                onFinish={onFinish}
                onValuesChange={handleValuesChange}
                layout="vertical"
                className={'add_create_form'}
            >
                <div className={'add_edit_content'}>
                    <div className="gutter-row">
                        <FormInput label={t('name')} name={'name'} initialValue={data?.name} rules={[{required: true}]} />
                    </div>
                    <Row>
                        <Col lg={12} className="gutter-row">
                            <FormInput
                                label={t('Alpha2 code')}
                                name={'alpha2_code'}
                                rules={[
                                    {
                                        required: true,
                                        len:2
                                    },

                                ]}
                                initialValue={data?.alpha2_code}
                            >

                            </FormInput>
                            <FormInput label={t('Alpha3 code')} name={'alpha3_code'} rules={[
                                {
                                    required: true,
                                    len:3
                                },
                            ]}
                                       initialValue={data?.alpha3_code}
                            >
                            </FormInput>
                        </Col>
                        <Col lg={12} className="gutter-row">
                            <FormInput
                                label={t('Phone code')}
                                name={'phone_code'}
                                rules={[
                                    {
                                        required: true,
                                        len:3
                                    },
                                ]}
                                initialValue={data?.phone_code}
                            >
                            </FormInput>

                            <FormInput label={t('Language')} name={'language_id'} inputType={'resourceSelect'}
                                       rules={[{required: true}]}
                                       initialValue={data?.language?.id}
                                       initialData={data?.language?[data.language]:[]}
                                       resource={'Country'}/>
                        </Col>
                    </Row>
                </div>


                <Space className={'create_apdate_btns'}>
                    <Button loading={saveLoading} size={'large'} type={'primary'} htmlType="submit">{t('Save')}</Button>
                    <CancelComponent changeValuesState={changeValuesState} />
                </Space>
            </Form>}
        </div>

    )
}

export default Country;
