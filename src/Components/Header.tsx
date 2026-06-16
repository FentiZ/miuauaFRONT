import { Box } from '@mui/material';

function Header(){
    return(
        <Box component={"header"}>
            <Box
                sx={{
                    display: {lg: "block", md: "none"},
                    height: "36px",
                }}
            >

            </Box>
            <Box 
                sx={{
                    height: "72px",
                    background: "#E3E3E3"
                }}
            >

            </Box>
        </Box>
    )
}
export default Header