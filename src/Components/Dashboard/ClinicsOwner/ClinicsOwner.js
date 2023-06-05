import {Col, Row, Spin} from "antd";
import React, {useEffect, useRef, useState} from 'react';
import CounterGreenChart from "../../Fragments/Charts/CounterGreenChart";
import CounterOrangeChart from "../../Fragments/Charts/CounterOrangeChart";
import '../../Fragments/Charts/ChartStyles.sass'
import GradientChart from "../../Fragments/Charts/GradientChart";
import LineChartIncomes from "../../Fragments/Charts/LineChartIncomes";
import CounterProgress from "../../Fragments/Charts/CounterProgress";
import IncomeChannelsChart from "../../Fragments/Charts/IncomeChannelsChart";
import ClinicOwnerPatientsChart from "../../Fragments/Charts/ClinicOwnerPatientsChart";
import TopServices from "../../Fragments/Charts/TopServices";

import { useSelector } from 'react-redux';
import Preloader from '../../Preloader';
import {postResource} from "../../Functions/api_calls";


function ClinicsOwner() {

    let token = useSelector((state) => state.auth.token);
    let ownerClinics = useSelector((state) => state?.owner);
    const [loading, setLoading] = useState(true);


    const [responseState,setResponseState] = useState([]);




    const [responseOrange,setResponseOrange] = useState([]);
    const [dateMontKey,setdateMontKey] = useState({
        year: new Date().getFullYear().toString(),
        month: ownerClinics?.month_key
    });




    useEffect(() => {
        setLoading(true)
        postResource('ClinicOwner','OwnerClinicRating', token,  '', {...(ownerClinics?.id!=='all'?{clinic:ownerClinics?.id} : {}) } ).then((response) => {
            setLoading(true)
            setResponseState(response)
            // // let arr = []
            // // arr.push(+((+response?.avg_rating).toFixed(1)));
            // // arr.unshift(+((5 - (+response?.avg_rating)).toFixed(1)))
            // let arr = []
            // let arr2 = response?.map((el) => {
            //     return arr.push(+((+el?.avg_rating).toFixed(1)))
            //
            // })
            // let arr1 = response?.map((el) => {
            //     return arr.unshift(+((5 - (+el?.avg_rating)).toFixed(1)))
            // })
            //
            // setData(arr)
            setLoading(false)
        });

    }, [ownerClinics])




    useEffect(() => {

        postResource('ClinicOwner','OwnerClinicMontlyRating', token,  '', {...dateMontKey, ...(ownerClinics?.id!=='all'?{clinic:ownerClinics?.id} : {})}).then((response) => {
            setResponseOrange(response)
            // let arr = []
            // arr.push(+((+response?.avg_rating).toFixed(1)));
            // arr.unshift(+((5 - (+response?.avg_rating)).toFixed(1)))
            // setData(arr)

        });

    }, [ownerClinics])


    return(
        <div style={{marginBottom: 100}}>
            {!ownerClinics?.id || !ownerClinics?.month_key?<Preloader/>:<div style={{margin:'10px 20px'}} className={'clinics_owner'}>
                <Row gutter={[19,19]}>
                    <Col  lg={8} md={12} sm={24} xs={24} >
                        <div className="gutter_row">
                            {
                                loading ? <Preloader small={30}/> : <div style={{display: 'block', }}>
                                    {
                                        responseState?.map((el, key) => {
                                            return <Spin spinning={loading} key={key}>
                                                <CounterGreenChart key={key} el={el} loading={loading}   responseOrange={responseOrange} setResponseState={setResponseState} ownerClinics={ownerClinics}/>
                                            </Spin>
                                        })
                                    }
                                </div>
                            }




                        </div>
                    </Col>
                    <Col lg={8} md={12} sm={24} xs={24}>
                        <div className="gutter_row">
                            {
                                loading ? <Preloader small={30}/> : <div style={{display: 'block'}}>
                                    {
                                        responseState?.map((el, key) => {
                                            return <CounterOrangeChart key={key} el={el} loading={loading}   responseState={responseState} setResponseState={setResponseState} ownerClinics={ownerClinics}/>
                                        })
                                    }
                                </div>
                            }


                        </div>
                    </Col>
                    <Col lg={8} md={12} sm={24} xs={24}>
                        <div className="gutter_row">
                            <CounterProgress  />
                        </div>
                    </Col>
                    {/*<Col lg={6} md={12} sm={24} xs={24}>*/}
                    {/*    <div className="gutter_row">*/}
                    {/*        <CounterMultipleChart  data={multipleData}/>*/}
                    {/*    </div>*/}
                    {/*</Col>*/}
                </Row>
                <div>
                    <GradientChart />
                </div>
                <div>
                    <Row gutter={[20,20]}>
                        <Col lg={18} sm={24}>
                            <LineChartIncomes />
                        </Col>
                        <Col lg={6} sm={24}>
                            <IncomeChannelsChart />
                        </Col>
                    </Row>

                </div>
                <div>
                    {/*<ClinicOwnerTableTasks />*/}
                </div>
                <div>
                    <Row gutter={[20,20]}>
                        <Col lg={18} sm={24}>
                            <ClinicOwnerPatientsChart />
                        </Col>
                        <Col lg={6} sm={24}>
                            <TopServices />
                        </Col>
                    </Row>
                </div>
                {/*<div>*/}
                {/*    <Row gutter={[20,20]}>*/}
                {/*        <Col lg={9} sm={24}>*/}
                {/*            <PatientGenderChart  />*/}
                {/*        </Col>*/}
                {/*        <Col lg={9} sm={24}>*/}
                {/*            <DoctorLicensesChart />*/}
                {/*        </Col>*/}
                {/*        <Col lg={6} sm={24}>*/}
                {/*            <ResultsComponent />*/}
                {/*        </Col>*/}
                {/*    </Row>*/}
                {/*</div>*/}
                <div>
                    {/*<ClinicFeedback />*/}
                </div>
            </div>}

        </div>

    )
}
export default ClinicsOwner;
