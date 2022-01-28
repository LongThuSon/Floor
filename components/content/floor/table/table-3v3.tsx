import {  memo  } from 'react'
import { useApiTablesContext } from '../../../../pages/ApiContext'
import Draggable from "react-draggable"
import Chair from "./chair"
import { Table } from "./index"

const Table3v3 = (props: Table) => {
    const tables = useApiTablesContext()
    
    return (
        <Draggable
            disabled={props.move}
        >
            <div
                className="container-table-3v3"
                style={{
                    top: `${props.top}`,
                    left: `${props.left}`,
                    cursor: `${props.move ? 'default' : 'move'}`
                }}
            >
                <Chair
                    top='10px'
                    left='-9px'
                    numberChair={6}
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
                    numberChair={5}
                    indexTable={props.index}
                />
                <Chair
                    top='38px'
                    left='29px'
                    numberChair={2}
                    indexTable={props.index}
                />
                <Chair
                    top='66px'
                    left='-9px'
                    numberChair={4}
                    indexTable={props.index}
                />
                <Chair
                    top='66px'
                    left='29px'
                    numberChair={3}
                    indexTable={props.index}
                />

                <div className="table-3v3">{tables[props.index]?.numberTable}</div>
            </div>
        </Draggable>
    )
}
export default memo(Table3v3)
