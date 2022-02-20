import {
    IconFacebookOutline,
    IconMailFooter,
    IconTwitterOutline,
    IconYoutubeOutline,
    Link,
    LogoLight,
} from "components/atoms";
import { classNames } from "utils";

import usePageContext from 'hooks/usePage'

type FooterProp = React.HTMLAttributes<HTMLDivElement>

export const Footer: React.FC<FooterProp> = ({ className, ...ref }) => {
    const { onRequiredLogin } = usePageContext()

    return (
        <div {...ref} className={classNames(`Footer`, className)}>
            <div className="info">
                <div className="row justify-center container">
                    <LogoLight />
                    <div className="divider-vertical" />
                    <div className="m-l-12 row gap-12">
                        <IconFacebookOutline />
                        <IconTwitterOutline />
                        <IconYoutubeOutline />
                        <IconMailFooter className="icon" width={42} height={42} />
                    </div>
                </div>
                <div className="row justify-space-around container-text">
                    <div className="col-md-3">
                        <Link to={'#'} className="text">ABOUT US</Link>
                        <Link to={"#"} className="text">BLOG & NEWS</Link>
                        <Link to={'#'} className="text">CONTACT US</Link>
                    </div>
                    <div className="col-md-4">
                        <Link to={'#'} onClick={onRequiredLogin()} className="text">BOOKING APPOINTMENT</Link>
                        <Link to={'#'} className="text" onClick={onRequiredLogin()}>TELE-CONSULTATION WITH DOCTOR</Link>
                        <Link to={'#'} className="text">PACKAGE</Link>
                    </div>
                    <div className="col-md-4">
                        <Link to={"#"} className="text">VIEW OUR CLINICS AND CENTERS</Link>
                        <Link to={"#"} className="text">FIND A DOCTOR</Link>
                    </div>
                </div>
            </div>
            <div className="copyright">
                <div className="row justify-center container font-segoe">
                    <div>Copyright © <span className="bold">2020 CB/I DIGITAL INC</span>. All rights reserved</div>

                    <div className="divider-vertical" />
                    <div >
                        Privacy Policy
                    </div>
                </div>
            </div>
        </div>
    );
};
