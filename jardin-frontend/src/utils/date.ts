export const formatDate = (dateStr: string) => {
  if (!dateStr) return "";

  const [datePart] = dateStr.split("T");

  const [year, month, day] = datePart.split("-");

  return `${day}/${month}/${year}`;
};

export const getToday = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
