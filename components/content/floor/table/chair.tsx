import {  memo  } from 'react'
import { useApiUsersContext, useApiTablesContext } from '../../../ApiContext'
import { Chair } from "./index"

const Chair = (props : Chair) => {
    const tables = useApiTablesContext()

    return (
        <div
                className="chair"
                style={{
                    position: "absolute",
                    top: `${props.top}`,
                    left: `${props.left}`,
                    backgroundColor: `${(props.numberChair <= tables[props.indexTable]?.seat) ? '#007296' : 'rgba(0, 40, 100, 0.12)'}`
                }}
            >
            </div>
    )
}
export default memo(Chair)