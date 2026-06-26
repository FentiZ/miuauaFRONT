import gardenImg from "../assets/menu/garden.png";
import headphoneImg from "../assets/menu/headphone.svg";
import homeImg from "../assets/menu/home.png";
import laptopImg from "../assets/menu/netbook.png";
import watchImg from "../assets/menu/oclok.png";
import phoneImg from "../assets/menu/phone.png";
import tvImg from "../assets/menu/tv.png";

export const getCategories = (t: (key: string) => string) => [
  {
    text: t("Smartphones"),
    img: phoneImg,
  },
  {
    text: t("Smartwatches"),
    img: watchImg,
    groups: [
      {
        title: "Смарт-часы",
        items: [
          "Xiaomi Watch 5",
          "Xiaomi Watch 2 Pro",
          "Redmi Watch 5"
        ],
      },
      {
        title: "Фитнес-браслеты",
        items: [
          "Mi Band 10",
          "Mi Band 9 NFC",
          "Mi Band 8"
        ],
      },
      {
        title: "Аксессуары",
        items: [
          "Ремешки",
          "Зарядки",
          "Клипсы"
        ],
      },
    ],
  },
  {
    text: t("Laptops"),
    img: laptopImg,
  },
  {
    text: t("TV"),
    img: tvImg,
  },
  {
    text: t("Audio"),
    img: headphoneImg,
  },
  {
    text: t("HomeAppliances"),
    img: homeImg,
  },
  {
    text: t("Lifestyle"),
    img: gardenImg,
  },
];