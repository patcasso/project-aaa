import React, { useState } from 'react'
import app from "../firebase"
import { getDatabase, ref, get, remove } from "firebase/database";
import { useNavigate } from 'react-router-dom';

function UpdateRead() {

  const navigate = useNavigate();

  const [artistsArray, setArtistsArray] = useState([]);

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

  const deleteArtist = async (artistIdParam) => {
    const db = getDatabase(app);
    const dbRef = ref(db, "artists/names/" + artistIdParam)
    await remove(dbRef);
    window.location.reload();
  }

  return (
    <div>
      <h1>UPDATE READ</h1>
      <button onClick={fetchData}>Display Data</button>
      <ul>
        {artistsArray.map((item, index) => (
          <li key={index}>
            {item.artistName}: {item.artistDefinition} : {item.artistId}
            <button className="button1" onClick={() => navigate(`/updatewrite/${item.artistId}`)}>UPDATE</button>
            <button className="button1" onClick={() => deleteArtist(item.artistId)}>DELETE</button>
          </li>
        ))}
      </ul>
      <button className='button1' onClick={() => navigate("/")}>GO HOMEPAGE</button>
      <br />
      <button className='button1' onClick={() => navigate("/read")}>GO READ PAGE</button>
    </div>
  )
}

export default UpdateRead