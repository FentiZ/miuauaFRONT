export interface ICard{
    id: number,
    img: string, 
    title: string,
    promo?: {
        img: string,
        description?: {
            title?: string;
            description?: string;
        }
    }[]
    star?: number,
    coment?: number,
    price: number,
    notAction: number
}