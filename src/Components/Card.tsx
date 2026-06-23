import { Box, Button, Rating, Stack, Typography } from "@mui/material"
import type { ICard } from "../Interface/ICard"
import React from "react";
import { styled } from '@mui/material/styles';
import Tooltip, {tooltipClasses, type TooltipProps } from '@mui/material/Tooltip';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import { useTranslation } from "react-i18next";
import BalanceOutlinedIcon from '@mui/icons-material/BalanceOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip describeChild {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#ffff',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
        padding: '16px',
    },
    [`& .${tooltipClasses.arrow}`]: {
        color: '#ffffff',
        fontSize: 28,
        '&::before': {
        border: '1px solid #dadde9'
        },
    },
}));

function Promo(card: ICard){
    const [openIndex, setOpenIndex] = React.useState<number | null>(null);

    return(
        <>
            {card.promo?.map((item, index) => (
            <HtmlTooltip
                key={index}
                arrow
                placement={index == 0 ? "top-start" : (index == 1 ? "top" : "top-end" ) }
                open={openIndex === index}
                title={
                    <React.Fragment>
                        <Typography sx={{fontSize: "12px", fontWeight: "700"}}>
                            {item.description?.title}
                        </Typography>
                        <Typography sx={{fontSize: "13px"}}>
                            {item.description?.description}
                        </Typography>
                    </React.Fragment>
                }
            >

                <Box component={"img"} src={item.img}
                    onClick={() =>
                        setOpenIndex(prev => prev === index ? null : index)
                    }
                    sx={{
                        borderRadius: "5px",
                        transition: "background-color 0.2s ease-in-out",
                        "&:hover": {
                            bgcolor: "#F1F1F1",
                        }
                    }}
                />
            </HtmlTooltip>

        )
        )}
    </>
    )
}

