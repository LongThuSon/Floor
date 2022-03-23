import { useContext, useState } from "react"
import ApiUsersContextProvider, { ApiUsersContext } from './ApiUsersContext'
import ApiTablesContextProvider, { ApiTablesContext } from './ApiTableContext'
import ApiPositionsContextProvider, { ApiPositionsContext } from './ApiPositionContext'
import { ResetApiContext } from './resetApiContext'
import { IApiContextProps } from './ApiContextProps.interface'

export const useApiUsersContext = () => useContext(ApiUsersContext)
export const useApiTablesContext = () => useContext(ApiTablesContext)
export const useApiPositionsContext = () => useContext(ApiPositionsContext)

const ApiContextProvider = ({ children }: IApiContextProps) => {
    const [reset, setReset] = useState(false)
    const [date, setDate] = useState('')

    return (
        <ResetApiContext.Provider
            value={{ reset, setReset, date, setDate }}
        >
            <ApiUsersContextProvider>
                <ApiTablesContextProvider>
                    <ApiPositionsContextProvider>
                        {children}
                    </ApiPositionsContextProvider>
                </ApiTablesContextProvider>
            </ApiUsersContextProvider>
        </ResetApiContext.Provider>
    )
}

export default ApiContextProvider

