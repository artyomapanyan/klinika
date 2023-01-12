import {Table} from "antd";
import React from 'react';
import {t} from "i18next";

function PatientCardLabTests() {

    const dataSource = [
        {
            key: '1',
            name: 'Antineutrophil Cytoplasmic Antibodies (ANCA) Test',
            Clinic: "Class Clinic Saudi",
            Date: 'Wed, Mar 16, 2022',
        },
        {
            key: '2',
            name: 'Antineutrophil Cytoplasmic Antibodies (ANCA) Test',
            Clinic: 42,
            Date: '10 Downing Street',
        },
    ];

    const columns = [
        {
            title: t('Test name'),
            dataIndex: 'name',
            key: 'name',
            render:()=>{
                return <div style={{fontWeight:700, fontSize: 16, color:"#BF539E"}}>Antineutrophil Cytoplasmic Antibodies (ANCA) Test</div>
            }
        },
        {
            title: t('Clinic'),
            dataIndex: 'Clinic',
            key: 'Clinic',
        },
        {
            title: t('Date'),
            dataIndex: 'Date',
            key: 'Date',
        },
    ];
    return(
        <div classname={'Patient_card_lab_tests_div'}>
            <Table
                dataSource={dataSource}
                columns={columns}

            />
        </div>
    )
}
export default PatientCardLabTests;