function Card(card: ICard){
    const {t} = useTranslation("card");

    return(
        <Box    
            sx={{
                transition: "all .4s ease",
                "&:hover": {
                    boxShadow: "0 0 10px rgba(0, 0, 0, .4)"
                },
                background: "#fff",
                mx: { xs: "-12px", sm: 0 }, 
                width: { xs: "calc(100% + 29px)", sm: "100%" },
                boxShadow: "0 0 10px rgba(0, 0, 0, .07)",
                padding: {sm: "25px 16px", xs: "16px"},
                boxSizing: "border-box",
            }}
        >
            <Box sx={{display: {xs: "block", sm: "none"}}}>
                <Promo {...card}></Promo>
            </Box>
            <Box sx={{
                display: {xs: "flex", sm: "block", md: "block"},
            }}>
                <Box sx={{
                    margin: {lg: "5px 10px", md: "0 37px", xs: "0" },
                    pr: {xs: "16px", sm: 0},
                    display: "flex",
                    alignItems: 'center',
                    justifyContent: "center"
                    }}
                >
                    <Box component={"img"} src={card.img} 
                        sx={{
                            objectFit: "cover",
                            width: {md: "100%", xs: "112px"},
                        }}
                    />
                </Box>
                <Stack spacing={"16px"} sx={{width: "100%"}}>
                    <Box sx={{ height: "calc(14px * 1.4 * 2)" }}> 
                        <Typography 
                            sx={{
                                fontSize: "14px",
                                lineHeight: 1.4,
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden"
                            }}
                        >
                            {card.title}
                        </Typography>
                    </Box>
                    <Box sx={{overflow: "hidden", height: "30px", display: {xs: "none", sm: "block"}}}>
                        <Promo {...card}></Promo>
                    </Box>
                    <Box sx={{display: "flex", justifyContent: "space-between",  height: "20px"}}>
                        {   
                            card.star ? (
                                <Box sx={{
                                        display: "flex",
                                        flexDirection: { sm: "row", xs: "column"}, 
                                        gap: {md: "4px", xs: "5px"},
                                        alignItems: { sm: "center", xs: "flex-start" }
                                    }}
                                >
                                    <Box sx={{cursor: "pointer", display: "flex", flexDirection: "row", alignItems: "center", gap: "4px"}}>
                                        <Rating
                                            name="text-feedback"
                                            value={card.star}
                                            readOnly
                                            precision={0.5}
                                            emptyIcon={
                                                <StarRoundedIcon 
                                                    style={{ opacity: 0.55 }}
                                                    fontSize="inherit"
                                                    sx={{
                                                        width: "12.88px",
                                                        maxHeight: "12.34px"
                                                    }}
                                                />
                                            }
                                            icon={
                                                <StarRoundedIcon 
                                                    fontSize="inherit"
                                                    sx={{
                                                        width: "12.88px",
                                                        maxHeight: "12.34px"
                                                    }} 
                                                />
                                            }
                                        />
                                        <Typography sx={{fontSize: "11px", color: "#ff7e29"}}>
                                            {card.star.toFixed(1)}
                                        </Typography>
                                    </Box>
                                    <Box sx={{cursor: "pointer", display: "flex", flexDirection: "row", alignItems: "center", gap: "4px", color: "#5285cc","&:hover": {color: "#ff7e29"}}}>
                                        <ModeCommentOutlinedIcon sx={{height: "16px"}} />
                                        <Typography sx={{fontSize: "11px"}}>
                                            {card.coment}
                                        </Typography>
                                    </Box>
                                </Box>
                            ) 
                            :
                            (
                                <Box sx={{cursor: "pointer", display: "flex", flexDirection: "row", alignItems: "center", gap: "4px", color: "#5285cc", "&:hover": {color: "#ff7e29"}}}>
                                    <ModeCommentOutlinedIcon sx={{height: "16px", }} />
                                    <Typography sx={{fontSize: "11px",  display: {xs: "none", sm: "block"}}}>
                                        {t("answer")}
                                    </Typography>
                                </Box>
                            )
                        }
                        <Stack
                            direction={"row"}
                            spacing={"20px"}
                            sx={{
                                alignItems: "end",
                                height: "20px",
                                position: {xs: "relative", sm: "static"},
                                top: card.star? "18px" : "0px" 
                            }}
                        >
                            <Box sx={{width: "20px", height: "20px", color: "#5285cc","&:hover": {color: "#ff7e29"}}}> 
                                <BalanceOutlinedIcon sx={{width: "20px", height: "20px"}}/>
                            </Box>
            
                            <Box sx={{width: "20px", height: "20px", color: "#5285cc","&:hover": {color: "#ff7e29"}}}>
                                <FavoriteBorderOutlinedIcon sx={{width: "20px", height: "20px"}}/>
                            </Box>
                        </Stack>
                    </Box>
                    <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", pt: {xs: card.star ? "20px" : "0", sm: "20px"}}}>
                        <Box sx={{position: "relative"}}>
                            <Typography
                                sx={{
                                    color: "#929292",
                                    fontSize: "12px",
                                    textDecoration: "line-through",
                                    position: "absolute",
                                    bottom: 20
                                }}
                            >
                                {Number(card.notAction).toLocaleString('ru-RU')}₴
                            </Typography>
                            <Typography sx={{fontSize: "18px", fontWeight: 800, color: "#ff6900"}}>
                                {Number(card.price).toLocaleString('ru-RU')} ₴
                            </Typography>                    
                        </Box>
                        <Button variant="contained" 
                            sx={{
                                bgcolor: "#FF6900",
                                textTransform: 'none',
                                fontWeight: 700,
                                minWidth: 0,
                                p: 0,
                                width: "52px",
                                height: "32px"                            
                            }}
                        >
                            <ShoppingCartOutlinedIcon sx={{width: "20px", height: "20px"}}/>
                        </Button>
                    </Box>
                </Stack>
            </Box>
        </Box>
    )
}
export default Card