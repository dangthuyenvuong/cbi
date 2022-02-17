import { createBrowserHistory } from 'history'
import { ISSERVER } from './nextjs'

export let history : ReturnType<typeof createBrowserHistory>
try{
    if(!ISSERVER){
        history = createBrowserHistory()
    }
}catch(err){ console.error(err) }
