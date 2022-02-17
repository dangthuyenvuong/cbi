import { GetServerSideProps, GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";

export const withNoAuthen = (callback: GetServerSideProps, redirect = '/') => (context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => {

    const { cookies = {} } = context.req

    const { token } = cookies

    if (token) {
        return {
            redirect: {
                destination: redirect,
                permanent: false
            }
        }
    }

    return callback(context)
}

export default withNoAuthen