import { useState, memo } from 'react'
import { useApiTablesContext, useApiUsersContext } from '../../../ApiContext'
import { baseURL_tables } from '../../../ApiContext/baseURL'
import Chair from "./chair"
import { Table } from "./index"
import Draggable from "react-draggable"
import axios from 'axios'
import Save from '@atlaskit/icon/glyph/download'

const Table2v2Column = (props: Table) => {
    const tables = useApiTablesContext()
    const profiles = useApiUsersContext()
    const [position, setPosition] = useState({ top: 0, left: 0 })

    const trackPos = (data: any) => {
        setPosition({ top: props.top + data.y, left: props.left + data.x })
    }

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

    const handleSavePosition = (id: number) => {
        const newPosition = {
            top: position.top,
            left: position.left,
        }

        axios.put(`${baseURL_tables}/${id + 1}`, newPosition)
            .then(res => {
                console.log(res.data)
            })
            .catch(error => {
                console.log('ERROR:', error)
            })
    }

    return (
        <Draggable
            disabled={props.move}
            onDrag={(e, data) => trackPos(data)}
        >
            <div
                className="container-table-2v2-column"
                style={{
                    top: `${props.top}px`,
                    left: `${props.left}px`,
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
                    numberChair={3}
                    indexTable={props.index}
                />
                <Chair
                    top='38px'
                    left='29px'
                    numberChair={2}
                    indexTable={props.index}
                />

                <div
                    className="table-2v2-column"
                    style={{
                        backgroundImage: `linear-gradient(to top, ${props.primary1} ${(tables[props.index]?.status === 0 || tables[props.index]?.status === 1 || tables[props.index]?.status === 2) ? tables[props.index]?.percent : 100}%, ${tables[props.index]?.status === 0 ? 'rgb(220, 239, 245)' : tables[props.index]?.status === 1 ? 'rgb(253, 241, 218)' : tables[props.index]?.status === 2 ? 'rgb(255, 235, 248)' : '#fff'} ${tables[props.index]?.percent}%, ${tables[props.index]?.status === 0 ? 'rgb(220, 239, 245)' : tables[props.index]?.status === 1 ? 'rgb(253, 241, 218)' : tables[props.index]?.status === 2 ? 'rgb(255, 235, 248)' : '#fff'})`,
                    }}
                >
                    {tables[props.index]?.numberTable}
                </div>

                {tables[props.index]?.status !== 5 &&
                    <div
                        className='reserv-time-2v2-column'
                        style={{
                            backgroundColor: `${(profiles[tables[props.index]?.idCustomer - 1]?.status % 6) !== 2 ? '#E9EDF3' : '#FFEFE5'}`,
                            color: `${(profiles[tables[props.index]?.idCustomer - 1]?.status % 6) !== 2 ? '#506690' : '#FF5C00'}`
                        }}
                    >{customerReservTime(tables[props.index]?.timeOrder % 6)}</div>
                }

                {!props.move &&
                    <div
                        className='save-position'
                        onClick={() => handleSavePosition(props.index)}
                    >
                        <Save
                            label='save'
                            size='small'
                            primaryColor='#067E30'
                        />
                    </div>
                }
            </div>
        </Draggable>
    )
}
export default memo(Table2v2Column)
