import { useState } from "react";
import "./App.css";

function App() {
  const [menu, setMenu] = useState("QMS");

  // MAIL 상태
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  // API 테스트 결과
  const [apiResult, setApiResult] = useState(null);

  // C# API 테스트
  const testApi = async () => {
    try {
      const res = await fetch("https://localhost:44379/api/values");
      const result = await res.json();

      console.log(result);
      setApiResult(result);

      if (result.success) {
        alert("API 성공: " + result.message);
      } else {
        alert("API 실패: " + result.message);
      }
    } catch (err) {
      console.error(err);
      alert("서버 연결 실패");
    }
  };

  // MAIL 전송 (원래 기능 유지)
  const sendMail = async () => {
    try {
      const res = await fetch("http://localhost:5000/send-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject,
          message,
        }),
      });

      const result = await res.json();
      alert(result.message);
    } catch (err) {
      console.error(err);
      alert("메일 서버 연결 실패");
    }
  };

  const renderContent = () => {
    switch (menu) {
      case "QMS":
        return (
          <div className="content-box">
            <h2>QMS Dashboard</h2>
            <p>내부 품질관리 화면</p>
          </div>
        );

      case "SQM":
        return (
          <div className="content-box">
            <h2>SQM Dashboard</h2>
            <p>협력사 품질관리 화면</p>
          </div>
        );

      case "MAIL":
        return (
          <div className="mail-box">
            <h2>MAIL SEND</h2>

            <div className="form-group">
              <label>SUBJECT</label>
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="제목 입력"
              />
            </div>

            <div className="form-group">
              <label>MESSAGE</label>
              <textarea
                rows="6"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="내용 입력"
              />
            </div>

            <button onClick={sendMail}>
              SEND MAIL
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="erp-layout">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h3 className="logo">ERP</h3>

        <button onClick={() => setMenu("QMS")}>QMS</button>
        <button onClick={() => setMenu("SQM")}>SQM</button>
        <button onClick={() => setMenu("MAIL")}>MAIL</button>
      </div>

      {/* MAIN */}
      <div className="main">

        {/* 상단 API 테스트 버튼 */}
        <div style={{ marginBottom: "10px" }}>
          <button onClick={testApi}>
            C# API TEST
          </button>

          {apiResult && (
            <pre style={{ marginTop: "10px" }}>
              {JSON.stringify(apiResult, null, 2)}
            </pre>
          )}
        </div>

        <div className="header">
          <h2>{menu}</h2>
        </div>

        {renderContent()}
      </div>

    </div>
  );
}

export default App;