import {Progress, Spin} from "antd";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {postResource} from "../../Functions/api_calls";

function TopServices() {
    let token = useSelector((state) => state.auth.token);
    let ownerClinics = useSelector((state) => state?.owner);
    const [loading, setLoading] = useState(true);

    const [data,setData] = useState({});

    let data1 = {
        home_visit: {service: 'Nursing', incomes: 0, percentage: 1},
        laboratory_clinic_visit: {service: 'Laboratory Clinic Visit', incomes: 0, percentage: 1},
        laboratory_home_visit: {service: 'Home Visit', incomes: 0, percentage: 1},
        nursing: {service: 'Telehealth', incomes: 0, percentage: 1},
        telehealth: {service: 'Laboratory Home Visit', incomes: 0, percentage: 1}}

    let date = new Date().getFullYear().toString()

    useEffect(() => {
        setLoading(true)
        postResource('ClinicOwner','TopServices', token,  ownerClinics?.id, {year: date, month: ownerClinics?.month_key}).then((response) => {
            let values = Object.values(response);
            values = values.sort((a,b)=>{
                return b.percentage-a.percentage
            })


            setData({
                ...data,
                home_visit: response?.home_visit ? response?.home_visit : data1?.home_visit,
                laboratory_clinic_visit: response?.laboratory_clinic_visit ? response?.laboratory_clinic_visit : data1?.laboratory_clinic_visit,
                laboratory_home_visit: response?.laboratory_home_visit ? response?.laboratory_home_visit: data1?.laboratory_home_visit,
                nursing: response?.nursing ? response?.nursing : data1?.nursing,
                telehealth: response?.telehealth ? response?.telehealth : data1?.telehealth


            })
            setLoading(false)

        });

    }, [ownerClinics])



    let color = ['#774D9D', "#BF539E", '#D477B0', '#F5A348', '#F7BE93']

    return(
        <Spin spinning={loading}>
            <div className={'top_services'}>
                <h1 className={'top_services_text'}>TOP 5 services</h1>
                {
                    Object.values(data).sort((a,b)=>{
                        return b.percentage-a.percentage
                    }).map((el, key) => <div key={key} style={{lineHeight:2, width:'100%'}}>
                            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",  width:'100%'}}><span>{el?.service}</span> <span style={{fontWeight:700}}>$ {el?.incomes}</span></div>
                            <Progress percent={el?.percentage}
                                      strokeColor={color[key]}
                                      style={{width:'109%'}}
                                      strokeLinecap={'round'}
                                      strokeWidth={'13px'}
                                      format={()=>{
                                          return ""}
                                      }/>
                        </div>
                    )
                }

            </div>
        </Spin>

    )
}
export default TopServices;
