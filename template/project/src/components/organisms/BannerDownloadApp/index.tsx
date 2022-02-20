import { AppleIcon, Button, GooglePlayIcon, Title } from 'components/atoms'


type BannerDownloadAppProp = React.HTMLAttributes<HTMLDivElement> & {
    background: string
}

export const BannerDownloadApp: React.FC<BannerDownloadAppProp> = ({ background, className, ...ref }) => {
    return (
        <div
            {...ref}
            className={`BannerDownloadApp ${className ?? ''}`}
            style={{ background: `url(${background}) center center` }}
        >
            <div className="container">
                <div className="content">
                    <Title level={3} className="sub-title color-main-bold text-42 m-b-20 bold-500">Want to explore healthcare platform?</Title>
                    <Title level={2} className="main-title color-main-bold bold-800 m-b-60 text-50">DOWNLOAD NOW</Title>
                    <div className="flex gap-30">
                        <Button fontSize='20px' size={60} minWidth={293}> <AppleIcon /> Apple store</Button>
                        <Button fontSize='20px'  size={60} minWidth={293} white> <GooglePlayIcon /> Google play</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
