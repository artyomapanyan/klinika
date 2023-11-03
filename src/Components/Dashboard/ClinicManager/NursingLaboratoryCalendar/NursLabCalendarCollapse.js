import React, {useState} from "react";
import {Button, Modal} from "antd";
import arrowDownPurple from "../../../../dist/icons/arrowDownPurple.svg";
import gray_grid from "../../../../dist/icons/gray_grid.png";
import ClinicManagerCalendarInnCollapse
    from "../Fragments/ClinicManagerCalendar/Fragments/ClinicManagerCalendarInnCollapse";
import NursLabCalendarInnCollapse from "./NursLabCalendarInnCollapse";
import dayjs from "dayjs";
import NursLabCollapseModal from "./NursLabCollapseModal";
import {t} from "i18next";

function NursLabCalendarCollapse({item,setDate,clinicID,clinic, setUpdate}) {
    const [btnCollapsed, setBtnCollapsed] = useState(false);
    const [selectedDate, setSelectedDate] = useState(false);
    let thisDate = dayjs().format('YYYY-MM-DD')

    const openCollapse = () => {
        setBtnCollapsed(!btnCollapsed)
    }



    return(
        <>
            <tbody>
            <tr>
                <td>
                    <Button className="appointmentsBranch" onClick={openCollapse} style={{width: '100%', display:'flex', justifyContent:'space-between'}}>
                        <span className={'cl_manager_collapse_specialty'}>{t(item?.service)}</span>
                        {/*<img src={arrowDownPurple} alt={'arrowDownPurple'}/>*/}
                    </Button>
                </td>
                {Object.keys(item?.availability??{}).map((key, k)=>   {
                    return <td key={key} style={{paddingLeft:k===0?'20px':0, cursor: 'pointer'}} onClick={thisDate > key || item.availability[key] === null ? null : () => setSelectedDate(key)}>

                        <div className={"progressPurple"} style={{background: item.availability[key] === null ? 'url('+gray_grid+')' : '#774d9d20'}}>
                            <div className="progress-bar "
                                 role="progressbar"
                                 style={{width: item.availability[key]+'%', background: item.availability[key] === null ? 'url('+gray_grid+')' : '#774d9d'}} aria-valuenow={item.availability[key]} aria-valuemin="0"
                                 aria-valuemax="100">
                            </div>
                            {
                                item.availability[key] === null ? <div ></div> : <div className="progressText">{item.availability[key]?.toFixed()}%</div>
                            }

                        </div>
                    </td>})}
            </tr>
            </tbody>
            <Modal open={selectedDate} onCancel={() => setSelectedDate(false)} width={'400px'} footer={null}>
                {selectedDate ? <NursLabCollapseModal setUpdate={setUpdate} key={Math.random()} setDate={setDate} item={item} clinic={clinic} specialty={item?.service} clinicID={clinicID}   setSelectedDate={setSelectedDate} selectedDate={selectedDate}/> : null}
            </Modal>

            {/*{*/}
            {/*    btnCollapsed ? Object.values(item?.doctors??{}).map((doctor, key)=><NursLabCalendarInnCollapse setUpdate={setUpdate} key={key} setDate={setDate} clinic={clinic} clinicID={clinicID} speciality_id={item?.speciality_id} specialty={item?.speciality} docItem={doctor} />) : null*/}
            {/*}*/}
        </>

    )
}
export default NursLabCalendarCollapse;