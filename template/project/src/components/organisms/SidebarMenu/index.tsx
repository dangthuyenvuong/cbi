import { classNames } from "utils"
import { Box, Drawer, DrawerProp, IconAboutUs, IconAppointment, IconAppointmentNoLogin, IconBookAppointment, IconBookAppointmentNoLogin, IconContact, IconFavorited, IconFavoritedNoLogin, IconMenu, IconMyPayment, IconOrder, IconOrderNoLogin, IconPackage, IconPackageNoLogin, IconPaymentNoLogin, IconPrivacy, IconTelemedicine, IconTelemedicineNoLogin, IconTermOfService, IconUser, IconUserNoLogin, Logo, Menu, MenuItem, Typography } from "components/atoms"
import { router } from "routers"
import React, { useState } from "react"
import { IsGuest, IsLogin } from "lib/cbi-authentication"
import usePage from "hooks/usePage"


type SidebarMenuProp = DrawerProp


export const SidebarMenu: React.FC<SidebarMenuProp> = ({ className, open, onClose, ...ref }) => {
    const _onClick = () => {
        // console.log()
    }

    const [currentRouter] = useState('')

    const { onRequiredLogin, toggleMenu, state: { openMenu } } = usePage()

    return (
        <Drawer
            {... { open: openMenu }}
            onClose={() => toggleMenu(false)}
            className={classNames('SidebarMenu', className)}
            anchor="left"
        >
            <Box>
                <div className="flex top" style={{ padding: "0 30px" }}>
                    <IconMenu /> <Logo to={router.home} onClick={_onClick} />
                </div>
                <Typography className="text-14 bold m-t-20 m-b-40" style={{ padding: "0 30px" }}>MENU</Typography>
                <Menu>
                    <IsLogin>
                        <MenuItem to="" className={`icon-menu ${currentRouter === 'account' ? 'router-active' : ''}`} title={<><IconUser className="icon-active" /> <IconUserNoLogin className="icon-disable" />  My Account</>}>
                            <MenuItem onClick={_onClick} to={router.myAccount}>Personal Information</MenuItem>
                            <MenuItem onClick={_onClick} to={'#'}>Medical Profile</MenuItem>
                        </MenuItem>
                        <MenuItem to={'#'} className={`icon-menu ${currentRouter === 'package' ? 'router-active' : ''}`} onClick={_onClick}><IconPackage className="icon-active" /> <IconPackageNoLogin className="icon-disable" /> Package</MenuItem>
                        <MenuItem to={'#'} className={`icon-menu ${currentRouter === 'telemedicine' ? 'router-active' : ''}`} onClick={onRequiredLogin(_onClick)}> <IconTelemedicine className="icon-active" /> <IconTelemedicineNoLogin className="icon-disable" /> Telemedicine</MenuItem>
                        <MenuItem to={'#'} className={`icon-menu ${currentRouter === 'book-appointment' ? 'router-active' : ''}`} onClick={onRequiredLogin(_onClick)}><IconBookAppointment className="icon-active" /> <IconBookAppointmentNoLogin className="icon-disable" />Book Appointment</MenuItem>
                    </IsLogin>
                    <IsGuest>
                        <MenuItem to={'#'} className={`icon-menu ${currentRouter === 'book-appointment' ? 'router-active' : ''}`} onClick={onRequiredLogin(_onClick)}><IconBookAppointment className="icon-active" /> <IconBookAppointmentNoLogin className="icon-disable" />Book Appointment</MenuItem>
                        <MenuItem to={'#'} className={`icon-menu ${currentRouter === 'package' ? 'router-active' : ''}`} onClick={_onClick}><IconPackage className="icon-active" /> <IconPackageNoLogin className="icon-disable" /> Package</MenuItem>
                        <MenuItem to={'#'} className={`icon-menu ${currentRouter === 'telemedicine' ? 'router-active' : ''}`} onClick={onRequiredLogin(_onClick)}><IconTelemedicine className="icon-active" /> <IconTelemedicineNoLogin className="icon-disable" /> Telemedicine</MenuItem>
                    </IsGuest>
                    <IsLogin>
                        <MenuItem to={'#'} className={`icon-menu ${currentRouter === 'my-order' ? 'router-active' : ''}`} onClick={_onClick}><IconOrder className="icon-active" /><IconOrderNoLogin className="icon-disable" /> My Orders</MenuItem>
                        <MenuItem to={'#'} className={`icon-menu ${currentRouter === 'my-appointment' ? 'router-active' : ''}`} onClick={_onClick}><IconAppointment className="icon-active" /><IconAppointmentNoLogin className="icon-disable" /> My Appointment</MenuItem>
                        <MenuItem to={'#'} className={`icon-menu ${currentRouter === 'my-favorite' ? 'router-active' : ''}`} onClick={_onClick}><IconFavorited className="icon-active" /><IconFavoritedNoLogin className="icon-disable" /> My Favorited Package</MenuItem>
                        <MenuItem to={'#'} className={`icon-menu ${currentRouter === 'my-payment' ? 'router-active' : ''}`} onClick={_onClick}><IconMyPayment className="icon-active" /><IconPaymentNoLogin className="icon-disable" /> My Payment</MenuItem>
                    </IsLogin>
                </Menu>
                <div className="divider m-t-60 m-b-60 m-l-30"></div>
                <Typography className="text-14 bold m-b-40" style={{ padding: "0 30px" }}>OUR COMPANY</Typography>
                <Menu className="Menu-company">
                    <MenuItem to={'#'} onClick={_onClick}><IconContact />  Contact Us</MenuItem>
                    <MenuItem to={'#'} onClick={_onClick}><IconPrivacy /> Privacy Policy</MenuItem>
                    <MenuItem to={'#'} onClick={_onClick}><IconTermOfService /> Terms of Services</MenuItem>
                    <MenuItem to={'#'} onClick={_onClick}><IconAboutUs /> About Us</MenuItem>
                </Menu>
            </Box>
        </Drawer>
    )
}