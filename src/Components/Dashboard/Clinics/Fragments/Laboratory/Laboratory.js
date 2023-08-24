import React, {useEffect, useState} from "react";
import WorkingHours from "../../../../Fragments/WorkingHours/WorkingHours";
import {postResource, updateResource} from "../../../../Functions/api_calls";
import {useSelector} from "react-redux";
import {useParams} from "react-router";
import LaboratoryTestsTable from "./Fragments/LaboratoryTestsTable";
import LabPackagesTable from "./Fragments/LabPackagesTable";
import {Collapse} from "antd";
import Preloader from "../../../../Preloader";

const { Panel } = Collapse;

const resource = "Clinic";
function Laboratory() {
    let token = useSelector((state) => state.auth.token);
    const params = useParams();

    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)



    let type = "laboratory_clinic_visit";

    useEffect(() => {
        setLoading(true)
        postResource(resource,'WorkingHours',token,params.id,{service:'laboratory_clinic_visit'}).then(responses => {
            setData(responses)
            setLoading(false)
        })

    }, []);

    const onFinish = (values,prevValues) => {
        setLoading(true)
        setData((prevState)=>({
            ...prevState,
            ...prevValues?.working_hours
        }))
        if(values.sync_with_main) {
            values.service = 'laboratory_clinic_visit'
            values.working_hours = [{is_day_off: false, opens_at: "02:00", closes_at: "09:00", day: "monday"}]
        }
        if (params.id) {
            updateResource('ClinicWorkingHours', params.id, values, token, ).then(response => {
                setData(response)
            }).finally(() => {
                setLoading(false)
            })
        }
    }


    return(
        <div  style={{background: "#ffffff", padding: '10px 80px'}} >
            {/*<div align={'center'} style={{fontSize: 30}}>In developing</div>*/}
            {/*<div className={'add_edit_content'}>*/}
                {/*<Collapse*/}
                {/*    bordered={false}*/}
                {/*    defaultActiveKey={['1']}*/}
                {/*    expandIconPosition={'end'}*/}
                {/*    expandIcon={(panelProps) =><div>{panelProps.isActive ?*/}
                {/*        <div><img alt={'icons'} src={arrowUpPurple}/> <span className={'patient_collapse_icon'}>Collapse</span></div> :*/}
                {/*        <div><img alt={'icons'} src={arrowDownPurple}/> <span className={'patient_collapse_icon'}>Expend</span></div>}</div>}*/}
                {/*>*/}
                {/*    <Panel className={'collapse_panel'} expandTextPosition={'end'} header="PatientCardAppointment Details" key="1">*/}
                {/*        <WorkingHours loading={loading} data={data} onFinish={onFinish} type={type}/>*/}
                {/*    </Panel>*/}
                {/*</Collapse>*/}
            {
                loading ? <Preloader/> : <WorkingHours loading={loading} data={data} onFinish={onFinish} type={type}/>
            }



            {/*</div>*/}
            {/*<div className={'clinic_line'}></div>*/}

            {/*<div>*/}
            {/*    /!*<NewLaboratoryTests />*!/*/}
            {/*    /!*<NewLaboratoryPackages/>*!/*/}
            {/*    <LaboratoryTestsTable />*/}
            {/*    <LabPackagesTable />*/}
            {/*</div>*/}


        </div>
    )
}
export default Laboratory;