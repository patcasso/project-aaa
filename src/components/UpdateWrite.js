import React, { useState, useEffect } from 'react'
import app from "../firebase"
import { getDatabase, ref, set, get } from "firebase/database";
import { useNavigate, useParams } from 'react-router-dom';

function UpdateWrite() {

    const navigate = useNavigate();
    const { firebaseId } = useParams();

    const [inputValue1, setInputValue1] = useState("");
    const [inputValue2, setInputValue2] = useState("");
    const [inputValue3, setInputValue3] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const db = getDatabase(app);
            const dbRef = ref(db, "artists/names/" + firebaseId);
            const snapshot = await get(dbRef);

            if (snapshot.exists()) {
                const targetObject = snapshot.val();
                setInputValue1(targetObject.artistName)
                setInputValue2(targetObject.artistDefinition)
                setInputValue3(targetObject.artistVotes)
            } else {
                alert("error");
            }
        }
        fetchData();
    }, [firebaseId])


    const overwriteData = async () => {
        const db = getDatabase(app);
        const newDocRef = ref(db, "artists/names/" + firebaseId);
        // console.log(inputValue1)
        // console.log(inputValue2)
        set(newDocRef, {
            artistName: inputValue1,
            artistDefinition: inputValue2,
        }).then(() => {
            alert("data saved successfully")
        }).catch((error) => {
            alert("error: ", error.message)
        })
    }

    const overwriteVoteData = async () => {
        const db = getDatabase(app);
        const newDocRef = ref(db, "artists/names/" + firebaseId + "/artistVotes");
        // console.log(inputValue1)
        // console.log(inputValue2)
        set(newDocRef, inputValue3).then(() => {
            alert("data saved successfully")
        }).catch((error) => {
            alert("error: ", error.message)
        })
    }

    return (
        <div>
            <h1>UPDATE</h1>
            <input type="text" value={inputValue1}
                onChange={(e) => setInputValue1(e.target.value)}
            />
            <input type="text" value={inputValue2}
                onChange={(e) => setInputValue2(e.target.value)}
            />
            <input type="text" value={inputValue3}
                onChange={(e) => setInputValue3(e.target.value)}
            />
            <br />
            <button onClick={overwriteData}>UPDATE</button>
            <button onClick={overwriteVoteData}>UPDATE VOTE</button>
            <br />
            <br />
            <br />
            <button className='button1' onClick={() => navigate("/updateread")}>GO UPDATE READ</button>
            <br />
            <button className='button1' onClick={() => navigate("/read")}>GO READ PAGE</button>
        </div>
    )
}

export default UpdateWrite;