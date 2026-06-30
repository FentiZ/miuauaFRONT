import { useState, useEffect } from 'react';
import {Box, Typography, Grid, IconButton, Rating, Divider, Tabs, Tab, Breadcrumbs, Link, Paper, CircularProgress} from '@mui/material';
import { Close, ShoppingCart } from '@mui/icons-material';
import { GetProductIDs } from '../../api/ProductUrl'; 
import type {  IFullCard } from '../../Interface/ICard'; 

interface IFeatureGroup {
  group_name: string;
  feature_names: string[];
}

export default function ProductCompare() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [products, setProducts] = useState<IFullCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
    const fetchCompareProducts = async () => {
        setLoading(true);
        try {
        const savedIds = localStorage.getItem('comparison');
        if (savedIds) {
            const idArray = JSON.parse(savedIds);
            
            if (Array.isArray(idArray) && idArray.length > 0) {
            
            // ЗАХИСТ: Перетворюємо будь-які дані (об'єкти чи рядки) на чисті числа ID
            const cleanIdArray: number[] = idArray
                .map((item: any) => {
                if (typeof item === 'object' && item !== null && 'id' in item) {
                    return Number(item.id); // Якщо це об'єкт типу {id: 10}, дістаємо ID
                }
                return Number(item); // Якщо це вже число або рядок "10"
                })
                .filter(id => !isNaN(id) && id > 0); // Відсікаємо зламані елементи

            // Якщо після очищення масив не порожній — робимо запит
            if (cleanIdArray.length > 0) {
                const data = await GetProductIDs<IFullCard>(cleanIdArray);
                setProducts(data);
            } else {
                setProducts([]);
            }
            }
        }
        } catch (error) {
        console.error("Помилка завантаження товарів для порівняння:", error);
        } finally {
        setLoading(false);
        }
    };

    fetchCompareProducts();
    }, []);

    const handleRemoveProduct = (id: number) => {
    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);
    
    const remainingIds = updatedProducts.map(p => p.id);
    
    localStorage.setItem('comparison', JSON.stringify(remainingIds));

    window.dispatchEvent(new Event('comparisonUpdate'));
    window.dispatchEvent(new Event('storage')); 
    };
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('ru-RU').format(value);
  };

  const getSpecValue = (product: IFullCard, specName: string): string => {
    if (!product.specifications) return '-';
    const found = product.specifications.find(s => s.name === specName);
    return found ? found.value : '-';
  };
  console.log(products)
  const getDynamicFeatureGroups = (): IFeatureGroup[] => {
    const groupsMap: Record<string, Set<string>> = {};

    products.forEach(product => {
      if (product.specifications) {
        product.specifications.forEach(spec => {
          const group = spec.group_name || "Основные";
          if (!groupsMap[group]) {
            groupsMap[group] = new Set<string>();
          }
          groupsMap[group].add(spec.name);
        });
      }
    });

    return Object.entries(groupsMap).map(([group_name, namesSet]) => ({
      group_name,
      feature_names: Array.from(namesSet)
    }));
  };

  const featureGroups = getDynamicFeatureGroups();

  if (loading) {
    return (
      <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", minHeight:"50vh"}}>
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
      {/* Хлебные крошки */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: '0.85rem', mb: 1 }}>
        <Link underline="hover" color="inherit" href="#">Интернет-магазин</Link>
        <Typography color="text.primary" sx={{ fontSize: '0.85rem' }}>Порівняння товарів</Typography>
      </Breadcrumbs>

      {/* Заголовок */}
      <Typography variant="h4" component="h1" sx={{ mb: 3, fontSize: '1.8rem' }}>
        Порівняння товарів
      </Typography>

      {products.length === 0 ? (
        <Typography variant="body1" color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>
          Список порівняння порожній. Додайте товари для порівняння.
        </Typography>
      ) : (
        <Box>
          
          <Grid container spacing={2} sx={{alignItems:"stretch"}}>
            
            <Grid size={{ xs:12, md:3}} sx={{ pb: 1, display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 'auto', pt: 1 }}>
                Додано товарів: {products.length}
              </Typography>
              
              <Tabs 
                value={activeTab} 
                onChange={(_, val) => setActiveTab(val)}
                sx={{
                  minHeight: 'auto',
                  '& .MuiTab-root': { textTransform: 'none', fontSize: '0.85rem', minWidth: 'auto', px: 1, py: 0.5, mr: 2, color: '#494949' },
                  '& .Mui-selected': { color: '#ff5c00 !important', fontWeight: 'bold' },
                  '& .MuiTabs-indicator': { backgroundColor: '#ff5c00', height: '2px' }
                }}
              >
                <Tab label="Всі характеристики" />
                <Tab label="Відмінності" />
              </Tabs>
            </Grid>

            {/* Колонки с карточками товаров из вашего стейта */}
            {products.map((product) => (
              <Grid size={{ xs: 12, sm: 4, md: 3}} key={product.id}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 2, 
                    position: 'relative', 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    border: '1px solid #f2f2f2'
                  }}
                >
                  {/* Кнопка удаления товара */}
                  <IconButton 
                    onClick={() => handleRemoveProduct(product.id)}
                    sx={{ position: 'absolute', top: 4, right: 4, p: 0.5, color: '#b5b5b5', '&:hover': { color: '#333' } }}
                  >
                    <Close sx={{ fontSize: '1.1rem' }} />
                  </IconButton>

                  {/* Картинка товара с бейджем Акция */}
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 160, position: 'relative', mb: 2 }}>
                    {product.discount_percent && product.discount_percent > 0 && (
                      <Box 
                        sx={{ 
                          position: 'absolute', bottom: 0, left: 0, 
                          display: 'flex', alignItems: 'center', gap: 0.5, 
                          border: '1px solid #ff0000', borderRadius: '20px', 
                          px: 1, py: 0.2, bgcolor: '#fff'
                        }}
                      >
                        <Box component="span" sx={{ width: 14, height: 14, bgcolor: '#ff0000', borderRadius: '50%', color: '#fff', fontSize: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>%</Box>
                        <Typography sx={{ fontSize: '10px', color: '#ff0000', fontWeight: 'bold' }}>Акція</Typography>
                      </Box>
                    )}
                    {/* Если images содержит массив, берем первую картинку, иначе ставим заглушку */}
                    <Box 
                      component="img" 
                      src={product.images && product.images.length > 0 ? product.images[0].image_url : "https://placehold.co"} 
                      alt={product.name} 
                      sx={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
                    />
                  </Box>

                  {/* Название */}
                  <Typography variant="body2" sx={{ color: '#222', minHeight: 40, mb: 1, lineHeight: 1.4, '&:hover': { color: '#ff5c00' } }}>
                    {product.name}
                  </Typography>

                  {/* Рейтинг и отзывы */}
                  <Box sx={{ mb: 2, display:"flex", alignItems:"center", gap:"0.5" }}>
                    <Rating value={product.rating_avg || 5} readOnly size="small" sx={{ fontSize: '0.9rem', color: '#ffaa00' }} />
                    <Typography variant="caption" color="text.secondary">({product.reviews_count || 0})</Typography>
                  </Box>

                  {/* Блок цен и кнопка корзины */}
                  <Box sx={{ mt: 'auto', display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <Box>
                      {product.old_price && (
                        <Typography variant="caption" sx={{ color: '#9e9e9e', textDecoration: 'line-through', display: 'block', mb: -0.5 }}>
                          {formatPrice(product.old_price)}
                        </Typography>
                      )}
                      <Typography variant="h6" sx={{ color: '#111', fontSize: '1.25rem', display: 'flex', alignItems: 'baseline' }}>
                        {formatPrice(product.price)}
                        <Box component="span" sx={{ fontSize: '0.9rem', fontWeight: 'normal', ml: 0.2 }}>₴</Box>
                      </Typography>
                    </Box>

                    <IconButton 
                      sx={{ 
                        bgcolor: '#ff5c00', 
                        color: '#fff', 
                        borderRadius: 1.5,
                        p: 1.2,
                        '&:hover': { bgcolor: '#e05200' }
                      }}
                    >
                      <ShoppingCart sx={{ fontSize: '1.2rem' }} />
                    </IconButton>
                  </Box>

                </Paper>
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 4, borderColor: '#e0e0e0' }} />

          {/* ТАБЛИЦА ХАРАКТЕРИСТИК СНИЗУ */}
          {featureGroups.map((group) => (
            <Box key={group.group_name} sx={{ mb: 4 }}>
              
              {/* Строка-Заголовок группы */}
              <Grid container sx={{ bgcolor: '#fff3ed', p: 1.2, borderRadius: 1, mb: 1 }}>
                <Grid size={{xs:12}}>
                  <Typography variant="subtitle2" sx={{ color: '#ff5c00', fontSize: '0.95rem' }}>
                    {group.group_name}
                  </Typography>
                </Grid>
              </Grid>

              {/* Вывод строк параметров */}
              {group.feature_names.map((featureName, fIdx) => (
                <Grid 
                  container 
                  key={fIdx} 
                  sx={{ 
                    alignItems:"center",
                    py: 2, 
                    borderBottom: '1px solid #f0f0f0',
                    '&:hover': { bgcolor: '#fafafa' }
                  }}
                >
                  <Grid size={{ xs:12, md:3}} sx={{ pr: 2, pb: { xs: 0.5, md: 0 } }}>
                    <Typography variant="body2" sx={{ color: '#7a7a7a', fontSize: '0.88rem' }}>
                      {featureName}
                    </Typography>
                  </Grid>

                  {/* Динамические ячейки-значения для каждого товара */}
                  {products.map((product) => (
                    <Grid size={{ xs:12, sm:4, md:3}} key={product.id} sx={{ pr: 2 }}>
                      <Typography variant="body2" sx={{ color: '#111', fontSize: '0.88rem', lineHeight: 1.5 }}>
                        {getSpecValue(product, featureName)}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              ))}

            </Box>
          ))}

        </Box>
      )}
    </Box>
  );
}

