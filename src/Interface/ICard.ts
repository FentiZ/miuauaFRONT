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
export interface ICardShort{
  "id": number,
  "name": string,
  "price": number,
  "old_price": number,
  "stock": number,
  "images": {
    "image_url": string
  }[],
}
export interface ICategoryOrBrand {
  id: number;
  name: string;
  slug: string;
}

export interface IProductImage {
  id: number;
  image_url: string;
  color_name: string | null;
  color_hex: string | null;
  is_main: boolean;
  sort_order: number;
}

export interface ISpecification {
  id: number;
  group_name: string;
  name: string;
  value: string;
  sort_order: number;
}

export interface IFullCard {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: number;
  old_price: number | null;
  discount_percent: number | null;
  sku: string;
  stock: number;
  rating_avg: number;
  reviews_count: number;
  view_count: number;
  is_new: boolean;
  is_top: boolean;
  is_active: boolean;
  category: ICategoryOrBrand;
  brand: ICategoryOrBrand;
  images: IProductImage[];
  specifications: ISpecification[];
}