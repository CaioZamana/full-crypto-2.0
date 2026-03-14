export const formatCurrency = (value, locale = 'pt-BR') =>
  new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD' }).format(value ?? 0);

export const formatNumber = (value, locale = 'pt-BR') =>
  new Intl.NumberFormat(locale).format(value ?? 0);

export const formatPercentage = (value) =>
  value != null ? `${Number(value).toFixed(2)}%` : 'N/A';

export const formatMarketCap = (value) =>
  formatCurrency(value);

export const formatCryptoAmount = (value) =>
  value != null
    ? value.toLocaleString('en-US', {
        minimumFractionDigits: value < 1 ? 8 : 2,
        maximumFractionDigits: 8,
      })
    : 'N/A';

export const calculatePercentageChange = (current, reference) =>
  reference ? ((current / reference - 1) * 100).toFixed(2) : 'N/A';
