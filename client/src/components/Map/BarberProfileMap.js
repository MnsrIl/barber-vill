import React, {useCallback, useEffect, useRef, useState} from 'react';
import ReactMapGL, {Marker, Popup} from "react-map-gl";
import {Box, Card, CardActions, CardContent, IconButton, Tooltip, Typography} from "@mui/material";
import {AddLocationAlt, Close, Delete, MyLocation, Save} from "@mui/icons-material";
import Geocoder from "react-map-gl-geocoder";
import styles from "./MapStyles"

const useStyles = styles;

const BarberProfileMap = (location) => {
    location = location.location

    const classes = useStyles()
    const mapApiToken = "pk.eyJ1Ijoib3dlbmxhbWIiLCJhIjoiY2lleWljcnF4MDBiOXQ0bHR0anRvamtucSJ9.t3YnHHqvQZ8Y0MTCNy0NNw";
    const mapRef = useRef();

    const [viewport, setViewport] = useState({
        latitude: 43.7577,
        longitude: 45.4376,
        zoom: 4,
    });

    const [markerData, setMarkerData] = useState({})

    const [showPopup, toggleShowPopup] = useState(false);

    const handleViewportChange = useCallback(
        (newViewport) => setViewport(newViewport), []);

    const handleShowPopup = () => {
        toggleShowPopup(true)
    }

    const handleGetLocation = async () => {
        const reverseUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location.lng},${location.lat}.json?access_token=${mapApiToken}&language=ru`;

        const res = await fetch(reverseUrl);
        const json = await res.json();

        const addressData = {};

        json.features.forEach(key => {
            switch (key.place_type[0]) {
                case 'address': addressData.address = `${key.text}${key.address ? `, ${key.address}` : ""}`; break

                case 'place': addressData.city = key.text; break

                case 'region': addressData.republic = key.text; break

                case 'country': addressData.country = key.text; break;

                default: {
                    return;
                }
            }
        })
        setMarkerData({...addressData});
    }

    const handleToMyMarker = () => {
        setViewport({latitude: location.lat, longitude: location.lng, zoom: 15})
    }

    const handleChangeLanguage = (map) => {
        map.target.getStyle().layers.forEach((layer) => {
            if (layer.layout && layer.layout['text-field']) {
                map.target.setLayoutProperty(layer.id, 'text-field', [
                    'coalesce',
                    ['get', 'name_' + 'ru'],
                    ['get', 'name'],
                ]);
            }
        });
    }

    useEffect(() => {
        handleGetLocation()
    }, [location])

    return (
        <div className={classes.container}>
            <ReactMapGL
                width={"100%"}
                height={"100%"}
                ref={mapRef}
                {...viewport}
                mapboxApiAccessToken={mapApiToken}
                onViewportChange={handleViewportChange}
                mapStyle={"mapbox://styles/mapbox/streets-v11"}
                onLoad={handleChangeLanguage}
            >
                {showPopup && <Popup
                    latitude={location.lat}
                    longitude={location.lng}
                    closeButton={true}
                    closeOnClick={false}
                    onClose={() => toggleShowPopup(false)}
                    offsetLeft={-8}
                    offsetTop={13}
                    anchor="top"
                    className={classes.popup}
                >
                    <Box sx={{ minWidth: 200 }}>
                        <Card variant="none">
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    {markerData?.country}
                                </Typography>
                                <Typography variant="h5" component="div">
                                    {markerData?.city}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    {markerData?.republic}
                                </Typography>
                                <Typography variant="body2">
                                    {markerData?.address}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                </Popup>}

                <Marker
                    latitude={location.lat}
                    longitude={location.lng}
                    offsetLeft={-20}
                    offsetTop={-10}
                    className={classes.marker}
                    onClick={handleShowPopup}
                >
                    <AddLocationAlt cursor={'pointer'}/>
                </Marker>
                <Tooltip title={'To marker'}>
                    <IconButton
                        aria-label="my location"
                        className={classes.myLocationButton}
                        size='medium'
                        sx={{top: 1}}
                        onClick={handleToMyMarker}
                    >
                        <MyLocation htmlColor={"#43437a"} />
                    </IconButton>
                </Tooltip>
            </ReactMapGL>
        </div>
    );
};

export default BarberProfileMap;