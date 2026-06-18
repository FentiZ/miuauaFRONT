import { Accordion, AccordionDetails, AccordionSummary, Box} from "@mui/material"
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
    borderRadius: "none",
    p: {md: "0 66px", xs: "0 17px"},
    '& .MuiAccordionSummary-content': {
        margin: 0,
    },
    '& .MuiAccordionSummary-content.Mui-expanded': {
        margin: "0 !important",
    },
}

const acardSeting = {
    bgcolor: "#191919",
    borderBottom: "1px solid #595959",
    borderRadius: "0 !important"
}

const styleH2 = {
    display: "flex",
    alignItems: "center",
    m: "5px 0", color: "#fff",
    textTransform: "uppercase",
    fontSize: "14px",
    height: "30px"
}

function FooterAcordion({mi, information, profit, informationTitele, profitTitle}: IFooterHrefText){
    //panel0 stub for panel 1 was closed
    const [expanded, setExpanded] = React.useState<string | false>('panel0');

    const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
    };

    return(
        <Box sx={{mb: "15px"}}>
            <Accordion disableGutters sx={acardSeting} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" sx={acard} expandIcon={<ExpandMoreIcon sx={{ color: '#ffffff' }}/>}>
                    <Box component={"h2"} sx={{m: "5px 0", p: "5px 0"}} >
                        <Link to={"/"}>
                            <Box component={"img"} src={miLogo} sx={{width: normalSize, height: normalSize}}></Box>
                        </Link>
                    </Box>
                </AccordionSummary>
                <AccordionDetails sx={{p: {md: "0 66px 15px", xs: "0 17px 15px"}}}>
                    <FooterObjectMap description={mi} descriptionHref={miHref}></FooterObjectMap>
                </AccordionDetails>
            </Accordion>
            <Accordion disableGutters sx={acardSeting} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header" sx={acard} expandIcon={<ExpandMoreIcon sx={{color: '#ffffff'}} />}>
                    <Box component={"h2"} sx={styleH2}>
                       {informationTitele}
                    </Box>
                </AccordionSummary>
                <AccordionDetails sx={{p: {md: "0 66px 15px", xs: "0 17px 15px"}}}>
                    <FooterObjectMap description={information} descriptionHref={informationHref}></FooterObjectMap>
                </AccordionDetails>
            </Accordion>
            <Accordion disableGutters sx={acardSeting} expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header" sx={acard} expandIcon={<ExpandMoreIcon sx={{color: '#ffffff'}}/>}>
                    <Box component={"h2"} sx={styleH2}>
                       {profitTitle}
                    </Box>
                </AccordionSummary>
                <AccordionDetails sx={{p: {md: "0 66px 15px", xs: "0 17px 15px"}}}>
                    <FooterObjectMap description={profit} descriptionHref={profitHref}></FooterObjectMap>
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}
export default FooterAcordion