import { memo } from 'react'
import { useApiTablesContext } from '../../../../pages/ApiContext'
import Draggable from 'react-draggable'
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
    const tables = useApiTablesContext()

    const customerReservTime = (timeOrder: number) => {
        switch (timeOrder) {
            case 0:
                return <div style={{ fontWeight: 600 }}>11.00AM</div>
            case 1:
                return <div style={{ fontWeight: 600 }}>11.30AM</div>
            case 2:
                return <div style={{ fontWeight: 600 }}>12.00PM</div>
            case 3:
                return <div style={{ fontWeight: 600 }}>12.30PM</div>
            case 4:
                return <div style={{ fontWeight: 600 }}>13.00PM</div>
            default:
                return <div style={{ fontWeight: 600 }}>13.30PM</div>
        }
    }

    return (
        <Draggable
            disabled={props.move}
        >
            <div
                className="container-circle-14"
                style={{
                    top: `${props.top}`,
                    left: `${props.left}`,
                    cursor: `${props.move ? 'default' : 'move'}`
                }}
            >
                {positionTables.map((positionTable, index) => (
                    <Chair
                        key={index}
                        top={`${positionTable.top}px`}
                        left={`${positionTable.left}px`}
                        numberChair={index + 1}
                        indexTable={props.index}
                    />
                ))}

                <div
                    className="circle-14"
                    style={{
                        backgroundImage: `linear-gradient(to top, ${props.primary1} ${props.percent}%, ${props.primary2} ${props.percent}%, ${props.primary2})`,
                    }}
                >
                    {tables[props.index]?.numberTable}
                </div>

                {tables[props.index]?.status !== 5 &&
                    <div
                        className='reserv-time-circle-14'
                        style={{
                            backgroundColor: '#E9EDF3',
                            color: '#506690'
                        }}
                    >{customerReservTime(tables[props.index]?.timeOrder % 6)}</div>
                }
            </div>
        </Draggable>
    )
}
export default memo(Circle14)
