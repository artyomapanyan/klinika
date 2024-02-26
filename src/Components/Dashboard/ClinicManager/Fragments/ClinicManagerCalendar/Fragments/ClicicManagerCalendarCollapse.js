
import React, {useState} from "react";
import {Button} from "antd";
import ClinicManagerCalendarInnCollapse from "./ClinicManagerCalendarInnCollapse";
import gray_grid from '../../../../../../dist/icons/bg_pattern.jpg'
import arrowDownPurple from "../../../../../../dist/icons/arrowDownPurple.svg";

function ClinicManagerCalendarCollapse({item,setDate,clinicID,clinic, setUpdate}) {
    const [btnCollapsed, setBtnCollapsed] = useState(false);

    const openCollapse = () => {
        setBtnCollapsed(!btnCollapsed)
    }



    return(
        <>
            <tbody>
            <tr>
                <td style={{paddingRight: 20 }}>
                    <Button className="appointmentsBranch" onClick={openCollapse} style={{width: '100%', display:'flex', justifyContent:'space-between'}}>
                        <span className={'cl_manager_collapse_specialty'}>{item?.speciality}</span>
                        <img src={arrowDownPurple} alt={'arrowDownPurple'}/>
                    </Button>
                </td>
                {Object.keys(item?.availability??{}).map((key)=>   {
                    return <td key={key}>

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

            {
                btnCollapsed ? Object.values(item?.doctors??{}).map((doctor, key)=><ClinicManagerCalendarInnCollapse setUpdate={setUpdate} key={key} setDate={setDate} clinic={clinic} clinicID={clinicID} speciality_id={item?.speciality_id} specialty={item?.speciality} docItem={doctor} />) : null
            }
        </>

    )
}
export default ClinicManagerCalendarCollapse;