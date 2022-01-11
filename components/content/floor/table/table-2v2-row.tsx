import Draggable from "react-draggable"
import Chair from "./chair"
import { Table } from "./index"

const Table2v2Row = (props: Table) => {
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
                />
                <Chair
                    top='29px'
                    left='10px'
                />
                <Chair
                    top='-9px'
                    left='38px'
                />
                <Chair
                    top='29px'
                    left='38px'
                />

                <div className="table-2v2-row">{props.number}</div>
            </div>
        </Draggable>
    )
}
export default Table2v2Row
