import classNames from 'classnames'
import { Button, Link, ListView, Title, Typography } from 'components/atoms'
import usePageContext from 'hooks/usePage'

export type PostItemProp = {
    image: string,
    title: string,
    description: string,
    buttonText: string,
    buttonLink: string
}
export type HomePostProp = {
    posts?: PostItemProp[]
}


export const HomePost: Atom<HomePostProp> = ({ posts, className }) => {

    const { onRequiredLogin } = usePageContext()

    return (
        <div className={classNames(`HomePost`, className)}>
            <div className="container-full">
                <ListView
                    items={posts}
                    render={(e, i) => (
                        <div className="item" key={i}>
                            <div className="col col1">
                                <img src={e.image} alt={e.title} />
                            </div>
                            <div className="col col2">
                                <Title level={3} className='text-32 m-b-20'>{e.title}</Title>
                                <Typography className="description">{e.description}</Typography>
                                <Link to={e.buttonLink} onClick={onRequiredLogin()} >
                                    <Button size={60}>
                                        {e.buttonText}
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    )}
                />
            </div>
        </div>
    )
}