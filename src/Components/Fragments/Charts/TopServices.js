import {Progress} from "antd";
import React from "react";

function TopServices() {
    let a = [
        {
            percent: 99,
            value: 28.245,
            name: 'Service name',
        },
        {
            percent: 70,
            value: 25.652,
            name: 'Service name',
        },
        {
            percent: 50,
            value: 15.236,
            name: 'Service name',
        },
        {
            percent: 30,
            value: 10.485,
            name: 'Service name',
        },
        {
            percent: 10,
            value: 5.585,
            name: 'Service name',
        },
    ];



    return(
        <div className={'top_services'}>
            <h1 className={'h1'}>TOP 5 services</h1>
            {
                a.map((el, key) => <div key={key} style={{lineHeight:2, width:'100%'}}>
                    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}><span>{el?.name}</span> <span style={{fontWeight:700}}>$ {el?.value}</span></div>
                        <Progress percent={el?.percent}
                                  strokeLinecap={'round'}
                                  strokeWidth={'13px'}
                                  format={()=>{
                                      return ""}
                                  }/>
                </div>
                )
            }

        </div>
    )
}
export default TopServices;
