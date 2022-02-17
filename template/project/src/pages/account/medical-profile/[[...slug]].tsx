import { MedicalProfileTemplate } from "components/templates"
import { useCallback, useEffect } from "react"
import { getMainLayout } from "layouts/MainLayout";
import { RouterMedicalProfile } from "@types";
import { useAllState, useParams, useURL } from "lib/cbi-react-core";
import { OnUpdateOrCreateProfile } from "templates/MedicalProfileTemplate/FormProfile";
import { eprofileActions, usePatient, usePatients } from "store/eprofile";
import { useDispatch } from "react-redux";
import { ERROR_MESSAGE } from 'constant'
import { generateMedicalProfilePath } from "routers/params";
import { withAuthen } from "lib/cbi-nextjs";

type Router = { slug: [string, RouterMedicalProfile['tab'], RouterMedicalProfile['healthTab']] }

const MedicalProfile = () => {
    const dispatch = useDispatch()
    const { slug } = useParams<Router>()
    const { navigate } = useURL()

    const userId = slug?.[0] || 'me'
    const tab = slug?.[1] || undefined
    const healthTab = slug?.[2] || undefined

    const { patients, isFetching } = usePatients()
    const patient = usePatient(userId)
    const [state, setState] = useAllState({
        profileFetching: false,
        profileSuccess: '',
        profileError: ''
    })

    useEffect(() => {
        setState({
            profileSuccess: '',
            profileError: ''
        })
    }, [userId])

    const onUpdateOrCreateProfile: OnUpdateOrCreateProfile = useCallback(async (values, action) => {
        console.log(values, action)
        setState({
            profileFetching: true
        })
        if (action === 'edit') {
            dispatch(eprofileActions.updatePatient({
                data: {
                    id: values.id,
                    data: values
                },
                callback(res) {
                    setState({
                        profileError: res.message || '',
                        profileSuccess: !res.message ? ERROR_MESSAGE.UPDATE_PROFILE_SUCCESS : '',
                        profileFetching: false

                    })
                }
            }))

        } else {
            dispatch(eprofileActions.createPatient({
                data: values,
                callback(res) {
                    setState({
                        profileError: res.message || '',
                        profileSuccess: !res.message ? ERROR_MESSAGE.UPDATE_PROFILE_SUCCESS : '',
                        profileFetching: false
                    })
                    if (res.data) {
                        navigate(generateMedicalProfilePath({ userId: res.data.id }))
                    }
                }
            }))
        }


    }, [])
    return <MedicalProfileTemplate
        {...state}
        userId={userId}
        tab={tab}
        healthTab={healthTab}
        isFetching={isFetching}
        patient={patient}
        patients={patients}
        onUpdateOrCreateProfile={onUpdateOrCreateProfile}
    />
}

MedicalProfile.getLayout = getMainLayout




export const getServerSideProps = withAuthen(async (context) => {
    return {
        props: {}
    }
})


export default MedicalProfile