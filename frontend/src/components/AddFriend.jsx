import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { createFriendReq } from "../api";
import { useState } from "react";
import useUserStore from "../store/UserStore";

function AddFriend({setShowAddFriend, showAddFriend}){
    const [addFriend, setAddFriend]= useState('')
    const {user} = useUserStore()
    
    async function handleSubmit(e){
        console.log('here')
        e.preventDefault();
        const response = await createFriendReq(user._id, addFriend)
        console.log('RESPONSE', response)
        if(response.error){
            console.error(response.data)
        }else{
            console.log(response)
        }
        setAddFriend('')
    }

    return(
        <>
        <FontAwesomeIcon className="cursor-pointer" icon={faArrowLeft} onClick={()=>{setShowAddFriend(!showAddFriend)}}/>
        <form onSubmit={handleSubmit}>
            <p>Who would you like to add as a friend?</p>
            <div className="border-2 w-fit rounded-md">
                <input placeholder="Enter an email or id" className="pl-4 outline-none" value={addFriend} onChange={(e)=>{setAddFriend(e.target.value)}}/>
                <button type="submit" className="bg-lightBlue p-2 text-white hover:bg-darkBlue rounded-md">Send Friend Request</button>
            </div>
        </form>
        </>
    )
}

export default AddFriend;