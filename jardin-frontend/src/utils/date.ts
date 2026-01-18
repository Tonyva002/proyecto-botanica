export const formatDate = (dateStr: string) => {
  // Añadimos "T00:00:00" para evitar que el navegador lo interprete como UTC
  // si el string solo trae la fecha (YYYY-MM-DD)
  const date = new Date(
    dateStr.includes("T") ? dateStr : `${dateStr}T00:00:00`,
  );

  if (isNaN(date.getTime())) return dateStr;

  // Usar métodos locales (quitar el "UTC")
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const getToday = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
