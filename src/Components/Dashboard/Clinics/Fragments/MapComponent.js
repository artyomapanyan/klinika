import React, {useEffect, useRef} from "react";


function MyMapComponent({data}) {
    const ref = useRef();
    useEffect(() => {
        Object.keys(data).length !== 0 ? new window.google.maps.Map(ref.current, {
            center:{ lat: +data.latitude,
                     lng: +data.longitude},
            zoom:18,
        }) : setTimeout(() => {
            new window.google.maps.Map(ref.current, {
                center:{ lat: 0,
                    lng: 0},
                zoom:16,
            });
        }, 50)

    });

    return <div style={{height:400, width:500}} ref={ref} id="map" />;
}
export default MyMapComponent;