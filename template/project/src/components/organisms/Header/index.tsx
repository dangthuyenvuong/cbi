import { Avatar, Badge, Button, iconAvatarDefault, IconCart, IconLogout, IconMenu, IconPhone, IconUserLogin, InputSearch, Link, Menu, MenuItem } from "components/atoms"
import { useDispatch } from "react-redux"
import { classNames } from "utils"
import { router } from 'routers'
import React, { useCallback, useEffect, useRef } from "react"
import { IsGuest, IsLogin } from "lib/cbi-authentication"
import { useCart } from "store/cart"
import { authActions } from "store/auth"
import usePage from 'hooks/usePage'
import { setTimeout } from "timers"
import { useUser } from "store/user"

type HeaderProp = React.HTMLAttributes<HTMLDivElement> & {
}

const CART_ICON_ID = 'Header-cart-icon'

export const Header: React.FC<HeaderProp> = ({ className, ...ref }) => {
    const dispatch = useDispatch()
    const { cart } = useCart()

    const headerRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        window.addEventListener('scroll', () => {
            const classList = headerRef.current?.classList
            if (window.scrollY > 100 && !classList?.contains('shadown')) {
                classList?.add('shadown')
            } else if (window.scrollY <= 100 && classList?.contains('shadown')) {
                classList?.remove('shadown')
            }

        })
    }, [])

    useEffect(() => {
        const ele = document.getElementById(CART_ICON_ID)
        if (ele) {
            ele.classList.add('ani-pop')
            setTimeout(() => {
                ele.classList.remove('ani-pop')
            }, 1000)
            return () => {
                ele.classList.remove('ani-pop')
            }
        }

    }, [cart.totalQuantity])

    const user = useUser()
    const { onRequiredLogin, toggleMenu } = usePage()

    const logout = useCallback(() => {
        dispatch(authActions.logout())
    }, [])

    return (
        <div
            {...ref}
            className={classNames(`Header`, className)}
            ref={headerRef}
            id="Header"
        >
            <div className="header-wrap">
                <div className="container">
                    <div className="left flex gap-35 items-center">
                        <IconMenu className="cursor-pointer" onClick={() => toggleMenu(true)} />
                        <Link to={router.home}>
                            <img alt="Logo" src="/img/logo.webp" />
                        </Link>
                    </div>
                    <div className="right flex items-center gap-35">
                        <Menu>
                            <MenuItem to={'/1'} onClick={onRequiredLogin()}>BOOK APPOINTMENT</MenuItem>
                            <MenuItem to={'/2'}>PACKAGE</MenuItem>
                            <MenuItem to={'/3'} onClick={onRequiredLogin()}>TELEMEDICINE</MenuItem>
                            <MenuItem to={'/4'}>CONTACT US</MenuItem>
                        </Menu>
                        <InputSearch defaultValue="Hospital C1" placeholder="Search location" />
                        <Button type='phone' size="middle" link="call:+ 1 2066 8888">
                            <IconPhone />
                            + 1 2066 8888
                        </Button>
                        <Badge badgeContent={cart.totalQuantity || 0} className="first-time" color="error" id={CART_ICON_ID}>
                            <Link to={'#'} onClick={onRequiredLogin()}>
                                <IconCart />
                            </Link>
                        </Badge>
                        <IsLogin>
                            <div className="account">
                                <div className="left">
                                    {/* <Link to={url.myAccount} className="name">{user?.lastName}</Link> */}
                                    <Link to={router.myAccount} className="name">{`${user?.firstName} ${user?.lastName ?? ''}`}</Link>
                                    <div className="logout" onClick={logout}>
                                        Log out
                                        <IconLogout />
                                    </div>
                                </div>
                                <Link to={router.myAccount}>
                                    <Avatar src={user?.avatar || iconAvatarDefault} />
                                </Link>
                            </div>
                        </IsLogin>
                        <IsGuest>
                            <Link to={router.login} className="flex items-center gap-10">
                                <div className="text-18 semi-bold">Login</div>
                                <IconUserLogin />
                            </Link>
                        </IsGuest>

                    </div>
                </div>
            </div>
        </div>
    )
}
