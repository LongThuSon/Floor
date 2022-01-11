import Chair from "./chair"
import { Table } from "./index"
import Draggable from 'react-draggable'


const Table1v1 = (props: Table) => {
    return (
        <Draggable
            disabled={props.move}
        >
            <div
                className="container-table-1v1"
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

                <div className="table-1v1">{props.number}</div>
            </div>
        </Draggable>

    )
}
export default Table1v1
