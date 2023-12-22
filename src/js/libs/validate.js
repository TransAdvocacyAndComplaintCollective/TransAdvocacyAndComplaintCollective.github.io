export const validateAddress1 = (address1, setState) => {
    console.log("address1:",address1);
    
    const validationResult = {
        isValid: true,
        messages: ''
    };
    console.log("address1:",address1);

    if (address1.trim() === '') {
        validationResult.isValid = false;
        validationResult.messages = 'Address line 1 is required.';
    }
    if (setState) {
        setState((e) => ({ ...e, address1: validationResult }))

    }

    return validationResult;
};


export const validateAddress2 = (address2, setState) => {
    console.log("address2:",address2);
    const validationResult = {
        isValid: true,
        messages: ''
    };

    if (address2.trim() === '') {
        validationResult.isValid = false;
        validationResult.messages = 'Address line 1 is required.';
    }
    if (setState) {
        setState((e) => ({ ...e, address2: validationResult }))

    }

    return validationResult;
};


export const validatePostcode = (postcode, setState) => {
    console.log("postcode:",postcode);
    const validationResult = {
        isValid: true,
        messages: ''
    };

    if (postcode.trim() === '') {
        validationResult.isValid = false;
        validationResult.messages = 'Postcode is required.';
    }
    if (setState) {
        setState((e) => ({ ...e, postcode: validationResult }))

    }

    return validationResult;
};

export const validateCity = (city, setState) => {
    console.log("city:",city);
    
    const validationResult = {
        isValid: true,
        messages: ''
    };

    if (city.trim() === '') {
        validationResult.isValid = false;
        validationResult.messages = 'City is required.';
    }
    if (setState) {

        setState((e) => ({ ...e, city: validationResult }))
    }
    return validationResult;
};
export const validateEmail = (email, setState) => {
    console.log("email:",email);
    
    const validationResult = {
        isValid: true,
        messages: ''
    };

    // Check if the email is empty
    if (email.trim() === '') {
        validationResult.isValid = false;
        validationResult.messages = 'Email is required.';
        return validationResult;
    }

    // Check if the email matches the pattern
    if (!/\S+@\S+\.\S+/.test(email)) {
        validationResult.isValid = false;
        validationResult.messages = 'Please enter a valid email.';
        return validationResult;
    }
    if (setState) {
        setState((e) => ({ ...e, email: validationResult }))

    }

    return validationResult;
}

export const validatePhone = (phone, setState) => {
    console.log("phone:",phone);
    
    const validationResult = {
        isValid: true,
        messages: ''
    };

    // Remove non-digit characters from the phone number
    const cleanedPhone = phone.replace(/\D/g, '');

    // Check if the cleaned phone number is empty
    if (cleanedPhone === '') {
        validationResult.isValid = false;
        validationResult.messages = 'Phone number is required.';
        return validationResult;
    }

    // Check if the cleaned phone number contains only digits
    if (!/^\d+$/.test(cleanedPhone)) {
        validationResult.isValid = false;
        validationResult.messages = 'Please enter a valid phone number.';
        return validationResult;
    }
    if (setState) {
        setState((e) => ({ ...e, phone: validationResult }))

    }

    return validationResult;
};

