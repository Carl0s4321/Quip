import {jwtDecode} from "jwt-decode";
import { useEffect, useState } from "react";
import Boards from "../components/boards";

export function Home() {

    return(
        <>
        HOME
        <Boards/>
        </>
        )
}