import React from "react";

export default function Time({time}){
    const format = element => `0${Math.floor(element)}`.slice(-2);
    const hours = time / 3600;
    const minutes = (time % 3600) / 60;
    const seconds = time % 60;

    return(
        <div>
            {[hours, minutes, seconds].map(format).join(":")}
        </div>

    )

}