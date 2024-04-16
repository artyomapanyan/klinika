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


	const [loading, setLoading] = useState(false)
	const [hasTelehelth, setHasTelehelth] = useState(false)
	const [doctorClinic, setDoctorClinic] = useState(false)
	const [labNursState, setLabNursState] = useState({})



    const [date, setDate] = useState([dayjs(), dayjs().add(6, 'day')])
    const [data, setData] = useState({workload: []});
    const [update,setUpdate] = useState(0);



    useEffect(() => {
		if(role !== 'lab-technician') {
			setLoading(true)
			postResource('ClinicManager', 'ClinicWorkload', token, '', {
				from: date[0].format('YYYY-MM-DD'),
				to: date[1].format('YYYY-MM-DD')
			}).then((response) => {

				setData({
					clinic_id:response?.clinic?.id,
					clinic:response?.clinic,
					workload:Object.values(response?.workload)
				})
				setLabNursState(response)
				setLoading(false)


			})
		}


    }, [date, update])

	//load service types
	useEffect(() => {
		if (ownerClinics?.id) {
			if(role !== 'lab-technician') {
				postResource('Clinic', 'single', token, ownerClinics?.id).then(
					responses => {
						setHasTelehelth(responses?.has_telehealth_service)
						setDoctorClinic(
							responses?.has_telehealth_service ||
							responses?.has_clinic_visit_service ||
							responses?.has_home_visit_service ||
							responses?.has_physical_therapy_home_visit_service ||
							responses?.has_physical_therapy_clinic_visit_service
						)
					}
				)
			}

		}
	}, [ownerClinics?.id])

	console.log(role, 'role')

	return (
		<div>
			{!ownerClinics?.id ? (
				<Preloader />
			) : role !== 'lab-technician' ? (
				<div style={{ margin: 20 }} className={'clinics_owner'}>
					{role === 'receptionist' ? (
						<div></div>
					) : (
						<Row gutter={[16, 16]}>
							<Col lg={hasTelehelth? 8 : 12} md={12} sm={24} xs={24}>
								<div className='gutter_row'>
									<ClinicManagerProgressCount dataKey={'MonthlyAppointments'} />
								</div>
							</Col>
							{/* <Col lg={6} md={12} sm={24} xs={24}>
                        <div className="gutter_row">
                            <CounterPurpleChart data={purpleData} />
                        </div>
                    </Col>*/}
							<Col lg={hasTelehelth? 8 : 12} md={12} sm={24} xs={24}>
								<div className='gutter_row'>
									<StatusesChart />
								</div>
							</Col>
							{hasTelehelth ? (
								<Col lg={8} md={12} sm={24} xs={24}>
									<div className='gutter_row'>
										<ClinicManagerProgressCount
											dataKey={'MonthlyTelehealths'}
										/>
									</div>
								</Col>
							) : null}
						</Row>
					)}

					<div style={{ marginTop: role === 'receptionist' ? -20 : 0 }}>
						{doctorClinic ? <ClinicManagerCalendar /> : null}
					</div>
					<div>
						{loading ? (
							<Preloader />
						) : Array.isArray(labNursState?.workload) ? (
							<div></div>
						) : (
							<NursLabCalendar loading={loading}
											 date={date}
											 setDate={setDate}
											 data={data}
											 setData={setData}
											 update={update}
											 setUpdate={setUpdate}/>
						)}
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
					<div>{/*<ClinicFeedback />*/}</div>
				</div>
			) : <div style={{marginTop: -22, padding: '0 20px'}}>
				<ClinicManagerAppointmentsTable />
			</div>
			}
		</div>
	)
}
export default ClinicManager;

