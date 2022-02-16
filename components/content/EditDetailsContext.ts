import { createContext, useContext } from "react"

export type IEditDetailsType = {
    indexED: number,
    setIndexED: (param: number) => void,
}

export const EditDetailsContext = createContext<IEditDetailsType>({
    indexED: -1, // set a default value
    setIndexED: () => { },
})

export const useEditDetailsContext = () => useContext(EditDetailsContext)