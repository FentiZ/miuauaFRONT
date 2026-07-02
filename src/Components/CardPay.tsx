import { Box, Typography } from "@mui/material";
import type { ICardShort } from "../Interface/ICard";

interface CardBasketProps {
    item: ICardShort
    quantity: number;
}

export default function CardPay({item, quantity} : CardBasketProps){
    return(
        <Box sx={{display:"flex", alignItems: "center", p: "15px 0"}}>
            <Box
                sx={{
                    width: "96px", height:"82px",
                    display: "flex", justifyContent: "center", alignItems: "center"
                }}
            >
                <Box 
                    component={"img"}
                    src={item.images[0].image_url}
                    sx={{width: "72px", height: "72px"}}
                ></Box>
            </Box>
            <Box 
                sx={{
                    display: "flex", 
                    flexDirection: "row", 
                    alignItems: "center", 
                    p: "15px 0", 
                    justifyContent: "space-between",
                    flexGrow: 1
                }}
            >                <Box sx={{display: "flex", flexDirection: "column", margin: "0 1px 0 14px"}}>
                    <Typography 
                        sx={{
                            color:"#191919",
                            fontSize: { xs: "12px", sm: "14px" },
                            lineHeight: 1.4,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                        }}  
                    >
                        {item.name}
                    </Typography>
                    <Typography sx={{fontSize: "12px", color: "#929292"}}>{quantity} шт</Typography>
                </Box>
                <Box sx={{display: "flex"}}>
                    <Box
                        sx={{
                            position: "relative",
                            textWrap: "nowrap",
                            display: "flex", justifyContent: "flex-end",
                            mt: "10px", width: "100px",
                        }}
                    >
                        <Typography
                            sx={{
                                color: "#929292",
                                fontSize: "12px",
                                textDecoration: "line-through",
                                position: "absolute",
                                bottom: 20
                            }}
                        >
                            {Number(item.old_price * quantity).toLocaleString('ru-RU')}₴
                        </Typography>
                        <Typography sx={{fontSize: "16px", fontWeight: 800, color: "#ff6900"}}>
                            {Number(item.price * quantity).toLocaleString('ru-RU')} ₴
                        </Typography>                    
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}