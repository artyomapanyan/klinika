import React, {useRef} from "react";
import {Form, Modal, Spin} from "antd";
import {t} from "i18next";
import FormInput from "../../../../../Fragments/FormInput";


function RadiologyModal({isModalOpen,onCreate, radiologyState, clinicId, loading,handleClose}) {
    const formRef = useRef();

    const handleOk =()=>{
        formRef.current.submit();
    }

    return(
        <Modal title="Add New Radiology Task" open={isModalOpen} onOk={handleOk} onCancel={()=>handleClose(false)} okText={t("Save")} >
            <Spin spinning={loading}>
                {isModalOpen?<Form
                    key={isModalOpen?.id+(new Date())}

                    name="edit"
                    onFinish={onCreate}
                    layout="vertical"
                    ref={formRef}
                >
                    <div  className={'add_clinic_modal'}>
                        <FormInput label={t('Radiology tasks')}
                                   name={'radiology_task_id'}
                                   rules={[{required: true}]}
                                   inputType={'resourceSelect'}
                                   initialValue={isModalOpen?.radiology_task?.id}
                                   initialData={isModalOpen.radiology_task?[isModalOpen?.radiology_task]:[]}
                                   resourceParams={{
                                       doesnt_have_clinic: clinicId,
                                       status: 2
                                   }}
                                   resource={'RadiologyTask'}/>

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
export default RadiologyModal;