import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import {createResource, updateResource, useGetResourceSingle} from "../../Functions/api_calls";
import resourceLinks from "../../ResourceLinks";
import Preloader from "../../Preloader";
import {Button, Form, Input, Space} from "antd";
import ResourceSelectPaginated from "../../Fragments/ResourceSelectPaginated";
import {t} from "i18next";
import FormInput from "../../Fragments/FormInput";


const resource = 'Service';
function Service() {
    const params = useParams();
    const navigate = useNavigate();
    let token = useSelector((state) => state.auth.token);
    const {loadingState, dataState} = useGetResourceSingle(resource, params.id)
    const {data, setData} = dataState;
    const {loading, setLoading} = loadingState

    const onFinish = (values) => {
        setLoading(true)
        if (params.id) {
            updateResource(resource, params.id, values, token).then(response => {
                setData(response)
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
        <div className={'add_edit_content'}>
            <h3>{t("Add New Strings")}</h3>
            {loading ? <Preloader/> : <Form
                name="edit"
                onFinish={onFinish}
                layout="vertical"
                initialValues={{
                    ...data,
                    sub_category:data?.sub_category?.id
                }}
            >
                <FormInput label={t('name')} name={'name'} initialValue={data?.name} />

                <FormInput label={t('Sub category')} name={'sub_category'} inputType={'resourceSelect'}
                           rules={[{required: true}]}
                           initialValue={data?.sub_category}
                           initialData={data?.sub_category?[data.sub_category]:[]}
                           resource={'SubCategory'}/>


                <Space>
                    <Button type={'primary'} htmlType="submit">{t("Save")}</Button>

                </Space>
            </Form>}
        </div>
    )
}
export default Service;