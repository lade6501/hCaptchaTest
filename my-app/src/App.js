import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import axios from "axios";

function App() {
  const [isVerified, setIsVerified] = useState(false);

  const onVerifyCaptcha = async (Token) => {
    const response = await fetch("http://localhost:8001/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: Token }),
    });
    const { success } = await response.json();
    setIsVerified(success);
    console.log(isVerified);
  };
  return (
    <div className="App">
      <form>
        <input type="text" placeholder="Enter your email!" />
        <HCaptcha
          sitekey="616fdf14-e5f3-4524-b937-855886a6d042"
          onVerify={onVerifyCaptcha}
        />
        <button type="submit" onSubmit={onVerifyCaptcha}>
          Sign Up!
        </button>
      </form>
    </div>
  );
}

export default App;
