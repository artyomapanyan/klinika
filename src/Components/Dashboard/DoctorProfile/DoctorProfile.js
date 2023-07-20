import React, {useRef, useState} from "react";
import {useNavigate, useParams} from "react-router";
import {updateResource, useGetResourceSingle} from "../../Functions/api_calls";
import {Button} from "antd";
import Arrow_back_black from "../../../dist/icons/Arrow_back_black.png";
import {MoreOutlined} from "@ant-design/icons";
import Preloader from "../../Preloader";
import ClinicTabBars from "../Clinics/Fragments/ClinicTabBars";

import DoctorGeneralInfo from "./DoctorGeneralInfo/DoctorGeneralInfo";
import {useSelector} from "react-redux";


let resource = 'DoctorUpdateProfile';
function DoctorProfile() {
    const navigate = useNavigate();
    const formRefs = {
        general_information: useRef(),
        working_hours:{
            telehealth: useRef(),
            clinic_visit: useRef(),
        }
    }
    let token = useSelector((state) => state.auth.token);
    const saveFunctions ={
        general_information:(data)=>{

        },
        workingHours:{

        }
    }

    let params = useParams();

    const [tab, setTab] = useState('general_information');
    const [saveLoading, setSaveLoading] = useState(false)


    const {loadingState, dataState} = useGetResourceSingle('ClinicDoctor', params.id,)
    const {data, setData} = dataState;
    const {loading, setLoading} = loadingState
    const handleChange = (e) => {
        setTab(e)

    }
    // const handleSave = ()=>{
    //     console.log(tab,formRefs)
    //     if(formRefs[tab].current){
    //         console.log('sdasd')
    //         formRefs[tab].current.validateFields().then((e,d)=>{
    //             console.log(e.errorFields,d)
    //         }).catch(e=>{
    //             console.log(e)
    //         })
    //     }else{
    //         console.log('sdasd')
    //         Promise.all(Object.keys(formRefs[tab]).map(refKey=>formRefs[tab][refKey].current.submit())).then(datas=>{
    //             console.log(datas)
    //         })
    //
    //     }
    //
    // }

    const handleSave = () => {
        setSaveLoading(true)
        let values = formRefs?.general_information?.current?.getFieldValue();
        updateResource(resource, '', values, token).then(response => {
            if(response?.id){

            }
        }).finally(() => {
            setSaveLoading(false)
        })
    }

    const onBack = () => {
        navigate(-1)
    }



    return(
        <div style={{backgroundColor: '#ffffff'}} className={'clinic_tab_big_div'}>

            <div className={'clinic_header_div'}>
                <div className={'clinic_header_left_div'}>
                    <Button onClick={onBack} className={'clinic_back_btn'} ><img
                        alt={'Arrow_back_black'} src={Arrow_back_black}/></Button>
                    <span style={{fontSize: 24, fontWeight: 700}}>Your profile</span>
                </div>
                <div className={'clinic_header_right_div'}>
                    <Button loading={saveLoading} className={'add_btn'} size={'large'} type={'primary'} onClick={handleSave} >Save changes</Button>
                    <Button className={'add_btn'} size={'large'} type={'secondary'}>Cancel</Button>
                    <MoreOutlined style={{fontSize: 28}}/>
                </div>

            </div>



            {loading?<Preloader/>:<ClinicTabBars onChange={handleChange}>
                <items key={'general_information'} tab={'General information'}  >
                    <DoctorGeneralInfo formRef={formRefs.general_information} data={data} saveLoading={saveLoading} setSaveLoading={setSaveLoading}/>
                </items>
                <items key={'working_hours'} tab={'Working hours'} >
                    aaaaaaa
                    {/*<ClinicDoctorWorkingHours workingHRefs={formRefs.working_hours} data={data}/>*/}
                </items>

            </ClinicTabBars>}


        </div>
    )
}
export default DoctorProfile