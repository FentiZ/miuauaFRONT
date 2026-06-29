import { Box, Typography } from "@mui/material";
import NumberSpinner from "./NumberSpinner";
import CloseIcon from "@mui/icons-material/Close"
import type { ICardShort } from "../Interface/ICard";

interface CardBasketProps {
    item: ICardShort
    quantity: number;
    onQuantityChange: (newValue: number | null) => void;
}

export default function CardBascet({item, onQuantityChange, quantity} : CardBasketProps){
    return(
        <Box sx={{display:"flex", alignItems: "center", p: "15px 0"}}>
            <CloseIcon sx={{cursor: "pointer"}} onClick={() => onQuantityChange(0)} />
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
            <Box sx={{display: "flex", flexDirection: {md: "row", xs: "column"}, alignItems: "center", p: "15px 0", justifyContent: "flex-end"}}>
                <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
    
                    <Typography 
                        sx={{
                            maxWidth: "300px",
                            width: "100%",
                            margin: "0 1px 0 14px",
                            color:"#5285cc",
                            ze: { xs: "12px", sm: "14px" },
                            lineHeight: 1.4,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden"
                        }}
                    >
                        {item.name}
                    </Typography>
                </Box>
                <Box sx={{display: "flex"}}>
                    <Box sx={{display: "flex", mb: "22px", pr: "10px"}}>
                        <NumberSpinner
                            min={1}
                            max={item.stock}
                            defaultValue={item.stock}
                            size="small"
                            onChange={onQuantityChange}
                            value={quantity}
                        />
                    </Box>
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