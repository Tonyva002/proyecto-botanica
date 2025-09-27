import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PlantasPage from "./pages/PlantasPage";
import PlantaDetailPage from "./pages/PlantaDetailPage";
import CuidadosPage from "./pages/CuidadosPage";

import { AppBar, Toolbar, Typography, Button, Container, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          {/* Título a la izquierda */}
          <Typography variant="h6">🌱 Jardín App</Typography>

          {/* Contenedor flexible que empuja al centro */}
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button color="inherit" component={RouterLink} to="/plantas">
                Plantas
              </Button>
              <Button color="inherit" component={RouterLink} to="/cuidados">
                Cuidados
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/plantas" element={<PlantasPage />} />
          <Route path="/plantas/:id" element={<PlantaDetailPage />} />
          <Route path="/cuidados" element={<CuidadosPage />} />
          <Route path="/" element={<PlantasPage />} />
          <Route path="*" element={<Typography>Página no encontrada</Typography>} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
