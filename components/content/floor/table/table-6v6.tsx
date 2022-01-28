import {  memo  } from 'react'
import { useApiTablesContext } from '../../../../pages/ApiContext'
import Draggable from "react-draggable"
import Chair from "./chair"
import { Table } from "./index"

const positionTables = [
    {
        left: 10,
        numberTop: 1,
        numberBottom: 7
    },
    {
        left: 38,
        numberTop: 2,
        numberBottom: 8
    },
    {
        left: 66,
        numberTop: 3,
        numberBottom: 9
    },
    {
        left: 94,
        numberTop: 4,
        numberBottom: 10
    },
    {
        left: 122,
        numberTop: 5,
        numberBottom: 11
    },
    {
        left: 150,
        numberTop: 6,
        numberBottom: 12
    }
]


const Table6v6 = (props: Table) => {
    const tables = useApiTablesContext()

    return (
        <Draggable
            disabled={props.move}
        >
            <div
                className="container-table-6v6"
                style={{
                    top: `${props.top}`,
                    left: `${props.left}`,
                    cursor: `${props.move ? 'default' : 'move'}`
                }}
            >
                {positionTables.map((positionTable, index) => (
                    <div key={index}>
                        <Chair
                            top='-9px'
                            left={`${positionTable.left}px`}
                            numberChair={positionTable.numberTop}
                            indexTable={props.index}
                        />
                        <Chair
                            top='29px'
                            left={`${positionTable.left}px`}
                            numberChair={positionTable.numberBottom}
                            indexTable={props.index}
                        />
                    </div>
                ))}

                <div className="table-6v6">{tables[props.index]?.numberTable}</div>
            </div>
        </Draggable>
    )
}
export default memo(Table6v6)
