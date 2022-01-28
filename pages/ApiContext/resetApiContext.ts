import { createContext, useContext } from "react"

export type IResetApiContextType = {
    reset: boolean,
    setReset: (param: boolean) => void,
}

export const ResetApiContext = createContext<IResetApiContextType>({
    reset: false, // set a default value
    setReset: () => { },
})

export const useResetApiContext = () => useContext(ResetApiContext)