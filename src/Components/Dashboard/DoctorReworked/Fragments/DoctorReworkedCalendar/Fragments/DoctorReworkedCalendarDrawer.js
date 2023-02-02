import React from "react";
import {t} from "i18next";
import FormInput from "../../../../../Fragments/FormInput";
import Resources from "../../../../../../store/Resources";
import {Button, Tag} from "antd";

function DoctorReworkedCalendarDrawer() {
    let time = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00']
    return(
        <div>
            <FormInput label={t('Select patient')} name={'status'} inputType={'resourceSelect'}
                       initialData={Resources.Status}
            />
            <FormInput label={t('Specialty')} name={'status'} inputType={'resourceSelect'}
                       initialData={Resources.Status}
            />
            <FormInput label={t('Doctor name')}  />
            <FormInput label={t('Date')} name={'date'}  inputType={'date'}  />
            <div>
                {
                    time.map((el) => {
                        return <Tag color="#dee0df" size={'large'} style={{fontSize:14, fontWeight:550, color:"black", marginTop:20, padding:8, borderRadius:12}}>{el}</Tag>
                    })
                }
            </div>
            <div style={{paddingTop:20}}>
                <Button size={'large'} type={'primary'} style={{width:'100%'}}>Book</Button>
            </div>
            <div style={{paddingTop:20}}>
                <Button size={'large'} type={'secondary'} style={{width:'100%'}}>Cancel</Button>
            </div>


        </div>
    )
}
export default DoctorReworkedCalendarDrawer;