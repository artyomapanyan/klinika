import React, {useEffect, useState} from "react";
import {Col, Form, Row} from "antd";
import delete_icon from "../../../../dist/icons/delete_icon.png";
import upload_photos_icon from "../../../../dist/icons/upload_photos_icon.png";

function DoctorProfileImage({formRef, data}) {
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

            setLogo({
                file: null,
                src: null
            })



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

                setLogo((prevState) => ({
                    ...prevState,
                    file: file,
                    src: fr.result
                }))


        };
        fr.readAsDataURL(file);
    }
    const handleFileUploaded = (e,type) => {

        [...e.target.files].forEach((e)=>preview(e,type))


    }

    console.log(data)

    return <Row className={'clinic-images-container1'} gutter={[10,38]}>

        <Col lg={4}>
            <input type={'file'} onChange={(e)=>handleFileUploaded(e,'l')} id={'upload-btn-lg'}/>
            <label htmlFor="upload-btn-lg">
                <div style={{width: '200px', height: '200px', backgroundImage: "url('" + logo.src + "')"}} className={'im-bg'}>

                    {logo.src ? <div className={'delete-button'} onClick={(e)=>handleDeleteClick(e,'v')}><img alt={'delete_icon'} src={delete_icon}/></div> : null}
                    {
                        logo.src ? <div></div> : <div>
                            <div className={'inn_logo_div'}><img alt={'upload_photos_icon'} src={upload_photos_icon}/></div>

                        </div>
                    }

                </div>
            </label>
        </Col>

    </Row>
}

export default DoctorProfileImage