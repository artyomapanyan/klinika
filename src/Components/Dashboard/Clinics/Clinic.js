

import React, {useEffect, useState} from "react";
import ClinicTabEssentials from "./Fragments/ClinicTabEssentials";
import ClinicWorkingHours from "./Fragments/ClinicWorkingHours/ClinicWorkingHours";
import {useGetResourceSingle} from "../../Functions/api_calls";
import {useNavigate, useParams} from "react-router";
import {useSearchParams} from "react-router-dom";
import HomeVisit from "./Fragments/HomeVisit/HomeVisit";

import ClinicVisit from "./Fragments/ClinicVisit/ClinicVisit";

import ClinicTabBars from "./Fragments/ClinicTabBars";
import Preloader from "../../Preloader";
import {useSelector} from "react-redux";
import ClinicTabManageDoctors from "./Fragments/ManageDoctors/ClinicTabManageDoctors";
import "../../Dashboard/OwnerClinics/ClinicOwnerStyles/ClinicOwnerStyles.sass"
import Laboratory from "./Fragments/Laboratory/Laboratory";
import Nursing from "./Fragments/Nursing/Nursing";
import Telehealth from "./Fragments/Telehealth/Telehealth";
import LaboratoryHomeVisit from "./Fragments/LaboratoryHomeVisit/LaboratoryHomeVisit";
import PhysicalTherapyClinicVisit from "./Fragments/PhysicalTherapyClinicVisit/PhysicalTherapyClinicVisit";
import PhysicalTherapyHomeVisit from "./Fragments/PhysicalTherapyHomeVisit/PhysicalTherapyHomeVisit";


const resource = "Clinic"

function Clinic() {
    let navigate = useNavigate();
    const params = useParams();
    let locale = useSelector((state) => state?.app?.current_locale);
    const [lang, setLang] = useState(locale)
    const {loadingState, dataState,addDataState} = useGetResourceSingle(resource, params.id, {
        PaymentMethod:{
            status: 2
        },
    }, null, lang)
    const [tab, setTab] = useState();
    const [searchParams, setSearchParams] = useSearchParams()

    const {loading} = loadingState

    useEffect(() => {
        setTab(searchParams.get('tab') ?? 'essentials')
    }, [])

    const handleChange = (e) => {
        setTab(e)
        setSearchParams({tab: e})
    }
    const handleLangChange = (e) => {
        setLang(e.target.value)
    }


    return (
        <div  className={'clinic_tab_big_div'}>
            {/*<div className={'clinic_header_div'}>*/}
            {/*    <div className={'clinic_header_left_div'}>*/}
            {/*        <Button className={'clinic_back_btn'} onClick={() => navigate(resourceLinks[resource])}><img*/}
            {/*            alt={'Arrow_back_black'} src={Arrow_back_black}/></Button>*/}
            {/*        <span style={{fontSize: 24, fontWeight: 700}}>Clinic name</span>*/}
            {/*    </div>*/}
            {/*    <div className={'clinic_header_right_div'}>*/}
            {/*        <Button className={'add_btn'} size={'large'} type={'primary'}>Save changes</Button>*/}
            {/*        <Button className={'add_btn'} size={'large'} type={'secondary'}>Cancel</Button>*/}
            {/*        <MoreOutlined style={{fontSize: 28}}/>*/}
            {/*    </div>*/}

            {/*</div>*/}

            {loading ? <Preloader/> : <ClinicTabBars onChange={handleChange} activeKey={tab}>
                <items key={'essentials'} tab={'Essentials'}>
                    <ClinicTabEssentials loadingState={loadingState} dataState={dataState}
                                         lang={lang}
                                         addDataState={addDataState}
                                         handleLangChange={handleLangChange}/>
                </items>
                {params.id && <items key={'manage'} tab={'Manage Doctors'} disabled={!params.id}>
                    {/*<SecondClinicTabManageDoctors  />*/}
                    <ClinicTabManageDoctors dataService={dataState?.data}/>
                </items>}
                {params.id ? <items key={'working'} tab={'Working hours'}>
                    <ClinicWorkingHours loadingState={loadingState} dataState={dataState} tab={tab}/>
                </items> : null}
                {params.id && dataState.data.has_telehealth_service && dataState.data.enable_telehealth_service ? <items key={'Telehealth'} tab={'Telehealth'}>
                    <Telehealth loadingState={loadingState} dataState={dataState} tab={tab}/>
                </items> : null}
                {dataState.data.has_clinic_visit_service && dataState.data.enable_clinic_visit_service && params.id ?
                    <items key={'clinic_visit'} tab={'Clinic Visit'} disabled={!params.id}>
                        <ClinicVisit tab={tab}/>
                    </items> : null}
                {dataState.data.has_home_visit_service && dataState.data.enable_home_visit_service && params.id ?
                    <items key={'home_visit'} tab={'Home Visit'} disabled={!params.id}>
                        <HomeVisit tab={tab}/>
                    </items> : null}



                {dataState.data.has_laboratory_clinic_visit_service && dataState.data.enable_laboratory_clinic_visit_service && params.id ?   <items key={'laboratory_clinic_visit'} tab={'Laboratory clinic visit'} disabled={!params.id}>
                        <Laboratory tab={tab}/>
                    </items> : null}
                {dataState.data.has_laboratory_home_visit_service && dataState.data.enable_laboratory_home_visit_service && params.id ?   <items key={'laboratory_home_visit'} tab={'Laboratory home visit'} disabled={!params.id}>
                    <LaboratoryHomeVisit tab={tab}/>
                </items> : null}
                {dataState.data.has_nursing_service && dataState.data.enable_nursing_service && params.id ? <items key={'nursing'} tab={'Nursing'} disabled={!params.id}>
                        <Nursing tab={tab}/>
                    </items> : null}

                {dataState.data.has_physical_therapy_clinic_visit_service && dataState.data.enable_physical_therapy_clinic_visit_service && params.id ? <items key={'physical_therapy_clinic_visit'} tab={'Physical therapy clinic visit'} disabled={!params.id}>
                    <PhysicalTherapyClinicVisit tab={tab}/>
                </items> : null}

                {dataState.data.has_physical_therapy_home_visit_service && dataState.data.enable_physical_therapy_home_visit_service && params.id ? <items key={'physical_therapy_home_visit'} tab={'Physical therapy home visit'} disabled={!params.id}>
                    <PhysicalTherapyHomeVisit tab={tab}/>
                </items> : null}
                </ClinicTabBars>}
          </div>
    )
}

export default Clinic;
