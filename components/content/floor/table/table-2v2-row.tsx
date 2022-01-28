import {  memo  } from 'react'
import { useApiTablesContext } from '../../../../pages/ApiContext'
import Draggable from "react-draggable"
import Chair from "./chair"
import { Table } from "./index"

const Table2v2Row = (props: Table) => {
    const tables = useApiTablesContext()

    return (
        <Draggable
            disabled={props.move}
        >
            <div
                className="container-table-2v2-row"
                style={{
                    top: `${props.top}`,
                    left: `${props.left}`,
                    cursor: `${props.move ? 'default' : 'move'}`
                }}
            >
                <Chair
                    top='-9px'
                    left='10px'
                    numberChair={1}
                    indexTable={props.index}
                />
                <Chair
                    top='29px'
                    left='10px'
                    numberChair={2}
                    indexTable={props.index}
                />
                <Chair
                    top='-9px'
                    left='38px'
                    numberChair={3}
                    indexTable={props.index}
                />
                <Chair
                    top='29px'
                    left='38px'
                    numberChair={4}
                    indexTable={props.index}

                />

                <div className="table-2v2-row">{tables[props.index]?.numberTable}</div>
            </div>
        </Draggable>
    )
}
export default memo(Table2v2Row)
