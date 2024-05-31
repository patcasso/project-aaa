import React, { useState } from 'react'
import app from "../firebase"
import { getDatabase, ref, get } from "firebase/database";
import { useNavigate } from 'react-router-dom';

function Read() {

    const navigate = useNavigate();

    const [artistsArray, setArtistsArray] = useState([]);

    const fetchData = async () => {
        const db = getDatabase(app);
        const dbRef = ref(db, "artists/names");
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
            setArtistsArray(Object.values(snapshot.val()));
        } else {
            alert("error");
        }
    }

    return (
        <div>
            <h1>READ</h1>
            <button onClick={fetchData}>Display Data</button>
            <ul>
                {artistsArray.map((item, index) => (
                    <li key={index}>
                        {item.artistName}: {item.artistDefinition} : {item.artistVotes}
                    </li>
                ))}
            </ul>

            <button className='button1' onClick={() => navigate("/updateread")}>GO UPDATE READ</button>
            <br />
            <button className='button1' onClick={() => navigate("/")}>GO HOMEPAGE</button>

        </div>
    )
}

export default Read