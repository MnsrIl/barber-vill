// import React, {useEffect, useRef, useState} from "react"
// import {makeStyles} from "@mui/styles";
// import geoJSON from "./chicago-parks.json";
// import mapboxgl from "mapbox-gl";
// import {Box, Button, Modal} from "@mui/material";
//
// const useStyles = makeStyles(theme => ({
//
//     mapContainer: {
//         position: "absolute",
//         top: 0,
//         bottom: 0,
//         left: 0,
//         right: 0
//     },
//
//     map: {
//         display: "inline-block",
//         position: "absolute",
//         top: 0,
//         left: 0,
//         color: "#fff",
//         margin: 1.5,
//         backgroundColor: "#404040",
//         padding: "6px",
//         fontWeight: "bold",
//         zIndex: "1 !important",
//     },
//     marker: {
//     backgroundImage: `url('https://www.jawg.io/docs/images/icons/eiffel-tower@2x.png')`,
//     backgroundSize: "cover",
//     width: "50px",
//     height: "50px",
//     cursor: "pointer",
// }
// }))
//
// mapboxgl.accessToken =
//     'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';
//
// const Map = ({handleClose}) => {
//     const classes = useStyles();
//     const mapContainerRef = useRef(null);
//
//     const [lng, setLng] = useState(-87.65);
//     const [lat, setLat] = useState(41.84);
//     const [zoom, setZoom] = useState(10);
//     const [marker, setMarker] = useState({lng: null, lat: null});
//
//
//     // Initialize map when component mounts
//     useEffect(() => {
//         const map = new mapboxgl.Map({
//             container: mapContainerRef.current,
//             style: 'mapbox://styles/mapbox/streets-v11',
//             center: [lng, lat],
//             zoom: zoom,
//         });
//         console.log(map);
//
//         map.on('load', function () {
//             // Add an image to use as a custom marker
//             map.loadImage(
//                 'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
//                 function (error, image) {
//                     if (error) throw error;
//                     map.addImage('custom-marker', image);
//                     // Add a GeoJSON source with multiple points
//                     map.addSource('points', {
//                         type: 'geojson',
//                         data: {
//                             type: 'FeatureCollection',
//                             features: geoJSON.features,
//                         },
//                     });
//                     // Add a symbol layer
//                     map.addLayer({
//                         id: 'points',
//                         type: 'symbol',
//                         source: 'points',
//                         layout: {
//                             'icon-image': 'custom-marker',
//                             // get the title name from the source's "title" property
//                             'text-field': ['get', 'title'],
//                             'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
//                             'text-offset': [0, 1.25],
//                             'text-anchor': 'top',
//                         },
//                     });
//                 }
//             );
//         });
//
//         // Add navigation control (the +/- zoom buttons)
//         map.addControl(new mapboxgl.NavigationControl({showCompass: true, showUserLocation: true}),
//             'bottom-right');
//
//
//         map.on('move', () => {
//             setLng(map.getCenter().lng.toFixed(4));
//             setLat(map.getCenter().lat.toFixed(4));
//             setZoom(map.getZoom().toFixed(2));
//         });
//
//         map.on("click", (e) => {
//             new mapboxgl.Marker().setLngLat([e.lngLat.lng, e.lngLat.lat]).setDraggable(true).addTo(map)
//             setMarker({lng: e.lngLat.lng, lat: e.lngLat.lat});
//         })
//
//         // Clean up on unmount
//         return () => map.remove();
//
//     }, []); // eslint-disable-line react-hooks/exhaustive-deps
//
//     return (
//         <div>
//             <div className={classes.map}>
//                 <div>
//                     Longitude: {lng} |
//                     Latitude: {lat} |
//                     Zoom: {zoom} |
//                     <Button color={"success"} onClick={() => handleClose()}>Save</Button>
//                 </div>
//             </div>
//             <div className={classes.mapContainer} ref={mapContainerRef} />
//         </div>
//     );
// };
//
// export default Map;
