import { useState, useEffect, memo } from 'react'
import axios from 'axios'

import { useApiUsersContext } from '../../../../pages/ApiContext'
import { baseURL_users, baseURL_tables } from '../../../../pages/ApiContext/baseURL'
import { useResetApiContext } from '../../../../pages/ApiContext/resetApiContext'
import { useInfoContext } from '../../Info/InfoContext'
import { useEditDetailsContext } from '../../EditDetailsContext'

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
    const { showDetails } = useInfoContext()
    const { setIndexED } = useEditDetailsContext()
    const profiles = useApiUsersContext()
    const { reset, setReset } = useResetApiContext()
    const [listShow, setListShow] = useState<any>([])

    useEffect(() => {
        setListShow([])
    }, [])

    const customerTime = (timeOrder: number) => {
        switch (timeOrder) {
            case 0:
                return <div style={{ fontWeight: 600 }}>11:00AM</div>
            case 1:
                return <div style={{ fontWeight: 600 }}>11:30AM</div>
            case 2:
                return <div style={{ fontWeight: 600 }}>12:00PM</div>
            case 3:
                return <div style={{ fontWeight: 600 }}>12:30PM</div>
            case 4:
                return <div style={{ fontWeight: 600 }}>13:00PM</div>
            case 5:
                return <div style={{ fontWeight: 600 }}>13:30PM</div>
            default:
                throw new Error('Invalid time.')
        }
    }

    const customerStatus = (status: number) => {
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
            setListShow((oldArray: any) => [...oldArray, index])
        } else {
            setListShow((currentArray: any) => currentArray.filter((remainElement: any) => remainElement !== index))
        }
    }

    const updateComfirm = (id: number, numberTable: number, quantity: number, timeOrder: number) => {
        const newStatus = {
            status: 1,
        }
        const newSeat = {
            seat: quantity % 5 + 1,
            status: 3,
            timeOrder: timeOrder % 6,
        }

        axios.put(`${baseURL_users}/${id}`, newStatus)
            .then(res => console.log(res.data))
            .catch(error => {
                console.log('ERROR:', error)
            })
        axios.put(`${baseURL_tables}/${numberTable % 18 + 1}`, newSeat)
            .then(res => {                
                setReset(!reset)
                console.log(res.data)
            })
            .catch(error => {
                console.log('ERROR:', error)
            })
    }

    const updateSeat = (id: number, numberTable: number, quantity: number, timeOrder: number) => {
        const newStatus = {
            status: 3,
        }
        const newSeat = {
            seat: quantity % 5 + 1,
            status: 0,
            timeOrder: timeOrder % 6,
        }

        axios.put(`${baseURL_users}/${id}`, newStatus)
            .then(res => console.log(res.data))
            .catch(error => {
                console.log('ERROR:', error)
            })
        axios.put(`${baseURL_tables}/${numberTable % 18 + 1}`, newSeat)
            .then(res => {                
                setReset(!reset)
                console.log(res.data)
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
                    padding: 0
                }}
            >
                {profiles.map((profile, index) => (
                    <li
                        key={profile.id}
                        style={{ padding: 0 }}
                        onClick={() => handleshow(index)}
                    >
                        <div className="info-customer">
                            <div className="customer-title">
                                <div>{`${profile.firstname} `}
                                    <span style={{ fontWeight: 600 }}>{profile.lastname}</span>
                                </div>

                                {customerTime(profile.timeOrder % 6)}

                            </div>
                            <div className='customer-setup'>
                                <div>
                                    <span
                                        style={{
                                            marginRight: "10px"
                                        }}
                                    >
                                        <PeopleIcon
                                            label='people'
                                            size='small'
                                            primaryColor='#506690'
                                        />
                                        {profile.quantity % 5 + 1}
                                    </span>
                                    <span>
                                        <Chair
                                            label='chair'
                                            size='small'
                                            primaryColor='#506690'
                                        />
                                        {105 + profile.numberTable % 18}
                                    </span>
                                </div>

                                {customerStatus(profile.status % 100)}

                            </div>

                            <div
                                className='customer-tag'
                                style={{ display: `${(showDetails || listShow.includes(index)) ? '' : 'none'}` }}
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
                                        display: `${(showDetails || listShow.includes(index)) ? '' : 'none'}`
                                    }}
                                >{profile.eventTag}</div>
                            </div>

                            <div
                                className='customer-tag'
                                style={{ display: `${(showDetails || listShow.includes(index)) ? '' : 'none'}` }}
                            >
                                <div className='tag-title'>
                                    <Deposit
                                        label='tag'
                                        size='small'
                                        primaryColor='#506690'
                                    />
                                    Deposit
                                </div>
                                <div style={{ paddingLeft: '16px' }}>{profile.deposit}</div>
                            </div>

                            <div
                                className='customer-tag'
                                style={{ display: `${(showDetails || listShow.includes(index)) ? '' : 'none'}` }}
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
                                style={{ display: `${listShow.includes(index) ? '' : 'none'}` }}
                            >
                                <div
                                    className='item-action'
                                    style={{ display: `${(profile.status % 100 === 0 || profile.status % 100 > 6) ? '' : 'none'}` }}
                                    onClick={() => updateComfirm(profile.id, profile.numberTable, profile.quantity, profile.timeOrder)}
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
                                    onClick={() => updateSeat(profile.id, profile.numberTable, profile.quantity, profile.timeOrder)}
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
                                    onClick={() => setIndexED(index)}
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