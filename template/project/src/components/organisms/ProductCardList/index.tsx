import { Product } from "@types"
import { Link, ListView, Title } from "components/atoms"
import { IconForward } from "components/atoms/Icon"
import ProductCard from "components/molecules/ProductCard"

type ProductCardListProp = React.HTMLAttributes<HTMLDivElement> & {
    products?: Product[]
}

export const ProductCardList: React.FC<ProductCardListProp> = ({ products, className, ...ref }) => {

    return (
        <div
            {...ref}
            className={`ProductCardList ${className ?? ''}`}
        >
            <div className=" flex justify-space-between">
                <Title className="main-title ">New Product</Title>
                <Link className="view-all " to={'#'}>
                    View all
                    <IconForward className="forward-icon" />
                </Link>
            </div>

            <ListView
                scrollAble={true}
                isLoading={!products}
                loadingCount={5}
                items={products}
                render={(e, i) => (
                    <div className="ProductCardList-item" key={i}>
                        <ProductCard product={e} />
                    </div>
                )}
            />
        </div>
    )
}
