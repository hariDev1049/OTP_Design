import { useEffect, useRef, useState } from "react";

export default function OTPComponent({ length, handleOnOtpChange = () => {}}) {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRef = useRef([]);

  useEffect(()=>{
    if(inputRef.current[0]){
        inputRef.current[0].focus();
    }
  },[])

  function handleChange(event, index) {
    const value = event.target.value;
    if(isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length-1)
    setOtp(newOtp);

    const combinedOtp = newOtp.join("");
    if(combinedOtp.length === length) handleOnOtpChange(combinedOtp);

    if(value && index < length - 1 && inputRef.current[index + 1]){
        inputRef.current[index + 1].focus();
    }
  }

  function handleOnClick(index) {
    inputRef.current[index].setSelectionRange(1,1);

    //if(index > 0 && !otp[index - 1]){
        inputRef.current[otp.indexOf("")].focus();
    //}
  }

  function handleKeyDown(event, index) {
    if(event.key == "Backspace" && !otp[index] && index > 0 && inputRef.current[index - 1] ){
        inputRef.current[index - 1].focus();
    }
  }

  return (
    <div className="my-10">
      {otp.map((number, index) => {
        return (
          <input
            ref={(input) => (inputRef.current[index] = input)}
            className="p-3 border-gray-500 w-12 ml-4 bg-gray-200 text-center"
            type="text"
            placeholder="-"
            key={index}
            value={number}
            onChange={(e) => handleChange(e, index)}
            onClick={(e) => handleOnClick(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        );
      })}
    </div>
  );
}
