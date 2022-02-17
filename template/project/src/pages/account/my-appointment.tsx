import { Booking } from "@types"
import { ColumnProps, Link } from "components/atoms"
import { BreadcrumbItem } from "components/organisms"
import { AccountDataListTemplate } from "components/templates"
import { getMainLayout } from "layouts/MainLayout"
import { useURL } from "lib/cbi-react-core"
import { useHttp } from "lib/cbi-react-core/hooks/useHttp"
import { generateMyPoointmentDetailPath } from "routers/params"
import bookingService from "services/bookingService"


const columns: ColumnProps<Booking> = [
    {
        index: 'code',
        title: 'Visit code',
        render: (item) => <Link to={generateMyPoointmentDetailPath({ id: item.code })} className="bold">{item.code}</Link>
    },
    {
        index: 'bookingType',
        title: 'Booking type'
    },
    {
        index: 'specialty',
        title: 'Specialty'
    },
    {
        index: 'date',
        title: 'Date'
    },
    {
        index: 'doctor',
        title: 'Doctor'
    },
]

const MyAppointment = () => {
    const { query } = useURL()

    const { data: bookings, isFetching } = useHttp(() => bookingService.getBooking(), [query.page])

    return <AccountDataListTemplate
        breadcrumns={[
            <BreadcrumbItem key={1} to="">Home</BreadcrumbItem>,
            <BreadcrumbItem key={2} to="">My Appointments</BreadcrumbItem>
        ]}
        title="My Appointment"
        filter={[
            { title: 'Upcoming', key: "cpcoming" },
            { title: 'Previous', key: "previous" },
            { title: 'Cancelled', key: "cancelled" },
            // <Button transparent size="small" minWidth={140}>Upcoming</Button>,
            // <Button size="small" shadow minWidth={140}>Previous</Button>,
            // <Button transparent size="small" minWidth={140}>Cancelled</Button>,
        ]}
        tableProp={{
            columns,
            data: bookings,
            loading: isFetching
        }}
        totalPage={1}
    />
}

MyAppointment.getLayout = getMainLayout


export default MyAppointment