import React, { useState } from 'react'
import app from "../firebase"
import { getDatabase, ref, set, push } from "firebase/database";
import { useNavigate } from 'react-router-dom';

function Write() {

    const navigate = useNavigate();

    const [inputValue1, setInputValue1] = useState("");
    const [inputValue2, setInputValue2] = useState("");

    const saveData = async () => {
        const db = getDatabase(app);
        const newDocRef = push(ref(db, "artists/names"));
        // console.log(inputValue1)
        // console.log(inputValue2)
        set(newDocRef, {
            artistName: inputValue1,
            artistDefinition: inputValue2
        }).then(() => {
            alert("data saved successfully")
        }).catch((error) => {
            alert("error: ", error.message)
        })
    }

    return (
        <div>
            <h1>WRITE/HOMEPAGE</h1>
            <input type="text" value={inputValue1}
                onChange={(e) => setInputValue1(e.target.value)}
            />
            <input type="text" value={inputValue2}
                onChange={(e) => setInputValue2(e.target.value)}
            />
            <br />
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