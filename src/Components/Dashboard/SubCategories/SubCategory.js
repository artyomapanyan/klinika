import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import {createResource, updateResource, useGetResourceSingle} from "../../Functions/api_calls";
import resourceLinks from "../../ResourceLinks";
import Preloader from "../../Preloader";
import {Button, Form, Input, Space} from "antd";
import ResourceSelectPaginated from "../../Fragments/ResourceSelectPaginated";
import {t} from "i18next";

const resource = 'SubCategory';
function SubCategory() {
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
        <div>
            <h3>{t("Add New Strings")}</h3>
            {loading ? <Preloader/> : <Form
                name="edit"
                onFinish={onFinish}
                layout="vertical"
                initialValues={{
                    ...data,
                    category_id:data?.category?.id
                }}
            >
                <Form.Item label={t('Name')} name={'name'}>
                    <Input/>
                </Form.Item>
                <ResourceSelectPaginated name={'category_id'} label={t('Category')} rules={[
                    {
                        required: true,
                    }
                ]} resource={'Category'} initialData={data?.category?[data.category]:[]}/>

                <Space>
                    <Button type={'primary'} htmlType="submit">{t("Save")}</Button>

                </Space>
            </Form>}
        </div>
    )
}
export default SubCategory;