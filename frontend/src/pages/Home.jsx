import {jwtDecode} from "jwt-decode";
import { useEffect, useState } from "react";
import Boards from "../components/Boards";
import SearchBar from "../components/SearchBar";

export function Home() {

    return(
        <div className="flex flex-col items-center p-14">
            <h1 className="text-4xl">Welcome to Quip</h1>
            <SearchBar/>
            <Boards/>
        </div>
        )
}