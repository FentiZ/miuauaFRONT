import {Button, Box, Menu, MenuItem, Stack, Typography } from '@mui/material';
import location from "../../assets/location-pin-svgrepo-com.svg"
import logo from "../../assets/logo_MI___1.svg"
import { useTranslation } from 'react-i18next';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { headfirst, headsecond } from '../../Data/RoutData';
import { Link } from 'react-router';
import React from 'react';
import HeaderLang from './HeaderLang';
import AppsIcon from '@mui/icons-material/Apps'
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import HeaderButton from './HeaderButton';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  top: 0,
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  left: 0,
  right: 'auto',

  [theme.breakpoints.up('lg')]: {
    left: 'auto',
    right: 0,
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1), 
    transition: theme.transitions.create('width'),
    
    width: '20ch',
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    paddingRight: theme.spacing(2),
    
    [theme.breakpoints.up('lg')]: {
        paddingLeft: `1em`,
    },
  },
}));



function Header(){
    const {t} = useTranslation("header");
    const href = t('href', { returnObjects: true }) as string[];
    const buyers = t('buyers', { returnObjects: true }) as string[];

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    
    return(
        <Box component={"header"} sx={{ maxWidth: {md: "1600px", lg: "2400"}, margin: {md: "0 auto",sx: 0},}}>
            <Box
                sx={{
                    p: {md: "0 66px", xs: "0 17px"},
                    display: {lg: "flex", md: "none", xs: "none"},
                    height: "36px",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Stack spacing={"2px"} direction={"row"}>
                    <Box component={"img"} src={location} sx={{width: "20px"}}/>
                    <Typography>Днепр</Typography>
                    <KeyboardArrowDownIcon/>
                </Stack>
                <Stack spacing={"20px"} direction={"row"} sx={{display: "flex", alignItems: "center"}}>
                    {href.map((item, index) => (
                        index != href.length - 1 ?  
                        (
                            <Box key={index} sx={{
                                '&:hover': {
                                    textDecoration: "underline"
                                }
                            }}>
                                <Box 
                                    component={Link}
                                    to={headfirst[index]}
                                    sx={{ 
                                        textDecoration: "none",
                                        color: "#191919",
                                        fontWeight: index == 1 ? 700 : 400
                                    }}
                                >
                                    {item}
                                </Box>
                            </Box>
                        )
                        : 
                        (
                            <Box key={index}
                                sx={{
                                    '&:hover': {
                                        textDecoration: "underline"
                                    }
                                }}
                            >
                                <Box 
                                    aria-controls="simple-menu" 
                                    aria-haspopup="true" 
                                    onClick={(e) => handleClick(e as any)} 
                                    sx={{ cursor: 'pointer', display: "flex"}}
                                >
                                    <Typography>{item}</Typography>
                                    <KeyboardArrowDownIcon 
                                        sx={{
                                            transition: 'transform 0.3s ease', 
                                            transform: Boolean(anchorEl) ? 'rotate(180deg)' : 'rotate(0deg)' 
                                        }}
                                    />        
                                </Box>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    {buyers.map((item, index) => (
                                        <MenuItem key={index} onClick={handleClose}>
                                            <Box 
                                                component={Link}
                                                to={headsecond[index]}
                                                sx={{ 
                                                    textDecoration: "none",
                                                    color: "#191919"
                                                }}
                                            >
                                                {item}
                                            </Box>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                        )
                    ))}
                </Stack>
                <Stack direction={"row"} spacing={"30px"}>
                    <Stack spacing={"3px"} direction={"row"}>
                        <Typography>
                            {t("ContactUs")}
                        </Typography>
                        <KeyboardArrowDownIcon 
                            sx={{
                                transition: 'transform 0.3s ease', 
                                transform: Boolean(anchorEl) ? 'rotate(180deg)' : 'rotate(0deg)' 
                            }}
                        />
                    </Stack>
                    <HeaderLang></HeaderLang>
                </Stack>
            </Box>
            <Box 
                sx={{
                    p: { md: "0 66px", xs: "0 17px" },
                    height: "72px",
                    background: "#E3E3E3",
                    display: "flex",
                    alignItems: "center"
                }}
            >
                <Stack 
                    spacing={ {lg: "20px", md: "20px", xs: "7px"}}
                    direction={"row"}
                    sx={{
                        width: "100%",
                        maxWidth: "1600px", 
                        margin: { md: "0 auto", xs: 0 },
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}    
                >
                    <Box sx={{display: {lg: "block", md: "none", xs:"none"}}}>
                        <Box component={Link} to={"/miuauaFRONT/"} sx={{ display: "flex", alignItems: "center" }}>
                            <Box component={"img"} src={logo} alt="Logo"></Box>
                        </Box>
                    </Box>
                    <Box sx={{display: {lg: "block", md: "none", xs:"none"}}}>
                        <Button variant="contained" 
                            startIcon={<AppsIcon sx={{width: "27px", height: "27px"}}/>} 
                            sx={{
                                bgcolor: "#FF6900",
                                p: "5px 35px",
                                textTransform: 'none',
                                fontWeight: 700,
                                fontSize: "14px",
                                height: "40px",
                                gap: "12px"
                            }}
                        >
                            {t("catalog")}
                        </Button>
                    </Box>      
                    <Box sx={{width: "100vw", minWidth: "150px"}}>
                        <Search sx={{bgcolor: "#fff", "&:hover": {bgcolor: "#fff"}}}>
                            <StyledInputBase
                                placeholder={t("search")}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                            <SearchIconWrapper sx={{bgcolor: {lg: "#FF6900", md: "none"}, borderRadius: "0 5px 5px 0", width: "15px"}}>
                                <SearchIcon sx={{color: {lg: "#ffff"}}}/>
                            </SearchIconWrapper>
                        </Search>
                    </Box>
                    <Box sx={{display: "flex", alignItems: "center"}}>
                        <HeaderButton></HeaderButton>
                    </Box>
                </Stack>
            </Box>
        </Box>
    )
}
export default Header