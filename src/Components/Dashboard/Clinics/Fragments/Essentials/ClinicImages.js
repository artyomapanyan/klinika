import React, {useEffect, useState} from 'react'
import {Col, Row,Form} from "antd";
import delete_icon from "../../../../../dist/icons/delete_icon.png";

function ClinicImages({formRef}) {
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
    return <Row className={'clinic-images-container'} gutter={[10,38]}>
        <Col lg={9}>
            <Form.Item name={'logo'} hidden={true}> </Form.Item>
            <Form.Item name={'cover'} hidden={true}></Form.Item>
            <input type={'file'} onChange={(e)=>handleFileUploaded(e,'c')} id={'upload-btn-cv'}/>
            <label htmlFor="upload-btn-cv">
                <div style={{width: '320px', height: '120px', padding: 16, backgroundImage: "url('" + cover.src + "')"}} className={'im-bg'}>
                    {cover.src ? <div className={'delete-button'} onClick={(e)=>handleDeleteClick(e,'c')}><img alt={'delete_icon'} src={delete_icon}/></div> : null}
                    {
                        cover.src ? <div></div> : <div className={'inn_image_div'}>COVER IMAGE</div>
                    }

                </div>
            </label>
        </Col>
        <Col lg={15}>
            <h1 className={'cover_upload_bold_text'}>Clinic page cover image</h1>
            <div className={'upload_small_text'}>Please upload an image of your logo in good quality 1200x300px with safe areas</div>
        </Col>
        <Col lg={4}>
            <input type={'file'} onChange={(e)=>handleFileUploaded(e,'l')} id={'upload-btn-lg'}/>
            <label htmlFor="upload-btn-lg">
                <div style={{width: '120px', height: '120px',padding: 16, backgroundImage: "url('" + logo.src + "')"}} className={'im-bg'}>

                    {logo.src ? <div className={'delete-button'} onClick={(e)=>handleDeleteClick(e,'v')}><img alt={'delete_icon'} src={delete_icon}/></div> : null}
                    {
                        logo.src ? <div></div> : <div>
                            <div className={'inn_logo_div'}>LOGOTYPE</div>
                            <div align={'center'} className={'bottom_text_logo_div'}>SAFE AREA</div>
                        </div>
                    }

                </div>
            </label>
        </Col>
        <Col lg={20}>
            <h1 className={'cover_upload_bold_text'}>Clinic logo</h1>
            <div className={'upload_small_text'} style={{width: 240}}>Please upload an image of your logo in good quality 500x500px with safe areas</div>
        </Col>
    </Row>
}

export default ClinicImages