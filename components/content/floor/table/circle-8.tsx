import { useState, useEffect, memo } from 'react'
import { useApiTablesContext, useApiUsersContext } from '../../../context/ApiContext'
import {  usePageContext  } from '../../../context/PageContext'
import {  useContentContext  } from '../../../context/ContentContext'
import Draggable from 'react-draggable'
import Chair from "./chair"
import { Table, colorTable } from "./index"
import { baseURL_tables } from '../../../context/ApiContext/baseURL'
import axios from 'axios'
import Save from '@atlaskit/icon/glyph/download'

const Circle8 = (props: Table) => {
    const tables = useApiTablesContext()
    const profiles = useApiUsersContext()
    const { winSize } = usePageContext()
    const {  time, currentPeople, indexED, changedNTable  } = useContentContext()
    const [position, setPosition] = useState({ top: 0, left: 0 })

    useEffect(() => {
        colorTable(props.index + 1, tables[props.index]?.status, tables[props.index]?.timeSeated, tables[props.index]?.updateBack, tables[props.index]?.idCustomer)
    }, [time])

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
                className="container-circle-8"
                style={{
                    top: `${((props.top) / (667)) * (winSize.height)}px`,
                    left: `${((props.left) / (1535)) * (winSize.width)}px`,
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
                        backgroundImage: `linear-gradient(to top, ${props.primary1} ${(tables[props.index]?.status === 0 || tables[props.index]?.status === 1 || tables[props.index]?.status === 2) ? tables[props.index]?.percent : 100}%, ${tables[props.index]?.status === 0 ? 'rgb(220, 239, 245)' : tables[props.index]?.status === 1 ? 'rgb(253, 241, 218)' : tables[props.index]?.status === 2 ? 'rgb(255, 235, 248)' : '#fff'} ${tables[props.index]?.percent}%, ${tables[props.index]?.status === 0 ? 'rgb(220, 239, 245)' : tables[props.index]?.status === 1 ? 'rgb(253, 241, 218)' : tables[props.index]?.status === 2 ? 'rgb(255, 235, 248)' : '#fff'})`,
                        color: `${tables[props.index]?.status === 7 ? '#fff' : (currentPeople > tables[props.index]?.quantity && tables[props.index]?.status === 5) ? 'rgba(223, 71, 89, 0.5)' : '#869AB8'}`,
                        border: `${(105 + profiles[indexED]?.numberTable % 18 === tables[props.index]?.numberTable) ? '2px dashed #506690' : (changedNTable === tables[props.index]?.numberTable) ? '2px solid #506690' : 'none'}`,
                    }}
                >
                    {tables[props.index]?.numberTable}
                </div>

                {tables[props.index]?.status !== 5 &&
                    <div
                        className='reserv-time-circle-8'
                        style={{
                            backgroundColor: `${tables[props.index]?.status === 7 ? '#DF4759' : (profiles[tables[props.index]?.idCustomer - 1]?.status % 6) !== 2 ? '#E9EDF3' : '#FFEFE5'}`,
                            color: `${tables[props.index]?.status === 7 ? '#fff' : (profiles[tables[props.index]?.idCustomer - 1]?.status % 6) !== 2 ? '#506690' : '#FF5C00'}`
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
export default memo(Circle8)
