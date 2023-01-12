import React from 'react';
import {Button, Form, Space} from 'antd';
import "./Country.sass"
import {createResource, updateResource, useGetResourceSingle} from "../../../Functions/api_calls";
import {useNavigate, useParams} from "react-router";
import Preloader from "../../../Preloader";
import {useSelector} from "react-redux";
import resourceLinks from "../../../ResourceLinks";
import {t} from "i18next";
import FormInput from "../../../Fragments/FormInput";
import "../../../../dist/styles/Styles.sass";

const resource = 'Country';

function Country() {
    const params = useParams();
    const navigate = useNavigate();
    let token = useSelector((state) => state.auth.token);
    const {loadingState, dataState} = useGetResourceSingle(resource, params.id)
    const {data, setData} = dataState;
    const {loading, setLoading} = loadingState
    const onFinish = (values) => {
        setLoading(true)
        setData((prevState)=>({
            ...prevState,
            ...values
        }))
        if (params.id) {
            updateResource(resource, params.id, values, token).then(response => {
                if(response?.id){
                    setData(response)
                }
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

    return (
        <div className={"add_edit_content"}>
            {data?.name ? <h3>{t(`Editing Country - ${data?.name}`)}</h3> : <h3>{t(`Add new Country`)}</h3>}
            {loading ? <Preloader/> : <Form

                name="edit"
                onFinish={onFinish}
                layout="vertical"
            >
                    <FormInput label={t('name')} name={'name'} initialValue={data?.name} rules={[{required: true}]} />
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
                    <FormInput
                        label={t('Alpha3 code')}
                        name={'alpha3_code'}
                        rules={[
                            {
                                required: true,
                                len:3
                            },
                        ]}
                        initialValue={data?.alpha3_code}
                    >
                    </FormInput>

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

                <Space>
                    <Button size={'large'} type={'primary'} htmlType="submit">{t('Save')}</Button>
                    <Button size={'large'} onClick={()=>(navigate(resourceLinks[resource]))} type={'secondary'} htmlType="submit">{t('Cancel')}</Button>
                </Space>
            </Form>}
        </div>

    )
}

export default Country;
