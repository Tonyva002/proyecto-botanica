import { useEffect, useState } from "react";
import { Planta } from "../../domain/entities/Planta";
import { getPlantasUseCase } from "../../core/composition/plantaCompositionRoot";

export function usePlantasViewModel() {
  const [plantas, setPlantas] = useState<Planta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const useCase = getPlantasUseCase;
    useCase
      .execute()
      .then(setPlantas)
      .finally(() => setLoading(false));
  }, []);

  return {
    plantas,
    loading,
  };
}
