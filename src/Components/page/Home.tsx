import { Box, Grid, Typography } from "@mui/material"
import Card from "../Card"
import { card, cardComent } from "../../Data/Temp/CardData"

function Home(){
    return(
        <Box sx={{
                maxWidth: {md: "1600px", lg: "2400"},
                margin: {md: "0 auto",sx: 0},
                p: {md: "0 66px", xs: "0 17px"}
            }}
        >
        <Grid container spacing={"5px"}>
            <Grid size={{lg: 2.4, md: 4, sm: 6, xs: 12}}>
                <Card {...card}></Card>
            </Grid>
            <Grid size={{lg: 2.4, md: 4, sm: 6, xs: 12}}>
                <Card {...cardComent}></Card>
            </Grid>
            <Grid size={{lg: 2.4, md: 4, sm: 6, xs: 12}}>
                <Card {...card}></Card>
            </Grid>
            <Grid size={{lg: 2.4, md: 4, sm: 6, xs: 12}}>
                <Card {...cardComent}></Card>
            </Grid>
            <Grid size={{lg: 2.4, md: 4, sm: 6, xs: 12}}>
                <Card {...card}></Card>
            </Grid>
            <Grid size={{lg: 2.4, md: 4, sm: 6, xs: 12}}>
                <Card {...cardComent}></Card>
            </Grid>
        </Grid>
        </Box>
    )
}
export default Home