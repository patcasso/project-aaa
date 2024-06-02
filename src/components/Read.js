import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import app from "../firebase"
import { getDatabase, ref, get } from "firebase/database";
import { getStorage, listAll, ref as storageRef, getDownloadURL } from "firebase/storage";


import '../styles/Read.css';

function Read() {
    const [artistsArray, setArtistsArray] = useState([]);
    const [imageUrlObject, setImageUrlObject] = useState({});

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        const storage = getStorage(app);
        const imageListRef = storageRef(storage, "images/")
        listAll(imageListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageUrlObject(prev => ({
                        ...prev, [item._location.path_.split("/")[1]]: url
                    }))
                })
            })
        })
    }, [])
    

    console.log(imageUrlObject)

    const navigate = useNavigate();

    const fetchData = async () => {
        const db = getDatabase(app);
        const dbRef = ref(db, "artists/names");
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {

            const myData = snapshot.val();
            const temporaryArray = Object.keys(myData).map(myFireId => {
                return {
                    ...myData[myFireId],
                    artistId: myFireId
                }
            });
            setArtistsArray(temporaryArray);
        } else {
            alert("error");
        }
    }

    return (
        <div>
            <h2>Artist Ranking</h2>
            {artistsArray.map((item, index) => (
                <div key={index} className="artist-row">
                    <div className="index-column">{index + 1}</div>
                    <div className="img-column">
                        <img src={imageUrlObject[item.artistId]} />
                    </div>
                    <div className="details-column">
                        <div>Name : {item.artistName}</div>
                        <div>Description : {item.artistDefinition}</div>
                        <div>Votes : {item.artistVotes}</div>
                        {/* <div>artistId : {item.artistId}</div> */}
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

export default Read;