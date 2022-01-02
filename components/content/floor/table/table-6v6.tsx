import Chair from "./chair"
import { Table } from "./index"

const positionTables = [10, 38, 66, 94, 122, 150]


const Table6v6 = (props: Table) => {
    return (
        <div
            className="container-table-6v6"
            style={{
                top: `${props.top}`,
                left: `${props.left}`
            }}
        >
            {positionTables.map((positionTable, index) => (
                <div key={index}>
                    <Chair
                        top='-9px'
                        left={`${positionTable}px`}
                    />
                    <Chair
                        top='29px'
                        left={`${positionTable}px`}
                    />
                </div>
            ))}
            
            <div className="table-6v6">{props.number}</div>
        </div>
    )
}
export default Table6v6
