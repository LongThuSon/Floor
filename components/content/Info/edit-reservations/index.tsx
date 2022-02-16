import { useState, forwardRef } from 'react'

import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css'

import { useEditDetailsContext } from '../../EditDetailsContext'
import { useApiUsersContext } from '../../../../pages/ApiContext'

import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left'
import Save from '@atlaskit/icon/glyph/download'
import Phone from '@atlaskit/icon/glyph/mobile'
import EditorDoneIcon from '@atlaskit/icon/glyph/editor/done'
import HipchatChevronDownIcon from '@atlaskit/icon/glyph/hipchat/chevron-down'
import ChevronLeftLargeIcon from '@atlaskit/icon/glyph/chevron-left-large'
import CalendarIcon from '@atlaskit/icon/glyph/calendar'
import ChevronRightLargeIcon from '@atlaskit/icon/glyph/chevron-right-large'
import Clock from '@atlaskit/icon/glyph/emoji/frequent'
import PeopleIcon from '@atlaskit/icon/glyph/people'
import Chair from '@atlaskit/icon/glyph/editor/media-wide'
import Tag from '@atlaskit/icon/glyph/creditcard'
import DocumentIcon from '@atlaskit/icon/glyph/document'
import Deposit from '@atlaskit/icon/glyph/editor/info'
import ShoppingCard from '@atlaskit/icon/glyph/marketplace'
import NoShow from '@atlaskit/icon/glyph/media-services/preselected'
import Cancelled from '@atlaskit/icon/glyph/cross-circle'

