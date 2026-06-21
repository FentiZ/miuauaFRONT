import { Box, Grid, Tab, Tabs, Typography } from "@mui/material"
import { card, cardComent } from "../Data/Temp/CardData"
import Card from "./Card"
import type { ICardList } from "../Interface/ICardList"
import React from "react";
import ScrollContainer from 'react-indiana-drag-scroll';
import { TabPanel } from "./TabPanel";


const CustomScrollContainer = React.forwardRef<HTMLDivElement, any>(
  ({ children, className, style }, ref) => {
    return (
      <ScrollContainer 
        innerRef={ref} 
        className={className} 
        style={style}
        vertical={false}
      >
        {children}
      </ScrollContainer>
    );
  }
);

CustomScrollContainer.displayName = 'CustomScrollContainer';

function CardList(data : ICardList){
    const [value, setValue] = React.useState(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return(
        <Box>
            <Typography 
                sx={{
                    color: "#191919",
                    fontWeight: "700",
                    fontSize: "18px",
                    lineHeight: "22px",
                    marginBottom: "19px"
                }}
            >
                {data.title}
            </Typography>

            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons={false}
                aria-label="scrollable prevent tabs example"
                slotProps={{
                    indicator: {
                        style: { display: 'none' }
                    }
                }}
                slots={{
                    scroller: CustomScrollContainer as any 
                }}
            >
                {
                    data.category?.map((item, index) => (
                        <Tab
                            label={item} 
                            key={index}
                            sx={{
                                textTransform: "none",
                                fontSize: "13px",
                                lineHeight: "16px",
                                whiteSpace: "nowrap",
                                color: "#191919",
                                background: "#fff",
                                border: "1px solid #e0e0e0",
                                borderRadius: "4px",
                                transition: "all .3s ease",
                                padding: "7px 15px",
                                height: "31.6px",
                                minHeight: "0",
                                marginRight: "8px", 
                                '&:last-of-type': {
                                    marginRight: 0,
                                },
                                '&.Mui-selected':{
                                    color: "#ff6900",
                                    borderColor: "#ff6900"
                                },
                                '&:hover':{
                                    color: "#ff6900",
                                    boxShadow: "0 0 5px rgba(0, 0, 5, .2)"
                                }
                            }}
                        />
                    ))
                }
            </Tabs>
            {data.category?.map((_, tabIndex) => {
                const randomLength = ((tabIndex * 3 + 5) % 8) + 1;

                return(
                    <TabPanel value={value} index={tabIndex} key={tabIndex}>
                        <Grid container spacing={"5px"} >
                            {Array.from({ length: randomLength}, (_, index) => (
                                <Grid size={{lg: 2.4, md: 4, sm: 6, xs: 12}} key={index}>
                                    <Card {...(index % 2 === 0 ? card : cardComent) }></Card>
                                </Grid>
                            ))}
                        </Grid>
                    </TabPanel>
                )
            })}
        </Box>
    )
}
export default CardList