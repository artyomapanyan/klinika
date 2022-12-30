import {Checkbox} from "antd";
import React from "react";

function AppointmentCheckboxes() {

    const onChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
    };

    return(
        <div style={{marginTop:20}}>
            <h1 className={'h1'}>Problem Area</h1>
            <Checkbox.Group
                style={{width: '100%'}}
                onChange={onChange}
            >
                <div style={{width:'100%'}}>
                    <div style={{display:'flex', flexDirection: "row", justifyContent:"space-between"}}>
                        <Checkbox value="Eyes">Eyes</Checkbox>
                        <Checkbox value="ENT">ENT</Checkbox>
                        <Checkbox value="Cardiovascular">Cardiovascular</Checkbox>
                        <Checkbox value="Respiratory">Respiratory</Checkbox>
                        <Checkbox value="Gastrointestinal">Gastrointestinal</Checkbox>
                        <Checkbox value="Genitals">Genitals</Checkbox>
                    </div>
                    <div style={{display:'flex', flexDirection: "row", justifyContent:"space-between"}}>
                        <Checkbox value="Kidney">Kidney</Checkbox>
                        <Checkbox value="Musculoskeletal">Musculoskeletal</Checkbox>
                        <Checkbox value="Skin">Skin</Checkbox>
                        <Checkbox value="Neurological">Neurological</Checkbox>
                        <Checkbox value="Endocrine">Endocrine</Checkbox>
                        <Checkbox value="Oral_cavity">Oral Cavity</Checkbox>
                    </div>
                </div>
            </Checkbox.Group>

        </div>
    )
}
export default AppointmentCheckboxes;