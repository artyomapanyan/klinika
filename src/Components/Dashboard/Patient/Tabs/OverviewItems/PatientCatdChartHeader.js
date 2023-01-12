import {Space} from "antd";

function PatientCatdChartHeader() {
    let data = ['Systolic', 'Diastolic']
    return(
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", padding:10}}>
            <h1 className={'h1'}>Blood pressure</h1>
            <Space className={'app_clinic'} style={{fontSize:24, fontWeight:600}}>
                {data.map((itemKey,key)=><Space  key={key} className={`withDot WD-color-${key}`}>{itemKey}</Space>)}
            </Space>
        </div>
    )
}
export default PatientCatdChartHeader;