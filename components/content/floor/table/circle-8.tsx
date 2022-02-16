import { memo } from 'react'
import { useApiTablesContext } from '../../../../pages/ApiContext'
import Draggable from 'react-draggable'
import Chair from "./chair"
import { Table } from "./index"

const Circle8 = (props: Table) => {
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
                className="container-circle-8"
                style={{
                    top: `${props.top}`,
                    left: `${props.left}`,
                    cursor: `${props.move ? 'default' : 'move'}`
                }}
            >
                <Chair
                    top='-6px'
                    left='29px'
                    numberChair={1}
                    indexTable={props.index}
                />
                <Chair
                    top='9px'
                    left='44px'
                    numberChair={2}
                    indexTable={props.index}
                />
                <Chair
                    top='29px'
                    left='44px'
                    numberChair={3}
                    indexTable={props.index}
                />
                <Chair
                    top='44px'
                    left='9px'
                    numberChair={5}
                    indexTable={props.index}
                />
                <Chair
                    top='44px'
                    left='29px'
                    numberChair={4}
                    indexTable={props.index}
                />
                <Chair
                    top='29px'
                    left='-6px'
                    numberChair={6}
                    indexTable={props.index}
                />
                <Chair
                    top='9px'
                    left='-6px'
                    numberChair={7}
                    indexTable={props.index}
                />
                <Chair
                    top='-6px'
                    left='9px'
                    numberChair={8}
                    indexTable={props.index}
                />

                <div
                    className="circle-8"
                    style={{
                        backgroundImage: `linear-gradient(to top, ${props.primary1} ${props.percent}%, ${props.primary2} ${props.percent}%, ${props.primary2})`,
                    }}
                >
                    {tables[props.index]?.numberTable}
                </div>

                {tables[props.index]?.status !== 5 &&
                    <div
                        className='reserv-time-circle-8'
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
export default memo(Circle8)
