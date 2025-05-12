import axios from "axios";


const token = getToken();

export function registerUser(data){
    return axios.post("http://localhost:3000/api/user/register", data)
}

export function fetchData(){
    return axios.get("http://localhost:3000/api/user/getAll",{
        headers:{"Authorization" : "Bearer " + token}
    });
}


export function deleteData(){
    return axios.delete(`http://localhost:3000/api/user/delete`, 

        {
            headers:{"Authorization" : `Bearer ${token}`}
        }
    );
}

export function loginUser(data){
    return axios.post("http://localhost:3000/api/user/login",data);

}

export function addToken(token){
    localStorage.setItem("token",token);
}

export function removeToken(){
    localStorage.removeItem("token");
}

export function getToken(){
    return localStorage.getItem("token");

}

export function getUser(){
    return axios.get(`http://localhost:3000/api/user/currUser`, {
    headers: { "Authorization": `Bearer ${token}` }
    });



}