import { Box, Grid,} from "@mui/material";
import { Link } from "react-router";
import miLogo from "../../assets/miLogo.svg";
import { miHref, informationHref, profitHref } from "../../Data/RoutData";
import type { IFooreHref } from "../../Interface/IFooterHref";
import FooterObjectMap from "./FooterObjectMap";
import type { IFooterHrefText } from "../../Interface/IFooterHrefText";


function ObjectHref({ title, description, descriptionHref}: IFooreHref){
    return(
        <Box>
        <Box component={"h2"} sx={{m: "5px 0", color: "#fff", textTransform: "uppercase", fontSize: "14px", height: "30px"}}>
            {title}
        </Box>
            <FooterObjectMap description={description} descriptionHref={descriptionHref}></FooterObjectMap>
        </Box>
    )
}

export default function FooterHref({mi, information, profit, informationTitele, profitTitle}: IFooterHrefText){

    const normalSize = {
        md: "22px", xs: "32px"
    }

    return(
        <Grid container spacing={"20px"} sx={{p: {md: "26px 66px", xs: "26px"}}}>
            <Grid size={2.4}>
                <Box component={"h2"} sx={{m: "5px 0"}}>
                    <Link to={"/miuauaFRONT/"}>
                        <Box component={"img"} src={miLogo} sx={{width: normalSize, height: normalSize}}></Box>
                    </Link>
                </Box>
                <FooterObjectMap description={mi} descriptionHref={miHref}></FooterObjectMap>

            </Grid>
            <Grid size={2.4}>
                <ObjectHref title={informationTitele} description={information} descriptionHref={informationHref}></ObjectHref>
            </Grid>
            <Grid size={2.4}>
                <ObjectHref title={profitTitle} description={profit} descriptionHref={profitHref} ></ObjectHref>
            </Grid>
        </Grid>
    )
}