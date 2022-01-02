import Chair from "./chair"
import { Table } from "./index"

const Table3v3 = (props: Table) => {
    return (
        <div
            className="container-table-3v3"
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
            <Chair 
                top='66px'
                left='-9px'
            />
            <Chair 
                top='66px'
                left='29px'
            />
            
            <div className="table-3v3">{props.number}</div>
        </div>
    )
}
export default Table3v3
