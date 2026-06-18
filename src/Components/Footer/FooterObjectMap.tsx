import { Box, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Link } from "react-router";
import type { IFooreHref } from "../../Interface/IFooterHref";

const text = {
    color: "#d0d0d0",
    fontSize: "14px"
}

function ObjectMap({description, descriptionHref}: IFooreHref){
    return(
        <Stack spacing={"5px"}>
            {
                description.map((item, index) => (
                    <Box key={index} component={Link} to={descriptionHref[index]} sx={{textDecoration: "none"}}>
                        <Typography sx={text}>{item}</Typography>
                    </Box>
                ))
            }
        </Stack>
    ) 
}
export default ObjectMap