import axios from "axios";

const URL ="http://localhost:3000"

export async function getUsers() {
    const response = await axios.get(`${URL}/users`);

    if(response.status === 200){
        return response.data
    }else{
        return
    }
}
export async function getUser(id) {
    const response = await axios.get(`${URL}/users/${id}`);

    if(response.status === 200){
        return response.data
    }else{
        return
    }
}
export async function createUser(user) {
    const response = await axios.post(`${URL}/users`, user);
    return response;
}
export async function updateUser(id, user) {
    const response = await axios.put(`${URL}/users/${id}`, user);
    return response;
}
export async function deleteUser(id) {
    const response = await axios.delete(`${URL}/users/${id}`);

    return response
}

export async function loginUser(user){
    const response = await axios.post(`${URL}/users/login`, user)
    return response

}

export async function getBoards(userId) {
    const response = await axios.get(`${URL}/users/${userId}/boards`);

    if(response.status === 200){
        return response.data
    }else{
        return
    }
}

export async function getBoard(boardId) {
    const response = await axios.get(`${URL}/boards/${boardId}`);

    if(response.status === 200){
        return response.data
    }else{
        return
    }
}

export async function createBoard(boardName, user) {
    const response = await axios.post(`${URL}/boards/create/${boardName}`, user);

    if(response.status === 200){
        return response.data
    }else{
        return
    }
}

export async function deleteBoard(boardId) {
    const response = await axios.delete(`${URL}/boards/delete/${boardId}`);

    if(response.status === 200){
        return response.data
    }else{
        return
    }
}