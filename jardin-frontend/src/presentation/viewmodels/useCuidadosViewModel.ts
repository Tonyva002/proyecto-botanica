import { useEffect, useState } from "react";
import { Cuidado } from "../../domain/entities/Cuidado";
import {
  createCuidadoUseCase,
  getCuidadosUseCase,
} from "../../core/composition/cuidadoCompositionRoot";

export default function useCuidadosViewModel() {
  const [cuidados, setCuidados] = useState<Cuidado[]>([]);
  const [loading, setLoading] = useState(true);

  const cargar = async () => {
    setLoading(true);
    const data = await getCuidadosUseCase.execute();
    setCuidados(data);
    setLoading(false);
  };

  const crearCuidado = async (payload: {
    plantaId: number;
    tipo: string;
    fechaInicio: string;
  }) => {
    await createCuidadoUseCase.execute(payload);
    await cargar();
  };

  useEffect(() => {
    cargar();
  }, []);

  return {
    cuidados,
    loading,
    crearCuidado,
  };
}
