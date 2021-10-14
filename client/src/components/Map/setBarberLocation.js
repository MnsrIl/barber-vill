import React, {useCallback, useEffect, useRef, useState} from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';
import {
    AddLocationAlt,
    Close,
    CompassCalibration,
    Delete, MyLocation,
    NotListedLocationOutlined,
    Save,
    Star
} from "@mui/icons-material";
import styles from "./MapStyles";
import {Box, Button, Card, CardActions, CardContent, IconButton, Tooltip, Typography} from "@mui/material";
import {useDispatch} from "react-redux";
import mapboxgl from "mapbox-gl"; // This is a dependency of react-map-gl even if you didn't explicitly install it

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const useStyles = styles;

const SetBarberLocation = ({handleCloseMap, handleSetLocation, location}) => {
    const classes = useStyles()
    const dispatch = useDispatch();

    const mapApiToken = "pk.eyJ1Ijoib3dlbmxhbWIiLCJhIjoiY2lleWljcnF4MDBiOXQ0bHR0anRvamtucSJ9.t3YnHHqvQZ8Y0MTCNy0NNw";

    const [viewport, setViewport] = useState({
        latitude: 43.7577,
        longitude: 45.4376,
        zoom: 4,
    });

    const [userMarker, setUserMarker] = useState(
        {lng: null, lat: null, isAlive: false, street: null, city: null, country: null, republic: null});

    const [popupCoords, setPopupCoords] = useState(null);
    const [showPopup, togglePopup] = useState(false);
    const mapRef = useRef();
    const geocoderContainerRef = useRef();

    const handleViewportChange = useCallback(
        (newViewport) => setViewport(newViewport), []
    );

    //async operation for findout coordinates
    const handleGetLocation = async (lng, lat) => {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapApiToken}&language=ru`;
        const res = await fetch(url);
        const json = await res.json();

        const addressData = {};

        json.features.forEach(stroke => {
            switch (stroke.place_type[0]) {
                case 'address': addressData.address = `${stroke.text}${stroke.address ? `, ${stroke.address}` : ""}`; break

                case 'place': addressData.city = stroke.text; break

                case 'region': addressData.republic = stroke.text; break

                case 'country': addressData.country = stroke.text; break;

                default: {
                    return;
                }
            }
        })

        setUserMarker({...userMarker, lng, lat, isAlive: true, ...addressData});
    }

    //Get user location by click on button
    const handleMyLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const ViewportFlyToInterpolator = {
                    propNames: ['longitude', 'latitude', 'zoom', 'bearing', 'pitch'],
                    props: {speed: 1.2, curve: 1.414}
                }
                const defaultOverrides = { transitionDuration: 1000, transitionFlyToInterpolator: ViewportFlyToInterpolator };
                const {latitude: lat, longitude: lng} = position.coords;

                handleViewportChange({
                    latitude: lat,
                    longitude: lng,
                    zoom: 17,
                    ...defaultOverrides
                });

                handleGetLocation(lng, lat);
                setUserMarker({lng, lat, isAlive: true});
                setPopupCoords({lng, lat});
                togglePopup(true)
            })
        } else {
            console.log('geolocation is not supported')
        }
    }
    //Opening Popup by click on Marker
    const handleToggleMarkerPopup = (e) => {
        setViewport({...viewport, latitude: userMarker.lat, longitude: userMarker.lng, zoom: 12});
        setPopupCoords({lat: userMarker.lat, lng: userMarker.lng});
        togglePopup(true)
    }

    //Find by input
    const handleGeocoderViewportChange = useCallback(
        (newViewport) => {
            const geocoderDefaultOverrides = { transitionDuration: 1000 };

            return handleViewportChange({
                ...newViewport,
                ...geocoderDefaultOverrides
            });
        }, [handleViewportChange]
    );
    //adding marker by geocoder
    const handleAddMarkerByGeocoder = ({result}) => {

        if (result.place_type.find(item => item === 'address')) {
            const [lng, lat] = result.center;

            setUserMarker({lng, lat, isAlive: true});
            setPopupCoords({lng, lat});
            handleGetLocation(lng, lat);
            togglePopup(true)
        }
    }

    //adding marker by user
    const handleAddMarker = (e) => {
        if (e.target.className === "overlays") {
            const [lng, lat] = e.lngLat;

            setUserMarker({lng, lat, isAlive: true});
            setPopupCoords({lng, lat});
            handleGetLocation(lng, lat)
            togglePopup(true)
        }
        // setViewport({...viewport, zoom: 16, center: e.center});
    }

    const handleDeleteMarker = () => {
        setUserMarker({lng: null, lat: null, isAlive: false});
        togglePopup(false);
        setPopupCoords(null);

        handleSetLocation(null)
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
        if (location) {
            const {lat, lng} = location;
            setUserMarker({lat, lng, isAlive: true});
            setPopupCoords({lat, lng});
            handleGetLocation(lng, lat);
            togglePopup(true);
        }
    }, [location]);

    //save marker
    const handleSaveLocation = () => {
        handleSetLocation({lng: userMarker.lng, lat: userMarker.lat});
    }

    return (
        <>
            <div
                ref={geocoderContainerRef}
                style={{ position: "absolute", top: 20, left: 20, zIndex: 1 }}
            />
            <ReactMapGL
                width={"100vw"}
                height={"100vh"}
                ref={mapRef}
                {...viewport}
                mapboxApiAccessToken={mapApiToken}
                onViewportChange={handleViewportChange}
                mapStyle={"mapbox://styles/mapbox/streets-v11"}
                onClick={handleAddMarker}
                onLoad={handleChangeLanguage}
            >
                {showPopup && <Popup
                    latitude={popupCoords.lat}
                    longitude={popupCoords.lng}
                    closeButton={true}
                    closeOnClick={false}
                    onClose={() => togglePopup(false)}
                    offsetLeft={-8}
                    offsetTop={13}
                    anchor="top"
                    className={classes.popup}
                >
                    <Box sx={{ minWidth: 200 }}>
                        <Card variant="none">
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    {userMarker?.country}
                                </Typography>
                                <Typography variant="h5" component="div">
                                    {userMarker?.city}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    {userMarker?.republic}
                                </Typography>
                                <Typography variant="body2">
                                    {userMarker?.address}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{display: "flex", justifyContent: "center"}}>
                                <IconButton
                                    aria-label="save-location"
                                    size='small'
                                    color='success'
                                    onClick={handleSaveLocation}
                                >
                                    <Save />
                                </IconButton>
                                <IconButton
                                    aria-label="delete"
                                    size='small'
                                    color='error'
                                    onClick={handleDeleteMarker}
                                >
                                    <Delete />
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Box>
                </Popup>}

                {userMarker.isAlive && <Marker
                    latitude={userMarker.lat}
                    longitude={userMarker.lng}
                    offsetLeft={-20}
                    offsetTop={-10}
                    className={classes.marker}
                    onClick={(e) => handleToggleMarkerPopup(e)}
                >
                    <AddLocationAlt cursor={'pointer'}/>
                </Marker>}
                <Geocoder
                    onResult={handleAddMarkerByGeocoder}
                    placeholder={"Введите ваш адрес..."}
                    language={"ru"}
                    mapRef={mapRef}
                    containerRef={geocoderContainerRef}
                    onViewportChange={handleGeocoderViewportChange}
                    mapboxApiAccessToken={mapApiToken}
                    position="top-left"
                    marker={true}
                />
                <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    size='large'
                    color='error'
                    sx={{position: 'absolute'}}
                    onClick={handleCloseMap}
                >
                    <Close />
                </IconButton>
                <Tooltip title={'Current Geolocation'}>
                    <IconButton
                        aria-label="my location"
                        className={classes.myLocationButton}
                        size='large'
                        sx={{position: 'absolute'}}
                        onClick={handleMyLocation}
                    >
                        <MyLocation htmlColor={"#55e"} />
                    </IconButton>
                </Tooltip>
            </ReactMapGL>
        </>
    );
};

export default SetBarberLocation;