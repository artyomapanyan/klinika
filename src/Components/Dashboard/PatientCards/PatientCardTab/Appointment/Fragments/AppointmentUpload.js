import {InboxOutlined} from "@ant-design/icons";
import {Upload} from "antd";
import React from "react";

function AppointmentUpload() {
    return(
        <div>
            <Upload.Dragger
                name={'file'}
                multiple={true}
                listType={'picture'}
                onChange={(info) => {
                    console.log(info)

                }}
                customRequest={(e) => {
                    console.log(e.file)
                    e.onSuccess({})
                    return Promise.resolve()
                }}

                onDrop={(e) => {
                    console.log('Dropped files', e.dataTransfer.files);
                }}
            >
                <p className="ant-upload-drag-icon">
                    <InboxOutlined/>
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                    band files
                </p>
            </Upload.Dragger>
        </div>
    )
}
export default AppointmentUpload;