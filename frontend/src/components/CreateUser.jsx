import { useState } from "react";
import { createUser } from "../api";
import { useNavigate } from "react-router-dom";
// import {useUserStore} from '../src/store/userStore'
import axios from "axios";

export function CreateUser() {
  const navigate = useNavigate();
  // const {userData} = useUserStore();
  const [errMsg, setErrMsg] = useState("");
  const [passError, setPassError] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();

    try{
      let response = await createUser(user);
      console.log(response)
      
      if(response.data.success){
        sessionStorage.setItem("User", response.data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`
        navigate("/home");
      }else{
        setPassError(true);
        setErrMsg(response.data.message)
      }

    } catch(error){
      alert(error);
      console.error(error);
    }
  }

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-3xl font-bold">Sign Up</h1>
      <input
        type="text"
        placeholder="Name"
        required
        maxLength={30}
        onChange={handleChange}
        name="name"
      />
      {passError? <span className="text-red-500 flex justify-start">{errMsg}</span> : <></>}
      <input
        className={`${
          passError
            ? "border-red-500 outline-red-500 border-2 border-solid"
            : "border-none outline-none"
        }`}
        type="email"
        placeholder="Email"
        required
        maxLength={40}
        onChange={(e)=> {
            setPassError(false);
            handleChange(e);

        }}
        name="email"
      />
      <input
        type="password"
        placeholder="Password"
        required
        maxLength={20}
        minLength={8}
        onChange={handleChange}
        name="password"
      />

      <button type="submit">Create Your Account</button>
    </form>
  );
}
