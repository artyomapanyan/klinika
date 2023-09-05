import React, {useRef} from "react";
import {t} from "i18next";
import {Button, Form, Modal, Spin} from "antd";
import FormInput from "../../../../../Fragments/FormInput";


function ManageDoctorsModal({isModalOpen,onCreate}) {

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
        <Modal key={Math.random()} title={t("Add new doctor")} open={isModalOpen} onOk={handleOk} onCancel={()=>onCreate()} okText={t("Save")} >
            <Spin spinning={isModalOpen===1}>
                <Form
                    name="edit"
                    onFinish={onCreate}
                    layout="vertical"
                    ref={formRef}
                >
                    <div  className={'add_clinic_modal'}>

                        {/*<FormInput label={t('Doctor')} name={'doctor_id'} inputType={'resourceSelect'}*/}
                        {/*           rules={[{required: true}]}*/}
                        {/*           initialValue={null}*/}
                        {/*           initialData={[]}*/}
                        {/*           customSearchKey={'name_or_phone'}*/}
                        {/*           resource={'Doctor'}/>*/}


                        <FormInput label={t('Search by phone number or name or plid')} name={'doctor_id'}
                                   searchConfigs={{minLength: 5}}
                                   inputType={'resourceSelect'}
                                   rules={[{required: true}]}
                                   resource={'Doctor'}
                                   resourceParams={{
                                       type: 'doctor',
                                   }}
                                   customSearchKey={'name_or_phone'}
                                   initialValue={null}
                                   initialData={[]}

                        />

                        {/*<FormInput label={t('Select Doctor (Search by phone number or name)')} name={'doctor_id'}*/}
                        {/*           inputType={'resourceSelect'}*/}
                        {/*           rules={[{required: true}]}*/}
                        {/*           searchConfigs={{minLength: 5}}*/}
                        {/*           initialValue={null}*/}
                        {/*           inputProps={{*/}
                        {/*               notFoundContent: <div*/}
                        {/*                   style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>*/}
                        {/*                   <div>Not found</div>*/}
                        {/*                   </div>*/}
                        {/*           }}*/}
                        {/*           initialData={[]}*/}
                        {/*           handleMapItems={(item, name) => searchByNumber(item, name)}*/}
                        {/*           customSearchKey={'name_or_phone'}*/}

                        {/*           resource={'Doctor'}/>*/}
                    </div>
                </Form>
            </Spin>

        </Modal>
    )
}
export default ManageDoctorsModal;