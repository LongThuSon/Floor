import { useState, useEffect, createContext, useContext } from "react"
import axios from "axios"

export interface Profile {
    id: number,
    username: string,
    firstname: string,
    lastname: string,
    quantity: number,
    numberTable: number,
    phone: number,
    eventTag: string,
    deposit: string,
    status: number,
    timeOrder: number
}

type TProfileList = Profile[]

interface ProfileListProps {
    items: TProfileList
}

export const APIContext = createContext<ProfileListProps>({
    items: [
        {
            id: 1,
            username: 'Long Nguyen',
            firstname: 'Nguyen',
            lastname: 'Long',
            quantity: 4,
            numberTable: 106,
            phone: 0937149201,
            eventTag: 'Birthday',
            deposit: '4 x 50$',
            status: 7,
            timeOrder: 3
        }
    ]

})

const baseURL = "https://61d2e828b4c10c001712b67f.mockapi.io/api/users";

    const [profiles, setProfiles] = useState<TProfileList>([])

    useEffect(() => {
        axios.get<TProfileList>(baseURL).then((response) => {
            console.log(response.data)
            setProfiles(response.data)
        })
            .catch(error => {
                console.log('ERROR:', error)
            })
    }, [])

    if (!profiles) return null;


export const useAPIContext = () => useContext(APIContext)