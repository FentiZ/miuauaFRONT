import { Box, Breadcrumbs, Chip, Divider, Rating, Tab, Tabs, Link} from "@mui/material";
import { useEffect, useState } from "react";
import { GetProductID } from "../../api/ProductUrl";
import {useNavigate, useParams } from "react-router";
import type { IFullCard, IProductImage, ISpecification } from "../../Interface/ICard";
import CheckIcon from '@mui/icons-material/Check';
import BalanceOutlinedIcon from '@mui/icons-material/BalanceOutlined';
import { 
  Grid, 
  Typography, 
  Button, 
  Stack, 
  IconButton, 
  Paper,
  CircularProgress 
} from "@mui/material";
import {
  ShoppingCart,
  NavigateBefore,
  NavigateNext,
  FavoriteBorder,
  PhoneInTalk,
  BarChart
} from '@mui/icons-material';
import Basket from "../Basket";
export function CardInfo() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 1. СНАЧАЛА ОБЪЯВЛЯЕМ АБСОЛЮТНО ВСЕ СТЙТЫ И ХУКИ (В САМОМ ВЕРХУ)
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [getCard, setCard] = useState<IFullCard | undefined>(undefined);
  const [activeImgIndex, setActiveImgIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<number>(0);

  // Функция проверки корзины, которая безопасно работает по ID из URL
  const checkCartStatus = (): boolean => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (!savedCart || savedCart === "undefined" || savedCart === "null") return false;
      
      const currentCart = JSON.parse(savedCart);
      // Используем Number(id) из useParams, так как он доступен СРАЗУ
      return Array.isArray(currentCart) && currentCart.some((item: any) => item.id === Number(id));
    } catch (error) {
      return false;
    }
  };

  const [isInCart, setIsInCart] = useState<boolean>(() => checkCartStatus());

  useEffect(() => {
    const handleStorageChange = () => {
      setIsInCart(checkCartStatus());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [id]);

  useEffect(() => {
    const cardInfo = async () => {
      if (!id) return;
      if (getCard && getCard.id === Number(id)) return;

      const card = await GetProductID(Number(id));
      if (card === 404) {
        navigate("/");
        return;
      }
      setCard(card as IFullCard);
    };

    cardInfo();
  }, [id, getCard, navigate]);


  const sortedImages: IProductImage[] = getCard?.images 
    ? [...getCard.images].sort((a, b) => a.sort_order - b.sort_order) 
    : [];

  const handlePrevImage = () => {
    setActiveImgIndex((prev) => (prev === 0 ? sortedImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImgIndex((prev) => (prev === sortedImages.length - 1 ? 0 : prev + 1));
  };

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('ru-RU').format(value);
  };

  const handleAddToCart = () => {
    if (!getCard) return;
    
    let currentCart = [];
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart && savedCart !== "undefined" && savedCart !== "null") {
        currentCart = JSON.parse(savedCart);
      }
      if (!Array.isArray(currentCart)) currentCart = [];
    } catch (e) {
      localStorage.removeItem('cart');
      currentCart = [];
    }
    
    const existingItem = currentCart.find((item: any) => item.id === getCard.id);
    let updatedCart;

    if (!existingItem) {
      updatedCart = [...currentCart, { id: getCard.id, quantity: 1 }];    
    } else {
      updatedCart = currentCart; 
    }

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setIsInCart(true);
    window.dispatchEvent(new Event('storage'));
  };


  if (!getCard) {
    return (
      <Box sx={{ display:"flex", justifyContent:"center", alignItems:"center", minHeight:"50vh"}}>
        <CircularProgress sx={{ color: '#ff5c00' }} />
      </Box>
    );
  }

  return (
    <Box 
      sx={{ 
        maxWidth: { md: "1600px", lg: "2400px" }, 
        margin: "0 auto", 
        px: { xs: 2, md: 4 }, 
        py: 2,
        backgroundColor: '#fff' 
      }}
    >
      
      <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: '0.85rem', mb: 1 }}>
        <Link underline="hover" color="inherit" href="#" onClick={(e) => e.preventDefault()}>
          Интернет-магазин
        </Link>
        <Link underline="hover" color="inherit" href="#" onClick={(e) => e.preventDefault()}>
          {getCard.category?.name || 'Телевизоры'}
        </Link>
        <Typography color="text.primary" sx={{ fontSize: '0.85rem' }}>
          {getCard.name}
        </Typography>
      </Breadcrumbs>

      <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"baseline", mb: 2, flexWrap: 'wrap', gap: 1 }}>
        <Typography variant="h4" component="h1" sx={{ fontSize: { xs: '1.4rem', md: '1.8rem', lg: '2.2rem' } }}>
          {getCard.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ minWidth: 'fit-content' }}>
          Код: {getCard.sku?.replace(/\D/g, '').slice(0, 7) || '1196531'}
        </Typography>
      </Box>

      {/* 3. Вкладки навигации (Якоря) */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs 
          value={activeTab} 
          onChange={(_, newValue) => {
            setActiveTab(newValue);
            const targetId = newValue === 0 ? 'prod-description' : 'prod-specs';
            const element = document.getElementById(targetId);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }} 
          sx={{
            '& .MuiTab-root': { textTransform: 'none', fontWeight: 'normal', fontSize: '0.95rem', minWidth: 'auto', px: 2 },
            '& .Mui-selected': { color: '#ff4e00 !important', fontWeight: 'bold' },
            '& .MuiTabs-indicator': { backgroundColor: '#ff4e00' }
          }}
        >
          <Tab label="Про товар" />
          <Tab label={`Характеристики (${getCard.specifications?.length || 0})`} />
          {/* <Tab label={`Отзывы и вопросы (${getCard.reviews_count})`} /> */}
        </Tabs>
      </Box>

      <Grid container spacing={{ xs: 2, md: 4, lg: 6 }}>
        
        <Grid size={{ xs:12, sm:6}}>
          <Box sx={{ display: 'flex', gap: 2, flexDirection: 'row', alignItems: 'flex-start' }}>
            
            {sortedImages.length > 0 && (
              <Stack direction="column" spacing={1} sx={{ flexShrink: 0 }}>
                {sortedImages.map((img, index) => (
                  <Box
                    key={img.id}
                    component="img"
                    src={img.image_url}
                    alt="thumbnail"
                    onClick={() => setActiveImgIndex(index)}
                    sx={{
                      width: { xs: 50, md: 64, lg: 80 },
                      height: { xs: 50, md: 64, lg: 80 },
                      objectFit: 'contain',
                      cursor: 'pointer',
                      borderRadius: 1,
                      border: '1px solid',
                      borderColor: activeImgIndex === index ? '#ff4e00' : '#e0e0e0',
                      p: 0.5,
                      backgroundColor: '#fff'
                    }}
                  />
                ))}
              </Stack>
            )}

            <Box 
              sx={{ 
                position: 'relative', 
                flexGrow: 1, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                borderRadius: 2,
                height: { xs: 250, md: 300, lg: 400, xl: 400 },
                px: 2
              }}
            >
              {sortedImages.length > 0 && (
                <Box
                  component="img"
                  src={sortedImages[activeImgIndex]?.image_url}
                  alt={getCard.name}
                  sx={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                />
              )}

              {/* Стрелки пролистывания */}
              {sortedImages.length > 1 && (
                <>
                  <IconButton 
                    onClick={handlePrevImage}
                    sx={{ position: 'absolute', left: 8, bgcolor: 'rgba(255,255,255,0.7)', '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' } }}
                  >
                    <NavigateBefore />
                  </IconButton>
                  <IconButton 
                    onClick={handleNextImage}
                    sx={{ position: 'absolute', right: 8, bgcolor: 'rgba(255,255,255,0.7)', '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' } }}
                  >
                    <NavigateNext />
                  </IconButton>
                </>
              )}
            </Box>
          </Box>
        </Grid>

        {/* ПРАВАЯ КОЛОНКА: Блок покупки и цен (занимает 6 долей из 12) */}
        <Grid size={{ xs:12, sm:6}}>
          <Paper 
            variant="outlined" 
            sx={{ 
              p: { xs: 2, md: 3, lg: 4 }, 
              borderRadius: 2, 
              borderColor: '#e8e8e8',
              boxShadow: '0px 4px 20px rgba(0,0,0,0.01)'
            }}
          >
            {/* Статус наличия */}
            <Typography 
              variant="body2" 
              sx={{ 
                color: getCard.stock > 0 ? '#2e7d32' : '#d32f2f', 
                fontWeight: '500', 
                display: 'flex', 
                alignItems: 'center', 
                gap: 0.5,
                mb: 2
              }}
            >
              {getCard.stock > 0 ? `✓ Товар в наличии` : `✕ Нет в наличии`}
            </Typography>

            {/* Блок Цены и Кнопок */}
            <Grid container spacing={2} sx={{ alignItems:"center"}}>
              <Grid size={{ xs:12, sm:6}}>
                {/* Старая зачеркнутая цена */}
                {getCard.old_price && (
                  <Typography 
                    variant="body2" 
                    sx={{ color: '#9e9e9e', textDecoration: 'line-through', fontSize: '0.9rem', mb: -0.5 }}
                  >
                    {formatPrice(getCard.old_price)}
                    {getCard.discount_percent && (
                      <Box component="span" sx={{ color: '#d32f2f', ml: 1, textDecoration: 'none' }}>
                        -{formatPrice(getCard.old_price - getCard.price)}
                      </Box>
                    )}
                  </Typography>
                )}
                {/* Актуальная стоимость */}
                <Typography variant="h3" component="div" sx={{ color: '#111', fontSize: { md: '2rem', lg: '2.5rem' }, display: 'flex', alignItems: 'baseline' }}>
                  {formatPrice(getCard.price)}
                  <Box component="span" sx={{ fontSize: '1.2rem', fontWeight: 'normal', ml: 0.5 }}>₴</Box>
                </Typography>
                {/* Автоматический расчет кэшбэка 1% */}
                <Typography variant="body2" sx={{ color: '#2e7d32', fontWeight: '500', mt: 0.5 }}>
                  {Math.round(getCard.price * 0.01)} ₴ кэшбэк
                </Typography>
              </Grid>

              <Grid size={{ xs:12, sm:6}}>
                <Button
                  onClick={handleAddToCart}
                  variant="contained"
                  disabled={getCard.stock === 0 || !getCard.is_active}
                  fullWidth
                  startIcon={!isInCart ? <ShoppingCart /> : <CheckIcon/>}
                  sx={{ 
                    bgcolor: '#ff5c00', 
                    '&:hover': { bgcolor: '#e05200' },
                    textTransform: 'none',
                    fontWeight: 'bold',
                    py: 1.8,
                    borderRadius: 1.5,
                    fontSize: '1.05rem',
                    mb: 1.5
                  }}
                >
                  Купить
                </Button>
                <Basket 
                    open={isBasketOpen} 
                    onClose={() => setIsBasketOpen(false)}
                />
                {/* <Button
                  variant="outlined"
                  fullWidth
                  sx={{ 
                    color: '#ff5c00', 
                    borderColor: '#e0e0e0', 
                    '&:hover': { borderColor: '#ff5c00', bgcolor: 'transparent' },
                    textTransform: 'none',
                    py: 1.5,
                    borderRadius: 1.5,
                    fontSize: '0.95rem'
                  }}
                >
                  Кредит от {formatPrice(Math.round(getCard.price / 3))} ₴/мес
                </Button> */}
              </Grid>
            </Grid>

            <Divider sx={{ my: 2.5 }} />

            <Box 
 
              sx={{ 
                display:"flex",
                justifyContent:"space-around",
                mt: 1,
                '& .MuiButton-root': { 
                  flexDirection: 'column',
                  textTransform: 'none', 
                  color: '#494949', 
                  fontSize: '0.75rem',
                  lineHeight: 1.3,
                  minWidth: 'auto',
                  gap: '4px',
                  '& .MuiButton-startIcon': { 
                    margin: 0
                  }
                }, 
              }}
            >         
              <Button startIcon={<BalanceOutlinedIcon sx={{ color: '#494949', fontSize: '1.4rem' }} />}>
                В сравнение
              </Button>
              
              <Button 
                startIcon={<FavoriteBorder sx={{ color: '#494949', fontSize: '1.4rem' }} />} 
              >
                В избранное
              </Button>
            </Box>
          </Paper>

          <Box sx={{ mt: 3, px: 1 }}>
            <Typography variant="subtitle1"sx={{ mb: 1, fontSize: '0.95rem' }}>
              Краткие характеристики:
            </Typography>
            
            {getCard.short_description ? (
              <Box sx={{ mb: 2, display:"flex", flexWrap:"wrap", gap: 1}}>
                {getCard.short_description.split(',').map((tech, index) => (
                  <Chip 
                    key={index} 
                    label={tech.trim()} 
                    variant="outlined" 
                    size="small" 
                    sx={{ 
                      borderRadius: '4px', 
                      backgroundColor: '#f5f5f5', 
                      borderColor: '#e0e0e0',
                      fontSize: '0.8rem',
                      fontWeight: '500'
                    }} 
                  />
                ))}
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {getCard.description}
              </Typography>
            )}

            <Stack direction="row" spacing={2} sx={{alignItems:"center"}}>
              <Rating value={getCard.rating_avg} readOnly size="small" />
              <Typography variant="body2" color="text.secondary">
                Просмотров: {getCard.view_count}
              </Typography>
            </Stack>
          </Box>
        </Grid>
      </Grid>

      <Box 
        id="prod-description" 
        sx={{ mt: 8, pt: 4, maxWidth: 'lg', scrollMarginTop: '20px' }}
      >
        <Typography variant="h5" sx={{ mb: 2, fontSize: '1.5rem', fontWeight: '600' }}>
          Описание {getCard?.name}
        </Typography>
        <Typography variant="body1" sx={{ color: '#222', lineHeight: 1.7 }}>
          {getCard?.description}
        </Typography>
      </Box>

      <Divider sx={{ my: 6 }} />

      {/* БЛОК ХАРАКТЕРИСТИК */}
      {getCard?.specifications && getCard.specifications.length > 0 && (
        <Box 
          id="prod-specs" 
          sx={{ maxWidth: 'lg', scrollMarginTop: '20px' }}
        >
          <Typography variant="h5" sx={{ mb: 4, fontSize: '1.5rem', fontWeight: '600' }}>
            Характеристики {getCard?.name}
          </Typography>

          {Object.entries(
            getCard.specifications.reduce((acc, spec) => {
              const group = spec.group_name || "Основные";
              if (!acc[group]) acc[group] = [];
              acc[group].push(spec);
              return acc;
            }, {} as Record<string, ISpecification[]>)
          ).map(([groupName, specs]) => (
            <Box key={groupName} sx={{ mb: 4 }}>
              <Typography 
                variant="subtitle1" 
                sx={{ color: '#111', mb: 1.5, fontSize: '1.1rem', fontWeight: 'bold' }}
              >
                {groupName}
              </Typography>

              <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {[...specs]
                    .sort((a, b) => a.sort_order - b.sort_order)
                    .map((spec) => (
                      <Box 
                        component="tr" 
                        key={spec.id} 
                        sx={{ '&:hover': { bgcolor: '#f9f9f9' } }}
                      >
                        <Box component="td" sx={{ py: 1.8, width: '40%', borderBottom: '1px solid #f2f2f2', verticalAlign: 'middle' }}>
                          <Typography variant="body2" sx={{ color: '#4d4d4d', fontSize: '0.9rem' }}>
                            {spec.name}
                          </Typography>
                        </Box>
                        <Box component="td" sx={{ py: 1.8, width: '60%', borderBottom: '1px solid #f2f2f2', verticalAlign: 'middle' }}>
                          <Typography variant="body2" sx={{ color: '#111', fontSize: '0.9rem' }}>
                            {spec.value}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                </tbody>
              </Box>
            </Box>
          ))}
        </Box>
      )}

    </Box>
  );
}
