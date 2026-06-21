import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import BalanceOutlinedIcon from '@mui/icons-material/BalanceOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Box, Divider, Stack, Tooltip } from '@mui/material';

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
    return(
        <Stack direction={"row"} spacing={"30px"} sx={{pl: {lg: "50px", md: "25px", xs: 0}}}>
            <Box sx={[
                boxStyle,
                {
                    display: {md: "flex", xs: "none"},
                    '&:hover': hover
                }
            ]}>
                <PersonOutlineOutlinedIcon sx={iconsStyle}/>
            </Box>
            
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
            <Box sx={[
                boxStyle, 
                {
                    '&:hover': hover
                }
            ]}>
                <ShoppingCartOutlinedIcon sx={iconsStyle}/>
            </Box>
        </Stack>
    )
}
export default HeaderButton