import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import {createResource, updateResource, useGetResourceSingle} from "../../Functions/api_calls";
import resourceLinks from "../../ResourceLinks";
import Preloader from "../../Preloader";
import {Button, Form, Popconfirm, Space} from "antd";
import {t} from "i18next";
import FormInput from "../../Fragments/FormInput";
import React, {useState} from "react";
import {QuestionCircleOutlined} from "@ant-design/icons";
import CancelComponent from "../../Fragments/CancelComponent";


const resource = 'Service';
function Service() {
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
    }


    return (
        <div>
            {data?.name ? <h3 className={'create_apdate_btns'}>{t(`Editing Service - ${data?.name}`)}</h3> : <h3 className={'create_apdate_btns'}>{t(`Add new Service`)}</h3>}
            {loading ? <Preloader/> : <Form
                name="edit"
                onFinish={onFinish}
                onValuesChange={handleValuesChange}
                layout="vertical"
                className={'add_create_form'}
            >
                <div className={'add_edit_content'}>
                    <FormInput label={t('name')} name={'name'} initialValue={data?.name} rules={[{required: true}]}/>

                    <FormInput label={t('Sub category')} name={'sub_category_id'} inputType={'resourceSelect'}
                               rules={[{required: true}]}
                               initialValue={data?.sub_category?.id}
                               initialData={data?.sub_category?[data.sub_category]:[]}
                               resource={'SubCategory'}/>
                </div>
                <Space className={'create_apdate_btns'}>
                    <Button loading={saveLoading} size={'large'} type={'primary'} htmlType="submit">{t("Save")}</Button>
                    <CancelComponent changeValuesState={changeValuesState} resource={resource}/>
                </Space>
            </Form>}
        </div>
    )
}
export default Service;
