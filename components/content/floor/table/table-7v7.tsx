import {  memo  } from 'react'
import { useApiTablesContext } from '../../../../pages/ApiContext'
import Draggable from "react-draggable"
import Chair from "./chair"
import { Table } from "./index"

const positionTables = [
    {
        top: 10,
        numberLeft: 14,
        numberRight: 1
    },
    {
        top: 38,
        numberLeft: 13,
        numberRight: 2
    },
    {
        top: 66,
        numberLeft: 12,
        numberRight: 3
    },
    {
        top: 94,
        numberLeft: 11,
        numberRight: 4
    },
    {
        top: 122,
        numberLeft: 10,
        numberRight: 5
    },
    {
        top: 150,
        numberLeft: 9,
        numberRight: 6
    },
    {
        top: 178,
        numberLeft: 8,
        numberRight: 7
    }
]

const Table7v7 = (props: Table) => {
    const tables = useApiTablesContext()

    return (
        <Draggable
            disabled={props.move}
        >
            <div
                className="container-table-7v7"
                style={{
                    top: `${props.top}`,
                    left: `${props.left}`,
                    cursor: `${props.move ? 'default' : 'move'}`
                }}
            >
                {positionTables.map((positionTable, index) => (
                    <div key={index}>
                        <Chair
                            top={`${positionTable.top}px`}
                            left='-9px'
                            numberChair={positionTable.numberLeft}
                            indexTable={props.index}
                        />
                        <Chair
                            top={`${positionTable.top}px`}
                            left='29px'
                            numberChair={positionTable.numberRight}
                            indexTable={props.index}
                        />
                    </div>
                ))}

                <div className="table-7v7">{tables[props.index]?.numberTable}</div>
            </div>
        </Draggable>
    )
}
export default memo(Table7v7)
