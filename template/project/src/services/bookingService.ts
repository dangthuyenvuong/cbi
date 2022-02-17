import { BOOKING_API, PRODUCT_API } from "constant/api"
import { TimeTable, PostBookingAppointment, CheckoutAppointment, Appointment, Booking } from "@types"
import { http, URLGetParams } from "lib/cbi-react-core"


const bookingService = {
    getTimeTable(startTime: string, endTime: string) {
        return http.get<HttpResponse<TimeTable[]>>(`${BOOKING_API}/admin/timetable?filter[startTime][gte]=${startTime}&filter[endTime][lte]=${endTime}&sort[startTime]=asc`)
    },

    getAppointment(departmentId: string,) {
        return http.get<HttpResponse<Appointment[]>>(`${PRODUCT_API}/products?filter[featureType][eq]=booking&eavFilter[booking_type][eq]=offline&eavFilter[department_id][eq]=${departmentId}`)
    },

    getTelemedicine(departmentId: string,) {
        return http.get<HttpResponse<Appointment[]>>(`${PRODUCT_API}/products?filter[featureType][eq]=booking&eavFilter[booking_type][eq]=online&eavFilter[department_id][eq]=${departmentId}`)
    },

    orderAppointment(data: PostBookingAppointment) {
        return http.post<HttpResponse<CheckoutAppointment>>(`${BOOKING_API}/bookings`, data);
    },

    getBookingId(id: string) {
        return http.get<HttpResponse<CheckoutAppointment>>(`${BOOKING_API}/bookings/${id}`)
    },
    getBooking(query?: URLGetParams) {
        return http.get<HttpResponse<Booking[]>>(`${BOOKING_API}/bookings`, query)
    }
}

export default bookingService