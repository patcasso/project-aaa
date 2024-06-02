import React from 'react'
import { useNavigate } from 'react-router-dom'


function Main() {

    const navigate = useNavigate();

    return (
        <div>
            <h4>AI Artist Arena </h4>
            <img src="/img/main.webp" width="300px" />
            <br />
            <button className='button1' onClick={() => navigate("/read")}>ARTISTS</button>
            <br />
            <button className='button1' onClick={() => navigate("/write")}>GO WRITE PAGE</button>
            <br />
            <button className='button1' onClick={() => navigate("/updateread")}>GO UPDATE READ</button>
        </div>
    )
}

export default Main