import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from "react";
import { Link } from "react-router";
import miLogo from "../../assets/miLogo.svg";
import FooterObjectMap from "./FooterObjectMap";
import type { IFooterHrefText } from "../../Interface/IFooterHrefText";
import { informationHref, miHref, profitHref } from "../../Data/RoutData";

const normalSize = {
    md: "22px", xs: "32px"
}
const acard = {
    p: "0 26px",
    '& .MuiAccordionSummary-content': {
        margin: 0,
    },
    '& .MuiAccordionSummary-content.Mui-expanded': {
        margin: "0 !important"
    },
}
function FooterAcordion({mi, information, profit, informationTitele, profitTitle}: IFooterHrefText){
    //panel0 stub for panel 1 was closed
    const [expanded, setExpanded] = React.useState<string | false>('panel0');

    const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
    };

    return(
        <Box>
            <Accordion sx={{bgcolor: "#191919"}} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" sx={acard}>
                    <Box component={"h2"} sx={{m: "5px 0", pt: '17px'}}>
                        <Link to={"/"}>
                            <Box component={"img"} src={miLogo} sx={{width: normalSize, height: normalSize}}></Box>
                        </Link>
                    </Box>
                </AccordionSummary>
                <AccordionDetails sx={{p: "0 26px"}}>
                    <FooterObjectMap description={mi} descriptionHref={miHref}></FooterObjectMap>
                </AccordionDetails>
            </Accordion>
            <Accordion sx={{bgcolor: "#191919"}} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header" sx={acard}>
                    <Box component={"h2"} sx={{m: "5px 0", color: "#fff", textTransform: "uppercase", fontSize: "14px", height: "30px"}}>
                       {informationTitele}
                    </Box>
                </AccordionSummary>
                <AccordionDetails sx={{p: "0 26px"}}>
                    <FooterObjectMap description={information} descriptionHref={informationHref}></FooterObjectMap>
                </AccordionDetails>
            </Accordion>
            <Accordion sx={{bgcolor: "#191919"}} expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header" sx={acard}>
                    <Box component={"h2"} sx={{m: "5px 0", color: "#fff", textTransform: "uppercase", fontSize: "14px", height: "30px"}}>
                       {profitTitle}
                    </Box>
                </AccordionSummary>
                <AccordionDetails sx={{p: "0 26px"}}>
                    <FooterObjectMap description={profit} descriptionHref={profitHref}></FooterObjectMap>
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}
export default FooterAcordion