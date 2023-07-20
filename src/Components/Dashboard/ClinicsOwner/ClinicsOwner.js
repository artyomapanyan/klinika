import {Col, Row, Spin} from "antd";
import React, {useEffect, useState} from 'react';
import CounterGreenChart from "../../Fragments/Charts/CounterGreenChart";
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
    // const [dateMontKey,setdateMontKey] = useState({
    //     year: new Date().getFullYear().toString(),
    //     month: ownerClinics?.month_key
    // });




    useEffect(() => {
        setLoading(true)
        postResource('ClinicOwner','OwnerClinicRating', token,  '', {...(ownerClinics?.id!=='all'?{clinic:ownerClinics?.id} : {}) } ).then((response) => {
            setLoading(true)
            setResponseState(response)
            setLoading(false)
        });

    }, [ownerClinics])




    // useEffect(() => {
    //
    //     postResource('ClinicOwner','OwnerClinicMontlyRating', token,  '', {...dateMontKey, ...(ownerClinics?.id!=='all'?{clinic:ownerClinics?.id} : {})}).then((response) => {
    //         setResponseOrange(response)
    //         // let arr = []
    //         // arr.push(+((+response?.avg_rating).toFixed(1)));
    //         // arr.unshift(+((5 - (+response?.avg_rating)).toFixed(1)))
    //         // setData(arr)
    //
    //     });
    //
    // }, [ownerClinics])

    let color = [
        {
            key: 0,
            name: '#D477B0'
        },
        {
            key: 1,
            name: '#F7BE93'
        },
        {
            key: 2,
            name: '#9f70e6'
        },
        {
            key: 3,
            name: '#6DAF56'
        },
        {
            key: 4,
            name: '#9e9ba1'
        },
        {
            key: 5,
            name: '#FFD850'
        },
    ]



    return(
        <div style={{marginBottom: 100}}>
            {!ownerClinics?.id || !ownerClinics?.month_key?<Preloader/>:<div style={{margin:'10px 20px'}} className={'clinics_owner'}>
                <div className={'k_owner_conteiners'}>
                    {
                       loading ? <Preloader small={30} /> : responseState?.map((el, key) => {
                           let chartColors = color.find(e => (e.key == key))?.name
                            return<div key={key}>
                                    <div className="gutter_row">

                                    <div style={{display: 'block', }}>
                                        <Spin spinning={loading}>
                                            <CounterGreenChart chartColors={chartColors} el={el} loading={loading} color={color}   responseOrange={responseOrange} setResponseState={setResponseState} ownerClinics={ownerClinics}/>
                                        </Spin>
                                    </div>
                                </div>
                            </div>
                        })
                    }

                    {/*<div >*/}
                    {/*    <div className="gutter_row">*/}
                    {/*        {*/}
                    {/*            loading ? <Preloader small={30 }/> : <div style={{display: 'block'}}>*/}
                    {/*                {*/}
                    {/*                    responseState?.map((el, key) => {*/}
                    {/*                        return <CounterOrangeChart key={key} el={el} loading={loading}   responseState={responseState} setResponseState={setResponseState} ownerClinics={ownerClinics}/>*/}
                    {/*                    })*/}
                    {/*                }*/}
                    {/*            </div>*/}
                    {/*        }*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div>
                        <div className="gutter_row">
                            <CounterProgress  />
                        </div>
                    </div>
                    {/*<Col lg={6} md={12} sm={24} xs={24}>*/}
                    {/*    <div className="gutter_row">*/}
                    {/*        <CounterMultipleChart  data={multipleData}/>*/}
                    {/*    </div>*/}
                    {/*</Col>*/}
                </div>
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
