import { forwardRef, useImperativeHandle, useState} from "react";
import { Box, Modal, Typography } from "@mui/material";
import { PhoneForm } from "./Phone";
import CloseIcon from "@mui/icons-material/Close"
import { useTranslation } from "react-i18next";

export type LoginRef = {
  open: () => void;
  close: () => void;
};

const position = {
  position: "absolute",
  top: "50%", left: "50%",
  transform: 'translate(-50%, -50%)',
  bgcolor: "#fff", fontSize: "16px",
  width: {md: "340px", xs: "100%"}, height: {md: "388px", xs: "100%"},
  padding: "32px 40px 40px 40px",
  border: "none",
  borderRadius: "6px",
  boxShadow: "0 2px 8px hsla(0,0%,57.3%,.5)"
}


const Login = forwardRef<LoginRef>((_props, ref) => {
  const {t} = useTranslation("autorization");

  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
  }));
  
  return (

    <Modal 
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"    
        slotProps={{ backdrop: { sx: { backgroundColor: "rgba(0, 0, 0, 0.5)" } } }}
    >
      <Box sx={[position, {boxSizing: {xs: "border-box", md: "content-box"}}]}>
        <Box sx={{display: "flex", justifyContent: "space-between", mb: "40px"}}>
          <Typography sx={{fontSize: "22px"}}>{t("exit")}</Typography>
          <CloseIcon onClick={() => setOpen(false)} sx={{cursor: "pointer"}}/>
        </Box>
        <PhoneForm onClose={() => setOpen(false)}></PhoneForm>        
      </Box>
    </Modal>
  );
});

export default Login;