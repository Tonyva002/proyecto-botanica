import { useParams, Link as RouterLink } from "react-router-dom";
import usePlantaDetailViewModel from "../viewmodels/usePlantaDetailViewModel";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { formatDate } from "../../utils/date";

const PlantaDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { planta, loading } = usePlantaDetailViewModel(id);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (!planta) {
    return (
      <Typography variant="h6" color="error">
        No se encontró la planta
      </Typography>
    );
  }

  return (
    <Card>
      <CardContent>
        {/* 🌱 Datos principales */}
        <Typography variant="h4" gutterBottom>
          {planta.nombre} ({planta.especie})
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
          Ubicación: {planta.ubicacion || "No especificada"}
        </Typography>

        {/* 👉 BOTÓN A CUIDADOS */}
        <Button
          variant="contained"
          sx={{ my: 2 }}
          component={RouterLink}
          to={`/plantas/${id}/cuidados`}
        >
          Gestionar cuidados
        </Button>

        {/* 🌿 Cuidados */}
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Cuidados
        </Typography>

        {planta.cuidados && planta.cuidados.length > 0 ? (
          <List>
            {planta.cuidados.map((c) => (
              <ListItem key={c.id} divider>
                <ListItemText
                  primary={`${c.tipo} - ${formatDate(c.fechaInicio)}`}
                  secondary={c.notas || ""}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No hay cuidados registrados
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default PlantaDetailPage;
