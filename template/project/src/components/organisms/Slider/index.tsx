import { Slider as ISlider } from "@types"
import { Button, Link, Title, Typography } from "components/atoms"
import Flickity from "react-flickity-component"
import usePageContext from 'hooks/usePage'

type SliderProp = React.HTMLAttributes<HTMLDivElement> & {
    sliders?: ISlider[]
}

export const Slider: React.FC<SliderProp> = ({ sliders, className, ...ref }) => {

    const { onRequiredLogin } = usePageContext()

    return (
        <Flickity
            {...ref}
            className={`Slider ${className ?? ''}`}
            options={{
                pageDots: true
            }}
        >
            {
                sliders?.map((e, i) => (
                    <div key={i} className="slider-item">
                        <img src={e.image} alt={e.title} />
                        <div className="content">
                            <Title level={2} className="text-70 color-main-bold m-b-25" dangerouslySetInnerHTML={{ __html: e.title }} />
                            <Typography className="description text-22 m-t-25">{e.description}</Typography>
                            <Link to={e.buttonLink} onClick={onRequiredLogin()} >
                                <Button size={60}>
                                    {e.buttonText}
                                </Button>
                            </Link>
                        </div>
                    </div>
                ))
            }

        </Flickity>
    )
}
