import {  memo  } from 'react'
import { useApiTablesContext } from '../../../../pages/ApiContext'
import Draggable from 'react-draggable'
import Chair from "./chair"
import { Table } from "./index"

const Circle8 = (props: Table) => {
    const tables = useApiTablesContext()

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
                    numberChair={4}
                    indexTable={props.index}
                />
                <Chair
                    top='44px'
                    left='29px'
                    numberChair={5}
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

                <div className="circle-8">{tables[props.index]?.numberTable}</div>
            </div>
        </Draggable>
    )
}
export default memo(Circle8)
