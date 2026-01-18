import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import { usePlantasViewModel } from "../viewmodels/usePlantasViewModel";
import { Link as RouterLink } from "react-router-dom";

const PlantasPage = () => {
  const { plantas, loading } = usePlantasViewModel();

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <Typography variant="h4">🌱 Plantas</Typography>
      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: {
            xs: "1fr", // moviles
            sm: "1fr 1fr", // tablets
            md: "repeat(3, 1fr)", // desktop
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
              <Typography variant="body2" color="text.secondary">
                {p.ubicacion}
              </Typography>

              <Button
                variant="contained"
                size="small"
                component={RouterLink}
                to={`/plantas/${p.id}`}
                sx={{ mt: 2 }}
              >
                {" "}
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
