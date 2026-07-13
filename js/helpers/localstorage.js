export function getToken(){
    return localStorage.getItem("access_token");
}

export function getUserId(){
    const savedData = JSON.parse(localStorage.getItem("user_data"));
    return savedData.id
}

export function getSaveId(){
    const savedData = JSON.parse(localStorage.getItem("user_save"));
    return savedData.save_id;
}