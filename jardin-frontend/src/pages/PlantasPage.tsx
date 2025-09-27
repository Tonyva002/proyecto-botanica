// src/pages/PlantasPage.tsx
import { useEffect, useState } from "react";
import { getPlantas, Planta } from "../api/plantas";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";

const PlantasPage: React.FC = () => {
  const [plantas, setPlantas] = useState<Planta[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await getPlantas();
        setPlantas(data);
      } catch (err: any) {
        console.error("Error al cargar plantas:", err.message || err);
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        🌱 Plantas
      </Typography>

      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: {
            xs: "1fr", // 1 columna en pantallas pequeñas
            sm: "1fr 1fr", // 2 columnas en >= sm
            md: "repeat(3, 1fr)", // 3 columnas en >= md
          },
        }}
      >
        {plantas.map((p) => (
          <Card key={p.id}>
            <CardContent>
              <Typography variant="h6">{p.nombre}</Typography>
              <Typography variant="body2" color="text.secondary">
                {p.especie}
              </Typography>
              <Button
                variant="contained"
                size="small"
                component={RouterLink}
                to={`/plantas/${p.id}`}
                sx={{ mt: 2 }}
              >
                Ver detalles
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default PlantasPage;
