import Cookie from "../Cookie"
import { ISSERVER } from "./nextjs"


export const cache = {
    setItem(name: string, obj: string){ // eslint-disable-line
        if(!ISSERVER){
            // localStorage.setItem(name, JSON.stringify(obj))
            Cookie.set(name, obj)
        }
    },
    removeItem(name: string){
        if(!ISSERVER){
            // localStorage.removeItem(name)
            Cookie.delete(name)
        }
    },
    getItem(name: string){
        if(!ISSERVER){
            return Cookie.get(name)
            try{
                // return JSON.parse(localStorage.getItem(name) || 'null') || localStorage.getItem(name)
            }catch(err){
                return Cookie.get(name)
                // return localStorage.getItem(name)
            }
        }

        
    }
}
