import { Slider, SliderProps } from "@mui/material"
// import { useState } from "react"                                                                                                                           
import { classNames } from "utils"


type RangeSliderProp = SliderProps & {
    // iniValue: number[]
    value: number[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange: any
}

function valuetext(value: number) {
    return `${value}°C`;
}


//change type to 'any' to test customization mui slider
export const RangeSlider: React.FC<RangeSliderProp> = ({ value, onChange, className, ...ref }) => {

    // const [value, setValue] = useState<number[]>(iniValue);
    const handleChange = ( event: Event, newValue: number | number[],  activeThumb: number) => {
        if (!Array.isArray(newValue)) 
            return;
        
        if (newValue[1] < newValue[0]) {
            const tmp = newValue[0];
            newValue[0] = newValue[1];
            newValue[1] = tmp;
        }
        //console.log(newValue);
        // setValue(newValue as number[]);
        console.log(newValue)
        onChange(newValue)
    };


    return <Slider
        {...ref}
        className={classNames('RangeSlider', className)}
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        // valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        
    />
}
