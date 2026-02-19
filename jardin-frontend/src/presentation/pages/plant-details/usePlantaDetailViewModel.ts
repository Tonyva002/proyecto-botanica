import { useEffect, useState } from "react";
import { Planta } from "../../../domain/entities/Planta";
import { getPlantaByIdUseCase } from "../../../core/composition/plantaCompositionRoot";

export default function usePlantaDetailViewModel(id?: string) {
  const [planta, setPlanta] = useState<Planta | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    getPlantaByIdUseCase
      .execute(Number(id))
      .then(setPlanta)
      .finally(() => setLoading(false));
  }, [id]);

  return {
    planta,
    loading,
  };
}
