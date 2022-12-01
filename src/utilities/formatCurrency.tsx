const CURRENCY_FORMAT = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'EUR'});

export function formatCurrency(number: number) {
    return CURRENCY_FORMAT.format(number);
}