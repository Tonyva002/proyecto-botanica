import { useCallback, useEffect, useState } from "react";
import { Cuidado } from "../../domain/entities/Cuidado";
import {
  createCuidadoUseCase,
  getCuidadosUseCase,
} from "../../core/composition/cuidadoCompositionRoot";

export default function useCuidadosViewModel(id?: string) {
  const [cuidados, setCuidados] = useState<Cuidado[]>([]);
  const [loading, setLoading] = useState(true);

  const cargar = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const data = await getCuidadosUseCase.execute(Number(id));
      setCuidados(data);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const crearCuidado = async (payload: {
    plantaId: number;
    tipo: string;
    fechaInicio: string;
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
    loading,
    crearCuidado,
  };
}
