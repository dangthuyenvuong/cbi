import { getMainLayout } from "components/layouts/MainLayout"
import { HomeTemplate } from "components/templates"
import { useQuery } from "lib/cbi-react-core"
import { sliders } from "mock/slider"
import productService from "services/productService"


const Home = () => {

    const { data: products, isFetching } = useQuery(productService.getProduct.bind(null, '?limit=5&filter[featureType][eq]=ecom&sort[createdAt]=desc'), [])

    return <HomeTemplate 
        posts={[
            {
                title: 'E-health Profile Management',
                description: 'Connect to our experienced team of specialists anytime, anywhere and get immediate medical advice via video consultations and care chat.',
                buttonLink: '/book-appointment',
                buttonText: 'Booking an appointment',
                image: '/img/post/image-1.webp'
            },
            {
                title: '24/7 Video & Chat Consultation',
                description: 'Connect to our experienced team of specialists anytime, anywhere and get immediate medical advice via video consultations and care chat.',
                buttonLink: '/telemedicine',
                buttonText: 'Video Call with Doctors',
                image: '/img/post/image-2.png'
            }
        ]}
        sliders={sliders}
        isFetching={isFetching}
        products={products?.data}
    />
}

Home.getLayout = getMainLayout
export default Home
