import React, {useRef} from "react";
import {Form, Modal, Spin} from "antd";
import {t} from "i18next";
import FormInput from "../../../../Fragments/FormInput";

function ManageUsersModal({isModalOpenUser,onCreateUser}) {

    const formRef = useRef();

    const handleOk =()=>{
        formRef.current.submit();
    }

    const searchByNumber = (item, name) => {
        name = <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '11px'}}>
            <div>{item.first} {item.last}</div>
            <div>+{item.phone_country_code}{item.phone_number}</div>
        </div>
        let searchData = item.phone_number + item.email;
        return [name, item, searchData]
    }


    return(
        <Modal key={Math.random()} title={t("Add new user")} open={isModalOpenUser} onOk={handleOk} onCancel={()=>onCreateUser()} okText={t("Save")} >
            <Spin spinning={isModalOpenUser===1}>
                <Form
                    name="edit"
                    onFinish={onCreateUser}
                    layout="vertical"
                    ref={formRef}
                >
                    <div  className={'add_clinic_modal'}>



                        <FormInput label={t('Search by phone number or name or plid')} name={'medical_staff_id'}
                                   // searchConfigs={{minLength: 5}}
                                   inputType={'resourceSelect'}
                                   rules={[{required: true}]}
                                   resource={'MedicalStaff'}
                                   // resourceParams={{
                                   //     page: null,
                                   // }}
                                   customSearchKey={'name_or_phone'}
                                   initialValue={null}
                                   initialData={[]}

                        />


                    </div>
                </Form>
            </Spin>

        </Modal>
    )
}
export default ManageUsersModal;