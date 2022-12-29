import React, {useState} from 'react';
import PatientHistoryGif from "../../../../dist/icons/PatientHistoryGif.gif";
import {Button} from "antd";
import PatientHistoryTable from "./PatientHistory/PatientHistoryTable";

function PatientHistory() {
    const [historiState, setHistoryState] =useState(false);

    const onHistoryTub = () => {
        setHistoryState(true)
    }
    return(
        <>
            {!historiState ? <div style={{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center", minHeight:800}}>
                <img style={{height:300, width:300}} alt={'icons'} src={PatientHistoryGif}/>

                <div style={{maxWidth:500}}>

                    <h1 style={{padding:10, fontWeight:700}}>
                        Permission To Process Personal Medical Data Is Required
                    </h1>
                    <div style={{padding:10}}>
                        To see the patient's medical data, ask for access to them. The patient will receive a notification on the mobile phone.
                    </div>
                    <div style={{padding:10}}>
                        <Button size={'large'} style={{fontWeight:700}} type={'primary'} onClick={onHistoryTub} >Ask Patient to Access</Button>
                    </div>

                </div>

            </div> : <PatientHistoryTable/>
            }

        </>
    )
}
export default PatientHistory;
