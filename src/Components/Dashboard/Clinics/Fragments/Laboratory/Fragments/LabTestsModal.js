import React, {useRef, useState} from "react";
import {Form, Modal, Spin} from "antd";
import {t} from "i18next";
import FormInput from "../../../../../Fragments/FormInput";
import Resources from "../../../../../../store/Resources";



function LabTestsModal({isModalOpen,onCreate,labTestState, loading,handleClose, clinicId}) {
    const formRef = useRef();

    const handleOk =()=>{
        formRef.current.submit();
    }


    return(
        <Modal title={t("Add New Lab test")} open={isModalOpen} onOk={handleOk} onCancel={()=>handleClose(false)} okText={t("Save")} >
            <Spin spinning={loading}>
                {isModalOpen ? <Form
                    key={isModalOpen?.id+(new Date())}

                    name="edit"
                    onFinish={onCreate}
                    layout="vertical"
                    ref={formRef}
                >
                    <div  className={'add_clinic_modal'}>
                        <FormInput label={t('Lab Tests')}
                                   name={'lab_test_id'}
                                   rules={[{required: true}]}
                                   inputType={'resourceSelect'}
                                   resourceParams={{
                                       doesnt_have_clinic: clinicId,
                                       status: 2
                                   }}

                                   initialValue={isModalOpen?.lab_test?.id}
                                   initialData={isModalOpen.lab_test?[isModalOpen?.lab_test]:[]}
                                   //resourceData={labTestState}
                                   resource={'LabTest'}/>
                        


                        <FormInput inputNumberStyle={{width:'100%'}} label={t('Price')}
                                   name={'price'}
                                   rules={[{required: true}]}
                                   inputType={'number'}
                                   initialValue={isModalOpen?.price}
                        />
                    </div>
                </Form>:null}

            </Spin>

        </Modal>
    )
}
export default LabTestsModal;