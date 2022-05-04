import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { createTheme } from "@mui/system";
import { ThemeProvider } from "styled-components";
import { amber } from "@mui/material/colors";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Outlet } from "react-router-dom";
import './Header.scss'
const theme = createTheme({
   palette: {
      light: {
         main: amber[50],
      },
      dark: "#111",
   },
});
// const useStyle = makeStyles({
//   root:{
//     ba
//   }
// })
const Header = () => {
   const [anchorElNav, setAnchorElNav] = React.useState(null);
   const [anchorElUser, setAnchorElUser] = React.useState(null);

   const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
   };
   const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
   };

   const handleCloseNavMenu = () => {
      setAnchorElNav(null);
   };

   const handleCloseUserMenu = () => {
      setAnchorElUser(null);
   };

   return (
      <>
         <ThemeProvider theme={theme}>
            <AppBar sx={{ background: "black" }} position="static">
               <Container maxWidth="xl">
                  <Toolbar disableGutters>
                     <Box
                        sx={{
                           flexGrow: 1,
                           display: { xs: "flex", md: "none" },
                        }}
                     >
                        <IconButton
                           size="large"
                           aria-label="account of current user"
                           aria-controls="menu-appbar"
                           aria-haspopup="true"
                           onClick={handleOpenNavMenu}
                           color="inherit"
                        >
                           <MenuIcon />
                        </IconButton>
                     </Box>

                     <Box sx={{ flexGrow: 1, display: "flex" }}>
                        <Button
                           onClick={handleCloseNavMenu}
                           sx={{ my: 2, display: "block", color: "white", fontSize:20 }}
                        >
                           مدیریت
                        </Button>
                        <Button
                           onClick={handleCloseNavMenu}
                           sx={{ my: 2, display: "block", color: "white" }}
                        >
                           <ShoppingCartIcon />
                        </Button>
                     </Box>
                     <Typography
                        className="logo-shop"
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{marginTop:"auto", fontSize:24}}
                     >
                        Rare Shop
                     </Typography>
                  </Toolbar>
               <ul className="links-ul">
                  <li href="/clothes"><a>پوشاک</a></li>
                  <li href="/shoesbag"><a>کیف و کفش</a></li>
                  <li href="/accessory"><a>اکسسوری</a></li>
               </ul>
               </Container>
            </AppBar>
         </ThemeProvider>
         <Outlet/>
      </>
   );
};
export default Header;