import Chair from "./chair"
import { Table } from "./index"
import Draggable from "react-draggable"

const Table2v2Column = (props: Table) => {
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
                />
                <Chair
                    top='10px'
                    left='29px'
                />
                <Chair
                    top='38px'
                    left='-9px'
                />
                <Chair
                    top='38px'
                    left='29px'
                />

                <div className="table-2v2-column">{props.number}</div>
            </div>
        </Draggable>
    )
}
export default Table2v2Column
