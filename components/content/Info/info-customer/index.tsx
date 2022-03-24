import { useState, useEffect, memo } from 'react'
import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useApiUsersContext, useApiTablesContext } from '../../../context/ApiContext'
import { baseURL_users, baseURL_tables } from '../../../context/ApiContext/baseURL'
import { useResetApiContext } from '../../../context/ApiContext/resetApiContext'
import { useInfoContext } from '../../../context/InfoContext'
import { usePageContext } from '../../../context/PageContext'

import PeopleIcon from '@atlaskit/icon/glyph/people'
import Chair from '@atlaskit/icon/glyph/editor/media-wide'
import EditorDoneIcon from '@atlaskit/icon/glyph/editor/done'
import Tag from '@atlaskit/icon/glyph/creditcard'
import MobileIcon from '@atlaskit/icon/glyph/mobile'
import Deposit from '@atlaskit/icon/glyph/editor/info'
import ShoppingCard from '@atlaskit/icon/glyph/marketplace'
import Clock from '@atlaskit/icon/glyph/recent'
import NoShow from '@atlaskit/icon/glyph/media-services/preselected'
import Cancelled from '@atlaskit/icon/glyph/cross-circle'
import EditFilledIcon from '@atlaskit/icon/glyph/edit-filled'
import Hold from '@atlaskit/icon/glyph/notification-all'

