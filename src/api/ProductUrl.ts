import type { ICardShort, IFullCard } from "../Interface/ICard";
import mainSrc from "./mainSrc";

export async function GetProductIDs(id: number[]){
    const cart : ICardShort[] = [];
    for (let index = 0; index < id.length; index++) {
        const responce = await fetch(`${mainSrc}/products/${id[index]}`)
        const data : ICardShort = await responce.json();         
        cart.push(data);
    }

    return cart
}
export async function GetProductID(id: number){
    const responce = await fetch(`${mainSrc}/products/${id}`)
    if(responce.status < 200 || responce.status > 299){
        return responce.status
    }

    const data : IFullCard = await responce.json();         

    return data
}
