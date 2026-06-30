    const getCartCount = (data: string): number => {
        try {
            const savedCart = localStorage.getItem(data);
            if (!savedCart || savedCart === "undefined" || savedCart === "null") return 0;
            
            const currentCart = JSON.parse(savedCart);
            if (!Array.isArray(currentCart)) return 0;
            return currentCart.reduce((totalSum, item)=>{
                const itemQuantity = item.quantity ? Number(item.quantity) : 0;
                return totalSum + itemQuantity;
            }, 0)

        } catch (e) {
            return 0;
        }
    };
    export default getCartCount