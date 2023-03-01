import React from 'react';
import {DatePicker} from "antd";


function CDatePicker({ value, onChange,label, inputProps,type}){


    return <div className={'flying-label-date'}>
        <DatePicker {...inputProps}suffixIcon={<div>test</div>} panelRender={(node)=><div>
            {node}
            <div className={'test'}>1</div>
        </div>}
                    renderExtraFooter={(node)=><div>
            {node}
            <div className={'test'}>1</div>
        </div>}
                    value={value} onChange={onChange} placeholder={' '}  style={{paddingLeft:16}} />
        <label >{3213123}</label>
    </div>;
}
export default CDatePicker