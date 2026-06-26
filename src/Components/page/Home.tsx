import { Box, Grid, Stack } from "@mui/material"
import CardList from "../CardList"
import Carusel from "../Carusel"
import Menu from "../Menu"

const itemOne = [
    "ТОП товари",
    "Смартфони",
    "Телевізори",
    "Планшети",
    "Роботи-пилососи",
    "Електросамокати",
    "Ноутбуки",
    "Wi-Fi роутери",
    "Портативні батареї",
    "Навушники",
    "Смарт-годинники",
    "Шурупокрути",
    "Монітори",
    "Мультипечі",
    "Електрочайники",
    "Пилососи",
    "Портативні колонки",
    "Спорт і здоров'я",
    "Персональний догляд",
    "Викрутки",
    "Настільні лампи",
]

const itemTwo = [
    "ТОП товари",
    "Смартфони",
    "Телевізори",
    "Планшети",
    "Портативні батареї",
    "Навушники",
    "Смарт-годинники",
    "Фітнес-браслети",
    "Монітори",
    "Портативні колонки"
]

const itemTree = [
    "ТОП товари",
    "Смартфони",
    "Телевізори",
    "Планшети",
    "Роботи-пилососи",
    "Електросамокати",
    "Ноутбуки",
    "Wi-Fi роутери",
    "Портативні батареї",
    "Навушники",
    "Смарт-годинники",
    "Фітнес-браслети",
    "Монітори",
    "Проектори",
    "Мультипечі",
    "Електрочайники",
    "Пилососи",
    "Портативні колонки",
    "Спорт і здоров'я",
    "Персональний догляд"
]

function Home(){
    return(
        <Box sx={{
                maxWidth: {md: "1600px", lg: "2400"},
                margin: {md: "20px auto", sx: "40px 0"},
                p: {md: "0 66px", xs: "0 17px"},
            }}
        >   
            <Grid container spacing={"20px"} sx={{mb:"20px"}}>
                <Grid size={{lg:2.5, md: 12}}>
                    <Menu></Menu>
                </Grid>
                <Grid size={{lg:9.5, md: 12}}>
                    <Carusel></Carusel>
                </Grid>
            </Grid>
            <Stack spacing={"50px"}>
                <CardList title="Лідери продажу" category={itemOne}></CardList>
                <CardList title="Новинки" category={itemTwo}></CardList>
                <CardList title="Краща цiна" category={itemTree}></CardList>
            </Stack>
        </Box>
    )
}
export default Home