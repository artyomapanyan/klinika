import React, {useEffect, useRef} from "react";


function MyMapComponent() {
    const ref = useRef();

    useEffect(() => {
        new window.google.maps.Map(ref.current, {
            center:{ lat: -34.397, lng: 150.644 },
            zoom:4,
        });
    });

    return <div style={{height:400, width:500}} ref={ref} id="map" />;
}
export default MyMapComponent;