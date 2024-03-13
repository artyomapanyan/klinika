import React, {useState} from "react";
import {Avatar, Button} from "antd";
import {UserOutlined} from "@ant-design/icons";
import JitsiVideo from "./JitsiVideo/JitsiVideo";
import {useSelector} from "react-redux";
import dayjs from "dayjs";
import {t} from "i18next";


function VideoCall({data}) {
    let language = useSelector((state) => state.app.current_locale)

    const [videoState, setVideoState] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [collapseState, setCollapseState] = useState(true);


    const [inputState, setInputState] = useState('');
    const [chatState, setChatState] = useState([]);



    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const onStartCall = () => {
        setVideoState(true)
    }

    function getLocalStream() {

        navigator.permissions.query(
             { name: 'camera' },
            // { name: 'geolocation' }
            // { name: 'notifications' }
            // { name: 'midi', sysex: false }
            // { name: 'midi', sysex: true }
            // { name: 'push', userVisibleOnly: true }
            // { name: 'push' } // without userVisibleOnly isn't supported in chrome M45, yet
        ).then(function(permissionStatus){

            //console.log('camera '+permissionStatus.state); // granted, denied, prompt
            navigator.mediaDevices.getUserMedia({  video: true })
            permissionStatus.onchange = function(){
               // console.log("Permission changed to " + this.state);
            }

        })
        navigator.permissions.query(
            { name: 'microphone' }
        ).then(function(permissionStatus){

            navigator.mediaDevices.getUserMedia({  audio: true })
            permissionStatus.onchange = function(){

            }

        })

    }

    const onHideChat = () => {
        setCollapseState(!collapseState)
    }

    const inputChange = (e) => {

        setInputState(e.target.value)
    }

    const onSend = (value) => {
        setChatState([
                ...chatState,
                {
                    text: inputState,
                    id: Math.random()
                }
            ]
        )
        setInputState('')
    }



    return(
        <div style={{display: 'flex'}}>
            <div className={'video_sms_div'} style={{ padding: videoState ? 0 : 180, width: collapseState ? '100%' : '100%'}}>
                {
                    videoState ? <JitsiVideo data={data} setVideoState={setVideoState}/> : <div className={'video_call_avatr_Text'}>
                        <div>
                            <Avatar  style={{height:240, width: 200, borderRadius: 8}}  shape="square" icon={<UserOutlined />} />
                        </div>
                        <div className={'video_call_avatar_right_div'}>
                            <div>
                                <div className={'video_call_grey_text'}>{t('Purpose')}</div>
                                <div className={'video_call_bold_text'}>
                                    {data?.purpose}
                                </div>
                            </div>

                            <div>
                                <div className={'video_call_grey_text'}>{language === 'en' ? t('Appt Time/Date') : t('Date/Appt Time')}</div>
                                <div className={'collapse_content_foot'} style={{fontSize: 16}}>
                                    <span style={{fontWeight: 700, }}>{dayjs(data?.booked_at?.iso_string).format('h:mm A')} </span>  / {dayjs(data?.booked_at?.iso_string).format('DD MMMM YY')}
                                </div>
                            </div>

                            <div style={{display: 'flex', gap: 10}}>
                                <Button onClick={onStartCall} className={'video_call_primary_btn'} type={'primary'}>{t('Start call now')}</Button>
                            </div>

                            {/*<div onClick={getLocalStream} className={'video_call_sound_and_text_div'}>*/}
                            {/*    <div>*/}
                            {/*        <div className={'video_call_purpule_text'}>*/}
                            {/*            {t('Test your permissions and devices')}*/}
                            {/*        </div>*/}
                            {/*        <div className={'video_call_permission_text'}>*/}
                            {/*            {t('Before call please check audio and video permissions')}*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*    <div>*/}
                            {/*        <div className={'video_call_sound_div'}><img src={sound_icon} alt={'sound_icon'}/></div>*/}

                            {/*    </div>*/}
                            {/*</div>*/}

                        </div>
                    </div>
                }


            </div>


            {/*<Button onClick={onHideChat} className={'x_div'} icon={collapseState ? <img src={x_black} alt={'x_black'}/> : <LeftOutlined />}>*/}

            {/*</Button>*/}
            {/*{*/}
            {/*    collapseState ? <div className={'chat_big_div'} style={{width: collapseState ? '25%' : '4%'}}>*/}

            {/*        <div style={{maxWidth: '80%', display: 'flex', flexDirection: 'column', marginBottom: 24}}>*/}
            {/*            {*/}
            {/*                chatState.map((el) => {*/}
            {/*                    return <div key={el.id} className={'chat_text_div'}>{el.text}</div>*/}
            {/*                })*/}
            {/*            }*/}
            {/*        </div>*/}

            {/*        <Form className={'chat_bottom_div'}*/}
            {/*            onFinish={onSend}*/}
            {/*        >*/}
            {/*            <div style={{width:'100%'}}>*/}
            {/*                <Input onChange={(e)=>inputChange(e)} value={inputState}  className={'chat_input'} placeholder={'Type your message here'}/>*/}
            {/*            </div>*/}
            {/*            <Space className={'chat_icons_div'}>*/}
            {/*                <Button style={{border: 'none'}} icon={<img style={{marginRight: 18, cursor: 'pointer'}} src={spiral_icon} alt={'spiral_icon'}/>}></Button>*/}
            {/*                <Button onClick={onSend} style={{border: 'none'}} icon={<img style={{marginRight: 18, cursor: 'pointer'}} src={send_arrow_purpule} alt={'send_arrow_purpule'}/>}></Button>*/}
            {/*            </Space>*/}
            {/*        </Form>*/}
            {/*    </div> : <div></div>*/}
            {/*}*/}

        </div>
    )
}
export default VideoCall;