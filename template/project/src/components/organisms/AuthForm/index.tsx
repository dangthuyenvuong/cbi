import { Link, Title } from "components/atoms"
import { useTranslate } from "lib/cbi-react-translate"
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import { router } from "routers";
import React from "react";

interface AuthFormProp extends React.HTMLAttributes<HTMLDivElement> {
    description?: React.ReactNode
    title?: string
    goHome?: React.MouseEventHandler<HTMLAnchorElement>
}

export const AuthForm: React.FC<AuthFormProp> = ({ title, children, goHome, description, ...ref }) => {
    const { t } = useTranslate()

    return (
        <div className={`auth-form ${ref.className ?? ''}`}>
            <Link to={router.home} className="back-to-homepage" onClick={goHome}> <KeyboardBackspaceIcon /> &nbsp;{t('Back to Homepage')} </Link>
            <Title className="color-main-bold title" level={1}>{t(title)}</Title>
            <p className="description">{description}</p>
            {children}
        </div>
    )
}