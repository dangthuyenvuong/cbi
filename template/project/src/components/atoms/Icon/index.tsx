import successIcon from "assets/icons/success-icon.svg";
import passwordSuccessIcon from "assets/icons/password-success-icon.svg";
import appleIcon from "assets/icons/apple-icon.svg";
import googlePlayIcon from "assets/icons/google-play-icon.svg";
import iconMenu from "assets/icons/icon-menu.svg";
import iconLogout from "assets/icons/icon-logout.svg";
import iconLocation from "assets/icons/icon-location.svg";
import iconArrowBreadcrumb from "assets/icons/icon-arrow-breadcrumb.svg";
import iconSearch from "assets/icons/icon-search.svg";
import iconHeart from "assets/icons/icon-heart.svg";
import iconHeartCartItem from "assets/icons/icon-heartCartItem.svg";
import iconHeartMainColor from "assets/icons/icon-heart-main-color.png";
import iconShare from "assets/icons/icon-share.webp";
import iconTrash from "assets/icons/icon-trash.jpg";
import iconID from "assets/icons/icon-id.svg";
import iconPurchase from "assets/icons/icon-purchase.svg";
import iconTotal from "assets/icons/icon-total.webp";
import iconPayment from "assets/icons/icon-payment.webp";
import iconArrowDown from "assets/icons/icon-arown-down.svg";
import iconUser from "assets/icons/icon-user.png";
import iconUserNoLogin from "assets/icons/icon-user-no-login.png";
import iconPackage from "assets/icons/icon-package.png";
import iconPackageNoLogin from "assets/icons/icon-package-no-login.png";
import iconTelemedicine from "assets/icons/icon-telemedicine.png";
import iconTelemedicineNoLogin from "assets/icons/icon-telemedicine-no-login.png";
import iconBookAppointment from "assets/icons/icon-book-appointment.png";
import iconBookAppointmentNoLogin from "assets/icons/icon-book-appointment-no-login.png";
import iconOrder from "assets/icons/icon-order.png";
import iconOrderNoLogin from "assets/icons/icon-order-no-login.png";
import iconAppointment from "assets/icons/icon-appointment.png";
import iconAppointmentNoLogin from "assets/icons/icon-appointment-no-login.png";
import iconFavorited from "assets/icons/icon-favorited.png";
import iconFavoritedNoLogin from "assets/icons/icon-favorited-no-login.png";
import iconMyPayment from "assets/icons/icon-my-payment.png";
import iconPaymentNoLogin from "assets/icons/icon-payment-no-login.png";
import iconContact from "assets/icons/icon-contact.jpg";
import iConPrivacy from "assets/icons/icon-privacy.jpg";
import iconTermOfService from "assets/icons/icon-term-of-service.jpg";
import iconAboutUs from "assets/icons/icon-aboutus.jpg";
import iconNotes from "assets/icons/icon-notes.svg";
import iconAddPatient from "assets/icons/icon-add-patient.svg";

import iconEmail from "assets/icons/icon-email.svg";
import iconGender from "assets/icons/icon-gender.svg";
import iconCountry from "assets/icons/icon-country.svg";
import iconCalendar from "assets/icons/icon-calendar.svg";
import iconAddress from "assets/icons/icon-address.svg";
import iconName from "assets/icons/icon-name.svg";
import iconPhone from "assets/icons/icon-phone.svg";
import iconNoData from "assets/icons/icon-nodata.png";
import iconNoDataCart from "assets/icons/icon-nodata.svg";
import iconPdf from "assets/icons/icon-pdf.svg";
import iconBack from "assets/icons/icon-back.svg";
import iconForward from "assets/icons/icon-forward.svg";
import iconCart from "assets/icons/icon-cart.png";
import iconUserLogin from "assets/icons/icon-user-login.svg";
import iconAvatarDefault from "assets/icons/icon-default-avatar.png";
import iconEmptyCheckBox from "assets/icons/icon-empty-checkbox.svg";
import iconCheckedCheckBox from "assets/icons/icon-checked-checkbox.svg";
import iconCheckAround from "assets/icons/icon-check-around.svg";
import iconViewPassWord from "assets/icons/icon-viewer-password.svg";
import iconCamera from "assets/icons/icon-camera.svg";
import iconDelete from "assets/icons/icon-delete.svg";
import iconDownload from "assets/icons/icon-download.png";
import iconFacebookOutline from "assets/icons/icon-facebook-outline.svg";
import iconTwitterOutline from "assets/icons/icon-twitter-outline.svg";
import iconYoutubeOutline from "assets/icons/icon-youtube-outline.svg";
import iconMail from "assets/icons/icon-mail.svg";
import iconMailFooter from "assets/icons/icon-mail-footer.webp";
import iconEyeClose from "assets/icons/icon-eye-close.svg";
import iconDropdown from "assets/icons/icon-dropdown.svg";
import iconDatePicker from 'assets/icons/icon-date-picker.png';
import iconClose from 'assets/icons/icon-close.svg';
import iconDOB from 'assets/icons/icon-dob.svg';

