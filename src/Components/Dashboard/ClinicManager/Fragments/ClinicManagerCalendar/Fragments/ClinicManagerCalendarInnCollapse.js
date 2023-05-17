import {Avatar, Modal} from "antd";
import React, {useState} from "react";
import CalendarInnCollapseModal from "./CalendarInnCollapseModal";
import dayjs from "dayjs";

function ClinicManagerCalendarInnCollapse({setDate,docItem,specialty,clinicID,speciality_id,clinic}) {
    const [selectedDate, setSelectedDate] = useState(false);
    let thisDate = dayjs().format('YYYY-MM-DD')
    console.log(thisDate, 'this')


    return (
        <tbody>
        <tr id="hidden_row1" className="hide">


            <td className="hiddenTableRow__col">
                <div className="hiddenTableRow__col-item">
                    <div className="circleImageHolder">
                        <Avatar size={36}  src={docItem.doctor.avatar?.url}/>
                    </div>
                    <p className={'cl_manager_calendar_dr_name'}>{docItem?.doctor?.first} {docItem?.doctor?.last}</p>
                </div>
            </td>
            {
                Object.keys(docItem?.availability??{}).map((key,id) => {
                    console.log(key,'key')
                    return <td key={key} className="hiddenTableRow__col" onClick={thisDate > key ? null : () => setSelectedDate(key)}>

                        <div className="progress progressGreen" style={{cursor: thisDate > key ? "" : 'pointer'}}>
                            <div className="progress-bar progressGreen__inside"
                                 role="progressbar" style={{width: docItem.availability[key]+'%'}}
                                 aria-valuenow="85" aria-valuemin="0"
                                 aria-valuemax="100">
                            </div>
                            <div className="progressText">{docItem.availability[key]}%</div>
                        </div>
                    </td>
                })
            }
            <Modal open={selectedDate} onCancel={() => setSelectedDate(false)} width={'384px'} footer={null}>
                {selectedDate ? <CalendarInnCollapseModal key={selectedDate} setDate={setDate} docItem={docItem} clinic={clinic} specialty={specialty} clinicID={clinicID}  speciality_id={speciality_id} setSelectedDate={setSelectedDate} selectedDate={selectedDate}/> : null}
            </Modal>
        </tr>
        </tbody>

    )
}

export default ClinicManagerCalendarInnCollapse;