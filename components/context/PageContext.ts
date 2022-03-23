import { createContext, useContext } from "react"

export type IPageType = {
    enableInfo: boolean,
    setEnableInfo: (param: boolean) => void,
    indexED: number,
    setIndexED: (param: number) => void,
    showZoom: boolean,
    currentPeople: number,
    setCurrentPeople: (param: number) => void,
    changedNTable: number,
    setChangedNTable: (param: number) => void,
    setShowZoom: (param: boolean) => void,
    winSize: {  width: number, height: number },
    // setWinSize: (param: {  width: number, height: number }) => void,
}

export const PageContext = createContext<IPageType>({
    enableInfo: true, // set a default value
    setEnableInfo: () => { },
    indexED: -1,
    setIndexED: () => { },
    showZoom: false,
    setShowZoom: () => { },
    currentPeople: 1,
    setCurrentPeople: () => { },
    changedNTable: 105,
    setChangedNTable: () => { },
    winSize: {  width: 1500, height: 677 },
    // setWinSize: () => { },
})

export const usePageContext = () => useContext(PageContext)