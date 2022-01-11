import Draggable from 'react-draggable'
import Chair from "./chair"
import { Table } from "./index"

const Circle6 = (props: Table) => {
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
                />
                <Chair
                    top='3px'
                    left='35px'
                />
                <Chair
                    top='26px'
                    left='35px'
                />
                <Chair
                    top='39px'
                    left='15px'
                />
                <Chair
                    top='3px'
                    left='-5px'
                />
                <Chair
                    top='26px'
                    left='-5px'
                />

                <div className="circle-6">{props.number}</div>
            </div>
        </Draggable>
    )
}
export default Circle6
