import { useState, type ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { FormControl, RadioGroup, FormControlLabel, Radio, Typography, Box } from '@mui/material';

interface WayPayItem {
  title: string;
  descriptiont: string[];
}

export default function CheckoutForm({ index }: { index: number }){
  const { t } = useTranslation("pay");

  const tPay = t("wayPay", { returnObjects: true }) as WayPayItem[];

  const [selectedPayment, setSelectedPayment] = useState<string>('');

  if (!Array.isArray(tPay) || tPay.length < 2) {
    return <Box>Завантаження...</Box>;
  }

  const paymentSection = tPay[index];

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedPayment(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', gap: 4, p: 2, pl: 0, alignItems: 'flex-start' }}>
      {/* Назва секції */}
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', minWidth: {lg: 150, xs: 20}, mt: 0.5, fontSize: {xs: '10px', md: "15px"}}}>
        {paymentSection.title}
      </Typography>

      {/* Список радіокнопок із descriptiont */}
      <FormControl component="fieldset">
        <RadioGroup value={selectedPayment} onChange={handleChange}>
          {paymentSection.descriptiont.map((method, index) => (
            <FormControlLabel
              key={index}
              value={method}
              control={
                <Radio 
                  sx={{ 
                    color: '#e0e0e0', 
                    '&.Mui-checked': { color: '#1976d2' },
                    padding: '4px 8px' 
                  }} 
                />
              }
              label={method}
              sx={{
                marginBottom: '4px',
                '& .MuiFormControlLabel-label': {
                  fontSize: {xs: '10px', md: "15px"},
                  color: '#333'
                }
              }}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
}
