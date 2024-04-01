import React, {useState} from 'react';
import {Input} from "antd/lib";
import ResourceSelectPaginated from "../../ResourceSelectPaginated";
import {DatePicker, Select} from "antd";
import {t} from "i18next";
import calendar_black_icon from "../../../../dist/icons/calendar_black_icon.png";
import FormInput from "../../FormInput";
function TFInput({onChangeValue,value,type, resource, name, initialFocused=false, resourceData}){
    const [focused, setFocused] = useState(initialFocused);



    const onInputTypeChange = () => {
        if(type === 'selectFilter') {
            return <ResourceSelectPaginated
                inputProps={{
                    onChange:onChangeValue
                }}
                resource={resource}
                resourceData={resourceData}
                name={name}
            />;
        }
        if(type === 'input') {
            return <Input value={value} onChange={e=>onChangeValue(e.target.value)}/>
        }
        if(type === 'date') {
          return <DatePicker
                               format={'DD-MM-YYYY'}
                               placeholder={'Select Date'}

                               onFocus={() => setFocused(true)}
                               onBlur={() => setFocused(false)}
                               onChange={e=>onChangeValue(e)}
                               suffixIcon={<img alt={'calendar_black_icon'} src={calendar_black_icon}/>}
                               value={value}
                               style={{width: '100%', height: 45}}
          />
            // <DatePicker value={value} onChange={e=>onChangeValue(e)}/>
        }
        if(type === 'select') {
            return <Select
                style={{
                    width: 120,
                }}
                onChange={(e)=> onChangeValue(e)}
                options={[
                    {
                        value: 'clinic_visit',
                        label: t('Clinic visit'),
                    },
                    {
                        value: 'telehealth',
                        label: t('Telehealth'),
                    },
                    {
                        value: 'home_visit',
                        label: t('Home visit'),
                    },
                    {
                        value: 'physical_therapy_home_visit',
                        label: t('Physical therapy home visit'),

                    },
                    {
                        value: 'physical_therapy_clinic_visit',
                        label: t('Physical therapy clinic visit'),

                    },
                    {
                        value: 'laboratory_home_visit',
                        label: t('Laboratory home visit'),

                    },
                    {
                        value: 'laboratory_clinic_visit',
                        label: t('Laboratory clinic visit'),

                    },
                    {
                        value: 'nursing',
                        label: t('Nursing'),

                    },
                ]}
            />
            // <DatePicker value={value} onChange={e=>onChangeValue(e)}/>
        }

        if(type === 'selectResource') {
            return <FormInput
                className={'select_Resource_list_filter'}
                label={t('')}
                name={'clinic'}
                inputType={'resourceSelect'}
                resourceParams={{
                    active: 1
                }}
                inputProps={{
                    onChange: e => {
                        onChangeValue(e)
                    }
                }}
                resource={'Clinic'}
            />
        }
    }


    return onInputTypeChange()
}
export default TFInput
