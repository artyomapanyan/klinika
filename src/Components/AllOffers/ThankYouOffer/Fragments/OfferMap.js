import React, {useRef, useState} from "react";
import {GoogleMap, LoadScript, Marker, Autocomplete} from "@react-google-maps/api";
import {Input,} from "antd";

import {useSelector} from "react-redux";

function OfferMap() {
    let clinicRedux = useSelector((state) => state?.publicClinicId);
    const googleRef = useRef();
    const [autocomplete, setAutocomplete] = useState()
    const [initialPosition,setInitialPosition] = useState({ lat: +clinicRedux?.location?.latitude, lng: +clinicRedux?.location?.longitude })
    const [marker,setMarker] = useState()
    const [map,setMap] = useState()


console.log(clinicRedux?.location)
    const onLoadMap = (map) => {
        setMap(map);
    };
    const onClickMap = (position) => {
        marker.setPosition(position.latLng);
        onSetMarkerPosition(position.latLng);
    };
    function onSetMarkerPosition(latLng) {
        let geocoder =  new window.google.maps.Geocoder();
        setTimeout(() => {
            geocoder?.geocode({'latLng': marker.getPosition()}, function (results, status) {

            });
        }, 100)
    }
    const onLoad = (autocomplete) => {
        setAutocomplete(autocomplete)
    }
    const onDragMarker = (pos) => {
        let geocoder =  new window.google.maps.Geocoder();
        setTimeout(() => {
            geocoder?.geocode({'latLng': marker.getPosition()}, function (results, status) {

            });
        }, 100)
        setInitialPosition(pos.latLng)
    }

    const onLoadMarker = (marker) => {
        setMarker(marker)
    };


    const onPlaceChanged = () => {
        if (autocomplete !== null) {
            map.setCenter(autocomplete.getPlace().geometry.location);
            marker.setPosition(autocomplete.getPlace().geometry.location);
            onSetMarkerPosition(autocomplete.getPlace().geometry.location);
        } else {
            // console.log('Autocomplete is not loaded yet!')
        }
    }

    const apiKey = 'AIzaSyD9MbMz7FESa79v-nntPfcxJHYTw8Am1S4'


    return(
        <LoadScript
            googleMapsApiKey={apiKey}
            libraries={['places']}
        >
            <div>

                    <GoogleMap
                        ref={googleRef}
                        id="offer_map"
                        center={initialPosition}
                        zoom={16}
                        onLoad={onLoadMap}
                        onClick={onClickMap}
                        options={{
                            mapTypeControl: false,
                            streetViewControl: false,
                            rotateControl: false,
                        }}

                    >
                        <Autocomplete
                            onLoad={onLoad}
                            onPlaceChanged={onPlaceChanged}
                        >

                            <Input defaultValue={clinicRedux?.location?.address1} />

                        </Autocomplete>


                        <Marker
                            onMouseUp={onDragMarker}
                            onLoad={onLoadMarker}
                            draggable
                            position={initialPosition}
                        />
                    </GoogleMap>

            </div>
        </LoadScript>
    )

}
export default OfferMap;