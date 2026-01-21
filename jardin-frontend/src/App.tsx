import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  useMediaQuery,
  IconButton,
  MenuItem,
  Menu,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";

import PlantasPage from "./presentation/pages/PlantasPage";
import PlantaDetailPage from "./presentation/pages/PlantaDetailPage";
import CuidadosPage from "./presentation/pages/CuidadosPage";

import { usePageTitle } from "./utils/usePageTitle";

const AppLayout: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const title = usePageTitle();

  //No mostrar "Plantas" cuando ya estás en plantas
  const isPlantasPage =
    location.pathname === "/" || location.pathname === "/plantas";

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {/* 🔹 Título dinámico */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>

          {/* 🖥️ Desktop menu */}
          {!isMobile && !isPlantasPage && (
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button color="inherit" component={RouterLink} to="/plantas">
                Ir a plantas
              </Button>
            </Box>
          )}

          {/* 📱 Mobile menu */}
          {isMobile && !isPlantasPage && (
            <>
              <IconButton color="inherit" onClick={openMenu}>
                <MenuIcon />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={closeMenu}
              >
                <MenuItem
                  component={RouterLink}
                  to="/plantas"
                  onClick={closeMenu}
                >
                  Ir a plantas
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<PlantasPage />} />
          <Route path="/plantas" element={<PlantasPage />} />
          <Route path="/plantas/:id" element={<PlantaDetailPage />} />
          <Route path="/plantas/:id/cuidados" element={<CuidadosPage />} />

          <Route
            path="*"
            element={<Typography>Página no encontrada</Typography>}
          />
        </Routes>
      </Container>
    </>
  );
};

const App: React.FC = () => (
  <Router>
    <AppLayout />
  </Router>
);

export default App;
