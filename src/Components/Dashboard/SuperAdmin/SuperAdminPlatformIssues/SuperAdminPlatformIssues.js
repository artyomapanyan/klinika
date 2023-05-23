import React from "react";
import {Space} from 'antd';
import {t} from "i18next";
import FIssuesItem from "./Fragments/FIssuesItem";
function SuperAdminPlatformIssues({data}) {
    let dataColor = ['Active', 'Solved']

    return(
        <div className={'issues_div'}>
                <div>

                    <Space className={'app_clinic'} style={{fontSize:24, fontWeight:600}}>
                        {t("Platform issues")}
                        {dataColor.map((itemKey,key)=><Space  key={key} className={`withDot WD-color-${key}`}>{itemKey}</Space>)}
                    </Space>
                </div>
            <div className={'current'}>Current month</div>
            {Object.keys(data).map(key=>{
                return  <FIssuesItem key={key} data={data[key]}/>

            })}
            <div className={'current'}>Previous month</div>
            {Object.keys(data).map(key=>{
                return  <FIssuesItem key={key} data={data[key]}/>

            })}
        </div>
    )
}
export default SuperAdminPlatformIssues;