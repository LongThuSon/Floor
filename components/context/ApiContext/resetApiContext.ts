import { createContext, useContext } from "react"

export type IResetApiContextType = {
    reset: boolean,
    setReset: (param: boolean) => void,
    date: string,
    setDate: (param: string) => void,
}

export const ResetApiContext = createContext<IResetApiContextType>({
    reset: false, // set a default value
    setReset: () => { },
    date: '2022-03-21',
    setDate: () => { },
})

export const useResetApiContext = () => useContext(ResetApiContext)

