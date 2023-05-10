
import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import {createResource, updateResource, useGetResourceSingle} from "../../Functions/api_calls";
import resourceLinks from "../../ResourceLinks";
import Preloader from "../../Preloader";
import {Button, Form, Popconfirm, Space} from "antd";
import React, {useRef, useState} from "react";
import {t} from "i18next";
import FormInput from "../../Fragments/FormInput";
import Resources from "../../../store/Resources";
import {QuestionCircleOutlined} from "@ant-design/icons";

const resource = 'LabTest';

function LabTest() {
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
    let res = "Taxonomy"

    return(
        <div>
            {data?.name ? <h3 className={'create_apdate_btns'}>{t(`Editing Lab Test - ${data?.name}`)}</h3> : <h3 className={'create_apdate_btns'}>{t(`Add new Lab Test`)}</h3>}
            {loading ? <Preloader/> : <Form
                name="edit"
                onFinish={onFinish}
                onValuesChange={handleValuesChange}
                layout="vertical"
                ref={formRef}
                className={'add_create_form'}
            >
                <div className={'add_edit_content'}>
                    <FormInput label={t('name')} name={'name'} rules={[{required: true}]} initialValue={data?.name}/>

                    <FormInput inputProps={{mode:'multiple'}} label={t('Category')} name={'categories'} inputType={'resourceSelect'}
                              // rules={[{required: true}]}
                               initialValue={data?.categories?.map(e=>e.id)??[]}
                               initialData={data?.categories??[]}
                               resource={'Category'}
                    />
                    <FormInput label={t('Status')} name={'status'} inputType={'resourceSelect'}
                               rules={[{required: true}]}
                               initialValue={data?.status}
                               initialData={Resources.Status}
                    />
                </div>
                <Space className={'create_apdate_btns'}>
                    <Button loading={saveLoading} size={'large'} type={'primary'} htmlType="submit">{t("Save")}</Button>
                    {
                        Object.keys(changeValuesState).length > 0 ? <Popconfirm
                            title={t("your changes will not be saved")}
                            onConfirm={() => navigate(-1)}
                            okText={t("Yes")}
                            cancelText={t("No")}
                            icon={<QuestionCircleOutlined style={{color: 'red'}}/>}>
                            <Button size={'large'} type={'secondary'} >{t('Cancel')}</Button>
                        </Popconfirm> : <Button onClick={() => navigate(-1)} size={'large'} type={'secondary'} >{t('Cancel')}</Button>
                    }

                </Space>
            </Form>}
        </div>
    )
}
export default LabTest;
