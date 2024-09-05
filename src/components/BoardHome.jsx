import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { databases, DATABASE_ID, BOARDS_ID } from "../lib/appwrite";
import { SectionWrapper } from "../hoc";

const BoardHome = () => {
  const { boardId } = useParams(); // get boardId from url '/board/:boardId
  const [board, setBoard] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBoardDetails = async () => {
      // fetch board details w boardId
      const response = await databases.getDocument(DATABASE_ID, BOARDS_ID, boardId);
      setBoard(response);
    };

    fetchBoardDetails();
    console.log(board);
  }, [boardId]);

  if (!board) return <p>Loading...</p>;

  return (
    <div className="bg-blue-500">
      <div className="flex flex-row">
        <FontAwesomeIcon icon={faArrowLeft} className='p-5 cursor-pointer'onClick={()=>{navigate('/home')}}/>
        <div className="flex flex-col">
          <h2>{board.boardName}</h2>
          <p>{board.userId}</p>
        </div>
      </div>

    </div>
  );
};

export default SectionWrapper(BoardHome,"");
