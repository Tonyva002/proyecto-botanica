import { useEffect, useState, FormEvent } from "react";
import { getCuidados, createCuidado, Cuidado } from "../api/cuidados";
import {
  Box,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  TextField,
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material";

interface CuidadoForm {
  plantaId: string;
  tipo: string;
  fechaInicio: string;
}

const getTodayDate = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const CuidadosPage: React.FC = () => {
  const [cuidados, setCuidados] = useState<Cuidado[]>([]);
  const [form, setForm] = useState<CuidadoForm>({
    plantaId: "",
    tipo: "",
    fechaInicio: getTodayDate(),
  });
  const [loading, setLoading] = useState<boolean>(true);

  const cargar = async () => {
    setLoading(true);
    try {
      const data = await getCuidados();
      setCuidados(data);
    } catch (err: any) {
      console.error("Error al cargar cuidados:", err.message || err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!form.plantaId || Number(form.plantaId) <= 0) {
      alert("Error: Debe ingresar un ID de Planta válido.");
      return;
    }
    if (!form.tipo || !form.fechaInicio) {
      alert("Error: Debe seleccionar un Tipo y una Fecha.");
      return;
    }

    try {
      await createCuidado({
        plantaId: Number(form.plantaId),
        tipo: form.tipo,
        fechaInicio: form.fechaInicio,
      });
      await cargar();
      setForm({ plantaId: "", tipo: "", fechaInicio: getTodayDate() });
    } catch (error: any) {
      let errorMessage =
        "Ocurrió un error desconocido al registrar el cuidado.";
      const serverData = error.response?.data;

      if (serverData && serverData.errores && serverData.errores.length > 0) {
        errorMessage = serverData.errores[0];
      } else if (error.message) {
        errorMessage = error.message;
      }

      alert("Error: " + errorMessage);
    }
  };

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
        🌿 Cuidados
      </Typography>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="ID Planta"
                type="number"
                value={form.plantaId}
                onChange={(e) => setForm({ ...form, plantaId: e.target.value })}
                slotProps={{
                  input: {
                    inputProps: {
                      min: 1, 
                    },
                  },
                }}
                sx={{ flex: 1, minWidth: 120 }}
              />

              <TextField
                select
                label="Tipo de Cuidado"
                value={form.tipo}
                onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                sx={{ flex: 1, minWidth: 160 }}
              >
                <MenuItem value="">Selecciona un tipo</MenuItem>
                <MenuItem value="Riego">Riego</MenuItem>
                <MenuItem value="Poda">Poda</MenuItem>
                <MenuItem value="Fertilización">Fertilización</MenuItem>
                <MenuItem value="Luz">Luz</MenuItem>
              </TextField>

              <TextField
                label="Fecha de Inicio"
                type="date"
                value={form.fechaInicio}
                onChange={(e) =>
                  setForm({ ...form, fechaInicio: e.target.value })
                }
                // InputLabelProps={{ shrink: true }}
                slotProps={{ inputLabel: { shrink: true } }}
                sx={{ width: { xs: "100%", sm: 200 } }}
              />

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Button type="submit" variant="contained">
                  Agregar
                </Button>
              </Box>
            </Stack>
          </form>
        </CardContent>
      </Card>

      <Typography variant="h5" gutterBottom>
        Historial de Cuidados
      </Typography>

      {cuidados.length > 0 ? (
        <List>
          {cuidados.map((c) => (
            <ListItem key={c.id}>
              <ListItemText
                primary={`Planta ${c.planta?.nombre || "Desconocida"}: ${
                  c.tipo
                }`}
                secondary={new Date(c.fechaInicio).toLocaleDateString(
                  undefined,
                  {
                    timeZone: "UTC",
                  }
                )}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No hay cuidados registrados.</Typography>
      )}
    </Box>
  );
};

export default CuidadosPage;
