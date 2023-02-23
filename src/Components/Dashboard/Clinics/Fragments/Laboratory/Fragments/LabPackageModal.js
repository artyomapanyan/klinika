import React, {useRef} from "react";
import {Form, Modal, Spin} from "antd";
import {t} from "i18next";
import FormInput from "../../../../../Fragments/FormInput";


function LabPackageModal({isModalOpen,onCreate,labPackagesState, loading,handleClose}) {
    const formRef = useRef();

    const handleOk =()=>{
        formRef.current.submit();
    }

    return(
        <Modal title="Add New Package" open={isModalOpen} onOk={handleOk} onCancel={()=>handleClose(false)} okText={t("Save")} >
            <Spin spinning={loading}>
                {isModalOpen?<Form
                    key={isModalOpen?.id}

                        name="edit"
                        onFinish={onCreate}
                        layout="vertical"
                        ref={formRef}
                    >
                        <div  className={'add_clinic_modal'}>
                            <FormInput label={t('Lab Packages')}
                                       name={'lab_package_id'}
                                       rules={[{required: true}]}
                                       inputType={'resourceSelect'}
                                       initialValue={isModalOpen?.lab_package?.id}
                                       initialData={isModalOpen.lab_package?[isModalOpen?.lab_package]:[]}
                                       resourceData={labPackagesState}
                                       resource={'LabPackage'}/>

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
export default LabPackageModal;