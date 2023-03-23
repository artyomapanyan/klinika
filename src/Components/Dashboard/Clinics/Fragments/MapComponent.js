import React, {useEffect, useRef, useState} from "react";
import {GoogleMap, LoadScript, Marker, Autocomplete} from "@react-google-maps/api";
import {Input} from "antd";
import {PushpinOutlined} from "@ant-design/icons";




function MyMapComponent({data, setMapData}) {
    const googleRef = useRef();
    const [autocomplete, setAutocomplete] = useState()
    const [initialPosition,setInitialPosition] = useState({ lat: +data.latitude, lng: +data.longitude })
    const [marker,setMarker] = useState()
    const [map,setMap] = useState()


    const onLoadMap = (map) => {
        setMap(map);
    };
    const onClickMap = (position) => {
        marker.setPosition(position.latLng);
        onSetMarkerPosition(position.latLng);
    };
    function onSetMarkerPosition(latLng) {
        let geocoder =  new window.google.maps.Geocoder();
        setTimeout
            geocoder?.geocode({'latLng': marker.getPosition()}, function (results, status) {
                if (results[0]) {
                    console.log(results)
                }
            });



    }
    const onLoad = (autocomplete) => {
        setAutocomplete(autocomplete)
    }
    const onDragMarker = (pos) => {
        setInitialPosition(pos.latLng)
        setMapData(pos.latLng)
    }

    const onLoadMarker = (marker) => {
        setMarker(marker)
    };
    const onCurrentPosition = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((geo) => {
                const position = {
                    lat: geo.coords.latitude,
                    lng: geo.coords.longitude,
                };

                map.setCenter(position);
                marker.setPosition(position);
                onSetMarkerPosition(map.center);
            }, () => {
                // handleLocationError(true, infoWindow, map.getCenter());
            });
        }
    }

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

    const uluru = { lat: 24.845909101072877, lng: 39.569421557617204 }

    return(

        <LoadScript
            id="script-loader"
            googleMapsApiKey={apiKey}
            //language={this.props.state.Intl.locale}
            libraries={['places']}
        >

            <GoogleMap
                ref={googleRef}
                id="position-map"
                center={data ? initialPosition : uluru}
                zoom={11}
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
                    <Input addonAfter={<PushpinOutlined onClick={onCurrentPosition} />} />
                </Autocomplete>

                <Marker
                    onMouseUp={onDragMarker}
                    onLoad={onLoadMarker}
                    draggable
                    position={initialPosition}
                />
            </GoogleMap>
        </LoadScript>

    )










    // const ref = useRef();
    //
    // const uluru = { lat: +data.latitude, lng: +data.longitude };
    //
    // // const map = new window.google.maps.Map(document.getElementById("map"), {
    // //     zoom: 4,
    // //     center: uluru,
    // // });
    //
    // const marker = new window.google.maps.Marker({
    //     position: uluru,
    //     map: map,
    // });
    //
    //
    //
    //
    //     new window.google.maps.Map(ref.current, {
    //         center: uluru,
    //         zoom:10,
    //     })
    //
    //
    //
    // return <div style={{height:400, width:500}} ref={ref} id="map" />;
}
export default MyMapComponent;