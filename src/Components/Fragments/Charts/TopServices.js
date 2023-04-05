import {Progress, Spin} from "antd";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {postResource} from "../../Functions/api_calls";

function TopServices() {
    let token = useSelector((state) => state.auth.token);
    let ownerClinics = useSelector((state) => state?.owner);
    const [loading, setLoading] = useState(true);

    const [data,setData] = useState([]);

    let date = new Date().getFullYear().toString()

    useEffect(() => {

        postResource('ClinicOwner','TopServices', token,  ownerClinics?.id, {year: date, month: ownerClinics?.month_key}).then((response) => {
            let values = Object.values(response);
            values = values.sort((a,b)=>{
                return b.percentage-a.percentage
            })
            setData(values)
            setLoading(false)
        });

    }, [ownerClinics])

    let color = ['#774D9D', "#BF539E", '#D477B0', '#F5A348', '#F7BE93']

    return(
        <Spin spinning={loading}>
            <div className={'top_services'}>
                <h1 className={'h1'}>TOP 5 services</h1>
                {
                    data.map((el, key) => <div key={key} style={{lineHeight:2, width:'100%'}}>
                            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}><span>{el?.service}</span> <span style={{fontWeight:700}}>$ {el?.incomes}</span></div>
                            <Progress percent={el?.percentage}
                                      strokeColor={color[key]}
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
