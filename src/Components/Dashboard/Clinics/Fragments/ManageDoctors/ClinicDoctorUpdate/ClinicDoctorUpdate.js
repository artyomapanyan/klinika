import React, {useEffect, useRef} from "react";
import {Button, Form} from "antd";
import resourceLinks from "../../../../../ResourceLinks";
import Arrow_back_black from "../../../../../../dist/icons/Arrow_back_black.png";
import {MoreOutlined} from "@ant-design/icons";
import ClinicTabBars from "../../ClinicTabBars";
import TabGeneralInfo from "./ClinicDoctorTabs/TabGeneralInfo";


function ClinicDoctorUpdate() {
    let formRef = useRef();




    return(
        <div style={{backgroundColor: '#ffffff'}} className={'clinic_tab_big_div'}>
                <div className={'clinic_header_div'}>
                    <div className={'clinic_header_left_div'}>
                        <Button className={'clinic_back_btn'} ><img
                            alt={'Arrow_back_black'} src={Arrow_back_black}/></Button>
                        <span style={{fontSize: 24, fontWeight: 700}}>Clinic name</span>
                    </div>
                    <div className={'clinic_header_right_div'}>
                        <Button className={'add_btn'} size={'large'} type={'primary'}>Save changes</Button>
                        <Button className={'add_btn'} size={'large'} type={'secondary'}>Cancel</Button>
                        <MoreOutlined style={{fontSize: 28}}/>
                    </div>

                </div>

                <ClinicTabBars >
                    <items key={'general_information'} tab={'General information'}>
                        <TabGeneralInfo formRef={formRef}/>
                    </items>
                    <items key={'working_hours'} tab={'Working hours'} >

                    </items>
                    <items key={'services'} tab={'Services'}>

                    </items>

                </ClinicTabBars>


        </div>
    )
}
export default ClinicDoctorUpdate;