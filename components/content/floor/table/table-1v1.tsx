import Chair from "./chair"
import { Table } from "./index"

const Table1v1 = (props: Table) => {
    return (
        <div
            className="container-table-1v1"
            style={{
                top: `${props.top}`,
                left: `${props.left}`
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
    )
}
export default Table1v1
