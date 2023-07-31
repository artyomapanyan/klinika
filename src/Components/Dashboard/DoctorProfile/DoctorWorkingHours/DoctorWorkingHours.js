import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {postResource, updateResource} from "../../../Functions/api_calls";
import Resources from "../../../../store/Resources";
import Preloader from "../../../Preloader";
import {Col, Row} from "antd";
import NewClinicDoctorWorkingHour from "./WorkingHoursDrProfile";

function DoctorWorkingHours({data, workingHRefs}) {
    const token = useSelector((state) => state.auth.token);
    const [workData, setWorkData] = useState({});
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setLoading(true)
        Promise.all(Object.keys(data.activated_services)?.map(service => postResource('ClinicDoctor', 'WorkingHours', token, data.id, {service}))).then(responses => {
            const workNewData = {}
            Object.keys(data.activated_services)?.forEach((service, key) => {
                workNewData[service] = {
                    working_hours: responses[key].working_hours,
                    price: responses[key]?.clinic_doctor[Resources.ServiceKeys[service][1]],
                    status: responses[key]?.clinic_doctor[Resources.ServiceKeys[service][0]]
                }
            })
            setWorkData(workNewData)
            setLoading(false)
        })
    }, [data])

    const onFinish = (values) => {

        if (data.id) {
            return updateResource('ClinicDoctorWorkingHours', data?.doctor?.id + '/' + data?.clinic?.id, values, token,).then(response => {

            }).finally(() => {

            })
        }
    }


    return (
        <div style={{margin: '24px 80px'}}>

            <div className={'notice_big_div'}>
                <div className={'ello_line'}></div>
                <div style={{marginLeft: 16}}>
                    <div className={'notice_text'}>
                        Notice
                    </div>
                    <div>
                        After you change the working hours of this employee, he will be notified by email and
                        notification of the mobile application.
                    </div>
                </div>
            </div>
            {
                loading ? <Preloader /> : <Row style={{marginTop: 15,gap:'15px'}} className={'working-hours-container'} >
                    {
                        Object.keys(workData).map((service, key) => {
                            return <Col xxl={11} xl={20} lg={24} md={24} key={key} style={{display: 'flex', gap: 45}}>
                                <div className={'inn_conteiner'}>

                                    <NewClinicDoctorWorkingHour customRef={workingHRefs[service]}
                                                                data={workData[service].working_hours}
                                                                clinicDoctor={data}
                                                                service={service}
                                                                doctorData={workData[service]}
                                                                onFinish={(e) => onFinish(e, service)} type={service}
                                                                loading={loading}
                                                                isDoctorHours={true} priceAndStatus={true}/>

                                </div>


                            </Col>

                        })
                    }
                </Row>
            }




        </div>
    )

}

export default DoctorWorkingHours