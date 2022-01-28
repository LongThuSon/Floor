import { createContext, useContext } from "react"

export type MoveContentType = {
    move: boolean,
}

export const MoveContext = createContext<MoveContentType>({
    move: true, // set a default value
})

export const useMoveContext = () => useContext(MoveContext)