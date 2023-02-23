import React, {useRef, useState} from "react";
import {Form, Modal, Spin} from "antd";
import {t} from "i18next";
import FormInput from "../../../../../Fragments/FormInput";
import Preloader from "../../../../../Preloader";


function LabTestsModal({isModalOpen,onCreate,labTests, loading, recordState}) {
    const formRef = useRef();



    const handleOk =()=>{
        formRef.current.submit();
    }


    return(
        <Modal title="Add New Test" open={isModalOpen} onOk={handleOk} onCancel={()=>onCreate()} okText={t("Save")} >
            <Spin spinning={isModalOpen===1}>
                {
                    loading ? <Preloader/> : <Form
                        name="edit"
                        onFinish={onCreate}
                        layout="vertical"
                        ref={formRef}
                    >
                        <div  className={'add_clinic_modal'}>

                            <FormInput label={t('Lab Test')}
                                       name={'lab_test_id'}
                                       inputType={'resourceSelect'}
                                       initialValue={recordState?.lab_test?.id}
                                       initialData={[]}
                                       resourceData={labTests}
                                       resource={'LabTest'}/>

                            <FormInput inputNumberStyle={{width:'100%'}} label={t('Price')}
                                       name={'price'}
                                       inputType={'number'}
                                       initialValue={recordState?.price}
                            />
                        </div>
                    </Form>
                }
            </Spin>

        </Modal>
    )
}
export default LabTestsModal;