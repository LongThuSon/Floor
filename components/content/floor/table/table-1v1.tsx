import { memo } from 'react'
import { useApiTablesContext } from '../../../../pages/ApiContext'
import Chair from "./chair"
import { Table } from "./index"
import Draggable from 'react-draggable'

const Table1v1 = (props: Table) => {
    const tables = useApiTablesContext()

    return (
        <Draggable
            disabled={props.move}
        >
            <div
                className="container-table-1v1"
                style={{
                    top: `${props.top}`,
                    left: `${props.left}`,
                    cursor: `${props.move ? 'default' : 'move'}`
                }}
            >
                <Chair
                    top='-9px'
                    left='10px'
                    numberChair={1}
                    indexTable={props.index}
                />
                <Chair
                    top='29px'
                    left='10px'
                    numberChair={2}
                    indexTable={props.index}
                />

                <div
                    className="table-1v1"
                    style={{
                        backgroundImage: `linear-gradient(to top, ${props.primary1} ${props.percent}%, ${props.primary2} ${props.percent}%, ${props.primary2})`,
                    }}
                >
                    {tables[props.index]?.numberTable}
                </div>
            </div>
        </Draggable >

    )
}
export default memo(Table1v1)