// bookingsuccessfully page

import iconOrderId from "assets/icons/icon-order-id.png"
import iconDate from "assets/icons/icon-date.png"
import iconSpecialty from "assets/icons/icon-specialties.png"
import iconDoctor from "assets/icons/icon-doctor.png"
import iconTreatment from "assets/icons/icon-treatment.png"
import iconAtmCard from "assets/icons/icon-atm-card.png"

import iconPaymentOrder from "assets/icons/icon-payment-order.webp"
import iconUserId from "assets/icons/icon-userId.svg"

export { iconAvatarDefault };
interface IconProp extends React.HTMLAttributes<HTMLDivElement> {
    src: string;
    width?: number
    height?: number
}

export const Icon: React.FC<IconProp> = ({ src, width, height, style, ...ref }) => {
    return (
        <i  {...ref} className={`icon ${ref.className ?? ""}`} >
            <img alt="icon" src={src} width={width} height={height} />
        </i>
    );
};

type IconType = React.HTMLAttributes<HTMLDivElement> & {
    width?: number,
    height?: number
}

export const SuccessIcon: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ ...ref }) => {
    return <Icon src={successIcon} {...ref} />;
};

type ResetPasswordSuccessIconProp = React.HTMLAttributes<HTMLDivElement>;

export const ResetPasswordSuccessIcon: React.FC<ResetPasswordSuccessIconProp> =
    ({ className, ...ref }) => {
        return <Icon src={passwordSuccessIcon} {...ref} />;
    };

export const AppleIcon: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={appleIcon} {...ref} />;
};

export const GooglePlayIcon: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={googlePlayIcon} {...ref} {...ref} />;
};

export const IconMenu: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconMenu} {...ref} {...ref} />;
};

export const IconLogout: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconLogout} {...ref} />;
};

export const IconLocation: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconLocation} {...ref} />;
};

export const IconPhone: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconPhone} {...ref} />;
};

export const IconArrowBreadcrumb: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconArrowBreadcrumb} {...ref} />;
};

export const IconSearch: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconSearch} {...ref} />;
};

export const IconHeart: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconHeart} {...ref} />;
};

export const IconHeartCartItem: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconHeartCartItem} {...ref} />;
};

export const IconHeartMainColor: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconHeartMainColor} {...ref} />;
};

export const IconShare: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconShare} {...ref} />;
};

export const IconTrash: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconTrash} {...ref} />;
};

export const IconID: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconID} {...ref} />;
};

export const IconPurchase: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconPurchase} {...ref} />;
};

export const IconTotal: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconTotal} {...ref} />;
};

export const IconPayment: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconPayment} {...ref} />;
};

export const IconArrowDown: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconArrowDown} {...ref} />;
};

export const IconUser: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconUser} {...ref} />;
};
export const IconUserNoLogin: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconUserNoLogin} {...ref} />;
};

export const IconPackage: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconPackage} {...ref} />;
};
export const IconPackageNoLogin: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconPackageNoLogin} {...ref} />;
};

export const IconTelemedicine: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconTelemedicine} {...ref} />;
};

export const IconTelemedicineNoLogin: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconTelemedicineNoLogin} {...ref} />;
};

export const IconBookAppointment: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconBookAppointment} {...ref} />;
};

export const IconBookAppointmentNoLogin: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconBookAppointmentNoLogin} {...ref} />;
};

