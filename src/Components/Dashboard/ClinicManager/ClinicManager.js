import React, {useEffect, useState} from "react";
import {Col, Row} from "antd";
import StatusesChart from "../../Fragments/Charts/StatusesChart";
import ClinicManagerProgressCount from "../../Fragments/Charts/ClinicManagerProgressCount";
import ClinicManagerCalendar from "./Fragments/ClinicManagerCalendar/ClinicManagerCalendar";
import ClinicManagerAppointmentsTable from "./Fragments/ClinicManagerAppointmentsTable/ClinicManagerAppointmentsTable";
import Preloader from "../../Preloader";
import {useSelector} from "react-redux";
import NursLabCalendar from "./NursingLaboratoryCalendar/NursLabCalendar";
import {postResource} from "../../Functions/api_calls";
import dayjs from "dayjs";


function ClinicManager() {
    let ownerClinics = useSelector((state) => state?.owner);
    let role = useSelector((state) => state?.auth?.selected_role?.key);

    let token = useSelector((state) => state.auth.token);

    const [date, setDate] = useState([dayjs().startOf('week'), dayjs().endOf('week')])
    const [loading, setLoading] = useState(false)
    const [labNursState, setLabNursState] = useState({})


    useEffect(() => {
        setLoading(true)
        postResource('ClinicManager', 'ClinicWorkload', token, '', {
            from: date[0].format('YYYY-MM-DD'),
            to: date[1].format('YYYY-MM-DD')
        }).then((response) => {
            setLabNursState(response)
            setLoading(false)



        })

    }, [])


    return(
        <div>
            {!ownerClinics?.id?<Preloader/>:<div style={{margin:20}} className={'clinics_owner'}>
                {
                    role === 'receptionist' ? <div></div> : <Row gutter={[16,16]}>
                        <Col  lg={8} md={12} sm={24} xs={24} >
                            <div className="gutter_row">
                                <ClinicManagerProgressCount dataKey={'MonthlyAppointments'}/>
                            </div>
                        </Col>
                        {/* <Col lg={6} md={12} sm={24} xs={24}>
                        <div className="gutter_row">
                            <CounterPurpleChart data={purpleData} />
                        </div>
                    </Col>*/}
                        <Col lg={8} md={12} sm={24} xs={24}>
                            <div className="gutter_row">
                                <StatusesChart/>
                            </div>
                        </Col>
                        <Col lg={8} md={12} sm={24} xs={24}>
                            <div className="gutter_row">
                                <ClinicManagerProgressCount dataKey={'MonthlyTelehealths'}/>
                            </div>
                        </Col>
                    </Row>
                }

                <div style={{marginTop: role === 'receptionist' ? -20 : 0}}>
                    <ClinicManagerCalendar />
                </div>
                <div>
                    {
                        loading ? <Preloader/> : Array.isArray(labNursState?.workload) ? <div></div> : <NursLabCalendar />
                    }
                </div>
                <div>
                    <ClinicManagerAppointmentsTable />
                </div>
                {/*<Row gutter={[16, 16]}>*/}
                {/*    <Col lg={12}>*/}
                {/*        <ClinicManagerConfirmation />*/}
                {/*    </Col>*/}
                {/*    <Col lg={12}>*/}
                {/*        <ClinicManagerDoctorsLicensesTable />*/}
                {/*    </Col>*/}
                {/*</Row>*/}
                <div>
                    {/*<ClinicFeedback />*/}
                </div>
            </div>}
        </div>
    )
}
export default ClinicManager;