const EditDetails = () => {
    const [startDate, setStartDate]: any = useState(new Date())

    const profiles = useApiUsersContext()
    const { indexED, setIndexED } = useEditDetailsContext()

    const [tableAPI, setTableAPI] = useState({
        table: {
            numberTable: 105 + profiles[indexED].numberTable % 18,
            timeOrder: profiles[indexED].timeOrder % 6,
            eventTag: profiles[indexED].eventTag,
        }
    })

    const datePickerEdit = () => {
        const ExampleCustomInput = forwardRef(({ value, onClick }: {
            value?: any;
            onClick?: any;
        }, ref) => (
            <div
                className='custom-input-edit'
            >
                <span
                    onClick={() => {
                        let today = new Date(startDate)
                        let prevDay = today.setDate(today.getDate() - 1)
                        setStartDate(prevDay)
                    }}
                >
                    <ChevronLeftLargeIcon
                        label='left'
                        size="small"
                    />
                </span>

                <span
                    onClick={onClick}
                    ref={ref as any}
                >
                    {value}
                </span>

                <span
                    onClick={() => {
                        let today = new Date(startDate)
                        let prevDay = today.setDate(today.getDate() + 1)
                        setStartDate(prevDay)
                    }}
                >
                    <ChevronRightLargeIcon
                        label='right'
                        size="small"
                    />
                </span>
            </div>
        ));
        return (
            <DatePicker
                selected={startDate}
                onChange={(date: any) => setStartDate(date)}
                customInput={<ExampleCustomInput />}
                dateFormat='dd MMM yyyy'
            />
        );
    };

    const customerStatusEdit = (status: number) => {
        switch (status) {
            case 1:
                return (
                    <div
                        className='edit-stt'
                        style={{
                            color: '#1B2A4E',
                            backgroundColor: '#F1F4F8',
                        }}
                    >
                        <span>
                            <EditorDoneIcon
                                label='booked'
                                size='small'
                                primaryColor='#1B2A4E'
                            />
                        </span>
                        <span
                            className='stt-text'
                        >
                            Comfirmed
                        </span>
                        <span>
                            <HipchatChevronDownIcon
                                label='down'
                                size="small"
                                primaryColor="#9999BB"
                            />
                        </span>
                    </div>
                )
            case 2:
                return (
                    <div
                        className='edit-stt'
                        style={{
                            color: '#FF5C00',
                            backgroundColor: '#FFF5EF',
                        }}
                    >
                        <span>
                            <Clock
                                label='booked'
                                size='small'
                                primaryColor='#FF5C00'
                            />
                        </span>
                        <span
                            className='stt-text'
                        >
                            Late
                        </span>
                    </div>
                )
            case 3:
                return (
                    <div
                        className='edit-stt'
                        style={{
                            color: '#275EFE',
                            backgroundColor: '#F2F6FF',
                        }}
                    >
                        <span>
                            <Chair
                                label='booked'
                                size='small'
                                primaryColor='#275EFE'
                            />
                        </span>
                        <span
                            className='stt-text'
                        >
                            Seated
                        </span>
                    </div>
                )
            case 4:
                return (
                    <div
                        className='edit-stt'
                        style={{
                            color: '#358970',
                            backgroundColor: '#F0FFF6',
                        }}
                    >
                        <span>
                            <EditorDoneIcon
                                label='booked'
                                size='small'
                                primaryColor='#358970'
                            />
                        </span>
                        <span
                            className='stt-text'
                        >
                            Completed
                        </span>
                    </div>
                )
            case 5:
                return (
                    <div
                        className='edit-stt'
                        style={{
                            color: '#DF4759',
                            backgroundColor: '#FFF6F5',
                        }}
                    >
                        <span>
                            <NoShow
                                label='booked'
                                size='small'
                                primaryColor='#DF4759'
                            />
                        </span>
                        <span
                            className='stt-text'
                        >
                            No Show
                        </span>
                    </div>
                )
            case 6:
                return (
                    <div
                        className='edit-stt'
                        style={{
                            color: '#DF4759',
                            backgroundColor: '#FFF6F5',
                        }}
                    >
                        <span>
                            <Cancelled
                                label='booked'
                                size='small'
                                primaryColor='#DF4759'
                            />
                        </span>
                        <span
                            className='stt-text'
                        >
                            Cancelled
                        </span>
                    </div>
                )
            default:
                return (
                    <div
                        className='edit-stt'
                        style={{
                            color: '#1B2A4E',
                            backgroundColor: '#F1F4F8',
                        }}
                    >
                        <span>
                            <EditorDoneIcon
                                label='booked'
                                size='small'
                                primaryColor='#1B2A4E'
                            />
                        </span>
                        <span
                            className='stt-text'
                        >
                            Booked
                        </span>
                        <span>
                            <HipchatChevronDownIcon
                                label='down'
                                size="small"
                                primaryColor="#9999BB"
                            />
                        </span>
                    </div>
                )
        }
    }

    const handleChangeNumberTable = (event: any) => {
        setTableAPI(prev => ({
            table: {
                ...prev.table,
                numberTable: event.target.value,
            }
        }))
        console.log(tableAPI)
    }

    const handleChangeTimeOrder = (event: any) => {
        setTableAPI(prev => ({
            table: {
                ...prev.table,
                timeOrder: event.target.value,
            }
        }))
        console.log(tableAPI)
    }

    const handleChangeEventTag = (event: any) => {
        setTableAPI(prev => ({
            table: {
                ...prev.table,
                eventTag: event.target.value,
            }
        }))
        console.log(tableAPI)
    }

    return (
        <div className="container-edit">
            <div className='edit-header'>
                <span
                    onClick={() => setIndexED(-1)}
                >
                    <ArrowLeftIcon
                        label='comeback'
                        size='medium'
                        primaryColor='#000'
                    />
                </span>
                <div>
                    <span>
                        <Save
                            label='save'
                            size='small'
                            primaryColor='#000'
                        />
                    </span>
                    <span>
                        Save Changes
                    </span>
                </div>
            </div>

            <div className='edit-name'>
                <div>{`${profiles[indexED].firstname} `}
                    <span style={{ fontWeight: 600 }}>{profiles[indexED].lastname}</span>
                </div>
            </div>
            <div className='reserv-id'>Reservation ID: #D83U4WE</div>

            <div className='phone-viewprofile'>
                <div>
                    <span>
                        <Phone
                            label='phone'
                            size='small'
                            primaryColor='#506690'
                        />
                    </span>
                    <span>{profiles[indexED].phone}</span>
                </div>
                <div>View Profile</div>
            </div>

            {customerStatusEdit(profiles[indexED].status % 100)}

            <div className='edit-select'>
                <div>
                    <span>
                        <CalendarIcon
                            label='calender'
                            size='small'
                            primaryColor='#1B2A4E'
                        />
                    </span>
                    <span
                        style={{
                            fontSize: 15,
                            fontWeight: 600,
                            paddingLeft: 7,
                            color: '#1B2A4E'
                        }}
                    >Date</span>
                </div>
                <div className='datePickerEdit'>
                    {datePickerEdit()}
                </div>
            </div>

            <div className='edit-select'>
                <div>
                    <span>
                        <Clock
                            label='clock'
                            size='small'
                            primaryColor='#1B2A4E'
                        />
                    </span>
                    <span
                        style={{
                            fontSize: 15,
                            fontWeight: 600,
                            paddingLeft: 7,
                            color: '#1B2A4E'
                        }}
                    >Time</span>
                </div>
                <div>
                    <select
                        className='select-element'
                        value={tableAPI.table.timeOrder}
                        onChange={handleChangeTimeOrder}
                    >
                        <optgroup label="Weekday Lunch">
                            <option value="0">11:00PM</option>
                            <option value="1">11:30PM</option>
                            <option value="2">12:00PM</option>
                            <option value="3">12:30PM</option>
                            <option value="4">13:00PM</option>
                            <option value="5">13:30PM</option>
                        </optgroup>
                    </select>
                </div>
            </div>

            <div className='edit-select'>
                <div>
                    <span>
                        <PeopleIcon
                            label='people'
                            size='small'
                            primaryColor='#1B2A4E'
                        />
                    </span>
                    <span
                        style={{
                            fontSize: 15,
                            fontWeight: 600,
                            paddingLeft: 7,
                            color: '#1B2A4E'
                        }}
                    >Adults</span>
                </div>
                <div>
                    <select className='select-element'>
                        <optgroup label="Adults">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                        </optgroup>
                    </select>
                </div>
            </div>

            <div className='edit-select'>
                <div>
                    <span>
                        <PeopleIcon
                            label='people'
                            size='small'
                            primaryColor='#1B2A4E'
                        />
                    </span>
                    <span
                        style={{
                            fontSize: 15,
                            fontWeight: 600,
                            paddingLeft: 7,
                            color: '#1B2A4E'
                        }}
                    >Children</span>
                </div>
                <div>
                    <select className='select-element'>
                        <optgroup label="Children">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </optgroup>
                    </select>
                </div>
            </div>

            <div className='edit-select'>
                <div>
                    <span>
                        <Chair
                            label='chair'
                            size='small'
                            primaryColor='#1B2A4E'
                        />
                    </span>
                    <span
                        style={{
                            fontSize: 15,
                            fontWeight: 600,
                            paddingLeft: 7,
                            color: '#1B2A4E'
                        }}
                    >Table</span>
                </div>
                <div>
                    <select
                        className='select-element'
                        value={tableAPI.table.numberTable}
                        onChange={handleChangeNumberTable}
                    >
                        <optgroup label="Table">
                            <option value="105">105</option>
                            <option value="106">106</option>
                            <option value="107">107</option>
                            <option value="108">108</option>
                            <option value="109">109</option>
                            <option value="110">110</option>
                            <option value="111">111</option>
                            <option value="112">112</option>
                            <option value="113">113</option>
                            <option value="114">114</option>
                            <option value="115">115</option>
                            <option value="116">116</option>
                            <option value="117">117</option>
                            <option value="118">118</option>
                            <option value="119">119</option>
                            <option value="120">120</option>
                            <option value="121">121</option>
                            <option value="122">122</option>
                        </optgroup>
                    </select>
                </div>
            </div>

            <div
                className='edit-select'
                style={{
                    display: 'block',
                    marginBottom: '10px'
                }}
            >
                <div style={{ marginBottom: '10px' }}>
                    <span>
                        <Tag
                            label='tag'
                            size='small'
                            primaryColor='#1B2A4E'
                        />
                    </span>
                    <span
                        style={{
                            fontSize: 15,
                            fontWeight: 600,
                            paddingLeft: 7,
                            color: '#1B2A4E'
                        }}
                    >Occasion</span>
                </div>
                {(profiles[indexED].status !== 3 && profiles[indexED].status !== 4 &&
                    profiles[indexED].status !== 5 && profiles[indexED].status !== 6) &&
                    <div className='container-occasion'>
                        <div className='container-element-occasion'>
                            <div className='Occasion-element'>Casual</div>
                            <div className='Occasion-element'>Birthday</div>
                        </div>
                        <div className='container-element-occasion'>
                            <div className='Occasion-element'>Anniversary</div>
                            <div className='Occasion-element'>Couple Date</div>
                        </div>
                        <div className='container-element-occasion'>
                            <div className='Occasion-element'>Business</div>
                            <div className='Occasion-element'>Others</div>
                        </div>
                    </div>
                }

            </div>

            {(profiles[indexED].status !== 3 && profiles[indexED].status !== 4 &&
                profiles[indexED].status !== 5 && profiles[indexED].status !== 6) &&
                <div
                    className='edit-select'
                    style={{
                        display: 'block'
                    }}
                >
                    <span
                        style={{
                            fontSize: 15,
                            fontWeight: 600,
                            color: '#1B2A4E'
                        }}
                    >Other Occasion</span>
                    <div>
                        <textarea className='edit-input' />
                    </div>
                </div>
            }

            <div
                className='edit-select'
                style={{
                    display: 'block'
                }}
            >
                <div>
                    <span>
                        <Tag
                            label='tag'
                            size='small'
                            primaryColor='#1B2A4E'
                        />
                    </span>
                    <span
                        style={{
                            fontSize: 15,
                            fontWeight: 600,
                            paddingLeft: 7,
                            color: '#1B2A4E'
                        }}
                    >Special Req.</span>
                </div>
                <div>
                    <textarea
                        className='edit-input'
                        value={tableAPI.table.eventTag}
                        onChange={handleChangeEventTag}
                    />
                </div>
            </div>

            <div
                className='edit-select'
                style={{
                    display: 'block'
                }}
            >
                <div>
                    <span>
                        <DocumentIcon
                            label='tag'
                            size='small'
                            primaryColor='#1B2A4E'
                        />
                    </span>
                    <span
                        style={{
                            fontSize: 15,
                            fontWeight: 600,
                            paddingLeft: 7,
                            color: '#1B2A4E'
                        }}
                    >Staff Notes</span>
                </div>
                <div>
                    <textarea className='edit-input' />
                </div>
            </div>

            <div className='edit-select'>
                <div>
                    <span>
                        <Deposit
                            label='people'
                            size='small'
                            primaryColor='#1B2A4E'
                        />
                    </span>
                    <span
                        style={{
                            fontSize: 15,
                            fontWeight: 600,
                            paddingLeft: 7,
                            color: '#1B2A4E'
                        }}
                    >Deposit</span>
                </div>
                <div className='edit-note'>
                    {profiles[indexED].deposit}
                </div>
            </div>

            <div className='edit-select'>
                <div>
                    <span>
                        <ShoppingCard
                            label='people'
                            size='small'
                            primaryColor='#1B2A4E'
                        />
                    </span>
                    <span
                        style={{
                            fontSize: 15,
                            fontWeight: 600,
                            paddingLeft: 7,
                            color: '#1B2A4E'
                        }}
                    >Package</span>
                </div>
                <div className='edit-note'>
                    CNY Package A $99.99
                </div>
            </div>

            {(profiles[indexED].status !== 3 && profiles[indexED].status !== 4 &&
                profiles[indexED].status !== 5 && profiles[indexED].status !== 6) &&
                <div>
                    <div className='edit-notify'>
                        <div className='notify-name'>Notify Via</div>

                        <label className="container-radio">Email
                            <input type="radio" name="notify" />
                            <span className="checkmark"></span>
                        </label>
                        <label className="container-radio">SMS ($0.04 per SMS)
                            <input type="radio" name="notify" />
                            <span className="checkmark"></span>
                        </label>
                        <label className="container-radio">Don’t Notify
                            <input type="radio" name="notify" />
                            <span className="checkmark"></span>
                        </label>
                    </div>

                    <div
                        className='edit-notify'
                        style={{ marginTop: '35px' }}
                    >
                        <div className='notify-name'>Type of Notification</div>

                        <label className="container-checkbox">Reservation Confirmation
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                        </label>
                        <label className="container-checkbox">Reservation Reminder
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                </div>
            }

            {profiles[indexED].status !== 6 &&
                <div>
                    <button className='cancel-reserv-btn'>Cancel Reservation</button>
                </div>
            }
        </div>
    )
}

export default EditDetails