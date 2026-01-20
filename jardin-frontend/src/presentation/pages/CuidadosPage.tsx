import { FormEvent, useState } from "react";
import useCuidadosViewModel from "../viewmodels/useCuidadosViewModel";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { getToday, formatDate } from "../../utils/date";

const CuidadosPage = () => {
  const { id } = useParams<{ id: string }>();

  const { cuidados, loading, crearCuidado } = useCuidadosViewModel(id);

  const [tipo, setTipo] = useState("");
  const [fechaInicio, setFechaInicio] = useState(getToday());
  const [error, setError] = useState("");
  const [openErrorDialog, setOpenErrorDialog] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!id) {
      setError("Planta ID no existe");
      setOpenErrorDialog(true);
      return;
    }
    try {
      await crearCuidado({
        plantaId: Number(id),
        tipo,
        fechaInicio,
      });
      setTipo("");
    } catch (e: any) {
      setError(e.message || "Error inesperado al crear el cuidado");
      setOpenErrorDialog(true);
    }
  };

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box>
      <Typography variant="h4">🌿 Cuidados</Typography>

      <Card sx={{ my: 3 }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              fullWidth
              required
              sx={{ mb: 2 }}
            />

            <TextField
              label="Fecha"
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              fullWidth
              required
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
              secondary={formatDate(c.fechaInicio)}
            />
          </ListItem>
        ))}
      </List>

      <Dialog open={openErrorDialog} onClose={() => setOpenErrorDialog(false)}>
        <DialogTitle>⚠️ No se pudo crear el cuidado</DialogTitle>
        <DialogContent>
          <Typography>{error}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenErrorDialog(false)} variant="contained">
            Entendido
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CuidadosPage;
