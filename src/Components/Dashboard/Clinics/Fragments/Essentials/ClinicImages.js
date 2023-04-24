import React, {useEffect, useState} from 'react'
import {Col, Row,Form} from "antd";

function ClinicImages({coverInitial = false,formRef}) {
    const [cover, setCover] = useState({
        file: null,
        src: null
    });
    const [logo, setLogo] = useState({
        file: null,
        src: null
    });
    const handleDeleteClick = (e,type) => {
        e.preventDefault();
        if(type==='c'){
            setCover({
                file: null,
                src: null
            })
        }else{
            setLogo({
                file: null,
                src: null
            })
        }


    }
    useEffect(()=>{
        formRef?.current?.setFieldsValue({
            logo:logo.file,
            cover:cover.file
        })
    },[logo,cover])
    const preview = (file,type) => {
        const fr = new FileReader();
        fr.onload = () => {
            if(type==='c'){
                setCover((prevState) => ({
                    ...prevState,
                    file: file,
                    src: fr.result
                }))
            }else{
                setLogo((prevState) => ({
                    ...prevState,
                    file: file,
                    src: fr.result
                }))
            }

        };
        fr.readAsDataURL(file);
    }
    const handleFileUploaded = (e,type) => {
        [...e.target.files].forEach((e)=>preview(e,type))


    }
    return <Row className={'clinic-images-container'} gutter={[10,10]}>
        <Col lg={14}>
            <Form.Item name={'logo'} hidden={true}> </Form.Item>
            <Form.Item name={'cover'} hidden={true}></Form.Item>
            <input type={'file'} onChange={(e)=>handleFileUploaded(e,'c')} id={'upload-btn-cv'}/>
            <label htmlFor="upload-btn-cv">
                <div style={{width: '400px', height: '150px', backgroundImage: "url('" + cover.src + "')"}}
                     className={'im-bg'}>
                    {cover.src ? <div className={'delete-button'} onClick={(e)=>handleDeleteClick(e,'c')}></div> : null}
                </div>
            </label>
        </Col>
        <Col lg={10}>
            <h1>Clinic page cover image</h1>
            <div>Pleas upload</div>
        </Col>
        <Col lg={6}>
            <input type={'file'} onChange={(e)=>handleFileUploaded(e,'l')} id={'upload-btn-lg'}/>
            <label htmlFor="upload-btn-lg">
                <div style={{width: '120px', height: '80px', backgroundImage: "url('" + logo.src + "')"}}
                     className={'im-bg'}>
                    {logo.src ? <div className={'delete-button'} onClick={(e)=>handleDeleteClick(e,'v')}></div> : null}
                </div>
            </label>
        </Col>
        <Col lg={18}>
            <h1>Clinic logo</h1>
            <div>Please upload</div>
        </Col>
    </Row>
}

export default ClinicImages