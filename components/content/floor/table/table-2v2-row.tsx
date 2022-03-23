import { useState, useEffect, memo } from 'react'
import Draggable from "react-draggable"
import { useApiTablesContext, useApiUsersContext } from '../../../context/ApiContext'
import {  usePageContext  } from '../../../context/PageContext'
import {  useContentContext  } from '../../../context/ContentContext'
import Chair from "./chair"
import { Table, colorTable } from "./index"
import { baseURL_positions } from '../../../context/ApiContext/baseURL'
import axios from 'axios'
import Save from '@atlaskit/icon/glyph/download'

const Table2v2Row = (props: Table) => {
    const tables = useApiTablesContext()
    const profiles = useApiUsersContext()
    const { winSize, currentPeople, indexED, changedNTable } = usePageContext()
    const {  time  } = useContentContext()
    const [position, setPosition] = useState({ top: 0, left: 0 })

    useEffect(() => {
        colorTable(props.index + 1, tables[0]?.tables[props.index]?.status, tables[0]?.tables[props.index]?.timeSeated, tables[0]?.tables[props.index]?.updateBack, tables[0]?.tables[props.index]?.idCustomer)
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
        const newTable = {
            top: position.top,
            left: position.left, 
        }

        axios.put(`${baseURL_positions}/${id + 1}`, newTable)
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
                className="container-table-2v2-row"
                style={{
                    top: `${((props.top) / (667)) * (winSize.height)}px`,
                    left: `${((props.left) / (1535)) * (winSize.width)}px`,
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
                    numberChair={4}
                    indexTable={props.index}
                />
                <Chair
                    top='-9px'
                    left='38px'
                    numberChair={2}
                    indexTable={props.index}
                />
                <Chair
                    top='29px'
                    left='38px'
                    numberChair={3}
                    indexTable={props.index}

                />

                <div
                    className="table-2v2-row"
                    style={{
                        backgroundImage: `linear-gradient(to top, ${props.primary1} ${(tables[0]?.tables[props.index]?.status === 0 || tables[0]?.tables[props.index]?.status === 1 || tables[0]?.tables[props.index]?.status === 2) ? tables[0]?.tables[props.index]?.percent : 100}%, ${tables[0]?.tables[props.index]?.status === 0 ? 'rgb(220, 239, 245)' : tables[0]?.tables[props.index]?.status === 1 ? 'rgb(253, 241, 218)' : tables[0]?.tables[props.index]?.status === 2 ? 'rgb(255, 235, 248)' : '#fff'} ${tables[0]?.tables[props.index]?.percent}%, ${tables[0]?.tables[props.index]?.status === 0 ? 'rgb(220, 239, 245)' : tables[0]?.tables[props.index]?.status === 1 ? 'rgb(253, 241, 218)' : tables[0]?.tables[props.index]?.status === 2 ? 'rgb(255, 235, 248)' : '#fff'})`,
                        color: `${tables[0]?.tables[props.index]?.status === 7 ? '#fff' : (currentPeople > tables[0]?.tables[props.index]?.quantity && tables[0]?.tables[props.index]?.status === 5) ? 'rgba(223, 71, 89, 0.5)' : '#869AB8'}`,
                        border: `${(105 + profiles[indexED]?.numberTable % 18 === tables[0]?.tables[props.index]?.numberTable) ? '2px dashed #506690' : (changedNTable === tables[0]?.tables[props.index]?.numberTable) ? '2px solid #506690' : 'none'}`,
                    }}
                >
                    {tables[0]?.tables[props.index]?.numberTable}
                </div>

                {tables[0]?.tables[props.index]?.status !== 5 &&
                    <div
                        className='reserv-time-2v2-row'
                        style={{
                            backgroundColor: `${tables[0]?.tables[props.index]?.status === 7 ? '#DF4759' : (profiles[tables[0]?.tables[props.index]?.idCustomer - 1]?.status % 6) !== 2 ? '#E9EDF3' : '#FFEFE5'}`,
                            color: `${tables[0]?.tables[props.index]?.status === 7 ? '#fff' : (profiles[tables[0]?.tables[props.index]?.idCustomer - 1]?.status % 6) !== 2 ? '#506690' : '#FF5C00'}`
                        }}
                    >{customerReservTime(tables[0]?.tables[props.index]?.timeOrder % 6)}</div>
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
export default memo(Table2v2Row)
