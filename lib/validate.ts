/**
 * The result of a validation: whether the input is valid, and a human-readable reason.
 */
export interface ValidationResult {
    valid: boolean;
    reason: string;
}

// 09XXXXXXXXX  (11 digits)  OR  +639XXXXXXXXX
const PH_MOBILE = /^(09\d{9}|\+639\d{9})$/;

/**
 * Validate a Philippine mobile number.
 * Accepts 09XXXXXXXXX or +639XXXXXXXXX.
 */
export function validateMobile(input: string): ValidationResult {
    const value = input.trim();
    if (value === "") {
        return { valid: false, reason: "Mobile number is required." };
    }
    if (!PH_MOBILE.test(value)) {
        return {
            valid: false,
            reason: "Mobile number must be 09XXXXXXXXX or +639XXXXXXXXX.",
        };
    }
    return { valid: true, reason: "Valid mobile number." };
}

// XXX-XXX-XXX-XXX  (12 digits in four dash-separated groups of 3)
const PH_TIN = /^\d{3}-\d{3}-\d{3}-\d{3}$/;

/**
 * Validate a Philippine TIN in the format XXX-XXX-XXX-XXX.
 */
export function validateTIN(input: string): ValidationResult {
    const value = input.trim();
    if (value === "") {
        return { valid: false, reason: "TIN is required." };
    }
    if (!PH_TIN.test(value)) {
        return {
            valid: false,
            reason: "TIN must be in the format XXX-XXX-XXX-XXX.",
        };
    }
    return { valid: true, reason: "Valid TIN." };
}
