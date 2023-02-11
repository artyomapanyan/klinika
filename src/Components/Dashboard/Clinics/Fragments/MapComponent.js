import React, {useEffect, useRef} from "react";


function MyMapComponent({data}) {
    const ref = useRef();

    useEffect(() => {
        new window.google.maps.Map(ref.current, {
            center:{ lat: +data.latitude,
                     lng: +data.longitude},
            zoom:15,
        });
    });

    return <div style={{height:400, width:500}} ref={ref} id="map" />;
}
export default MyMapComponent;