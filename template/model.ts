import { Model } from "cbi-react-core"

type <%= name =%>Entity = {}

class <%= name =%> extends Model<<%= name =%>Entity> {
    _url = '<%= url =%>'
}

const <%= url =%> = new <%= name =%>
export default <%= url =%>