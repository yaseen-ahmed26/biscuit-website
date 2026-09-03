const isLocal = ['localhost', '127.0.0.1'].includes(window.location.hostname);
const baseURL = isLocal
    ? "http://127.0.0.1:5500"
    : "https://yaseen-ahmed26.github.io/biscuit-website";

console.log(`Website base URL is ${baseURL}`)

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