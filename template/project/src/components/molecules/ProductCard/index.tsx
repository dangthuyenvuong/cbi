import { Product } from "@types"
import { Button, IconHeart, Link, Rating, Title } from "components/atoms"
import Skeleton from "components/atoms/Skeleton"
import usePage from "hooks/usePage"
import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { cartActions } from "store/cart"
import { classNames, currency } from "utils"
import { generatePath } from 'lib/cbi-react-core'
import _ from "lodash"

export const ProductCardLoading = () => (
    <div
        className={classNames(`ProductCard`)}
    >
        <Link to="#" className="cover border">
            <Skeleton />
        </Link>
        <div className="content">
            <div className="title m-t-25">
                <Skeleton height={40} />
            </div>
            <div className="rate" style={{ display: 'block' }}>
                <Skeleton height={24} width={200} />
            </div>
            <div className="flex justify-space-between items-center">
                <Skeleton height={46} width={150} />
                <Skeleton height={46} width={150} />
            </div>
        </div>
    </div>
)

type ProductCardProp = Pick<React.HTMLAttributes<HTMLDivElement>, 'className'> & {
    horizontal?: boolean
    product: Product,
    nameButtonCard?: string,
    favorite?: boolean
}

export const ProductCard: React.FC<ProductCardProp> = ({ horizontal, product, className, favorite = false, nameButtonCard, ...ref }) => {
    const dispatch = useDispatch()
    const { onRequiredLogin } = usePage()

    const _onAddCart = useCallback((id: string) => () => {
        dispatch(cartActions.addCart({ productId: id, quantity: 1 }))
    }, [])

    const pathDetail = generatePath('#', { slug: product.slug })

    return (
        <div className={classNames(`ProductCard`, className, { horizontal })}>
            <Link to={pathDetail} className="cover border">
                <img alt={product.name} src={product.thumbnailUrl} />
            </Link>
            {favorite && <IconHeart className="icon-favorite" />}
            <div className="content">
                <Title level={4} className="m-t-25">
                    <Link className="bold text-18" to={pathDetail}>{product.name}</Link>
                </Title>
                <div className="rate">
                    <Rating value={product.rate} size='medium' readOnly />
                    {
                        product?.rateCount && <div className="rate-count">({product?.rateCount})</div>
                    }

                </div>
                <div className="flex justify-space-between items-center" style={{ minHeight: "70px" }}>
                    <div className="price">
                        {
                            product?.regularPrice > product?.finalPrice ? (
                                <div className="discount">
                                    <div className="percent">-{_.round(((product.regularPrice - product.finalPrice) / product.regularPrice * 100))}%</div>
                                    <div className="price-discount">{currency(product.regularPrice)}</div>
                                </div>
                            ) : null
                        }
                        <div className="real-price">{currency(product.finalPrice)}</div>
                    </div>
                    {
                        nameButtonCard === "View more" ?

                            <Link className="color-main" to={pathDetail}>
                                <Button
                                    size="middle"
                                    type="lightly"
                                    className="customButton"
                                >
                                    View more
                                </Button>
                            </Link>
                            :
                            <Button
                                size="middle"
                                type="lightly"
                                onClick={onRequiredLogin(_onAddCart(product.id))}
                            >
                                Add to cart
                            </Button>
                    }
                </div>
            </div>
        </div>
    )
}


export default ProductCard