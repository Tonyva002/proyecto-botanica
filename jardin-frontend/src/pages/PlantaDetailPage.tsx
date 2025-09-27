import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlantaById, Planta } from "../api/plantas";
import { Cuidado } from "../api/cuidados";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Box,
} from "@mui/material";

// Extender Planta para incluir cuidados opcionalmente
interface PlantaDetail extends Planta {
  cuidados?: Cuidado[];
}

function PlantaDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [planta, setPlanta] = useState<PlantaDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const cargarPlanta = async () => {
      try {
        const data = await getPlantaById(Number(id));
        setPlanta(data);
      } catch (error: any) {
        console.error("Error al cargar planta:", error.message || error);
      } finally {
        setLoading(false);
      }
    };

    cargarPlanta();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (!planta) return <Typography>No se encontró la planta</Typography>;

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {planta.nombre} ({planta.especie})
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
          Ubicación: {planta.ubicacion || "No especificada"}
        </Typography>

        <Typography variant="h6" gutterBottom>
          Cuidados
        </Typography>

        {planta.cuidados && planta.cuidados.length > 0 ? (
          <List>
                       {" "}
            {planta.cuidados.map((c) => (
              <ListItem key={c.id}>
                               {" "}
                <ListItemText
                  primary={`${c.tipo} - ${new Date(
                    c.fechaInicio
                  ).toLocaleDateString(undefined, { timeZone: "UTC" })}`}
                  secondary={c.notas || ""}
                />
                             {" "}
              </ListItem>
            ))}
                     {" "}
          </List>
        ) : (
          <Typography>No hay cuidados registrados</Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default PlantaDetailPage;
