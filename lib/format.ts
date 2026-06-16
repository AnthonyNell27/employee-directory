/**
 * Format a number with comma thousands separators and exactly 2 decimals.
 * Example: fmtNumber(1234567.5) -> "1,234,567.50"
 */
export function fmtNumber(value: number): string {
    if (!Number.isFinite(value)) {
        throw new Error("fmtNumber expects a finite number");
    }
    return value.toLocaleString("en-PH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

/**
 * Format a peso amount with the ₱ symbol.
 * Example: fmtMoney(1234.5) -> "₱1,234.50"
 */
export function fmtMoney(value: number): string {
    const sign = value < 0 ? "-" : "";
    return sign + "₱" + fmtNumber(Math.abs(value));
}

/**
 * Format an amount with a currency code (defaults to PHP).
 * Example: fmtCurrency(1234.5) -> "PHP 1,234.50"
 */
export function fmtCurrency(value: number, currency: string = "PHP"): string {
    const sign = value < 0 ? "-" : "";
    return sign + currency + " " + fmtNumber(Math.abs(value));
}
