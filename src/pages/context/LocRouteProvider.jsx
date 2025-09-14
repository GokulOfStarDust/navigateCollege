import { useEffect, useState, useContext,createContext } from "react";
import { Polyline, useMap } from "react-leaflet";
import UseLocRoute from "../hook/UseLocRoute";

export const locRouteContext = createContext();

function Route({start, end}) {
      const [route, setRoute] = useState(null);
      const {mapInstance} = UseLocRoute();

      useEffect(() => {
        async function fetchRoute() {
          try {
            const url = `https://router.project-osrm.org/route/v1/foot/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`;
            const res = await fetch(url);
            const data = await res.json();

            if (data.routes && data.routes.length > 0) {
              const coords = data.routes[0].geometry.coordinates.map(
                ([lng, lat]) => [lat, lng]
              );

              
            if(mapInstance){
              mapInstance.flyTo([start.lat, start.lng], 16, { duration: 2 });
            }

              setRoute(coords);
              alert("Route fetched successfully!");
            }
          } catch (err) {
            console.error('Failed to fetch route:', err);
          }
        }

        fetchRoute();
      }, [start, end]);

      return route ? <Polyline positions={route} color="blue" /> : null;
}

function LocRouteProvider({children}) {

    const [userPosition, setUserPosition] = useState(null);
    const [startEndPos, setStartEndPos] = useState({start: { lat: 11.0324860, lng: 77.0329760 }, end: { lat: 11.033746, lng: 77.034188 }});
    const [mapInstance, setMapInstance] = useState(null);

    const flyToUserPosition = () => {
      if(mapInstance && userPosition){
        mapInstance.flyTo(userPosition, 16, { duration: 2 });
      }
    };

    useEffect(()=>{
      if(!navigator.geolocation) alert("Geolocation not supported by browser!")

        const watchId = navigator.geolocation.watchPosition(
          (pos)=>{  
            setUserPosition([pos.coords.latitude, pos.coords.longitude]);
          },
          (err)=>{
            console.error(err)
          },
          {enableHighAccuracy: true}
        )
        return () => {
          navigator.geolocation.clearWatch(watchId);
        };
    },[])

  return (
    <locRouteContext.Provider value={{ Route, userPosition, mapInstance, setMapInstance, flyToUserPosition, setStartEndPos, startEndPos}}>
        {children}
    </locRouteContext.Provider>
  )
}

export default LocRouteProvider
