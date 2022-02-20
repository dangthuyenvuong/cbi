export const formatPhone = (phone: string | undefined) => {
    if (phone) {
        return phone.substring(0, phone.indexOf(')') + 1) + " " + phone.substring(phone.indexOf(')') + 1, phone.length);
    }
    return ''
}



export const phoneMask = (e: string) => {
    let x = e.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    return !x?.[2] ? x?.[1] : '(' + x?.[1] + ') ' + x?.[2] + (x?.[3] ? '-' + x?.[3] : '');
}