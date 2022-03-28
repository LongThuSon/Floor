import { useState, useEffect, createContext } from "react"
import axios from "axios"
import { IApiContextProps } from './ApiContextProps.interface'
import { baseURL_positions } from './baseURL'
import { useResetApiContext } from './resetApiContext'

interface IPosition {
    id: number,
    top: number,
    left: number,
    percent: number,
    updateBack: number,
}

const ApiPositionsContextDefault = [
    {
        id: 1,
        top: 50,
        left: 380,
        percent: 0,
        updateBack: 0,
    },
]

export const ApiPositionsContext = createContext<IPosition[]>(ApiPositionsContextDefault)

const ApiPositionsContextProvider = ({ children }: IApiContextProps) => {
    const [TPositions, setTPositions] = useState<IPosition[]>([])
    const { reset, date } = useResetApiContext()

    useEffect(() => {
        axios.get<IPosition[]>(baseURL_positions).then((response) => {
            // console.log(response.data)
            setTPositions(response.data)
        })
            .catch(error => {
                console.log('ERROR:', error)
            })
    }, [reset, date])

    return (
        <ApiPositionsContext.Provider value={TPositions}>
            {children}
        </ApiPositionsContext.Provider>
    )
}

export default ApiPositionsContextProvider