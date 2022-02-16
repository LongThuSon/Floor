import { memo } from 'react'
import { useApiTablesContext } from '../../../../pages/ApiContext'
import Chair from "./chair"
import { Table } from "./index"
import Draggable from "react-draggable"

const Table2v2Column = (props: Table) => {
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
                    numberChair={4}
                    indexTable={props.index}
                />
                <Chair
                    top='10px'
                    left='29px'
                    numberChair={1}
                    indexTable={props.index}
                />
                <Chair
                    top='38px'
                    left='-9px'
                    numberChair={2}
                    indexTable={props.index}
                />
                <Chair
                    top='38px'
                    left='29px'
                    numberChair={3}
                    indexTable={props.index}
                />

                <div
                    className="table-2v2-column"
                    style={{
                        backgroundImage: `linear-gradient(to top, ${props.primary1} ${props.percent}%, ${props.primary2} ${props.percent}%, ${props.primary2})`,
                    }}
                >
                    {tables[props.index]?.numberTable}
                </div>

                {tables[props.index]?.status !== 5 &&
                    <div
                        className='reserv-time-2v2-column'
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
export default memo(Table2v2Column)
