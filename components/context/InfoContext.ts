import { createContext, useContext } from "react"

export type InfoContentType = {
    showDetails: boolean,
    setShowDetails: (param: boolean) => void,
    searchField: {  request: { name: string, status: number }  },
    setSearchField: (param: any) => void,
}

export const InfoContext = createContext<InfoContentType>({
    showDetails: false, // set a default value
    setShowDetails: () => { },
    searchField: {  request: { name: 'long', status: 0 }  },
    setSearchField: () => { },

})

export const useInfoContext = () => useContext(InfoContext)