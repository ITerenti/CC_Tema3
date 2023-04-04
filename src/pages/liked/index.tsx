import React from "react";
import { mockResponse } from "./utils";
import { LocationCard } from "../../components/locationCard";
import './styles.css'
import { useNavigate } from "react-router-dom";

export const LikedPlaces = () => {
    const navigate = useNavigate()
    return (
        <>
        <button className="submit-button" onClick={() => navigate('/homepage')}>Browse places</button>
            <div className="attractions-list-container">
                {mockResponse?.length && mockResponse.map((item: any) => {
                    return <LocationCard key={item.place_id} name={item.name} vicinityAddress={item.vicinity} liked={true} iconUrl={item.icon} />
                })}
            </div>
        </>)
}