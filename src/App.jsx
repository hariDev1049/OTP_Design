import { useState } from "react";
import "./App.css";
import OTPComponent from "./component/OTPComponent";

function App() {
  const [number, setNumber] = useState("");
  const [isValid, setIsValid] = useState(false);
  function handleOnChange(event) {
    setNumber(event.target.value);
  }

  function isOnlyNumbers(input) {
    const regex = /^\d+$/;
    return regex.test(input);
  }
  function handleSubmit(event) {
    event.preventDefault();
    
    if (number.length !== 10 || !isOnlyNumbers(number)) {
      alert("Please provide valid number only.");
      return;
    }
    setIsValid(true);
  }

  function handleOnOtpChange(otp){
    console.log("Recieved OTP : ", otp);
  }

  return (
    <div className="App p-10">
      {isValid ? (
        <div><div>
          <h2>Enter the OTP received on {number}</h2>
          <OTPComponent length={4} handleOnOtpChange={handleOnOtpChange}/>
          </div></div>
      ) : (
        <form onSubmit={(event) => handleSubmit(event)}>
          <h1>Hello from OTP Component Implementation</h1>
          <input
            className="p-3 border-gray-400 mt-5 w-64 bg-gray-200 rounded"
            type="text"
            placeholder="Enter your mobile number"
            value={number}
            onChange={(event) => handleOnChange(event)}
          />
          <button type="submit" className="bg-gray-500 m-5 p-3 rounded text-white">Submit</button>
        </form>
      )}
    </div>
  );
}

export default App;
