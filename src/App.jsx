import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router";
import BoardList from "./components/BoardList";
import Write from "./components/Write";
import View from "./components/View";

function App() {
  const [boardId, setBoardId] = useState(0);
  const [isModifyMode, setIsModifyMode] = useState(false);
  const navigate = useNavigate();

  const handleModify = _id => {
    setBoardId(_id);
    setIsModifyMode(true);
    navigate("/write");
  };

  const handleCancel = () => {
    setBoardId(0);
    setIsModifyMode(false);
  };

  return (
    <>
      <div className="container">
        <h1>React BBS</h1>

        {/* 라우팅 */}
        <Routes>
          <Route path="/" element={<BoardList />} />
          <Route
            path="/write"
            element={
              <Write isModifyMode={isModifyMode} boardId={boardId} handleCancel={handleCancel} />
            }
          />
          <Route path="/view/:id" element={<View handleModify={handleModify} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
