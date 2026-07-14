export function getToken(){
    return localStorage.getItem("access_token");
}

export function saveToLocalStorage(save_name, data){
    localStorage.setItem(save_name, data);
}

export function getUserId(){
    const savedData = JSON.parse(localStorage.getItem("user_data"));
    return savedData.id
}

export function getSaveId(){
    const savedData = JSON.parse(localStorage.getItem("user_save"));
    return savedData.save_id;
}