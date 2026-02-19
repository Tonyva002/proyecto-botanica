import { useCallback, useEffect, useState } from "react";
import { Cuidado } from "../../../domain/entities/Cuidado";
import {
  createCuidadoUseCase,
  getCuidadosUseCase,
} from "../../../core/composition/cuidadoCompositionRoot";
import { getPlantaByIdUseCase } from "../../../core/composition/plantaCompositionRoot";

export default function useCuidadosViewModel(id?: string) {
  const [cuidados, setCuidados] = useState<Cuidado[]>([]);
  const [plantaNombre, setPlantaNombre] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const cargar = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const [cuidadosData, plantaData] = await Promise.all([
        getCuidadosUseCase.execute(Number(id)),
        getPlantaByIdUseCase.execute(Number(id)),
      ]);
      setCuidados(cuidadosData);
      setPlantaNombre(plantaData.nombre);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const crearCuidado = async (payload: {
    plantaId: number;
    tipo: string;
    fechaInicio: string;
    fechaFin?: string | null;
    notas?: string | null;
  }) => {
    try {
      await createCuidadoUseCase.execute(payload);
      await cargar();
    } catch (error: any) {
      throw new Error(error?.message || "Error inesperado al crear el cuidado");
    }
  };

  useEffect(() => {
    cargar();
  }, [cargar]);

  return {
    cuidados,
    plantaNombre,
    loading,
    crearCuidado,
  };
}
