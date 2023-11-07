import React, {useRef, useState} from 'react';
import dark_delete_icon from "../../../../../dist/icons/dark_delete_icon.png";
import {Button, Form, Spin} from "antd";
import {t} from "i18next";
import FormInput from "../../../../Fragments/FormInput";
import {postResource} from "../../../../Functions/api_calls";
import {useSelector} from "react-redux";

import dayjs from "dayjs";

let resource = 'Appointment';



function PrivateNotesModal({data, setData}) {
    let token = useSelector((state) => state.auth.token);
    let roleForPrivateNotes = useSelector((state) => state);
    const [notes, setNotes] = useState(JSON.parse(data.private_notes));
    const [buttonLoading,setButtonLoading] = useState(false)
    const [removeLoading,setRemoveLoading] = useState(false)
    const formRef = useRef();


    const onFinish = (values)=>{
        setButtonLoading(true)
        if(notes) {
            handleSubmit([...notes, {...values, time: dayjs().format('YYYY-MM-DD HH:mm')}]).then(()=>{
                setButtonLoading(false)

            })
        } else {
            handleSubmit([{...values, time: dayjs().format('YYYY-MM-DD HH:mm')}]).then(()=>{
                setButtonLoading(false)

            })
        }




    }

    const handleSubmit = (notes,isDelete) => {
       return postResource(resource, 'PrivateNotes', token, `${data.id}/${isDelete?'update':'add'}-private-notes`, {
            private_notes: notes
        },{
           method:isDelete?'PUT':'POST'
       }).then((response) => {
            setNotes(JSON.parse(response.private_notes))
           setData(prevState => ({
               ...prevState,
               private_notes: JSON.stringify(notes)
           }))
            formRef.current.resetFields()
           return response

        })
    }
    const handleRemove =(key)=>{
        const newData = [...notes]
        delete newData[key];
        setRemoveLoading(key)
        handleSubmit(Object.values(newData),true).then(()=>{
            setRemoveLoading(false)
        })

    }



    return(
        <div className={'private_notes_modal_big_div'}>
            <div style={{borderBottom: '1px dashed #c2c1c1', marginTop: 24}}></div>
            {notes?.map((note,key)=>  <div key={key} className={'private_notes_modal_map_conteiner'}>
                <div className={'data_text'}>
                    {note.note}
                </div>
                <div className={'date_delete_icon'}>
                    <div>{dayjs(note.time).format('DD MMM YYYY HH:mm')}</div>
                    {removeLoading===key?<Spin/>: roleForPrivateNotes?.auth?.selected_role?.key == 'super' || roleForPrivateNotes?.auth?.selected_role?.key === 'doctor' ? <div style={{cursor: 'pointer'}} onClick={()=>handleRemove(key)}><img alt={'dark_delete_icon'} src={dark_delete_icon}/></div> : <div></div>}
                </div>
            </div>)}


            <Form
                onFinish={onFinish}
                ref={formRef}

            >
                {
                    roleForPrivateNotes?.auth?.selected_role?.key == 'super' || roleForPrivateNotes?.auth?.selected_role?.key === 'doctor'  ?  <div className={'private_nots_modal_footer'}>
                        <div style={{width: '80%'}}>
                            <FormInput label={t('Name')} name={'note'} rules={[{required: true}]} maxLength={200}/>
                        </div>
                        <div style={{width: '20%'}}>
                            <Button type={'primary'} className={'private_notes_add_btn'} htmlType={'submit'} loading={buttonLoading}>{t('Add')}</Button>
                        </div>

                    </div> : <div></div>
                }

            </Form>
        </div>

    )
}

export default PrivateNotesModal;