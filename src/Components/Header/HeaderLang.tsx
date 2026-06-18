import { Box, Menu, MenuItem, Typography } from "@mui/material"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React from "react";
import { useTranslation } from 'react-i18next'


function HeaderLang() {
    const {t} = useTranslation("header");

    
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);    
    const isMenuOpen = Boolean(anchorEl); 
   
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const { i18n } = useTranslation();
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng.toLowerCase());
    };
    return (
        <Box>
            <Box sx={{ display: "flex", cursor: "pointer" }} onClick={handleClick}>
                <Typography sx={{fontWeight: 700}}>{t("label")}</Typography>
                <KeyboardArrowDownIcon 
                    sx={{
                        transition: 'transform 0.3s ease', 
                        transform: isMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' 
                    }}
                />
            </Box>
            <Menu
                id="lang-menu"
                anchorEl={anchorEl}
                open={isMenuOpen} 
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                slotProps={{
                    paper: {
                        style: {
                            marginTop: '-10px',
                        },
                    },
                    list: {
                        disablePadding: true
                    }
                }}

            >
                <MenuItem onClick={() => { changeLanguage(t("label")); handleClose(); }}>
                        <Box sx={{display: "flex"}}>
                        <Typography>{t("label")}</Typography>
                        <KeyboardArrowDownIcon 
                            sx={{
                                transition: 'transform 0.3s ease', 
                                transform: isMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' 
                            }}
                         />
                    </Box>
                </MenuItem>
                <MenuItem onClick={() => { changeLanguage(t("endlabel")); handleClose(); }}>{t("endlabel")}</MenuItem>
            </Menu>
        </Box>
    );
}
export default HeaderLang