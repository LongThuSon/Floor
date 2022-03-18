import { createContext, useContext } from "react"

export type IPageType = {
    enableInfo: boolean,
    setEnableInfo: (param: boolean) => void,
    showZoom: boolean,
    setShowZoom: (param: boolean) => void,
    winSize: {  width: number, height: number },
    // setWinSize: (param: {  width: number, height: number }) => void,
}

export const PageContext = createContext<IPageType>({
    enableInfo: true, // set a default value
    setEnableInfo: () => { },
    showZoom: false,
    setShowZoom: () => { },
    winSize: {  width: 1500, height: 677 },
    // setWinSize: () => { },
})

export const usePageContext = () => useContext(PageContext)