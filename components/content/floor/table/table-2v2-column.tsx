import Chair from "./chair"
import { Table } from "./index"

const Table2v2Column = (props: Table) => {
    return (
        <div
            className="container-table-2v2-column"
            style={{
                top: `${props.top}`,
                left: `${props.left}`
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
    )
}
export default Table2v2Column
