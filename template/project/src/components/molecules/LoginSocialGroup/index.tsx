import { Icon } from "components/atoms"
import iconFb from 'assets/icons/facebook.webp'
import iconTw from 'assets/icons/twitter.webp'
import iconGg from 'assets/icons/google.webp'

export const LoginSocialGroup: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ ...ref }) => {
    return (
        <div className="login-social-group">
            <Icon src={iconFb} className="cursor-pointer" />
            <Icon src={iconTw} className="cursor-pointer" />
            <Icon src={iconGg} className="cursor-pointer" />
        </div>
    )
}