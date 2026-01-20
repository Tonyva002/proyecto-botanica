import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import PlantasPage from "./presentation/pages/PlantasPage";
import PlantaDetailPage from "./presentation/pages/PlantaDetailPage";
import CuidadosPage from "./presentation/pages/CuidadosPage";

const App: React.FC = () => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          {/* Título */}
          <Typography variant="h6">🌱 Jardín App</Typography>

          {/* Menú */}
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button color="inherit" component={RouterLink} to="/plantas">
                Plantas
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Routes>
          {/* Lista de plantas */}
          <Route path="/plantas" element={<PlantasPage />} />

          {/* Detalle de planta */}
          <Route path="/plantas/:id" element={<PlantaDetailPage />} />

          {/* Cuidados de una planta */}
          <Route path="/plantas/:id/cuidados" element={<CuidadosPage />} />

          {/* Home */}
          <Route path="/" element={<PlantasPage />} />

          {/* 404 */}
          <Route
            path="*"
            element={<Typography>Página no encontrada</Typography>}
          />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
