import { Validate } from "lib/cbi-react-core";
export const fullName: Validate = [
    { required: true, message: "Field is require." },
];
export const firstName: Validate = [
    { required: true, message: "Please enter your first name." },
];
export const lastName: Validate = [
    { required: true, message: "Please enter your last name." },
];
export const gender: Validate = [
    { required: true, message: "Please enter your gender." },
];
export const dob: Validate = [
    { required: true, message: "Please enter your date of birth." },
    { invalidDate: true, message: "Please enter a valid date of birth." },
];
export const email: Validate = [
    { required: true, message: "Please enter your email address." },
    { pattern: "email", message: "Please enter a valid email address." },
];
export const phone: Validate = [
    { required: true, message: "Please enter your phone number." },
    { max: 20, message: "Please enter a valid phone number." },
    { min: 13, message: "Please enter a valid phone number." },
    { pattern: "phone", message: "Please enter a valid phone number." },
];
export const password: Validate = [
    { pattern: "password", message: "A password must contain at least 3 of the following: lowercase, uppercase, digits." },
    { min: 6, message: "Password must be longer than or equal to 6 characters." },
    { required: true, message: "Please enter your password." },
];
export const confirmPassword: Validate = [
    { confirm: "password", message: "Confirm password not like password" },
    { required: true, message: "Please enter your password." },
];
export const relationship: Validate = [
    { required: true, message: "Please select your relationship." },
];
//Login Page
export const emailLogin: Validate = [
    { required: true, message: "Please enter your email address." },
    { pattern: "email", message: "Please enter a valid email address." },
];
export const passwordLogin: Validate = [
    { required: true, message: "Please enter your password." },
    { min: 6, max: 32, message: "Your password must contain at least 6-32 characters." },
];
export const checkbox: Validate = [
    { required: true, message: "Please enter your email." },
];
