import { useState, useEffect, createContext } from "react"
import axios from "axios"
import { IApiContextProps } from './ApiContextProps.interface'
import { baseURL_tables } from './baseURL'
import { useResetApiContext } from './resetApiContext'
import { table } from './table'

interface ITable {
    id: number,
    numberTable: number,
    seat: number,
    status: number,
    timeOrder: number,
    idCustomer: number,
    quantity: number,
    timeList: number[],
    timeSeated: number,
}

interface ITableFD {
    id: number,
    tables: ITable[],
    date: string,
}

const ApiTableFDContextDefault = [
    {
        id: 1,
        tables: [
            {
                id: 1,
                numberTable: 106,
                seat: 2,
                status: 0,
                timeOrder: 0,
                idCustomer: 5,
                quantity: 2,
                timeList: [0],
                timeSeated: 0,
            },
        ],
        date: '2022-03-21',
    },
]

export const ApiTablesContext = createContext<ITableFD[]>(ApiTableFDContextDefault)

const ApiTablesContextProvider = ({ children }: IApiContextProps) => {
    const [tables, setTables] = useState<ITableFD[]>([])
    const { reset, setReset, date } = useResetApiContext()

    useEffect(() => {
        axios.get<ITableFD[]>(`${baseURL_tables}?date=${date}`).then((response) => {
            // console.log(response.data)

            if (response.data.length === 0) {
                axios.post<ITableFD[]>(baseURL_tables, { tables: table, date: date }).then((response) => {
                    // console.log(response.data)
                    setTables(response.data)  
                    setReset(!reset)
                })
                    .catch(error => {
                        console.log('ERROR:', error)
                    })
            } else {
                setTables(response.data)
            }
        })
            .catch(error => {
                console.log('ERROR:', error)
            })
    }, [reset, date])

    return (
        <ApiTablesContext.Provider value={tables}>
            {console.log(tables)}
            {children}
        </ApiTablesContext.Provider>
    )
}

export default ApiTablesContextProvider