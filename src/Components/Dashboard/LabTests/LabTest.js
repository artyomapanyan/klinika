
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

    const onFinish = (values) => {
        setSaveLoading(true)
        setData((prevState)=>({
            ...prevState,
            ...values
        }))
        if (params.id) {
            updateResource(resource, params.id, values, token).then(response => {
                if(response?.id){
                    navigate(`${resourceLinks[resource]}?lab=tests`)
                }
            }).finally(() => {
                setSaveLoading(false)
            })
        } else {
            createResource(resource, values, token).then((response) => {
                if (response?.id) {
                    navigate(`${resourceLinks[resource]}?lab=tests`)
                }

            }).finally(() => {
                setSaveLoading(false)
            })
        }
    }
    let res = "Taxonomy"

    return(
        <div>
            {data?.name ? <h3 className={'create_apdate_btns'}>{t(`Editing Lab Test - ${data?.name}`)}</h3> : <h3 className={'create_apdate_btns'}>{t(`Add new Lab Test`)}</h3>}
            {loading ? <Preloader/> : <Form
                name="edit"
                onFinish={onFinish}
                layout="vertical"
                ref={formRef}
            >
                <div className={'add_edit_content'}>
                    <FormInput label={t('name')} name={'name'} rules={[{required: true}]} initialValue={data?.name}/>

                    <FormInput inputProps={{mode:'multiple'}} label={t('Category')} name={'categories'} inputType={'resourceSelect'}
                               rules={[{required: true}]}
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
                    <Popconfirm
                        title={t("Your hours will not be protected")}
                        onConfirm={() => navigate(`${resourceLinks[res]}?lab=tests`) }
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
export default LabTest;
