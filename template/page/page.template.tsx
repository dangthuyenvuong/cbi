import { Helmet } from "react-helmet"
import { <%= prop =%> } from "."


export const <%= component =%>: React.FC<<%= prop =%>> = ({ meta }) => {
    return <div>
        <Helmet>
            <title>{meta.title}</title>
            <meta name="description" content={meta.description} />
        </Helmet>
        <div><%= component =%></div>
    </div>

}