import { useState, useEffect, memo } from 'react'
import { useApiTablesContext, useApiUsersContext, useApiPositionsContext } from '../../../context/ApiContext'
import { useResetApiContext } from '../../../context/ApiContext/resetApiContext'
import { usePageContext } from '../../../context/PageContext'
import { useContentContext } from '../../../context/ContentContext'
import Draggable from "react-draggable"
import Chair from "./chair"
import { Table } from "./index"
import { baseURL_positions, baseURL_users } from '../../../context/ApiContext/baseURL'
import axios from 'axios'
import Save from '@atlaskit/icon/glyph/download'

const positionTables = [
    {
        top: 10,
        numberLeft: 14,
        numberRight: 1
    },
    {
        top: 38,
        numberLeft: 13,
        numberRight: 2
    },
    {
        top: 66,
        numberLeft: 12,
        numberRight: 3
    },
    {
        top: 94,
        numberLeft: 11,
        numberRight: 4
    },
    {
        top: 122,
        numberLeft: 10,
        numberRight: 5
    },
    {
        top: 150,
        numberLeft: 9,
        numberRight: 6
    },
    {
        top: 178,
        numberLeft: 8,
        numberRight: 7
    }
]

const Table7v7 = (props: Table) => {
    const tables = useApiTablesContext()
    const profiles = useApiUsersContext()
    const TPositions = useApiPositionsContext()
    const { reset } = useResetApiContext()
    const { winSize, currentPeople, indexED, changedNTable } = usePageContext()
    const { time } = useContentContext()
    const [position, setPosition] = useState({ top: props.top, left: props.left })

    useEffect(() => {
        if (tables.length === 1) {
            colorTable(props.index, tables[0]?.tables[props.index]?.status, tables[0]?.tables[props.index]?.timeSeated, TPositions[props.index]?.updateBack, tables[0]?.tables[props.index]?.idCustomer)
        }
    }, [time, reset])

    const colorTable = (index: number, status: number, timeSeated: number, updateBack: number, idCustomer: number) => {
        if (status === 0 || status === 1 || status === 2) {
            let currentTime = new Date().getTime()
            
            if (currentTime - timeSeated <= 600000 && updateBack !== 1) {
                axios.put(`${baseURL_positions}/${index + 1}`, {
                    percent: 16, updateBack: 1
                })
                    .then(res => {
                        console.log(res.data)
                    })
                    .catch(error => {
                        console.log('ERROR:', error)
                    })
            } else if (600000 < currentTime - timeSeated && currentTime - timeSeated <= 1200000 && updateBack !== 2) {
                axios.put(`${baseURL_positions}/${index + 1}`, {
                    percent: 33, updateBack: 2
                })
                    .then(res => {
                        console.log(res.data)
                    })
                    .catch(error => {
                        console.log('ERROR:', error)
                    })
            } else if (1200000 < currentTime - timeSeated && currentTime - timeSeated <= 1800000 && updateBack !== 3) {
                axios.put(`${baseURL_positions}/${index + 1}`, {
                    percent: 50, updateBack: 3
                })
                    .then(res => {
                        console.log(res.data)
                    })
                    .catch(error => {
                        console.log('ERROR:', error)
                    })
            } else if (1800000 < currentTime - timeSeated && currentTime - timeSeated <= 2400000 && updateBack !== 4) {
                axios.put(`${baseURL_positions}/${index + 1}`, {
                    percent: 66, updateBack: 4
                })
                    .then(res => {
                        console.log(res.data)
                    })
                    .catch(error => {
                        console.log('ERROR:', error)
                    })
            } else if (2400000 < currentTime - timeSeated && currentTime - timeSeated <= 3000000 && updateBack !== 5) {
                axios.put(`${baseURL_positions}/${index + 1}`, {
                    percent: 83, updateBack: 5
                })
                    .then(res => {
                        console.log(res.data)
                    })
                    .catch(error => {
                        console.log('ERROR:', error)
                    })
            } else if (currentTime - timeSeated > 3000000 && updateBack !== 6) {
                axios.put(`${baseURL_users}/${idCustomer}`, { status: 4 })
                    .then(res => {
                        console.log(res.data)
                    })
                    .catch(error => {
                        console.log('ERROR:', error)
                    })

                axios.put(`${baseURL_positions}/${index + 1}`, {
                    percent: 0, updateBack: 6
                })
                    .then(res => {
                        console.log(res.data)
                    })
                    .catch(error => {
                        console.log('ERROR:', error)
                    })
            }
        }
    }

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
            {tables.length === 1 &&
                <div
                    className="container-table-7v7"
                    style={{
                        top: `${((props.top) / (667)) * (winSize.height)}px`,
                        left: `${((props.left) / (1535)) * (winSize.width)}px`,
                        cursor: `${props.move ? 'default' : 'move'}`
                    }}
                >
                    {positionTables.map((positionTable, index) => (
                        <div key={index}>
                            <Chair
                                top={`${positionTable.top}px`}
                                left='-9px'
                                numberChair={positionTable.numberLeft}
                                indexTable={props.index}
                            />
                            <Chair
                                top={`${positionTable.top}px`}
                                left='29px'
                                numberChair={positionTable.numberRight}
                                indexTable={props.index}
                            />
                        </div>
                    ))}

                    <div
                        className="table-7v7"
                        style={{
                            backgroundImage: `linear-gradient(to top, ${props.primary1} ${(tables[0]?.tables[props.index]?.status === 0 || tables[0]?.tables[props.index]?.status === 1 || tables[0]?.tables[props.index]?.status === 2) ? TPositions[props.index]?.percent : 100}%, ${TPositions[props.index]?.updateBack === 6 ? '#FFA4A4' : tables[0]?.tables[props.index]?.status === 0 ? 'rgb(220, 239, 245)' : tables[0]?.tables[props.index]?.status === 1 ? 'rgb(253, 241, 218)' : tables[0]?.tables[props.index]?.status === 2 ? 'rgb(255, 235, 248)' : '#fff'} ${TPositions[props.index]?.percent}%, ${TPositions[props.index]?.updateBack === 6 ? '#FFA4A4' : tables[0]?.tables[props.index]?.status === 0 ? 'rgb(220, 239, 245)' : tables[0]?.tables[props.index]?.status === 1 ? 'rgb(253, 241, 218)' : tables[0]?.tables[props.index]?.status === 2 ? 'rgb(255, 235, 248)' : '#fff'})`,
                            color: `${tables[0]?.tables[props.index]?.status === 7 ? '#fff' : (currentPeople > tables[0]?.tables[props.index]?.quantity && tables[0]?.tables[props.index]?.status === 5) ? 'rgba(223, 71, 89, 0.5)' : '#869AB8'}`,
                            border: `${(105 + profiles[indexED]?.numberTable % 18 === tables[0]?.tables[props.index]?.numberTable) ? '2px dashed #506690' : (changedNTable === tables[0]?.tables[props.index]?.numberTable) ? '2px solid #506690' : 'none'}`,
                        }}
                    >
                        {tables[0]?.tables[props.index]?.numberTable}
                    </div>

                    {tables[0]?.tables[props.index]?.status !== 5 &&
                        <div
                            className='reserv-time-7v7'
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
            }
        </Draggable>
    )
}
export default memo(Table7v7)
