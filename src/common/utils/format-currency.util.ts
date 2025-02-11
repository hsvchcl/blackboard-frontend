export const formatCurrency = (
  amount: number,
  locale: string = "es-CL",
  currency: string = "CLP"
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0, // Puedes cambiarlo a 2 si deseas decimales
  }).format(amount);
};
