import key from "./Apikey"

export const getClientToken = () => {
    return fetch(`${key}/gettoken`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    }).then(response => response.json()).catch(err => console.log(err))
}

export const makepayment = (data) => {
    return fetch(`${key}/checkout`, {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            Accept:"application/json"
        },
        body:JSON.stringify(data)
    }).then(response => response.json()).catch(err => console.log(err))
}