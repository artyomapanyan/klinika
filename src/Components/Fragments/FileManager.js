import React, {useState} from 'react'
import {Button, Form, notification, Upload} from "antd";
import {InboxOutlined} from "@ant-design/icons";

function FileManager({name, limit = 1, listType = 'picture', initialFileList = [],formRef,type, text1, text2, uploadIcon}) {
    const [fileList, setFileList] = useState(initialFileList.filter(e => e))
    const [deletedFiles, setDeletedFiles] = useState([])
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
    return <div>
        <Form.Item name={name} getValueFromEvent={(event) =>event.fileList.map(e=>e.originFileObj).filter(e=>e)}>
            {type==='drag'?<Upload.Dragger
              /*  itemRender={(item,element,functm,test,)=>{
                    console.log(item,element,functm,test)
                    return<div>123123</div>
                }}
*/
                {...fileInputProps}
            >
                <p className="ant-upload-drag-icon">
                    {uploadIcon}
                </p>
                <p className="ant-upload-text">{text1}</p>
                <p className="ant-upload-hint">{text2}</p>
            </Upload.Dragger>:<Upload   {...fileInputProps}><Button>ADdd</Button></Upload>}
        </Form.Item>
        <Form.Item name={`${name}_deleted`} hidden={true} />
    </div>
}

export default FileManager
