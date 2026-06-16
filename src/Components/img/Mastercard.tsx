import { useState } from "react";


function Mastercard(){
    const [isHovered, setIsHovered] = useState(false);

    return(
        <svg width="100" height="55" viewBox="0 0 100 55" xmlns="http://www.w3.org/2000/svg"
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
        >
            <text x="0" y="22"
                font-family="Arial, Helvetica, sans-serif"
                font-size="14"
                fill={isHovered ? "#ff0000" : "#fff"}>
                Mastercard
            </text>

            <text x="0" y="43"
                font-family="Arial, Helvetica, sans-serif"
                font-size="14"
                fill={isHovered ? "#ffcc00" : "#fff"}>
                SecureCode
            </text>
        </svg>
    )
}
export default Mastercard