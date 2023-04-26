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

function DoctorReworkedCalendarDrawer() {
    const drReworked = useSelector((state) => state?.owner);

    const [startDate,setStartDate] = useState(dayjs())
    const [dateClickState, setDateClickState] = useState(null)
    const handleChangeMonth =(count)=>{
        setStartDate((prevState)=>prevState.add(count,'month'))
    }
    const handleChangeDay =(count)=>{
        setStartDate((prevState)=>prevState.add(count,'day'))
    }


    const onDateClick = (key) => {
        console.log(key)
        setDateClickState()
    }


    return(
        <div>
            <FormInput label={t('Select patient')} name={'status'} inputType={'resourceSelect'}
                       initialData={Resources.Status}
            />
            <FormInput label={t('Doctor name')}  />
            <FormInput label={t('Specialty')} name={'status'} inputType={'resourceSelect'}
                       initialData={Resources.Status}
            />
            <div className={'drawer_cal_bog_div'}>
                <div className={'drawer_cal_top_div'}>
                    <div className={'drawer_cal_head_div'}>
                        <div className={'top_div_title'}>
                            Pick Date
                        </div>
                        <div className={'next_prev_div'}>
                            <Button className={'next_prev_btn'}><LeftOutlined style={{color:'#ffffff'}}/></Button>
                            <div className={'top_div_title'}>{t(GMBK(drReworked.month_key))}</div>
                            <Button className={'next_prev_btn'}><RightOutlined style={{color:'#ffffff'}}/></Button>
                        </div>
                    </div>
                    <div>
                        <div >
                            <div className={'week_day_div'}>

                            </div>
                            <div className={'big_date_div'}>
                                {[...[...Array(6).keys()]].map((e,key)=>{
                                    return <div key={key} className={'week_date_div'} onClick={()=>onDateClick(key)}>
                                        <div  className={'date_div_in_map'}>
                                            {startDate.add(key, 'day').format('DD')}
                                        </div>
                                        <div style={{borderBottom: '1px solid #ffffff77', width:'100%'}}></div>
                                        <div key={key} className={'date_div_in_map'}>
                                            {startDate.add(key, 'day').format('DD')}
                                        </div>
                                    </div>
                                })}
                                <div className={'next_btn'}>
                                    <img alt={'arrow_right_white'} src={arrow_right_white}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className={'drawer_cal_bottom_div'}>
                    <div className={'drawer_cal_head_div'}>
                        <div className={'top_div_title'}>
                            Select Time
                        </div>
                    </div>
                </div>
            </div>
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