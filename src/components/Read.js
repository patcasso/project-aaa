import React, { useEffect, useState } from 'react'
import app from "../firebase"
import { getDatabase, ref, get } from "firebase/database";
import { useNavigate } from 'react-router-dom';
import '../styles/Read.css';

function Read() {

    useEffect(() => {
        fetchData()
    }, [])

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
            <h2>Artist Ranking</h2>
            {/* <button onClick={fetchData}>Display Data</button> */}

            {artistsArray.map((item, index) => (
                <div key={index} className="artist-row">
                    {/* <img src="https://firebasestorage.googleapis.com/v0/b/projectaaa-ac9ba.appspot.com/o/ComfyUI_temp_ilakc_00008_.png?alt=media&token=7644733a-161c-4da7-9cca-726a07d52d81" width="100px" /> */}
                    <div className="index-column">{index + 1}</div>
                    <div className="img-column">IMG</div>
                    <div className="details-column">
                        <div>{item.artistName}</div>
                        <div>{item.artistDefinition}</div>
                        <div>{item.artistVotes}</div>
                    </div>
                    <br />
                </div>
            ))}
            <button className='button1' onClick={() => navigate("/updateread")}>GO UPDATE READ</button>
            <br />
            <button className='button1' onClick={() => navigate("/")}>HOME</button>

        </div>
    )
}

export default Read