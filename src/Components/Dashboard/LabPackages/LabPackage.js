import {t} from "i18next";
import Preloader from "../../Preloader";
import {Button, Form, Space} from "antd";
import {createResource, updateResource, useGetResourceSingle} from "../../Functions/api_calls";
import resourceLinks from "../../ResourceLinks";
import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import FormInput from "../../Fragments/FormInput";
import React, {useRef} from "react";
import FileManager from "../../Fragments/FileManager";
import Resources from "../../../store/Resources";
import {InboxOutlined} from "@ant-design/icons";

const resource = 'LabPackage';

function LabPackage() {

    const params = useParams();
    const formRef = useRef();
    const navigate = useNavigate();
    let token = useSelector((state) => state.auth.token);
    const {loadingState, dataState} = useGetResourceSingle(resource, params.id)
    const {data, setData} = dataState;
    const {loading, setLoading} = loadingState
    const onFinish = (values) => {
        setLoading(true)
        if (params.id) {
            updateResource(resource, params.id, values, token,true).then(response => {
                if(response?.id){
                    setData(response)
                }
            }).finally(() => {
                setLoading(false)
            })
        } else {
            createResource(resource, values, token,true).then((response) => {
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
            <h3>{t('Add New Strings')}</h3>
            {loading ? <Preloader/> : <Form

                name="edit"
                onFinish={onFinish}
                layout="vertical"
                ref={formRef}
                initialValues={data}
            >
                <FormInput label={t('name')} name={'name'} initialValue={data?.name}/>
                <FormInput label={t('Status')} name={'status'} inputType={'resourceSelect'}
                           rules={[{required: true}]}
                           initialValue={data?.status}
                           initialData={Resources.Status}
                           />
                <FormInput label={t('Description')} name={'description'} inputType={'textArea'} initialValue={data?.description}/>

                <FormInput inputProps={{mode:'multiple'}} label={t('Category')} name={'categories'} inputType={'resourceSelect'}
                           rules={[{required: true}]}
                           initialValue={data?.categories?.map(e=>e.id)??[]}
                           initialData={data?.categories??[]}
                           resource={'Category'}
                           resourceParams={{type:Resources.TaxonomyTypes.LAB_TEST_CATEGORY}}
                />

                <FormInput inputProps={{mode:'multiple'}} label={t('Lab tests')} name={'lab_tests'} inputType={'resourceSelect'}
                           rules={[{required: true}]}
                           initialValue={data?.lab_tests?.map(e=>e.id)??[]}
                           initialData={data?.categories??[]}
                           resource={'LabTest'}
                           resourceParams={{type:Resources.TaxonomyTypes.LAB_TEST_CATEGORY}}
                />

                <FileManager text1={'Click or drag file to this area to upload'}
                             text2={'Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files'}
                             name={'cover'}
                             uploadIcon={<InboxOutlined/>}
                             initialFileList={[data.cover]} limit={1} formRef={formRef} type={'drag'}/>
                <Space>
                    <Button type={'primary'} htmlType="submit">{t('Save')}</Button>

                </Space>
            </Form>}
        </div>

    )
}

export default LabPackage;
