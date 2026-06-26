import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { getCategories } from "../Data/Category";
import React from "react";

function Menu() {
  const { t } = useTranslation("menu");
  const categories = getCategories(t);

  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [open, setOpen] = React.useState(false);

  const handleEnter = (index: number) => {
    setActiveIndex(index);
    setOpen(true);
  };

  const handleLeave = () => {
    setOpen(false);
    setActiveIndex(null);
  };
  
  return (
    <Box sx={{ position: "relative", width: "100%" , height: "100%", top: open ? "-20px" : 0, display: {md: "none", lg: "block"}}}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={handleLeave}
    >
      <Box
        sx={{
          pt: open ? "30px" : "10px",
          width: "100%",
          height: "97%",
          border: "1px solid #e0e0e0",
          borderRadius: "4px",
          background: "#fff",
          filter: open ? "drop-shadow(0 2px 8px rgba(146,146,146,.5))" : "none",
        }}
      >
        {categories.map((item, index) => (
          <Box
            key={index}
            onMouseEnter={() => handleEnter(index)}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "6px 12px",
              cursor: "pointer",
              "&:hover": { background: "#f5f5f5" },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Box
                component="img"
                src={item.img}
                sx={{ width: 20, height: 20 }}
              />
              <Typography sx={{fontSize: "12px"}} >{item.text}</Typography>
            </Box>

            <Typography sx={{ color: "#999" }}>›</Typography>
          </Box>
        ))}
      </Box>

      {open && activeIndex !== null && (
        <Box
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={handleLeave}
          sx={{
            position: "absolute",
            top: 0,
            left: "100%",
            width: 750,
            minHeight: 350,
            background: "#fff",
            boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
            p: 2,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 3,
            zIndex: 9999,
          }}
        >
          {categories[activeIndex]?.groups?.map((group: any, i: number) => (
            <Box key={i}>
              <Typography
                sx={{
                    color: "#111",
                    fontSize:"13px",
                    fontWeight:600,
                    mb:"1"
                }}
              >
                {group.title}
              </Typography>

              {group.items.map((el: string, idx: number) => (
                <Typography
                  key={idx}
                  sx={{
                    fontSize: 12,
                    color: "#444",
                    py: 0.4,
                    cursor: "pointer",
                    "&:hover": { color: "#1976d2" },
                  }}
                >
                  {el}
                </Typography>
              ))}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default Menu;