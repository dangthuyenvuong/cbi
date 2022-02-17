import classNames from "classnames"
import { Checkbox, DatePicker, Form, FormProps, Option, Select, TextField } from "components/atoms"
import { Rule } from "lib/cbi-react-core/@types"
import { Moment } from "moment"


// const DATE_FORMAT = 'DD/MM/YYYY'
type Field = {
    type?: 'input' | 'select' | 'checkbox' | 'tags' | 'switch' | 'textarea' | 'radio' | 'date' | 'daterangepicker' | 'relation' | 'autocomplete' | 'password' | 'phone' | 'number'
    radios?: { value: string, title: string }[]
    label?: string | React.ReactNode
    name: string
    placeholder?: string
    value?: any// eslint-disable-line
    onChange?(value: any): any, // eslint-disable-line
    switchChildren?: [string, string]
    disabled?: boolean
    className?: string
    options?: { value: string, title: string }[]
    autoCompleteOptions?: { option: string, value: string }[]
    relationOptions?: { label: string, value: string, data: any }[]// eslint-disable-line
    renderInput?: (values: any) => any,// eslint-disable-line
    default?: any,// eslint-disable-line
    rules?: Rule[]
    disabledDate?: (date: Moment) => boolean
    format?: string
    daterangepickerPlaceholder?: [string, string],
    relationGetData?: (value: any) => Promise<any>,// eslint-disable-line
    trim?: boolean,
    render?: (values: any) => any,// eslint-disable-line
    formatValue?: any// eslint-disable-line
    style?: React.CSSProperties
}

export type FormBuilderProps = FormProps & {
    fields: Field[]
    labelCol?: number
    values?: any// eslint-disable-line
}

export const FormBuilder: React.FC<FormBuilderProps> = ({ className, fields, values ,...props }) => {
    // const { register } = useForm<any>() // eslint-disable-line

    return (
        <Form
            {...props}
            className={classNames('FormBuilder', className)}
        >
            {fields.map((e) => {
                if (e.renderInput) return e.renderInput(values)

                switch (e.type || 'input') {
                    case 'checkbox':
                        return <Checkbox onChange={e.onChange} defaultChecked={values?.[e.name]} />
                    case 'input':
                        return <TextField placeholder={e.placeholder} disabled={e.disabled} />
                    case 'select':
                        return <Select style={e.style} onChange={e.onChange} value={values?.[e.name]} placeholder={e.placeholder}
                            className={e.className}
                        >
                            {
                                e.options?.map((e, i) => <Option key={i} value={e.value}>{e.title}</Option>)
                            }
                        </Select>

                    // case 'textarea':
                    // case 'password':
                        // return <PasswordField label={e.label} {...register(e.name, e.rules)}/>
                    // return <TextArea placeholder={e.placeholder} onBlur={onBlurTrim(e.name)} />

                    case 'date':
                        return <DatePicker
                            label={e.label}
                            className={e.className}
                            // renderInput={(params) => (
                            //     <TextField {...params} helperText={null} placeholder="" />
                            // )}
                            // {...register(e.name, e.rules)}
                            value={234234234}
                            // onChange={(e) => { }}
                            disableFuture
                        />
                    // case 'daterangepicker':
                        // return <RangePicker format={e.format || DATE_FORMAT} placeholder={e.daterangepickerPlaceholder} disabledDate={e.disabledDate} className="w--full" />
                    // case 'relation':
                        // return <Relation value={values?.[e.name]} options={e.relationOptions} getData={e.relationGetData} onChange={e.onChange} />
                    // case 'autocomplete':
                        // return <AutoComplete
                        //     options={e.autoCompleteOptions}
                        // >
                        //     <Input.Search onChange={e.onChange} size='middle' placeholder={e.placeholder} />
                        // </AutoComplete>
                    // case 'tags':



                    // case 'switch':
                        // return <Switch
                        //     checkedChildren={e.switchChildren?.[0]}
                        //     unCheckedChildren={e.switchChildren?.[1]}
                        //     onChange={(ev) => { e.onChange?.(ev); setFormValues({ ...formValues, [e.name]: ev }) }}
                        //     disabled={e.disabled}
                        //     checked={formValues?.[e.name]}
                        //     // defaultChecked={values?.[e.name] ?? e.default}

                        //     // default={values?.[e.name]}
                        //     className={e.className}
                        // />
                }
                return null
            }

            )}
        </Form>
    )
}

export default FormBuilder