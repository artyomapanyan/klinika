
import React, {useState} from "react";
import {Button} from "antd";
import {DownOutlined} from "@ant-design/icons";
import ClinicManagerCalendarInnCollapse from "./ClinicManagerCalendarInnCollapse";

function ClicicManagerCalendarCollapse({item,setDate,clinicID,clinic}) {
    const [btnCollapsed, setBtnCollapsed] = useState(false);

    const openCollapse = () => {
        setBtnCollapsed(!btnCollapsed)
    }

    return(
        <>
            <tr>
                <td>
                    <Button className="appointmentsBranch" onClick={openCollapse} >
                        <span className={'cl_manager_collapse_specialty'}>{item?.speciality}</span>
                        <DownOutlined/>
                    </Button>
                </td>
                {Object.keys(item?.availability??{}).map(key=>    <td>
                    <div className="progress progressPurple" key={key}>
                        <div className="progress-bar progressPurple__inside"
                             role="progressbar"
                             style={{width: item.availability[key]+'%'}} aria-valuenow={item.availability[key]} aria-valuemin="0"
                             aria-valuemax="100">
                        </div>
                        <div className="progressText">{item.availability[key]}%</div>
                    </div>
                </td>)}
            </tr>
            {
                btnCollapsed ? Object.values(item?.doctors??{}).map((doctor, key)=><ClinicManagerCalendarInnCollapse key={key} setDate={setDate} clinic={clinic} clinicID={clinicID} speciality_id={item?.speciality_id} specialty={item?.speciality} docItem={doctor} />) : null
            }
        </>

    )
}
export default ClicicManagerCalendarCollapse;