import { useContext, useState } from "react"
import ApiUsersContextProvider, { ApiUsersContext } from './ApiUsersContext'
import ApiTablesContextProvider, { ApiTablesContext } from './ApiTablesContext'
import { ResetApiContext } from './resetApiContext'
import { IApiContextProps } from './ApiContextProps.interface'

export const useApiUsersContext = () => useContext(ApiUsersContext)
export const useApiTablesContext = () => useContext(ApiTablesContext)

const ApiContextProvider = ({ children }: IApiContextProps) => {
    const [reset, setReset] = useState(false)

    return (
        <ResetApiContext.Provider
            value={{ reset, setReset }}
        >
            <ApiUsersContextProvider>
                <ApiTablesContextProvider>
                    {children}
                </ApiTablesContextProvider>
            </ApiUsersContextProvider>
        </ResetApiContext.Provider>
    )
}

export default ApiContextProvider

