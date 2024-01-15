import React from 'react';
import {JitsiMeeting} from "@jitsi/react-sdk";

function JitsiVideo({data}) {


    return(
        <JitsiMeeting
            domain = {`${data?.telehealth?.domain}`}
            roomName ={`${data?.telehealth?.room_name}`}
            configOverwrite = {{
                startWithAudioMuted: true,
                disableModeratorIndicator: true,
                startScreenSharing: true,
                enableEmailInStats: false,
            }}
            config={{
                enableClosePage:true,
            }}
            interfaceConfigOverwrite = {{
                DISABLE_JOIN_LEAVE_NOTIFICATIONS: true
            }}
            userInfo = {{
                displayName: data?.doctor?.first
            }}
            onApiReady = { (externalApi) => {

                // here you can attach custom event listeners to the Jitsi Meet External API
                // you can also store it locally to execute commands
            } }
            getIFrameRef = { (iframeRef) => {
                iframeRef.style.height = '700px';
                iframeRef.style.width = '100%';

            } }
            interfaceConfig={{
                CLOSE_PAGE_GUEST_HINT: false
            }}
        />
    )
}
export default JitsiVideo;