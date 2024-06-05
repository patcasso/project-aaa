import React, { useState } from 'react'
import app from "../firebase"
import { getDatabase, ref, set, push } from "firebase/database";
import { getDownloadURL, getStorage, ref as storageRef, uploadBytes } from "firebase/storage"
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';

// 이미지 업로드 없을 시 생성형 API 달아서 만들어주는걸로
function Write() {
    const [artistName, setArtistName] = useState("");
    const [artistDefinition, setArtistDefinition] = useState("");
    const [artistImage, setArtistImage] = useState(null);

    const navigate = useNavigate();

    const saveData = async () => {
        if (!artistName || !artistDefinition || !artistImage) {
            alert("Please fill in all fields");
        }
        const db = getDatabase(app);
        const newDocRef = push(ref(db, "artists/names"));

        set(newDocRef, {
            artistName: artistName,
            artistDefinition: artistDefinition,
            artistVotes: 0
        }).then(() => {
            console.log(newDocRef.key);
            uploadImage(newDocRef.key);
        }).then(() => {
            alert("Data Saved Successfully")
        }).catch((error) => {
            alert("error: ", error.message)
        })
    }

    const uploadImage = (newArtistId) => {
        if (artistImage == null) return;
        const storage = getStorage(app);
        // const imageRef = storageRef(storage, `images/${artistImage.name + v4()}`);
        const imageRef = storageRef(storage, `images/${newArtistId}`);
        uploadBytes(imageRef, artistImage).then(() => {
            // alert("Image Uploaded");
            console.log("Image Uploaded");
        })
    }

    return (
        <div>
            <h2>Create New Artist</h2>
            Artist Name : <input type="text" value={artistName}
                onChange={(e) => setArtistName(e.target.value)}
            />
            <br />
            Description : <input type="text" value={artistDefinition}
                onChange={(e) => setArtistDefinition(e.target.value)}
            />
            <br />
            <br />
            <br />
            Upload Artist Image
            <br />
            <br />
            <input type="file" onChange={(e) => { setArtistImage(e.target.files[0]) }} />
            <br />
            {/* <button onClick={uploadImage}>UPLOAD IMAGE</button> */}
            <button onClick={saveData}>SAVE DATA</button>
            <br />
            <br />
            <br />
            <button className='button1' onClick={() => navigate("/updateread")}>GO UPDATE READ</button>
            <br />
            <button className='button1' onClick={() => navigate("/read")}>GO READ PAGE</button>
        </div>
    )
}

export default Write;