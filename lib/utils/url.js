import path from 'path'

export const url = {
    getTemplate(name) {
        const currentFileUrl = import.meta.url
        return path.join(
            new URL(currentFileUrl).pathname,
            '../../../template',
            name
        ).replace(/^\\/,'')
    },
   
}
