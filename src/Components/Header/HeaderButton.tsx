import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import BalanceOutlinedIcon from '@mui/icons-material/BalanceOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Badge, Box, Divider, Stack} from '@mui/material';
import Login, { type LoginRef } from '../Autorization/Login';
import React, { useEffect, useState } from 'react';
import Basket from '../Basket';

const boxStyle = {
    width: {lg: "40px", md: "40px", xs: "30px"},
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.3s ease-in-out",    
    borderRadius: "7px"
};

const iconsStyle = {
    fontSize: {lg: "28px", md: "23px", xs: "22px"} 
};

const hover = {
    bgcolor: "#F4F4F4",
    cursor: "pointer",
} 

const dividerStyle = {borderColor: "#b4b4b4", display: {lg: "block", md: "none", xs: "none"}}

function HeaderButton(){
    
    const loginRef = React.useRef<LoginRef>(null);
    
    const getCartCount = (): number => {
        try {
            const savedCart = localStorage.getItem('cart');
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

    const [count, setCount] = useState<number>(() => getCartCount());

    useEffect(() => {
        const handleStorageChange = () => {
            setCount(getCartCount()); 
        };

        window.addEventListener('storage', handleStorageChange);
        
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const [getBasket, setBasket] = useState(false);
    return(
        <Stack direction={"row"} spacing={"30px"} sx={{pl: {lg: "50px", md: "25px", xs: 0}}}>
            <Box 
                onClick={() => loginRef.current?.open()}
                sx={[
                    boxStyle,
                    {
                        display: {md: "flex", xs: "none"},
                        '&:hover': hover
                    }
                ]}
            >
                <PersonOutlineOutlinedIcon sx={iconsStyle}/>
            </Box>
            <Login ref={loginRef} />
            
            <Divider orientation="vertical" variant="middle" flexItem sx={dividerStyle} />
            
            <Box sx={[
                    boxStyle,
                    {
                        display: {lg: "flex", md: "none", xs: "none"},
                    }
                ]}>
                <BalanceOutlinedIcon sx={iconsStyle}/>
            </Box>
            
            <Divider orientation="vertical" variant="middle" flexItem sx={dividerStyle} />
            
            <Box sx={[
                boxStyle,
                {
                    display: {md: "flex", xs: "none"},
                    '&:hover': hover
                }
            ]}>
                <FavoriteBorderOutlinedIcon sx={iconsStyle}/>
            </Box>
            <Divider orientation="vertical" variant="middle" flexItem sx={dividerStyle} />
            <Box 
                onClick={() => setBasket(true)}
                sx={[
                    boxStyle, 
                    {
                        '&:hover': hover
                    }
                ]}
            >
                <Badge badgeContent={count} color="error" sx={{".css-100tl8u-MuiBadge-badge": {bgcolor: "#FF6900"}}}>
                    <ShoppingCartOutlinedIcon sx={iconsStyle}/>
                </Badge>
            </Box>
            <Basket onClose={() => setBasket(false)} open={getBasket}  ></Basket>
        </Stack>
    )
}
export default HeaderButton