const CustomerList = () => {
    const { showDetails, searchField } = useInfoContext()
    const { setIndexED } = usePageContext()
    const profiles = useApiUsersContext()
    const tables = useApiTablesContext()
    const { reset, setReset, date } = useResetApiContext()
    const [listShow, setListShow] = useState<number[]>([])

    useEffect(() => {
        setListShow([])
    }, [])

    const profilesFD = profiles.filter(
        person => {
            return (
                person.date.includes(date)
            )
        }
    )

    const profileFilter = (profile: any) => {
        if (searchField.request.status === -1) {
            return true
        } else if (searchField.request.status === -2) {
            return (profile.status === 5 || profile.status === 6)
        } else {
            return profile.status === searchField.request.status
        }
    }

    const settingProfiles = profilesFD.filter(profileFilter)

    const searchProfiles = settingProfiles.filter(
        person => {
            return (
                person
                    .firstname
                    .toLowerCase()
                    .includes(searchField.request.name.toLowerCase()) ||
                person
                    .lastname
                    .toLowerCase()
                    .includes(searchField.request.name.toLowerCase())
            )
        })

    const customerTime = (timeOrder: number, timeOL: number[]) => {
        switch (timeOrder) {
            case 0:
                return <div style={{
                    fontWeight: 600,
                }}
                >11:00AM</div>
            case 1:
                return <div style={{
                    fontWeight: 600,
                }}
                >11:30AM</div>
            case 2:
                return <div style={{
                    fontWeight: 600,
                }}
                >12:00PM</div>
            case 3:
                return <div style={{
                    fontWeight: 600,
                }}
                >12:30PM</div>
            case 4:
                return <div style={{
                    fontWeight: 600,
                }}
                >13:00PM</div>
            case 5:
                return <div style={{
                    fontWeight: 600,
                }}
                >13:30PM</div>
            default:
                throw new Error('Invalid time.')
        }
    }

    const customerStatus = (id: number, timeOrder: number, status: number, timeLate: number, noShow: boolean) => {
        let currentTime = new Date().getTime()

        if ((status === 1 && timeOrder === 0 && new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" }) >= '11:00' && new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" }) <= '11:15') ||
            (status === 1 && timeOrder === 1 && new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" }) >= '11:30' && new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" }) <= '11:45') ||
            (status === 1 && timeOrder === 2 && new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" }) >= '12:00' && new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" }) <= '12:15') ||
            (status === 1 && timeOrder === 3 && new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" }) >= '12:30' && new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" }) <= '12:45') ||
            (status === 1 && timeOrder === 4 && new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" }) >= '13:00' && new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" }) <= '13:15') ||
            (status === 1 && timeOrder === 5 && new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" }) >= '13:30' && new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" }) <= '13:45')) {
            const newUser = {
                status: 2,
                timeLate: new Date().getTime(),
                noShow: true,
            }

            axios.put(`${baseURL_users}/${id}`, newUser)
                .then(res => {
                    setReset(!reset)
                    console.log(res.data)
                })
                .catch(error => {
                    console.log('ERROR:', error)
                })
        }

        if (status === 2 && noShow && (currentTime - timeLate >= 900000)) {
            axios.put(`${baseURL_users}/${id}`, { status: 5 })
                .then(res => {
                    console.log(res.data)
                    setReset(!reset)
                })
                .catch(error => {
                    console.log('ERROR:', error)
                })
        }

        switch (status) {
            case 1:
                return (
                    <div
                        className='customer-status'
                        style={{
                            width: '89px',
                            color: '#506690',
                            backgroundColor: '#F1F4F8'
                        }}
                    >
                        <span>
                            <EditorDoneIcon
                                label='comfirmed'
                                size='small'
                                primaryColor='#506690'
                            />
                            Comfirmed
                        </span>
                    </div>
                )
            case 2:
                return (
                    <div
                        className='customer-status'
                        style={{
                            width: '61px',
                            color: '#FF5C00',
                            backgroundColor: '#FFF3EC'
                        }}
                    >
                        <span>
                            <Clock
                                label='late'
                                size='small'
                                primaryColor='#FF5C00'
                            />
                            Late
                        </span>
                    </div>
                )
            case 3:
                return (
                    <div
                        className='customer-status'
                        style={{
                            width: '74px',
                            color: '#275EFE',
                            backgroundColor: '#F2F6FF'
                        }}
                    >
                        <span>
                            <Chair
                                label='seated'
                                size='small'
                                primaryColor='#275EFE'
                            />
                            Seated
                        </span>
                    </div>
                )
            case 4:
                return (
                    <div
                        className='customer-status'
                        style={{
                            width: '95px',
                            color: '#358970',
                            backgroundColor: '#F1F4F8'
                        }}
                    >
                        <span>
                            <EditorDoneIcon
                                label='completed'
                                size='small'
                                primaryColor='#F1FFF6'
                            />
                            Completed
                        </span>
                    </div>
                )
            case 5:
                return (
                    <div
                        className='customer-status'
                        style={{
                            width: '83px',
                            color: '#DF4759',
                            backgroundColor: '#FFF6F5'
                        }}
                    >
                        <span>
                            <NoShow
                                label='no show'
                                size='small'
                                primaryColor='#FFF6F5'
                            />
                            No Show
                        </span>
                    </div>
                )
            case 6:
                return (
                    <div
                        className='customer-status'
                        style={{
                            width: '89px',
                            color: '#DF4759',
                            backgroundColor: '#FFF6F5'
                        }}
                    >
                        <span>
                            <Cancelled
                                label='cancelled'
                                size='small'
                                primaryColor='#DF4759'
                            />
                            Cancelled
                        </span>
                    </div>
                )
            default:
                return (
                    <div
                        className='customer-status'
                        style={{
                            width: '71px',
                            color: '#506690',
                            backgroundColor: '#F1F4F8'
                        }}
                    >
                        <span>
                            <EditorDoneIcon
                                label='booked'
                                size='small'
                                primaryColor='#506690'
                            />
                            Booked
                        </span>
                    </div>
                )
        }
    }

    const handleshow = (index: number) => {
        if (listShow.indexOf(index) === -1) {
            setListShow((oldArray: number[]) => [...oldArray, index])
        } else {
            setListShow((currentArray: number[]) => currentArray.filter((remainElement: number) => remainElement !== index))
        }
    }

    const notify = (status: string, name: string, numberTable?: number) => {
        if (status === 'comfirm') {
            toast.success(`Reservation confirmed for ${name}!`)
        } else if (status === 'seated') {
            toast.success(`${name} seated at Table ${numberTable}.`)
        } else {
            toast.success(`Table ${numberTable} has been put on hold.`)
        }
    }

    const updateComfirm = (id: number, numberTable: number, quantity: number, timeOrder: number) => {
        const timeOL = [...tables[0]?.tables[numberTable % 18]?.timeList]

        const newUser = {
            status: 1,
        }

        const newTable = [...tables[0]?.tables].fill({
            id: tables[0]?.tables[numberTable % 18]?.id,
            numberTable: tables[0]?.tables[numberTable % 18]?.numberTable,
            seat: quantity % 5 + 1,
            status: Number(`${(quantity % 5 + 1) <= tables[0].tables[numberTable % 18]?.quantity && (timeOL.includes(timeOrder % 6) === false) ? 3 : 7}`),
            percent: tables[0]?.tables[numberTable % 18]?.percent,
            timeOrder: timeOrder % 6,
            idCustomer: Number(id),
            quantity: tables[0]?.tables[numberTable % 18]?.quantity,
            timeList: timeOL,
            timeSeated: tables[0]?.tables[numberTable % 18]?.timeSeated,
            updateBack: tables[0]?.tables[numberTable % 18]?.updateBack,
        }, numberTable % 18, numberTable % 18 + 1)

        if (timeOL.includes(timeOrder % 6) === false) {
            timeOL.push(Number(timeOrder % 6))
        }

        axios.put(`${baseURL_users}/${id}`, newUser)
            .then(res => console.log(res.data))
            .catch(error => {
                console.log('ERROR:', error)
            })

        if (tables[0]?.tables[numberTable % 18]?.status === 1 || tables[0]?.tables[numberTable % 18]?.status === 2 || tables[0]?.tables[numberTable % 18]?.status === 3) {
            axios.put(`${baseURL_tables}/${tables[0]?.id}`, { tables: newTable })
                .then(res => {
                    setReset(!reset)
                    console.log(res.data)
                })
                .catch(error => {
                    console.log('ERROR:', error)
                })
        }
    }

    const updateSeat = (id: number, numberTable: number, quantity: number, timeOrder: number) => {
        const timeOL = [...tables[0]?.tables[numberTable % 18]?.timeList]

        if (((quantity % 5 + 1) <= tables[0]?.tables[numberTable % 18]?.quantity && tables[0]?.tables[numberTable % 18]?.status === 5) || (tables[0]?.tables[numberTable % 18]?.status === 3)) {
            if (!timeOL.includes(timeOrder % 6)) {
                timeOL.push(Number(timeOrder % 6))
            }

            const newUser = {
                status: 3,
            }

            const newTable = [...tables[0]?.tables].fill({
                id: tables[0]?.tables[numberTable % 18]?.id,
                numberTable: tables[0]?.tables[numberTable % 18]?.numberTable,
                seat: quantity % 5 + 1,
                status: Math.floor(Math.random() * 3),
                percent: tables[0]?.tables[numberTable % 18]?.percent,
                timeOrder: timeOrder % 6,
                idCustomer: Number(id),
                quantity: tables[0]?.tables[numberTable % 18]?.quantity,
                timeList: timeOL,
                timeSeated: new Date().getTime(),
                updateBack: tables[0]?.tables[numberTable % 18]?.updateBack,
            }, numberTable % 18, numberTable % 18 + 1)

            axios.put(`${baseURL_users}/${id}`, newUser)
                .then(res => console.log(res.data))
                .catch(error => {
                    console.log('ERROR:', error)
                })
            axios.put(`${baseURL_tables}/${tables[0]?.id}`, { tables: newTable })
                .then(res => {
                    setReset(!reset)
                    console.log(res.data)
                })
                .catch(error => {
                    console.log('ERROR:', error)
                })
        } else {
            alert('Status table: Clash')
        }
    }

    const holdCustomer = (id: number) => {
        const updateUser = {
            noShow: false,
        }

        axios.put(`${baseURL_users}/${id}`, updateUser)
            .then(res => {
                console.log(res.data)
                setReset(!reset)
            })
            .catch(error => {
                console.log('ERROR:', error)
            })
    }

    return (
        <>
            <ul
                style={{
                    listStyleType: "none",
                    padding: 0,
                }}
            >
                {searchProfiles.map((profile) => (
                    <li
                        key={profile.id}
                        style={{
                            padding: 0,
                            margin: '-18px 0 18px',
                            backgroundColor: `${tables[0]?.tables[profile.numberTable % 18]?.status === 7 ? '#FFEEEB' : '#fff'}`,
                        }}
                        onClick={() => handleshow(profile.id)}
                    >
                        <div className="info-customer">
                            <div className="customer-title">
                                <div>{`${profile.firstname} `}
                                    <span style={{ fontWeight: 600 }}>{profile.lastname}</span>
                                </div>

                                {customerTime(profile.timeOrder % 6, tables[0]?.tables[profile.numberTable % 18]?.timeList)}

                            </div>
                            <div className='customer-setup'>
                                <div>
                                    <span
                                        style={{
                                            marginRight: "10px",
                                        }}
                                    >
                                        <PeopleIcon
                                            label='people'
                                            size='small'
                                            primaryColor={`${((profile.quantity % 5 + 1) > tables[0]?.tables[profile.numberTable % 18]?.quantity && tables[0]?.tables[profile.numberTable % 18]?.status === 7) ? '#DF4759' : '#506690'}`}
                                        />
                                        <span style={{ color: `${((profile.quantity % 5 + 1) > tables[0]?.tables[profile.numberTable % 18]?.quantity && tables[0]?.tables[profile.numberTable % 18]?.status === 7) ? '#DF4759' : '#506690'}` }}>
                                            {profile.quantity % 5 + 1}
                                        </span>
                                    </span>
                                    <span>
                                        <Chair
                                            label='chair'
                                            size='small'
                                            primaryColor={`${(tables[0]?.tables[profile.numberTable % 18]?.status === 7 && (profile.quantity % 5 + 1) <= tables[0]?.tables[profile.numberTable % 18]?.quantity) ? '#DF4759' : '#506690'}`}
                                        />
                                        <span style={{ color: `${(tables[0]?.tables[profile.numberTable % 18]?.status === 7 && (profile.quantity % 5 + 1) <= tables[0]?.tables[profile.numberTable % 18]?.quantity) ? '#DF4759' : '#506690'}` }}>
                                            {105 + profile.numberTable % 18}
                                        </span>
                                    </span>
                                </div>

                                {customerStatus(profile.id, profile.timeOrder % 6, profile.status % 100, 0, profile.noShow)}

                            </div>

                            <div
                                className='customer-tag'
                                style={{ display: `${(showDetails || listShow.includes(profile.id)) ? '' : 'none'}` }}
                            >
                                <div className='tag-title'>
                                    <MobileIcon
                                        label='tag'
                                        size='small'
                                        primaryColor='#506690'
                                    />
                                    {profile.phone}
                                </div>
                            </div>

                            <div className='customer-tag'>
                                <div className='tag-title'>
                                    <Tag
                                        label='tag'
                                        size='small'
                                        primaryColor='#506690'
                                    />
                                    Birthday, Special Req.
                                </div>
                                <div
                                    style={{
                                        paddingLeft: '16px',
                                        display: `${(showDetails || listShow.includes(profile.id)) ? '' : 'none'}`
                                    }}
                                >{profile.eventTag}</div>
                            </div>

                            <div
                                className='customer-tag'
                                style={{ display: `${(showDetails || listShow.includes(profile.id)) ? '' : 'none'}` }}
                            >
                                <div className='tag-title'>
                                    <Deposit
                                        label='tag'
                                        size='small'
                                        primaryColor='#506690'
                                    />
                                    Deposit
                                </div>
                                <div style={{ paddingLeft: '16px' }}>{profile.quantity % 5 + 1} x 50$ = {(profile.quantity % 5 + 1) * 50}$</div>
                            </div>

                            <div
                                className='customer-tag'
                                style={{ display: `${(showDetails || listShow.includes(profile.id)) ? '' : 'none'}` }}
                            >
                                <div className='tag-title'>
                                    <ShoppingCard
                                        label='tag'
                                        size='small'
                                        primaryColor='#506690'
                                    />
                                    Package Name e.g CNY Package A $99.99
                                </div>
                            </div>
                            <div
                                className='actions-status'
                                style={{ display: `${listShow.includes(profile.id) ? '' : 'none'}` }}
                            >
                                <div
                                    className='item-action'
                                    style={{ display: `${(profile.status % 100 === 0 || profile.status % 100 > 6) ? '' : 'none'}` }}
                                    onClick={() => {
                                        updateComfirm(profile.id, profile.numberTable, profile.quantity, profile.timeOrder)
                                        notify('comfirm', profile.lastname)
                                    }}
                                >
                                    <span>
                                        <EditorDoneIcon
                                            label='comfirm'
                                            size='large'
                                            primaryColor='#fff'
                                        />
                                    </span>
                                    <span>Comfirm</span>
                                </div>
                                <div
                                    className='item-action'
                                    style={{ display: `${(profile.status % 100 === 3 || profile.status % 100 === 4 || profile.status % 100 === 6) ? 'none' : ''}` }}
                                    onClick={() => {
                                        updateSeat(profile.id, profile.numberTable, profile.quantity, profile.timeOrder)
                                        if ((profile.quantity % 5 + 1) <= tables[0].tables[profile.numberTable % 18]?.quantity && tables[0].tables[profile.numberTable % 18]?.status === 5) {
                                            notify('seated', profile.lastname, 105 + profile.numberTable % 18)
                                        }
                                    }}
                                >
                                    <span>
                                        <Chair
                                            label='comfirm'
                                            size='large'
                                            primaryColor='#fff'
                                        />
                                    </span>
                                    <span>Seat</span>
                                </div>
                                <div
                                    className='item-action'
                                    onClick={() => setIndexED(profile.id - 1)}
                                >
                                    <span>
                                        <EditFilledIcon
                                            label='edit'
                                            size='large'
                                            primaryColor='#fff'
                                        />
                                    </span>
                                    <span>Edit</span>
                                </div>
                                <div
                                    className='item-action'
                                    style={{ display: `${profile.status % 100 === 2 ? '' : 'none'}` }}
                                    onClick={() => {
                                        holdCustomer(profile.id)
                                        notify('hold', profile.lastname, 105 + profile.numberTable % 18)
                                    }}
                                >
                                    <span>
                                        <Hold
                                            label='edit'
                                            size='large'
                                            primaryColor='#fff'
                                        />
                                    </span>
                                    <span>Hold</span>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default memo(CustomerList)