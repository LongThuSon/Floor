import Chair from "./chair"
import { Table } from "./index"

const positionTables = [
    {
        // Chair 1
        top: -9,
        left: 30,
    },
    {   
        // Chair 2
        top: -6,
        left: 47,
    },
    {
        // Chair 3
        top: 5,
        left: 60,
    },
    {
        // Chair 4
        top: 21,
        left: 68,
    },
    {
        // Chair 5
        top: 39,
        left: 68,
    },
    {
        // Chair 6
        top: 55,
        left: 60,
    },
    {
        // Chair 7
        top: 66,
        left: 46,
    },
    {
        // Chair 8
        top: 69,
        left: 28,
    },
    {
        // Chair 9
        top: 65,
        left: 11,
    },
    {
        // Chair 10
        top: 53,
        left: -2,
    },
    {
        // Chair 11
        top: 37,
        left: -9,
    },
    {
        // Chair 12
        top: 20,
        left: -8,
    },
    {
        // Chair 13
        top: 5,
        left: 0,
    },
    {
        // Chair 14
        top: -6,
        left: 13,
    },
]

const Circle14 = (props: Table) => {
    return (
        <div
            className="container-circle-14"
            style={{
                top: `${props.top}`,
                left: `${props.left}`
            }}
        >
            {positionTables.map((positionTable, index) => (
                <Chair
                    key={index}
                    top={`${positionTable.top}px`}
                    left={`${positionTable.left}px`}
                />
            ))}

            <div className="circle-14">{props.number}</div>
        </div>
    )
}
export default Circle14