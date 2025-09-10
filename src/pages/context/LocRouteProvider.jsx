import { useEffect, useState, useContext,createContext } from "react";
import { Polyline, useMap } from "react-leaflet";

export const locRouteContext = createContext();

function LocRouteProvider({children}) {

    const [route, setRoute] = useState(null);
    const [userPosition, setUserPosition] = useState(null);
    const [startEndPos, setStartEndPos] = useState({start: { lat: 11.0324860, lng: 77.0329760 }, end: { lat: 11.033746, lng: 77.034188 }});
    const [mapInstance, setMapInstance] = useState(null);
    const GRASSHOPPER_API_KEY = '72b08d8f-b8e1-439f-9b83-409939c0e84a';
    const flyToUserPosition = () => {
      if(mapInstance && userPosition){
        mapInstance.flyTo(userPosition, 16, { duration: 2 });
      }
    };

    function Route() {
      useEffect(() => {
        async function fetchRoute() {
          try {
            const url = `https://router.project-osrm.org/route/v1/driving/${startEndPos.start.lng},${startEndPos.start.lat};${startEndPos.end.lng},${startEndPos.end.lat}?overview=full&geometries=geojson`;
            const res = await fetch(url);
            const data = await res.json();

            if (data.routes && data.routes.length > 0) {
              const coords = data.routes[0].geometry.coordinates.map(
                ([lng, lat]) => [lat, lng]
              );
              setRoute(coords);
            }
          } catch (err) {
            console.error('Failed to fetch route:', err);
          }
        }

        fetchRoute();
      }, [startEndPos])
      return route ? <Polyline positions={route} color="blue" /> : null;
    }

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
    <locRouteContext.Provider value={{ Route, userPosition, setMapInstance, flyToUserPosition, setStartEndPos}}>
        {children}
    </locRouteContext.Provider>
  )
}

export default LocRouteProvider
