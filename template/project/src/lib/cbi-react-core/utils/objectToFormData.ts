export const objectToFormData = (obj: any, form?: FormData, namespace?: string) => {
    let fd = form || new FormData();
    let formKey;

    for (let property in obj) {
        if (namespace) {
            formKey = namespace + '[' + property + ']';
        } else {
            formKey = property;
        }

        // if the property is an object, but not a File,
        // use recursivity.
        if (typeof obj[property] === 'object' && !(obj[property] instanceof File || obj[property] instanceof Blob)) {

            objectToFormData(obj[property], fd, property);

        } else {

            fd.append(formKey, obj[property]);
        }

    }

    return fd;
}

export default objectToFormData