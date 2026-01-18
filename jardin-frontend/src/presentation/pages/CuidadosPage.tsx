import { FormEvent, useState } from "react";
import useCuidadosViewModel from "../viewmodels/useCuidadosViewModel";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { getToday } from "../../utils/date";

const CuidadosPage = () => {
  const { cuidados, loading, crearCuidado } = useCuidadosViewModel();

  const [plantaId, setPlantaId] = useState("");
  const [tipo, setTipo] = useState("");
  const [fechaInicio, setFechaInicio] = useState(getToday());

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await crearCuidado({
      plantaId: Number(plantaId),
      tipo,
      fechaInicio,
    });
    setPlantaId("");
    setTipo("");
  };

  if (loading) return <CircularProgress />;

  return (
    <Box>
      <Typography variant="h4">🌿 Cuidados</Typography>

      <Card sx={{ my: 3 }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="ID Planta"
              type="number"
              value={plantaId}
              onChange={(e) => setPlantaId(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />

            <TextField
              label="Tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />

            <TextField
              label="Fecha"
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />

            <Button type="submit" variant="contained">
              Agregar
            </Button>
          </form>
        </CardContent>
      </Card>

      <List>
        {cuidados.map((c) => (
          <ListItem key={c.id}>
            <ListItemText
              primary={`${c.planta?.nombre ?? "Planta"} - ${c.tipo}`}
              secondary={new Date(c.fechaInicio).toLocaleDateString()}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CuidadosPage;
