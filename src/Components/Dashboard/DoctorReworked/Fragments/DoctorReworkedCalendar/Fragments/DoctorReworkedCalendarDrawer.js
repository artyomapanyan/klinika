import React, {useState} from "react";
import {t} from "i18next";
import FormInput from "../../../../../Fragments/FormInput";
import Resources from "../../../../../../store/Resources";
import {Button, Space, Tag} from "antd";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import dayjs from "dayjs";
import arrow_right_white from "../../../../../../dist/icons/arrow_right_white.png";
import {useSelector} from "react-redux";
import {GMBK} from "../../../../../../functions";
import DateTimeSelect from "./DateTimeSelect";

function DoctorReworkedCalendarDrawer() {
    const drReworked = useSelector((state) => state?.owner);



    return(
        <div>
            <FormInput label={t('Select patient')} name={'status'} inputType={'resourceSelect'}
                       initialData={Resources.Status}
            />
            <FormInput label={t('Doctor name')}  />
            <FormInput label={t('Specialty')} name={'status'} inputType={'resourceSelect'}
                       initialData={Resources.Status}
            />

                   <DateTimeSelect/>

            <div style={{paddingTop:20}}>
                <Button className={'btn_add_entry'} type={'primary'}>Add Entry</Button>
            </div>
            <div style={{paddingTop:10}}>
                <Button className={'btn_cancel_drawer'}  type={'secondary'}>Cancel</Button>
            </div>


        </div>
    )
}
export default DoctorReworkedCalendarDrawer;