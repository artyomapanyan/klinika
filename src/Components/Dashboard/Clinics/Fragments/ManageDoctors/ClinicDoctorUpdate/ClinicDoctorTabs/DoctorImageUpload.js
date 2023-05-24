import React, {useEffect, useState} from "react";
import delete_icon from "../../../../../../../dist/icons/delete_icon.png";
import {Button, Col, Form, Input, Row} from "antd";

function DoctorImageUpload({formRef}) {

    const [logo, setLogo] = useState({
        file: null,
        src: null
    });
    const handleDeleteClick = (e,type) => {
        e.preventDefault();
        {
            setLogo({
                file: null,
                src: null
            })
        }


    }
    useEffect(()=>{
        formRef?.current?.setFieldsValue({
            logo:logo.file,
        })
    },[logo])
    const preview = (file,type) => {
        const fr = new FileReader();
        fr.onload = () => {
            {
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
    return(
        <div>
            <Row className={'clinic-images-container'} gutter={[10,38]}>

                <Col lg={4}>
                    {/*<input type={'file'} onChange={(e)=>handleFileUploaded(e,'l')} id={'upload-btn-lg'}/>*/}
                    <label htmlFor="upload-btn-lg">
                        <div style={{width: '120px', height: '120px',padding: 16, backgroundImage: "url('" + logo.src + "')"}} className={'im-bg'}>

                            {logo.src ? <div className={'delete-button'} onClick={(e)=>handleDeleteClick(e,'v')}><img alt={'delete_icon'} src={delete_icon}/></div> : null}


                        </div>
                    </label>
                </Col>


            </Row>

            <div>

                <Input  type={'file'} onChange={(e)=>handleFileUploaded(e,'l')} id={'upload_change_btn'}/>
            </div>
        </div>
        )



}

export default DoctorImageUpload;