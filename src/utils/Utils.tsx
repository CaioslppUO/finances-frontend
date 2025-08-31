/**
 * Formata um valor numérico para moeda.
 * @param value Valor a ser formatado.
 * @returns Valor numérico formatado como moeda.
 */
export const formatCurrency = (value: number | null) =>
    value !== null
        ? new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
          }).format(value)
        : "";
