/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextFieldProps } from "@mui/material";
import { useEffect, useState } from "react";
import { classNames, phoneMask } from "utils";
import { Icon, Option, Select, TextField } from "..";


const COUNTRIES = [
    {
        value: "+1",
        flag: "/img/american-flag.webp",
    },
    {
        value: "+84",
        flag: "/img/vietnam-flag.webp",
    },
];
type PhoneFieldProp = Overwrite<TextFieldProps, {
    countries?: { value: string; flag: string }[];
    defaultValue?: string;
    value?: string | undefined;
    onChange?: (value: string) => void;
}>

export const PhoneField: React.FC<PhoneFieldProp> = ({
    defaultValue,
    countries = COUNTRIES,
    className,
    value,
    onChange,
    ...ref
}) => {
    // const [isDelete, setDelete] = useState(false);
    const [country, setCountry] = useState(defaultValue || countries?.[0].value);
    const [phone, setPhone] = useState(value || '');

    // useLayoutEffect(() => {
    //     if(value && value !== phoneMask(country + ' ' + phoneMask(phone))){
    //         setPhone(value)
    //     }
    // }, [value, phone])


    useEffect(() => {
        onChange?.(country + ' ' + phoneMask(phone || '') || '')
    }, [phone, country])
    return (
        <div className={classNames(`PhoneField phone-field flex items-center`, className, { error: ref.error })} >
            <Select
                value={country}
                onChange={(e) => setCountry(e.target.value as string)}
            >
                {countries.map((e, i) => (
                    <Option value={e.value} key={i}>
                        <div className="flex f-center-y">
                            <Icon src={e.flag} className="icon-custom" width={30} height={20} />{" "}
                            <span className="m-l-10">{e.value}</span>
                        </div>
                    </Option>
                ))}
            </Select>
            <TextField
                {...ref}
                inputProps={{
                    ...ref?.inputProps,
                }}
                placeholder={ref.placeholder || "Phone Number *"}
                value={phoneMask(phone)}
                onChange={(ev) => setPhone(ev.currentTarget.value)}
                // onKeyDown={onKeyDown}
                className="flex-1 phone-text-field"
                autoComplete="off"
                type="tel"
            />
        </div>
    );
};
