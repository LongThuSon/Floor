import Chair from "./chair"
import { Table } from "./index"



const Circle8 = (props: Table) => {
    return (
        <div
            className="container-circle-8"
            style={{
                top: `${props.top}`,
                left: `${props.left}`
            }}
        >
            <Chair 
                top='-6px'
                left='29px'
            />
            <Chair 
                top='9px'
                left='44px'
            />
            <Chair 
                top='29px'
                left='44px'
            />
            <Chair 
                top='44px'
                left='9px'
            />
            <Chair 
                top='44px'
                left='29px'
            />
            <Chair 
                top='29px'
                left='-6px'
            />
            <Chair 
                top='9px'
                left='-6px'
            />
            <Chair 
                top='-6px'
                left='9px'
            />
            
            <div className="circle-8">{props.number}</div>
        </div>
    )
}
export default Circle8
