import React, { useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useLoadScript } from "@react-google-maps/api";
import { GoogleMap, Marker } from '@react-google-maps/api';
import { MapComponent } from "../../components/map";
import "./styles.css"

export const Homepage = () => {
    const [token] = useCookies(['whatsNearMeToken']);
    const navigate = useNavigate();
    const [libraries] = useState<("drawing" | "geometry" | "localContext" | "places" | "visualization")[]>(['places']);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    useEffect(() => {
        if (token && !token.whatsNearMeToken) {
            navigate('/sign-in')
        }
    }, [token])

    return (
        <>
            <button className="submit-button" onClick={() => navigate('/liked')}>See liked places</button>
            {isLoaded ?
                 <MapComponent/> :
                <p>Loading...</p>}
        </>
    )
}