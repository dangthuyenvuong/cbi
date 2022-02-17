import { User } from "@types";
import { GetServerSidePropsContext, GetServerSidePropsResult, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";


type WithAuthenCallback<P extends { [key: string]: any; } = { [key: string]: any; }, Q extends ParsedUrlQuery = ParsedUrlQuery, D extends PreviewData = PreviewData> = (context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>, user: User) => Promise<GetServerSidePropsResult<P>> // eslint-disable-line

export const withAuthen = (callback: WithAuthenCallback, redirect = '/') => (context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => {

    const { cookies = {} } = context.req

    const { token, user } = cookies

    if (!token) {
        return {
            redirect: {
                destination: redirect,
                permanent: false
            }
        }
    }

    let userT: User = {} as User

    try {
        userT = JSON.parse(user) as User
    } catch (err) {
        userT = {} as User
    }

    return callback(context, userT)
}

export default withAuthen