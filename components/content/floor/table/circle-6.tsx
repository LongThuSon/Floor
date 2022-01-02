import Chair from "./chair"
import { Table } from "./index"

const Circle6 = (props: Table) => {
    return (
        <div
            className="container-circle-6"
            style={{
                top: `${props.top}`,
                left: `${props.left}`
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
    )
}
export default Circle6