export const IconAppointment: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconAppointment} {...ref} />;
};
export const IconAppointmentNoLogin: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconAppointmentNoLogin} {...ref} />;
};

export const IconOrder: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconOrder} {...ref} />;
};
export const IconOrderNoLogin: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconOrderNoLogin} {...ref} />;
};

export const IconFavorited: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconFavorited} {...ref} />;
};
export const IconFavoritedNoLogin: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconFavoritedNoLogin} {...ref} />;
};

export const IconMyPayment: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconMyPayment} {...ref} />;
};
export const IconPaymentNoLogin: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconPaymentNoLogin} {...ref} />;
};


export const IconContact: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconContact} {...ref} />;
};
export const IconPrivacy: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iConPrivacy} {...ref} />;
};
export const IconTermOfService: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconTermOfService} {...ref} />;
};
export const IconAboutUs: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconAboutUs} {...ref} />;
};

export const IconNotes: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconNotes} {...ref} />;
};
export const IconAddPatient: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconAddPatient} {...ref} />;
};

// import iconEmail from 'assets/icons/icon-email.svg'
// import iconGender from 'assets/icons/icon-gender.svg'
// import iconCountry from 'assets/icons/icon-country.svg'
// import iconCalendar from 'assets/icons/icon-calendar.svg'
// import iconAddress from 'assets/icons/icon-address.svg'
// import iconName from 'assets/icons/icon-name.svg'

export const IconEmail: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconEmail} {...ref} />;
};
export const IconGender: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconGender} {...ref} />;
};
export const IconCountry: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconCountry} {...ref} />;
};
export const IconCalendar: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconCalendar} {...ref} />
}
export const IconDatePicker: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconDatePicker} {...ref} />
}
export const IconAddress: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconAddress} {...ref} />;
};
export const IconName: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconName} {...ref} />;
};

export const IconNoData: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconNoData} {...ref} />;
};

export const IconNoDataCart: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconNoDataCart} {...ref} />;
};

export const IconPdf: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconPdf} {...ref} />;
};

export const IconBack: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconBack} {...ref} />;
};

export const IconForward: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconForward} {...ref} />;
};

export const IconCart: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconCart} {...ref} />;
};

export const IconUserLogin: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconUserLogin} {...ref} />;
};

export const IconAvatarDefault: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconAvatarDefault} {...ref} />;
};

export const IconEmptyCheckBox: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconEmptyCheckBox} {...ref} />;
};

export const IconCheckedCheckBox: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconCheckedCheckBox} {...ref} />;
};

export const IconCheckAround: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconCheckAround} {...ref} />;
};

export const IconViewPassWord: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconViewPassWord} {...ref} />;
};
export const IconCamera: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconCamera} {...ref} />;
};

export const IconDelete: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconDelete} {...ref} />;
};

export const IconDownload: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconDownload} {...ref} />;
};

export const IconTwitterOutline: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconTwitterOutline} {...ref} />;
};

export const IconFacebookOutline: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconFacebookOutline} {...ref} />;
};

export const IconYoutubeOutline: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconYoutubeOutline} {...ref} />;
};

export const IconDropDown: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconDropdown} {...ref} />;
};

export const IconMail: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconMail} {...ref} />;
};

export const IconMailFooter: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconMailFooter} {...ref} />;
};

export const IconEyeClose: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconEyeClose} {...ref} />;
};

// bookingsuccessfully
export const IconOrderId: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconOrderId} {...ref} />;
};

export const IconDate: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconDate} {...ref} />;
};

export const IconSpecialty: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconSpecialty} {...ref} />;
};

export const IconDoctor: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconDoctor} {...ref} />;
};

export const IconTreatment: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconTreatment} {...ref} />;
};

export const IconAtmCard: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconAtmCard} {...ref} />;
};

export const IconClose: React.FC<IconType> = ({ ...ref }) => {
    return <Icon width={30} height={30} src={iconClose} {...ref} />;
};

export const IconDOB: React.FC<IconType> = ({ ...ref }) => {
    return <Icon width={20} height={20} src={iconDOB} {...ref} />;
};

export const IconPaymentOrder: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconPaymentOrder} {...ref} />;
};
export const IconUserId: React.FC<IconType> = ({ ...ref }) => {
    return <Icon src={iconUserId} {...ref} />;
};