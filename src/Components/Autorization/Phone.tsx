import { Button, Stack, TextField, Typography } from "@mui/material";
import { forwardRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { IMaskInput } from "react-imask";

const PhoneMask = forwardRef<HTMLInputElement>((props, ref) => {
  const { onChange, onFocus, onBlur, value, ...other } = props as any;
  const [focused, setFocused] = useState(false);

  const shouldShowMask = focused || !!value;
  return (
    <IMaskInput
      {...other}
      mask={shouldShowMask ? "+38(000) 000-00-00" : ""}
      lazy={!focused}
      placeholderChar="_"
      placeholder=""   
      inputRef={ref as any}
      overwrite
      onFocus={(e) => {
        setFocused(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        setFocused(false);
        onBlur?.(e);
      }}
      onAccept={(value: string) => {
        onChange?.({ target: { value } });
      }}
    />
  );
});

interface PhoneFormProps {
  onClose: () => void;
}

export function PhoneForm({ onClose }: PhoneFormProps){
    const {t} = useTranslation("autorization");

    const [phone, setPhone] = useState("");
    const [error, setError] = useState(false);

    const validatePhone = (value: string) => {
        const regex = /^\+38\(0\d{2}\)\s\d{3}-\d{2}-\d{2}$/;
        return regex.test(value);
    };

    const handleSubmit = () => {
        if (!validatePhone(phone)) {
            setError(true);
            return;
        }

        setError(false);
        onClose()
    };

    return(
        <>
            <Stack spacing={"25px"}>
                <TextField
                    label={t("phoneTop")}
                    
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    error={error}
                    helperText={error ? t("importment") : ""}
                    fullWidth
                    slotProps={{
                        input: {
                            inputComponent: PhoneMask as any,
                        },
                        inputLabel: {
                            shrink: true, 
                        },
                        formHelperText: {
                            sx: {
                                mt: "0", pt: "0"
                            },
                        },
                        htmlInput: {
                            sx:{
                                height: "20px"
                            }
                        }                    
                    }}
                    
                />
                <Button
                    onClick={handleSubmit}
                    sx={{
                        bgcolor: "#FF6900", 
                        width: "100%", height: "48px",
                        color: "#ffff",
                        textTransform: "none",
                        fontWeight: 700
                    }}
                >
                    {t("enter")}
                </Button>
                <Typography sx={{display: "flex", justifyContent: "center", color: "#929292"}}>{t("or")}</Typography>
                <Button
                    onClick={handleSubmit}
                    sx={{
                        bgcolor: "#fff",
                        border: "1px solid #bdbdbd", 
                        width: "100%", 
                        height: "48px",
                        color: "#000000", 
                        textTransform: "none",
                        fontWeight: 700,
                        "&:hover": {
                            bgcolor: "#f2f2f2"
                        }
                    }}
                >
                    {t("login")}
                </Button>
            </Stack>
        </>
    )
}