import { useState, useEffect, createContext } from "react"
import axios from "axios"
import {   IApiContextProps   } from './ApiContextProps.interface'
import { baseURL_users } from './baseURL'
import { useResetApiContext } from './resetApiContext'

interface IUser {
    id: number,
    username: string,
    firstname: string,
    lastname: string,
    quantity: number,
    numberTable: number,
    phone: string,
    eventTag: string,
    deposit: string,
    status: number,
    timeOrder: number,
    occasion: string[],
    otherOccasion: string,
    timeLate: number,
    noShow: boolean,
    date: string,
}

const ApiUsersContextDefault = [
    {
        id: 1,
        username: 'Long Nguyen',
        firstname: 'Nguyen',
        lastname: 'Long',
        quantity: 2,
        numberTable: 106,
        phone: "495-985-1716",
        eventTag: 'Birthday',
        deposit: '3 x 50$',
        status: 7,
        timeOrder: 3,
        occasion: [],
        otherOccasion: '',
        timeLate: 0,
        noShow: false,
        date: '2022-03-21'
    },
]

export const ApiUsersContext = createContext<IUser[]>(ApiUsersContextDefault)

const ApiUsersContextProvider = ({ children }: IApiContextProps) => {
    const [profiles, setProfiles] = useState<IUser[]>([])
    const { reset, date } = useResetApiContext()

    useEffect(() => {
        axios.get<IUser[]>(baseURL_users).then((response) => {
            // console.log(response.data)
            setProfiles(response.data)
        })
            .catch(error => {
                console.log('ERROR:', error)
            })
    }, [reset, date])

    return (
        <ApiUsersContext.Provider value={profiles}>
            {console.log(profiles)}
            {children}
        </ApiUsersContext.Provider>
    )
}

export default ApiUsersContextProvider

