import React, {useRef} from "react";
import {t} from "i18next";
import {Form, Modal, Spin} from "antd";
import FormInput from "../../../../../Fragments/FormInput";


function ManageDoctorsModal({isModalOpen,onCreate}) {

    const formRef = useRef();

    const handleOk =()=>{
        formRef.current.submit();
    }
    return(
        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={()=>onCreate()} okText={t("Save")} >
            <Spin spinning={isModalOpen===1}>
                <Form
                    name="edit"
                    onFinish={onCreate}
                    layout="vertical"
                    ref={formRef}
                >
                    <div  className={'add_clinic_modal'}>

                        <FormInput label={t('Doctor')} name={'doctor_id'} inputType={'resourceSelect'}
                                   rules={[{required: true}]}
                                   initialValue={null}
                                   initialData={[]}
                                   resource={'Doctor'}/>
                    </div>
                </Form>
            </Spin>

        </Modal>
    )
}
export default ManageDoctorsModal;