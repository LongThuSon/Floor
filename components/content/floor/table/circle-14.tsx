import { useState, useEffect, memo } from 'react'
import { useApiTablesContext, useApiUsersContext } from '../../../context/ApiContext'
import {  usePageContext  } from '../../../context/PageContext'
import {  useContentContext  } from '../../../context/ContentContext'
import Draggable from 'react-draggable'
import Chair from "./chair"
import { Table } from "./index"
import { baseURL_positions, baseURL_tables, baseURL_users } from '../../../context/ApiContext/baseURL'
import axios from 'axios'
import Save from '@atlaskit/icon/glyph/download'

const positionTables = [
    {
        // Chair 1
        top: -9,
        left: 30,
    },
    {
        // Chair 2
        top: -6,
        left: 47,
    },
    {
        // Chair 3
        top: 5,
        left: 60,
    },
    {
        // Chair 4
        top: 21,
        left: 68,
    },
    {
        // Chair 5
        top: 39,
        left: 68,
    },
    {
        // Chair 6
        top: 55,
        left: 60,
    },
    {
        // Chair 7
        top: 66,
        left: 46,
    },
    {
        // Chair 8
        top: 69,
        left: 28,
    },
    {
        // Chair 9
        top: 65,
        left: 11,
    },
    {
        // Chair 10
        top: 53,
        left: -2,
    },
    {
        // Chair 11
        top: 37,
        left: -9,
    },
    {
        // Chair 12
        top: 20,
        left: -8,
    },
    {
        // Chair 13
        top: 5,
        left: 0,
    },
    {
        // Chair 14
        top: -6,
        left: 13,
    },
]

const Circle14 = (props: Table) => {
    const tables = useApiTablesContext()
    const profiles = useApiUsersContext()
    const { winSize, currentPeople, indexED, changedNTable } = usePageContext()
    const {  time  } = useContentContext()
    const [position, setPosition] = useState({ top: props.top, left: props.left })

    useEffect(() => {
        colorTable(props.index, tables[0]?.tables[props.index]?.status, tables[0]?.tables[props.index]?.timeSeated, tables[0]?.tables[props.index]?.updateBack, tables[0]?.tables[props.index]?.idCustomer)
    }, [time])

    const colorTable = (index: number, status: number, timeSeated: number, updateBack: number, idCustomer: number) => {
        if (status === 0 || status === 1 || status === 2) {
            let currentTime = new Date().getTime()
            
            const newTable = (percent: number, updateBack: number) => {
                return (
                    [...tables[0]?.tables].fill({
                        id: tables[0]?.tables[index]?.id,
                        numberTable: tables[0]?.tables[index]?.numberTable,
                        seat: tables[0]?.tables[index]?.seat,
                        status: tables[0]?.tables[index]?.status,
                        percent: percent,
                        timeOrder: tables[0]?.tables[index]?.timeOrder,
                        idCustomer: tables[0]?.tables[index]?.idCustomer,
                        quantity: tables[0]?.tables[index]?.quantity,
                        timeList: tables[0]?.tables[index]?.timeList,
                        timeSeated: tables[0]?.tables[index]?.timeSeated,
                        updateBack: updateBack,
                    }, index, index + 1)
                )
            }  

            const lastTable = [...tables[0]?.tables].fill({
                id: tables[0]?.tables[index]?.id,
                numberTable: tables[0]?.tables[index]?.numberTable,
                seat: tables[0]?.tables[index]?.seat,
                status: 6,
                percent: 0,
                timeOrder: tables[0]?.tables[index]?.timeOrder,
                idCustomer: tables[0]?.tables[index]?.idCustomer,
                quantity: tables[0]?.tables[index]?.quantity,
                timeList: tables[0]?.tables[index]?.timeList,
                timeSeated: 0,
                updateBack: 0,
            }, index, index + 1)
    
            if (currentTime - timeSeated <= 60000 && updateBack !== 1) {
                axios.put(`${baseURL_tables}/${tables[0]?.id}`, {
                    tables: newTable(16, 1)
                })
                    .then(res => {
                        console.log(res.data)
                    })
                    .catch(error => {
                        console.log('ERROR:', error)
                    })
            } else if (60000 < currentTime - timeSeated && currentTime - timeSeated <= 120000 && updateBack !== 2) {
                axios.put(`${baseURL_tables}/${tables[0]?.id}`, {
                    tables: newTable(33, 2)
                })
                    .then(res => {
                        console.log(res.data)
                    })
                    .catch(error => {
                        console.log('ERROR:', error)
                    })
            } else if (120000 < currentTime - timeSeated && currentTime - timeSeated <= 180000 && updateBack !== 3) {
                axios.put(`${baseURL_tables}/${tables[0]?.id}`, {
                    tables: newTable(50, 3)
                })
                    .then(res => {
                        console.log(res.data)
                    })
                    .catch(error => {
                        console.log('ERROR:', error)
                    })
            } else if (180000 < currentTime - timeSeated && currentTime - timeSeated <= 240000 && updateBack !== 4) {
                axios.put(`${baseURL_tables}/${tables[0]?.id}`, {
                    tables: newTable(66, 4)
                })
                    .then(res => {
                        console.log(res.data)
                    })
                    .catch(error => {
                        console.log('ERROR:', error)
                    })
            } else if (240000 < currentTime - timeSeated && currentTime - timeSeated <= 300000 && updateBack !== 5) {
                axios.put(`${baseURL_tables}/${tables[0]?.id}`, {
                    tables: newTable(83, 5)
                })
                    .then(res => {
                        console.log(res.data)
                    })
                    .catch(error => {
                        console.log('ERROR:', error)
                    })
            } else if (currentTime - timeSeated > 300000) {
                axios.put(`${baseURL_users}/${idCustomer}`, { status: 4 })
                    .then(res => {
                        console.log(res.data)
                    })
                    .catch(error => {
                        console.log('ERROR:', error)
                    })
    
                axios.put(`${baseURL_tables}/${tables[0]?.id}`, {
                    tables: lastTable
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
            <div
                className="container-circle-14"
                style={{
                    top: `${((props.top) / (667)) * (winSize.height)}px`,
                    left: `${((props.left) / (1535)) * (winSize.width)}px`,
                    cursor: `${props.move ? 'default' : 'move'}`
                }}
            >
                {positionTables.map((positionTable, index) => (
                    <Chair
                        key={index}
                        top={`${positionTable.top}px`}
                        left={`${positionTable.left}px`}
                        numberChair={index + 1}
                        indexTable={props.index}
                    />
                ))}

                <div
                    className="circle-14"
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
                        className='reserv-time-circle-14'
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
export default memo(Circle14)
