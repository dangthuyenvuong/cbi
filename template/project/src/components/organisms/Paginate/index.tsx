import { classNames } from "utils"

import { ArrowBack, ArrowForward } from "@mui/icons-material"
import { Paginate as IPaginate } from "@types"
import { URLHelper, useURL } from "lib/cbi-react-core"
import { Link } from "components/atoms"

export type PaginateProps = React.HTMLAttributes<HTMLDivElement> & IPaginate & {
    pageName?: string
}

export const Paginate: React.FC<PaginateProps> = ({ pageName = 'page', totalPage, className, ...ref }) => {
    let objectURL = URLHelper.searchObject()
    let currentPage = parseInt(objectURL?.[pageName] || '1')

    const { path } = useURL()
    const renderPage = () => {

        if (totalPage <= 1) return

        let start = currentPage - 2,
            end = currentPage + 2

        if (start < 1) {
            start = 1
            end = start + 4
        }
        if (end > totalPage) {
            end = totalPage
            start = end - 4
            if (start < 1) start = 1
        }

        let list = []
        for (let i = start; i <= end; i++) {
            list.push(<Link key={i} className={`page-item ${currentPage === i ? 'active' : ''}`} to={URLHelper.changeQueryURL({ ...objectURL, page: i }, path)}>{i}</Link>)
        }
        return list
    }


    return (
        <div
            {...ref}
            className={classNames('Paginate', className)}
        >

            {
                currentPage > 1 && <Link to={URLHelper.changeQueryURL({ ...objectURL, page: currentPage - 1 }, path)} className="icon-arrow"><ArrowBack /></Link>
            }
            {
                renderPage()
            }
            {
                currentPage < totalPage && <Link to={URLHelper.changeQueryURL({ ...objectURL, page: currentPage + 1 }, path)} className="icon-arrow"><ArrowForward /></Link>
            }

        </div>
    )
}
