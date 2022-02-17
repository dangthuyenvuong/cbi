export const str = {
    upperCaseFirstLetter(name) {
        return name.charAt(0).toUpperCase() + name.slice(1)
    },
    replace(str, obj){
        for(let i in obj){
            str = str.replace(new RegExp(`<%=[ *]${i}[ *]=%>`,'g'),obj[i])
        }
        return str
    }
}