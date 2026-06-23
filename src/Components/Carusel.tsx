import { Box } from "@mui/material"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import reclam from "../assets/Temp/99ccccfa-56fc-4662-82f8-547a2ecf6448.png"
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/navigation'; 

const data = [reclam, reclam, reclam, reclam, reclam, reclam, reclam, reclam, reclam, reclam, reclam, reclam, reclam, reclam]

function Carusel(){
    return(
        <Box
            modules={[Pagination, Autoplay, Navigation]}
            spaceBetween={30}
            loop={true}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 10000, disableOnInteraction: false }}
            navigation={true} 
            style={{ width: '100%', height: 'auto', position: 'relative', overflow: 'hidden' }}
            component={Swiper}
            sx={{
                height: {
                    lg: "334.97px",
                    md: "285.95px",
                    xs: "220.94px"
                },

                "--swiper-pagination-color": "#FF6900",
                "--swiper-pagination-bullet-inactive-color": "#D9D9D9",
                "--swiper-pagination-bullet-inactive-opacity": "1",
                "--swiper-pagination-bullet-size": {
                    lg: "10px",
                    md: "9.17px",
                    xs: "6.34px"
                },
                "--swiper-pagination-bullet-horizontal-gap": {
                    lg: "6px",
                    md: "6.11px",
                    xs: "4.22px"
                },
                pb: {
                    lg: "0.36px",
                    md: "43.04px",
                    xs: "29.72px"
                },

                "& .swiper-pagination-bullet": {
                    transition: "background-color 0.2s ease, transform 0.2s ease",
                    
                    "&:hover": {
                        "&:not(.swiper-pagination-bullet-active)": {
                            backgroundColor: "#FF6900", 
                            opacity: 1,
                            transform: "scale(0.85)",
                        }
                    }
                },

                "--swiper-navigation-color": "transparent", 

                
                "& .swiper-button-next, & .swiper-button-prev": {
                    opacity: 0, 
                    pointerEvents: "none",
                    backgroundColor: "rgba(48,48,48,.3)", 
                    width: { lg: "40px", md: "30px", xs: "20px" },
                    height: { lg: "65px", md: "55px", xs: "45px" },
                    borderRadius: "5px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)", 
                    transition: "opacity .25s linear, transform .25s linear, background-color 0.2s ease",
                    zIndex: 20,
                    display: { xs: "none", md: "flex" },
                    
                    position: "absolute",

                    "&::after": {
                        content: '""',
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: "10px", 
                        height: "10px",
                        borderTop: "2px solid #ffffff",
                        borderRight: "2px solid #ffffff",
                        display: "block"
                    }
                },
                "& .swiper-button-prev": { 
                    left: "20px", 
                    transform: "translateY(-28%) translateX(-15px)",
                    "&::after": {
                        transform: "translate(-15%, -50%) rotate(-135deg)",
                    }
                },
                "& .swiper-button-next": { 
                    right: "20px", 
                    transform: "translateY(-28%) translateX(15px)",
                    "&::after": {
                        transform: "translate(-65%, -50%) rotate(45deg)",
                    }
                },
                "&:hover": {
                    "& .swiper-button-next, & .swiper-button-prev": {
                        opacity: 1,
                        pointerEvents: "auto",
                    },
                    "& .swiper-button-prev": {
                        transform: "translateY(-28%) translateX(0)" 
                    },
                    "& .swiper-button-next": {
                        transform: "translateY(-28%) translateX(0)"
                    }
                },
            }}
        >
            {data.map((item, index) => (
                <SwiperSlide>
                    <Box 
                        key={index}
                        component={"img"}
                        src={item} 
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                            borderRadius: "4px"
                        }}
                    />     
                </SwiperSlide>
            ))}
        </Box>
    )
}
export default Carusel