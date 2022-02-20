import { BannerDownloadApp, HomePost, PostItemProp, Slider } from 'components/organisms'
import { ProductCardList } from 'components/organisms'


import { Product, Slider as SliderM } from '@types'

export type HomeTemplateProps = React.HTMLAttributes<HTMLDivElement> & {
    products?: Product[]
    isFetching: boolean,
    posts: PostItemProp[],
    sliders: SliderM[]
}

export const HomeTemplate: React.FC<HomeTemplateProps> = ({ posts, products, isFetching, sliders, className, ...ref }) => {


    return (
        <div
            {...ref}
            className={`HomeTemplate ${className ?? ''}`}
        >
            <Slider sliders={sliders} />
            <HomePost posts={posts} />
            <div className="container">
                <ProductCardList products={products} />
            </div>
            <BannerDownloadApp background="/img/banner-downloadapp.webp" />
        </div>
    )
}

export default HomeTemplate