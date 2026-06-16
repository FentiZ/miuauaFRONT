import { Box, Divider, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import Mastercard from "../img/Mastercard";
import VerifiedbyVisa from "../img/VerifiedbyVisa";
import miLogo from "../../assets/miLogo.svg";
import { Link } from "react-router";
import FooterHref from "./FooterHref";
import FooterAcordion from "./FooterAcordion";


export function Footer(){
    const {t} = useTranslation("footer");

    const mi = t('mi', { returnObjects: true }) as string[];
    const information = t('information.description', { returnObjects: true }) as string[];
    const profit = t('profit.description', { returnObjects: true }) as string[];

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    const paginationSize = isMobile ? "small" : isTablet ? "medium" : "large";

    return(
        <Box 
            component={"footer"}
            sx={{
                color: "#d0d0d0",
                bgcolor: "#191919",
            }}
        >
            <Box sx={{maxWidth: "1600px", margin: {md: "0 auto",sx: 0,}}}>
                {
                    paginationSize == "large" ?
                    (
                        <FooterHref mi={mi} information={information} informationTitele={t("information.title")} profit={profit} profitTitle={t("profit.title")} ></FooterHref>
                    )
                     : 
                    (
                        <FooterAcordion mi={mi} information={information} informationTitele={t("information.title")} profit={profit} profitTitle={t("profit.title")} ></FooterAcordion>
                    )                     
                }
                <Divider sx={{ borderColor: '#595959', m: "0 26px 20px", display: {md: "block", xs: "none"}}} />

                <Box sx={{display: {md: "flex", xs: "block"}, justifyContent: "space-between"}}>
                    <Box sx={{p: "0 26px"}}>
                        <Typography 
                            sx={{
                                color: "#FFFFF8",
                                fontSize: {
                                    lg: "12.87px",
                                    md: "13.5px",
                                    xs: "14px"
                                }    
                            }}
                        >
                            {t("certificates")}
                        </Typography>
                        <Box sx={{display: "flex"}} >
                            <Box sx={{userSelect: "none"}}>
                                <Mastercard></Mastercard>
                            </Box>
                            <Box sx={{width: "80px", height: "55px", userSelect: "none"}}>
                                <VerifiedbyVisa></VerifiedbyVisa>
                            </Box>
                        </Box>
                    </Box>
                    <Stack spacing={"10px"} 
                        sx={{
                            borderTop: {
                                md: "none",
                                xs: "1px solid #595959"
                            },
                            pt: {md: "none", xs: "10px"},
                            p: "0 26px 30px",
                        }}>
                        <Typography
                            sx={{
                                color: "#FFFFF8",
                                fontSize: {
                                    lg: "12.87px",
                                    md: "13.5px",
                                    xs: "14px"
                                }   
                            }}
                        >
                            {t("save")}
                        </Typography>
                        <Link to={"/"}>
                            <Box component={"img"} src={miLogo} sx={{width: "32px", height: "32px"}}></Box>
                        </Link>
                    </Stack>
                </Box>
            </Box>
        </Box>
    )
}