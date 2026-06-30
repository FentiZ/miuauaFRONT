    export const handleAddToCart = (data: string, cardId: number) => {
        let currentCart = [];
        try {
            const savedCart = localStorage.getItem(data);
            if (savedCart && savedCart !== "undefined" && savedCart !== "null") {
                currentCart = JSON.parse(savedCart);
            }
            if (!Array.isArray(currentCart)) currentCart = [];
        } catch (e) {
            localStorage.removeItem(data);
            currentCart = [];
        }
        
        const existingItem = currentCart.find((item: any) => item.id === cardId);
        let updatedCart;

        if (!existingItem) {
            updatedCart = [...currentCart, { id: cardId, quantity: 1 }];    
        } else {
            updatedCart = currentCart; 
        }

        localStorage.setItem(data, JSON.stringify(updatedCart));

        window.dispatchEvent(new Event('storage'));
        return true
    };