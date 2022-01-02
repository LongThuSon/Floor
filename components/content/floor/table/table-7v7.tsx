import Chair from "./chair"
import { Table } from "./index"

const positionTables = [10, 38, 66, 94, 122, 150, 178]

const Table7v7 = (props: Table) => {
    return (
        <div
            className="container-table-7v7"
            style={{
                top: `${props.top}`,
                left: `${props.left}`
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
    )
}
export default Table7v7
