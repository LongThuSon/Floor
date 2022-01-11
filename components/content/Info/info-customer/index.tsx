import { useState, useEffect } from 'react'
import { useInfoContext } from '../../Info/InfoContext'
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
import axios from 'axios'

interface Profile {
    id: number,
    username: string,
    firstname: string,
    lastname: string,
    quantity: number,
    numberTable: number,
    phone: number,
    eventTag: string,
    deposit: string,
    status: number,
    timeOrder: number
}

type TProfileList = Profile[]

interface ProfileListProps {
    items: TProfileList
}

const baseURL = "https://61d2e828b4c10c001712b67f.mockapi.io/api/users";

const Customer = () => {
    const [profiles, setProfiles] = useState<TProfileList>([])

    useEffect(() => {
        axios.get<TProfileList>(baseURL).then((response) => {
            console.log(response.data)
            setProfiles(response.data)
        })
            .catch(error => {
                console.log('ERROR:', error)
            })
    }, [])

    if (!profiles) return null;

    return (
        <>
            <CustomerList items={profiles} />
        </>
    )
}

const CustomerList: React.FC<ProfileListProps> = ({ items }) => {
    const { showDetails } = useInfoContext()
    const [listShow, setListShow] = useState<any>([])

    useEffect(() => {
        setListShow([])
    }, [])

    const customerTime = (timeOrder: number) => {
        switch (timeOrder) {
            case 0:
                return <div style={{ fontWeight: 600 }}>11:00 PM</div>
            case 1:
                return <div style={{ fontWeight: 600 }}>11:30 PM</div>
            case 2:
                return <div style={{ fontWeight: 600 }}>12:00 PM</div>
            case 3:
                return <div style={{ fontWeight: 600 }}>12:30 PM</div>
            case 4:
                return <div style={{ fontWeight: 600 }}>13:00 PM</div>
            case 5:
                return <div style={{ fontWeight: 600 }}>13:30 PM</div>
            default:
                throw new Error('Invalid time.')
        }
    }

    const customerStatus = (status: number) => {
        switch (status) {
            case 0:
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
            case 1:
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
            case 2:
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
            case 3:
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
            case 4:
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
            case 5:
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

    const updateComfirm = (id: number) => {
        const newStatus = {
            status: 0,
        }
        axios.put(`${baseURL}/${id}`, newStatus)
            .then(res => console.log(res.data))
            .catch(error => {
                console.log('ERROR:', error)
            })
    }

    const updateSeat = (id: number) => {
        const newStatus = {
            status: 2,
        }
        axios.put(`${baseURL}/${id}`, newStatus)
            .then(res => console.log(res.data))
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
                {items.map((profile, index) => (
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

                                {customerStatus(profile.status % 20)}

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
                                    style={{ display: `${profile.status % 20 > 5 ? '' : 'none'}` }}
                                    onClick={() => updateComfirm(profile.id)}
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
                                    style={{ display: `${(profile.status % 20 === 2 || profile.status % 20 === 3 || profile.status % 20 === 5) ? 'none' : ''}` }}
                                    onClick={() => updateSeat(profile.id)}
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
                                <div className='item-action'>
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
                                    style={{ display: `${profile.status % 20 === 1 ? '' : 'none'}` }}
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

export default Customer