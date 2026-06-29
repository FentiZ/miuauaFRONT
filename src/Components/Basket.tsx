import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import CloseIcon from "@mui/icons-material/Close"
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { GetProductIDs } from "../api/ProductUrl";
import type { ICardShort } from "../Interface/ICard";
import CardBasket from "./CardBasket";

const position = {
  position: "absolute",
  top: "50%", left: "50%",
  transform: 'translate(-50%, -50%)',
  bgcolor: "#fff", fontSize: "16px",
  width: {md: "640px", xs: "100%"}, height: {md: "auto", xs: "100%"},
  maxHeight: {md: "80%", xs: "100%"},
  padding: "20px 40px 40px 40px",
  border: "none",
  borderRadius: {md: "6px", xs: 0},
  boxShadow: "0 2px 8px hsla(0,0%,57.3%,.5)"
}

interface BasketProps {
    open: boolean;
    onClose: () => void;
}

function Basket({ open, onClose }: BasketProps){
    const {t} = useTranslation("basket");



    const getLocalCart = (): any[] => {
        try {
            const savedCart = localStorage.getItem('cart');
            if (!savedCart || savedCart === "undefined" || savedCart === "null") return [];
            const currentCart = JSON.parse(savedCart);
            return Array.isArray(currentCart) ? currentCart : [];
        } catch (e) {
            return [];
        }
    };

    const [count, setCount] = useState<number>(() => getLocalCart().length);
    const [card, setCard] = useState<ICardShort[]>([]);
    const [localCartState, setLocalCartState] = useState<any[]>(() => getLocalCart());


    useEffect(() => {
        const handleStorageChange = () => {
            const localCart = getLocalCart();
            setCount(localCart.length);
            setLocalCartState(localCart);

            setCard(prevCards => 
                prevCards.filter(c => localCart.some(local => String(local.id) === String(c.id)))
            );
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    useEffect(() => {
        if (!open) return;

        async function fetchData() {
            try {
                const localCart = getLocalCart();
                if (localCart.length > 0) {
                    const allIds = localCart.map(item => item.id);
                    const fulData: ICardShort[] = await GetProductIDs(allIds);
                    setCard(fulData);
                } else {
                    setCard([]);
                    setCount(0);
                }
            } catch (error) {
                console.error("Помилка під час отримання товарів кошика:", error);
            }
        }

        fetchData();
    }, [open]);

    const handleQuantityChange = (productId: number, newQuantity: number) => {
        let localCart = getLocalCart();

        if (newQuantity <= 0) {
            localCart = localCart.filter(item => Number(item.id) !== productId);
            setCard(prev => prev.filter(c => Number(c.id) !== productId));
        } else {
            localCart = localCart.map(item =>
                Number(item.id) === productId ? { ...item, quantity: newQuantity } : item
            );
        }

        localStorage.setItem('cart', JSON.stringify(localCart));
        setCount(localCart.length);

        window.dispatchEvent(new Event('storage'));
    };

    const totalOrderPrice = card.reduce((totalSum, product) => {
        const cartItem = localCartState.find(local => Number(local.id) === Number(product.id));
        const currentQuantity = cartItem ? Number(cartItem.quantity) : 0;
        const currentPrice = product.price ? Number(product.price) : 0;

        return totalSum + (currentPrice * currentQuantity);
    }, 0);

    return (
        <Modal 
            open={open}
            onClose={onClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"    
            slotProps={{ backdrop: { sx: { backgroundColor: "rgba(0, 0, 0, 0.5)" } } }}
        >
            <Box sx={[position, {boxSizing: {xs: "border-box", md: "content-box"}}]}>
                <Box sx={{display: "flex", justifyContent: "space-between", mb: "15px"}}>
                    <Typography sx={{fontSize: "22px"}}>{t("basket")}</Typography>
                    <CloseIcon onClick={onClose} sx={{cursor: "pointer"}}/>
                </Box>
                {
                    count > 0 ?
                    (
                        <Box sx={{
                            maxHeight: "65vh",
                            overflowY: "auto",
                            display: "flex", 
                            flexDirection: "column", 
                            gap: "16px",
                            pr: "8px",
                            '&::-webkit-scrollbar': {
                                width: '6px',
                            },
                            '&::-webkit-scrollbar-track': {
                                backgroundColor: '#f1f1f1',
                                borderRadius: '4px',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: '#b0bec5',
                                borderRadius: '4px',
                                '&:hover': {
                                    backgroundColor: '#90a4ae',
                                },
                            },
                        }}>
                            {card.map((item, index) => {
                                const localCart = getLocalCart();
                                const cartItem = localCart.find(local => Number(local.id) === Number(item.id));
                                const currentQuantity = cartItem ? cartItem.quantity : 1;

                                return (
                                    <CardBasket
                                        item={item} key={index}
                                        quantity={currentQuantity}
                                        onQuantityChange={(newVal) => handleQuantityChange(Number(item.id), newVal ?? 1)}
                                    >    
                                    </CardBasket>
                                )                 
                            
                            })}
                        </Box>
                    )
                    :
                    (
                        <Box sx={{fontSize: "13.33px"}}>
                            <Typography>{t("empty")}</Typography>
                            <Typography 
                                component={Link} to="/" 
                                sx={{textDecoration: "none", color: "#5285cc"}}
                                onClick={onClose}
                            >
                                {t("click")}
                            </Typography>
                        </Box>
                    )
                }
                {
                    count > 0 &&
                    (
                        <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <Typography 
                                component={Link} to="/" 
                                sx={{textDecoration: "none", color: "#5285cc", fontSize: "14px"}}
                                onClick={onClose}
                            >
                                {t("next")}
                            </Typography>
                            <Stack spacing={"10px"} direction={"row"} sx={{alignItems: "center"}}>
                                <Typography sx={{fontSize: "16px"}}>
                                    {t("all")} {totalOrderPrice.toLocaleString('ru-RU')} ₴
                                </Typography>
                                <Button variant="contained" 
                                    sx={{
                                        bgcolor: "#FF6900",
                                        textTransform: 'none',
                                        fontWeight: 700,
                                        minWidth: 0,
                                        p: "10px",
                                        height: "32px"                            
                                    }}
                                >
                                    {t("order")}
                                </Button>
                            </Stack>
                        </Box>
                    )
                }
            </Box>
        </Modal>
    );
}
export default Basket