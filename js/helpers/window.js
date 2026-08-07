const useLocal = true;

const baseURL = useLocal
    ? "http://127.0.0.1:5500"
    : "https://yaseen-ahmed26.github.io/biscuit-website";

export function changeWindow(pageName){
    if(pageName === "index.html"){
        window.location.replace(
            `${baseURL}/${pageName}`
        )
    }else{
        window.location.replace(
            `${baseURL}/pages/${pageName}`
        )   
    }
}