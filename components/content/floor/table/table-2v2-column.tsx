import {  memo  } from 'react'
import { useApiTablesContext } from '../../../../pages/ApiContext'
import Chair from "./chair"
import { Table } from "./index"
import Draggable from "react-draggable"

const Table2v2Column = (props: Table) => {
    const tables = useApiTablesContext()

    return (
        <Draggable
            disabled={props.move}
        >
            <div
                className="container-table-2v2-column"
                style={{
                    top: `${props.top}`,
                    left: `${props.left}`,
                    cursor: `${props.move ? 'default' : 'move'}`
                }}
            >
                <Chair
                    top='10px'
                    left='-9px'
                    numberChair={4}
                    indexTable={props.index}
                />
                <Chair
                    top='10px'
                    left='29px'
                    numberChair={1}
                    indexTable={props.index}
                />
                <Chair
                    top='38px'
                    left='-9px'
                    numberChair={2}
                    indexTable={props.index}
                />
                <Chair
                    top='38px'
                    left='29px'
                    numberChair={3}
                    indexTable={props.index}
                />

                <div className="table-2v2-column">{tables[props.index]?.numberTable}</div>
            </div>
        </Draggable>
    )
}
export default memo(Table2v2Column)
