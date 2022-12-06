import {notification} from "antd";

export function notificate(data,status) {
    if (data.errors) {
        Object.keys(data.errors).map((type, index) => {
            data.errors[type].forEach((message) => {
                notification.error({
                    message: type,
                    description: message,
                    placement: "bottomRight"
                })
            });
            return true;
        });
    }
    if (data === "error") {
        notification.error({
            message: "Error",
            description: "Please contact the administrator",
            placement: "bottomRight"
        })
    }
    if (data.message  ) {
        if(status===200){
            notification.info({
                message: "Notification",
                description: data.message,
                placement: "bottomRight"
            })
        }else {
            notification.error({
                message: "Notification",
                description: data.message,
                placement: "bottomRight"
            })
        }

    }
    if (data.notices) {
        data.notices.forEach((message) => {
            if (data.status <= 400) {
                notification.info({
                    message: "Notification",
                    description: message,
                    placement: "bottomRight"
                })
            } else {
                notification.warning({
                    message: "Warning",
                    description: message,
                    placement: "bottomRight"
                })
            };
            return true;
        });
    }
}
