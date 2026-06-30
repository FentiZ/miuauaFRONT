    export const checkCartStatus = (data:string, cardId: number): boolean => {
        try {
            const savedCart = localStorage.getItem(data);
            if (!savedCart || savedCart === "undefined" || savedCart === "null") return false;
            
            const currentCart = JSON.parse(savedCart);
            return Array.isArray(currentCart) && currentCart.some((item: any) => item.id === cardId);
        } catch (error) {
            return false;
        }
    };