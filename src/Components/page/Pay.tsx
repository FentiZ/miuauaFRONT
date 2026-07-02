import { Box, Divider, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState, type ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import type { ICardShort } from "../../Interface/ICard";
import { GetProductIDs } from "../../api/ProductUrl";
import CardPay from "../CardPay";
import CheckoutForm from "../CheckoutForm";
import CommentBlock from "../CommentBlock";

function Pay(){
    const {t} = useTranslation("pay");


    const [city, setCity] = useState('Дніпро');
    const [card, setCard] = useState<ICardShort[]>([]);

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
    const [_count, setCount] = useState<number>(() => getLocalCart().length);
    const [localCartState, setLocalCartState] = useState<any[]>(() => getLocalCart());

    const totalOrderPrice = card.reduce((totalSum, product) => {
        const cartItem = localCartState.find(local => Number(local.id) === Number(product.id));
        const currentQuantity = cartItem ? Number(cartItem.quantity) : 0;
        const currentPrice = product.price ? Number(product.price) : 0;

        return totalSum + (currentPrice * currentQuantity);
    }, 0);

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

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setCity(event.target.value);
    };
    return(
        <Stack spacing={{xs: "20px", md: "10px"}} sx={{boxSizing: "border-box", padding:{ md: "0px 20px", xs: "0"}}}>
            <Typography sx={{fontSize: {md: "22px", xs: "15px"}, pt: 3}}>{t("orderCheck")}</Typography>
            <Box>
                <Stack spacing={"10px"} 
                    sx={{minWidth: "316px", maxWidth: "600px", width: "100%", }}
                >
                    <Box>
                        <Typography sx={{fontSize: {md: "20px", xs: "12px"}}}>{t("contact")}</Typography>
                        <Box sx={{display: "flex", justifyContent: "space-between", fontSize: {md: "10px", xs: "10px"}, py: 2, }}>
                            <Typography>..., тел ...</Typography>
                            <Typography>{t("edit")}</Typography>
                        </Box>
                        <Divider />
                        <Typography sx={{fontSize: {md: "20px", xs: "12px"}, my: 2}}>{t("ex")}</Typography>
                        <Box sx={{
                            my: 2,
                            boxSizing: "border-box",
                            padding: "20px",
                            boxShadow: "0 2px 8px 0 rgba(0,0,0,.2)"
                        }}>
                            <TextField
                                select
                                label={t("citi")}
                                value={city}
                                onChange={handleChange}
                                fullWidth
                                size="small"
                            >
                                <MenuItem value="Київ">Київ</MenuItem>
                                <MenuItem value="Дніпро">Дніпро</MenuItem>
                                <MenuItem value="Львів">Львів</MenuItem>
                                <MenuItem value="Одеса">Одеса</MenuItem>
                            </TextField>
                        </Box>
                        <Box 
                            sx={{ 
                                boxSizing: "border-box",
                                padding: "20px",
                                boxShadow: "0 2px 8px 0 rgba(0,0,0,.2)"
                            }}
                        >
                            <Typography sx={{fontSize: {md: "20px", xs: "15px" }}}>{t("order")}</Typography>
                            {card.map((item, index) => {
                                const localCart = getLocalCart();
                                const cartItem = localCart.find(local => Number(local.id) === Number(item.id));
                                const currentQuantity = cartItem ? cartItem.quantity : 1;

                                return (
                                    <CardPay
                                        item={item} key={index}
                                        quantity={currentQuantity}
                                    >    
                                    </CardPay>
                                )                 
                            
                            })}
                            <Divider />
                            <Box sx={{display: "flex", justifyContent: "space-between", my: 2 }}>
                                <Typography sx={{fontSize: {md: "16px", xs: "12px"}}}>{t("price")}</Typography>
                                <Typography sx={{fontSize: "16px"}}>
                                    {totalOrderPrice.toLocaleString('ru-RU')} ₴
                                </Typography>
                            </Box>
                            <Divider />
                            <CheckoutForm index={0} />
                            <Divider />
                            <CheckoutForm index={1} />
                            <Divider />
                            <CommentBlock />
                        </Box>  
                    </Box>
                    <Box></Box>
                </Stack>
                <Box>

                </Box>
            </Box>
        </Stack>
    )
}
export default Pay

