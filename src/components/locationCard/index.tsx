import React, { useState } from "react";
import { FaThumbsUp } from 'react-icons/fa'
import './styles.css'

interface ILocationCardProps {
    name: string;
    vicinityAddress: string;
    iconUrl: string;
    liked: boolean;
}

export const LocationCard = (props: ILocationCardProps) => {
    const { name, vicinityAddress, iconUrl, liked } = props;
    const [isLiked, setIsLiked] = useState<boolean>(liked)

    return (
        <div className="location-card-container">
            <img src={iconUrl} alt="App Icon" />
            <div>
                <div className="location-details">
                    <span className="detail-name">Name: </span>
                    <span className="detail-content">{name}</span>
                </div>
                <div className="location-details">
                    <span className="detail-name">Address: </span>
                    <span className="detail-content">{vicinityAddress}</span>
                </div>
            </div>
            <div className={`like-icon-container ${isLiked ? 'like-active' : 'like-default'}`} onClick={() => setIsLiked((prevVal) => !prevVal)}>
                <FaThumbsUp />
            </div>
        </div>
    )
}