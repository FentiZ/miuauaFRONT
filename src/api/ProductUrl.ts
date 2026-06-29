import type { ICardShort } from "../Interface/ICard";
import mainSrc from "./mainSrc";

async function GetProductIDs(id: number[]){
    const cart : ICardShort[] = [];
    for (let index = 0; index < id.length; index++) {
        const responce = await fetch(`${mainSrc}/products/${id[index]}`)
        const data : ICardShort = await responce.json();         
        cart.push(data);
    }

    return cart

}
export default GetProductIDs