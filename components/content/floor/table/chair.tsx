import {  memo  } from 'react'
import { useApiTablesContext } from '../../../context/ApiContext'
import {  useContentContext  } from '../../../context/ContentContext'
import { Chair } from "./index"

const Chair = (props : Chair) => {
    const tables = useApiTablesContext()
    const { currentPeople } = useContentContext()

    return (
        <div
                className="chair"
                style={{
                    position: "absolute",
                    top: `${props.top}`,
                    left: `${props.left}`,
                    backgroundColor: `${(props.numberChair <= tables[props.indexTable]?.seat) ? '#007296' : (currentPeople > tables[props.indexTable]?.quantity && tables[props.indexTable]?.status === 5) ? 'rgba(223, 71, 89, 0.5)' : 'rgba(0, 40, 100, 0.12)'}`
                }}
            >
            </div>
    )
}
export default memo(Chair)