import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./components/Main"
import Write from "./components/Write";
import Read from "./components/Read";
import UpdateRead from "./components/UpdateRead";
import UpdateWrite from "./components/UpdateWrite";

function App() {
  return (
    <div className="App">
      <h1>Project AAA 🤖</h1>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/write" element={<Write />} />ß
          <Route path="/read" element={<Read />} />
          <Route path="/updateread" element={<UpdateRead />} />
          <Route path="/updatewrite/:firebaseId" element={<UpdateWrite />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
