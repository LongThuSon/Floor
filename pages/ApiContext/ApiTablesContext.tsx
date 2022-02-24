import { useState, useEffect, createContext } from "react"
import axios from "axios"
import { IApiContextProps } from './ApiContextProps.interface'
import { baseURL_tables } from './baseURL'
import { useResetApiContext } from './resetApiContext'

interface ITable {
    id: number,
    numberTable: number,
    seat: number,
    status: number,
    percent: number,
    timeOrder: number,
    top: number,
    left: number,
}

const ApiTablesContextDefault = [
    {
        id: 1,
        numberTable: 106,
        seat: 2,
        status: 0,
        percent: 0,
        timeOrder: 0,
        top: 50,
        left: 380,
    },
]

export const ApiTablesContext = createContext<ITable[]>(ApiTablesContextDefault)

const ApiTablesContextProvider = ({ children }: IApiContextProps) => {
    const [tables, setTables] = useState<ITable[]>([])
    const { reset } = useResetApiContext()

    useEffect(() => {
        // const getTablesApi = async () => {
        //     try {
        //         const response = await axios.get<ITable[]>(baseURL_tables)
        //             .then((response) => {
        //                 console.log(response.data)
        //                 setTables(response.data)
        //             })
        //     } catch (error) {
        //         console.log(error)
        //     }
        // }
        // getTablesApi()

        axios.get<ITable[]>(baseURL_tables).then((response) => {
            console.log(response.data)
            setTables(response.data)
        })
            .catch(error => {
                console.log('ERROR:', error)
            })
    }, [reset])

    return (
        <ApiTablesContext.Provider value={tables}>
            {children}
        </ApiTablesContext.Provider>
    )
}

export default ApiTablesContextProvider

