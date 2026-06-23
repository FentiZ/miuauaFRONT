import type { ICard } from "../../Interface/ICard";
import Img from "../../assets/Temp/image.png";
import promo1 from "../../assets/promo/Fishka_76x30.svg";
import promo2 from "../../assets/promo/Sale_76x30_ua_UA.svg";
import promo3 from "../../assets/promo/unpacking_300_76x30_5.svg";

const cardComent: ICard = {
    id: 1,
    img: Img,
    title: "Телевизор",
    star: 5.0,
    coment: 5,
    notAction: 49999,
    price: 37999,
    promo: [
        {
            img: promo1,
            description: {
                title: "Акция",
                description: "Знижки до -40% на ТВ Xiaomi"
            }
        },
        {
            img: promo2,
            description: {
                title: "Кешбек",
                description: "за полезный отзыв"
            }
        },
        {
            img: promo3,
            description: {
                title: "Fishka",
                description: "Програма лояльност"
            }
        },
    ]
}
const card: ICard = {
    id: 1,
    img: Img,
    title: "Телевизор Xiaomi TV S Mini LED 65 2026",
    notAction: 49999,
    price: 37999,
    promo: [
        {
            img: promo2,
            description: {
                title: "Кешбек",
                description: "за полезный отзыв"
            }
        },
        {
            img: promo3,
            description: {
                title: "Fishka",
                description: "Програма лояльност"
            }
        },
    ]
}
export {card, cardComent}