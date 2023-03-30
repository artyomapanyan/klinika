import {t} from "i18next";
import Preloader from "../../Preloader";
import {Button, Form, Popconfirm, Space} from "antd";
import {createResource, updateResource, useGetResourceSingle} from "../../Functions/api_calls";
import resourceLinks from "../../ResourceLinks";
import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import FormInput from "../../Fragments/FormInput";
import React, {useRef, useState} from "react";
import FileManager from "../../Fragments/FileManager";
import Resources from "../../../store/Resources";
import {InboxOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import DraftEditor from "../../Fragments/DraftEditor";

const resource = 'LabPackage';

function LabPackage() {

    const params = useParams();
    const formRef = useRef();
    const navigate = useNavigate();
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
            updateResource(resource, params.id, values, token,true).then(response => {
                if(response?.id){
                    navigate(`${resourceLinks[resource]}?lab=packages`)
                }
            }).finally(() => {
                setSaveLoading(false)
            })
        } else {
            createResource(resource, values, token,true).then((response) => {
                if (response?.id) {
                    navigate(`${resourceLinks[resource]}?lab=packages`)
                }

            }).finally(() => {
                setSaveLoading(false)
            })
        }
    }

    let res = "Taxonomy"
    return (
        <div>
            {data?.name ? <h3 className={'create_apdate_btns'}>{t(`Editing Lab Package - ${data?.name}`)}</h3> : <h3 className={'create_apdate_btns'}>{t(`Add new Lab Package`)}</h3>}

            {loading ? <Preloader/> : <Form

                name="edit"
                onFinish={onFinish}
                layout="vertical"
                ref={formRef}
                className={'add_create_form'}
            >
                <div  className={"add_edit_content"}>
                    <FormInput label={t('name')} name={'name'} initialValue={data?.name} rules={[{required: true}]}/>
                    <FormInput label={t('Status')} name={'status'} inputType={'resourceSelect'}
                               rules={[{required: true}]}
                               initialValue={data?.status}
                               initialData={Resources.Status}
                    />
                    <Form.Item name={'description'} label={t('Description')}>
                        <DraftEditor initialValue={data?.description} formRef={formRef} name={'description'} />
                    </Form.Item>

                    <FormInput inputProps={{mode:'multiple'}} label={t('Category')} name={'categories'} inputType={'resourceSelect'}
                               rules={[{required: true}]}
                               initialValue={data?.categories?.map(e=>e.id)??[]}
                               initialData={data?.categories??[]}
                               resource={'Category'}
                    />

                    <FormInput inputProps={{mode:'multiple'}} label={t('Lab tests')} name={'lab_tests'} inputType={'resourceSelect'}
                               rules={[{required: true}]}
                               initialValue={data?.lab_tests?.map(e=>e.id)}
                               initialData={data?.lab_tests??[]}
                               resource={'Taxonomy'}
                               resourceParams={{type:Resources.TaxonomyTypes.LAB_TEST_CATEGORY}}
                    />

                    <FileManager text1={'Click or drag file to this area to upload'}
                                 text2={'Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files'}
                                 name={'cover'}
                                 uploadIcon={<InboxOutlined/>}
                                 initialFileList={[data.cover]} limit={1} formRef={formRef} type={'drag'}/>
                </div>
                <Space className={'create_apdate_btns'}>
                    <Button loading={saveLoading} size={'large'} type={'primary'} htmlType="submit">{t('Save')}</Button>
                    <Popconfirm
                        title={t("Your hours will not be protected")}
                        onConfirm={() => navigate(`${resourceLinks[res]}?lab=packages`) }
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

export default LabPackage;
