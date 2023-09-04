import React, {useState,useEffect} from 'react'
import {Button, Form, notification, Upload, message } from "antd";

function FileManager({name, limit = 1, listType = 'picture', initialFileList = [],formRef,type, text1, text2, uploadIcon}) {
    const [fileList, setFileList] = useState(initialFileList.filter(e => e))
    const [deletedFiles, setDeletedFiles] = useState([])

    useEffect(()=>{
        formRef.current.setFieldsValue({
            [name]:[]
        })
    },[])
    const fileInputProps = {
        name:name,
        multiple:limit>1?true:false,
    fileList:fileList,
    listType:listType,
    onChange:(info) => {
        const {file} = info
        if (file.status === 'removed') {
            if(file.id){
                let delFiles = [...deletedFiles,file.id];
                setDeletedFiles(delFiles)
                formRef.current.setFieldsValue({
                    [`${name}_deleted`]:delFiles
                })
            }
            return   setFileList(fileList.filter(e => e.uid !== file.uid))
        }
        if(info.fileList.length>limit){
            return notification.error({
                description:`File max count is ${limit}`
            })
        }
        if (file.status === 'uploading' || file.status === 'success') {
            file.status = 'success';
            if(file.type.includes('document')){
                file.thumbUrl = 'https://img.freepik.com/free-psd/google-icon-isolated-3d-render-illustration_47987-9777.jpg?w=2000'
            }
            return   setFileList([...fileList, file])
        }

    },
    customRequest:(e) => e.onSuccess("ok")
    }

    function beforeUpload(file) {

        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('File must smaller than 2MB!');
        }
        return isLt2M;
    }


    return <div style={{height:'100%', position:'relative'}}>
        <div style={{height:'100%', position:'relative'}}>
            <div style={{ width: '100%'}}>
        <Form.Item name={name} initialValue={[initialFileList]} getValueFromEvent={(event) =>{
            return event.fileList.map(e=>e.originFileObj).filter(e=>e)
        }}>

                    {type==='drag'?<Upload.Dragger
                        style={{width:'100%'}}
                        {...fileInputProps}
                    >
                        <p className="ant-upload-drag-icon">
                            {uploadIcon}
                        </p>
                        <p className="ant-upload-text">{text1}</p>
                        <p className="ant-upload-hint">{text2}</p>
                    </Upload.Dragger>:<Upload
                        beforeUpload={beforeUpload}

                        {...fileInputProps}>
                        <Button>Add</Button>
                    </Upload>}


        </Form.Item>
                <div style={{width:'100%', height:'69%',top:0,left:0, backgroundColor: '#00000005', position:"absolute",  zIndex:fileList.length>=limit?99:-1, borderRadius: 12}}>


                </div>
            </div>

        </div>
        <Form.Item name={`${name}_deleted`} hidden={true} />

    </div>
}

export default FileManager
