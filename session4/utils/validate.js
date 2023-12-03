const validateInput = (input = "") => {
    return input !== null && input !== "";
}

export const validateUserName = validateInput;
export const validatePassword = validateInput;

export const validateObj = (obj =  {}) => {
    return Object.keys(obj).length > 0;
}