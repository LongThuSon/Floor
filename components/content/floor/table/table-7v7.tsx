import Draggable from "react-draggable"
import Chair from "./chair"
import { Table } from "./index"

const positionTables = [10, 38, 66, 94, 122, 150, 178]

const Table7v7 = (props: Table) => {
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
                            top={`${positionTable}px`}
                            left='-9px'
                        />
                        <Chair
                            top={`${positionTable}px`}
                            left='29px'
                        />
                    </div>
                ))}

                <div className="table-7v7">{props.number}</div>
            </div>
        </Draggable>
    )
}
export default Table7v7
