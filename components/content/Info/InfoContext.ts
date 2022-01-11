import { createContext, useContext } from "react"

export type InfoContentType = {
    showDetails: boolean,
    setShowDetails: (param: boolean) => void
    
}

export const InfoContext = createContext<InfoContentType>({
    showDetails: false, // set a default value
    setShowDetails: () => { },

})

export const useInfoContext = () => useContext(InfoContext)