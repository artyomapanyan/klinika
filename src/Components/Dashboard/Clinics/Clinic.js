

import React, {useEffect, useState} from "react";
import ClinicTabEssentials from "./Fragments/ClinicTabEssentials";
import ClinicWorkingHours from "./Fragments/ClinicWorkingHours/ClinicWorkingHours";
import {useGetResourceSingle} from "../../Functions/api_calls";
import {useNavigate, useParams} from "react-router";
import {useSearchParams} from "react-router-dom";
import HomeVisit from "./Fragments/HomeVisit/HomeVisit";
import Laboratory from "./Fragments/Laboratory/Laboratory";
import ClinicVisit from "./Fragments/ClinicVisit/ClinicVisit";
import Nursing from "./Fragments/Nursing/Nursing";
import ClinicTabBars from "./Fragments/ClinicTabBars";
import Preloader from "../../Preloader";
import {useSelector} from "react-redux";
import ClinicTabManageDoctors from "./Fragments/ManageDoctors/ClinicTabManageDoctors";
import "../../Dashboard/OwnerClinics/ClinicOwnerStyles/ClinicOwnerStyles.sass"


const resource = "Clinic"

function Clinic() {
    let navigate = useNavigate();
    const params = useParams();
    let locale = useSelector((state) => state?.app?.current_locale);
    const [lang, setLang] = useState(locale)
    const {loadingState, dataState} = useGetResourceSingle(resource, params.id, {}, null, lang)
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
                                         handleLangChange={handleLangChange}/>
                </items>
                {params.id && <items key={'manage'} tab={'Manage Doctors'} disabled={!params.id}>
                    {/*<SecondClinicTabManageDoctors  />*/}
                    <ClinicTabManageDoctors/>
                </items>}
                {params.id && <items key={'working'} tab={'Working Hours'}>
                    <ClinicWorkingHours loadingState={loadingState} dataState={dataState}/>
                </items>}
                {dataState.data.has_clinic_visit_service &&
                    <items key={'clinic_visit'} tab={'Clinic Visit'} disabled={!params.id}>
                        <ClinicVisit/>
                    </items>}
                {dataState.data.has_home_visit_service &&
                    <items key={'home_visit'} tab={'Home Visit'} disabled={!params.id}>
                        <HomeVisit/>
                    </items>}
                {dataState.data.has_laboratory_clinic_visit_service &&   <items key={'laboratory'} tab={'Laboratory'} disabled={!params.id}>
                        <Laboratory />
                    </items> }
                    {dataState.data.has_nursing_service && <items key={'nursing'} tab={'Nursing'} disabled={!params.id}>
                        <Nursing/>
                    </items>}
                </ClinicTabBars>}
          </div>
    )
}

export default Clinic;
