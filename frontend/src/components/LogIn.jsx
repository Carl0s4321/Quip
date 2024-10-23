import { useState } from "react";
import { loginUser } from "../api";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// TODO: add moonloader from react spinners

export function LogIn() {
  const navigate = useNavigate();
  const [loginErr, setLoginErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  async function handleSubmit(e) {
    setLoginErr(false);
    e.preventDefault();

    try{
      let response = await loginUser(user);
      if(response.data.success){
        sessionStorage.setItem("User", response.data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`
        navigate("/home");
      } else{
        setLoginErr(true);
        setErrMsg(response.data.message);
      }
    } catch (error){
      alert(error)
      console.error(error)
    }
  }

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-3xl font-bold">Sign In</h1>
      {loginErr ? (
        <span className="text-red-500 flex justify-start">{errMsg}</span>
      ) : (
        <></>
      )}
      <input
        className={`${
          loginErr
            ? "border-red-500 outline-red-500 border-2 border-solid"
            : "border-none outline-none"
        }`}
        type="email"
        placeholder="Email"
        required
        onChange={(e) => {
          setLoginErr(false);
          handleChange(e);
        }}
        name="email"
      />
      <input
        className={`${
          loginErr
            ? "border-red-500 outline-red-500 border-2 border-solid"
            : "border-none outline-none"
        }`}
        type="password"
        placeholder="Password"
        required
        onChange={(e) => {
          setLoginErr(false);
          handleChange(e);
        }}
        name="password"
      />

      {/* <a href="#">Forget Your Password?</a> */}
      <button>Sign In</button>
    </form>
  );
}
