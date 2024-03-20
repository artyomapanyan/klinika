import { t } from 'i18next'
import { Button, Col, Row, Layout, Form, Modal } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import FormInput from '../../../../Fragments/FormInput';

const FutureVisits = () => {
	const [addLoading, setAddLoading] = useState(false)

    const addVisit = () =>{

    }
  return (
    <div>
	    <h1 className={'h1'}>{t('Future Visits')}</h1>
        <Row>
            <Col lg={6}>
                <FormInput
                    label={t('Type')}
                    name={'type'}
                    inputType={'resourceSelect'}
                    // initialValue={data?.gender}
                    // initialData={Resources?.Gender}
                    rules={[{ required: true }]}
                />
            </Col>
            <Col lg={16}>
            <FormInput
                    label={t('Service Type')}
                    name={'type'}
                    inputType={'resourceSelect'}
                    // initialValue={data?.gender}
                    // initialData={Resources?.Gender}
                    rules={[{ required: true }]}
                />
            </Col>
            <Col lg={2}>
                <Button
                    loading={addLoading}
                    size={'large'}
                    type={'primary'}
                    htmlType='submit'
                    onClick={addVisit}
                    style={{top: 5, height: 48, width: 77}}
                >
                    {t('Add')}
                </Button>
            </Col>
        </Row>
    </div>
  );
};

export default FutureVisits;