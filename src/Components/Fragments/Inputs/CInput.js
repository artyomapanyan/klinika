import React from 'react';
import {Input} from "antd";


function CInput({inputDisabled, value, isRequired, onChange,label, inputProps,type, maxLength=50, max, min, className, placeholder=' '}){



    return <div className={'flying-label'}>
        {type==='password'? <Input className={className} {...inputProps} size={'large'} maxLength={maxLength} disabled={inputDisabled} value={value} onChange={onChange} placeholder={' '} type={'password'}/>:

         type === 'number' ? <Input className={className} disabled={inputDisabled} max={max} min={min} type={'number'}  {...inputProps} size={'large'} value={value} onChange={onChange} placeholder={' '} style={{width:'100%'}}/> :
             type === 'url' ? <Input className={className} disabled={inputDisabled} type={'url'}  {...inputProps} size={'large'} value={value} onChange={onChange} placeholder={placeholder} style={{width:'100%'}}/> :
             <Input className={className} {...inputProps} disabled={inputDisabled} maxLength={maxLength} size={'large'} value={value} onChange={onChange} placeholder={placeholder}  style={{paddingLeft:16}} />}
        <label ><span style={{color: 'red'}}>{isRequired ? "* " : ''}</span>{label}</label>
    </div>;
}
export default CInput