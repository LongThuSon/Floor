import { createContext, useContext } from "react"

export type IContentContextType = {
    move: boolean,
    setMove: (param: boolean) => void,
    indexED: number,
    setIndexED: (param: number) => void,
    time: string,
    // setTime: (param: string) => void,
    currentPeople: number,
    setCurrentPeople: (param: number) => void,
    changedNTable: number,
    setChangedNTable: (param: number) => void,
}

export const ContentContext = createContext<IContentContextType>({
    move: true,
    setMove: () => { },
    indexED: -1,
    setIndexED: () => { },
    time: '',
    // setTime: () => { },
    currentPeople: 1,
    setCurrentPeople: () => { },
    changedNTable: 105,
    setChangedNTable: () => { },
})

export const useContentContext = () => useContext(ContentContext)