import { useEffect, useState } from "react";
import { getBoards } from "../api";
import useUserStore from "../store/UserStore";

function Boards() {
    const {user} = useUserStore();
    const [boards, setBoards] = useState([]);

    useEffect(() => {
        const fetchBoards = async () => {
            if (user) {
                try {
                    const response = await getBoards(user._id); // Await the Promise
                    console.log("Boards response:", response); // Log the response
                    setBoards(response); // Set boards with the resolved response
                } catch (error) {
                    console.error("Error fetching boards:", error);
                }
            }
        };

        fetchBoards(); // Call the async function inside useEffect
    }, [user]); // Include user in dependency array

    // useEffect(()=>{
    //     console.log("BOARDS", boards)
    // }, [boards])
  return(
    <>
    qqqertgyhtj
        {boards.map((board, index)=> (
            <p>{board.boardName}</p>
        ))}
    </>
  )   
}

export default Boards;