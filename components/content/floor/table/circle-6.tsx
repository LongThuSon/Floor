import {  memo  } from 'react'
import { useApiTablesContext } from '../../../../pages/ApiContext'
import Draggable from 'react-draggable'
import Chair from "./chair"
import { Table } from "./index"

const Circle6 = (props: Table) => {
    const tables = useApiTablesContext()
    
    return (
        <Draggable
            disabled={props.move}
        >
            <div
                className="container-circle-6"
                style={{
                    top: `${props.top}`,
                    left: `${props.left}`,
                    cursor: `${props.move ? 'default' : 'move'}`
                }}
            >
                <Chair
                    top='-9px'
                    left='15px'
                    numberChair={1}
                    indexTable={props.index}
                />
                <Chair
                    top='3px'
                    left='35px'
                    numberChair={2}
                    indexTable={props.index}
                />
                <Chair
                    top='26px'
                    left='35px'
                    numberChair={3}
                    indexTable={props.index}
                />
                <Chair
                    top='39px'
                    left='15px'
                    numberChair={4}
                    indexTable={props.index}
                />
                <Chair
                    top='3px'
                    left='-5px'
                    numberChair={5}
                    indexTable={props.index}
                />
                <Chair
                    top='26px'
                    left='-5px'
                    numberChair={6}
                    indexTable={props.index}
                />

                <div className="circle-6">{tables[props.index]?.numberTable}</div>
            </div>
        </Draggable>
    )
}
export default memo(Circle6)
