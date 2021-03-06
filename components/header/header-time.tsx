import { useState, useRef, useEffect } from 'react'
import DatePicker, { DateObject } from "react-multi-date-picker"
import { usePageContext } from '../context/PageContext'
import { useResetApiContext } from '../context/ApiContext/resetApiContext'
import ChevronLeftLargeIcon from '@atlaskit/icon/glyph/chevron-left-large'
import CalendarIcon from '@atlaskit/icon/glyph/calendar'
import ChevronRightLargeIcon from '@atlaskit/icon/glyph/chevron-right-large'

const HeaderTime = () => {
    const [startDate, setStartDate] = useState<any>(new DateObject())
    const datepickerRef = useRef<any>();
    const { setDate } = useResetApiContext()
    const { setIndexED, winSize, setCurrentPeople, setChangedNTable } = usePageContext()

    useEffect(() => {
        setDate(`${startDate?.year}-${(startDate?.month?.number > 9) ? (startDate?.month?.number) : ('0' + (startDate?.month?.number))}-${(startDate?.day > 9) ? (startDate?.day) : ('0' + (startDate?.day))}`)
        setIndexED(-1)
        setCurrentPeople(-1)
        setChangedNTable(-1)
    }, [startDate])

    return (
        <div id='container-time'>
            <DatePicker
                ref={datepickerRef}
                value={startDate}
                format="ddd, DD MMM YYYY"
                onChange={setStartDate}
                render={(value: Date, openCalendar: any) => {
                    return (
                        <div
                            id='custom-input'
                        >
                            <span
                                onClick={() => {
                                    let today = new DateObject(startDate)
                                    let prevDay = today.setDate(today.subtract(1, 'day'))
                                    setStartDate(prevDay)
                                }}
                                style={{ cursor: 'pointer' }}
                            >
                                <ChevronLeftLargeIcon
                                    label='left'
                                    size="small"
                                />
                            </span>

                            {winSize.width > 600 && value}

                            <span
                                onClick={openCalendar}
                                style={{ cursor: 'pointer' }}
                            >
                                <CalendarIcon
                                    label='calender'
                                />
                            </span>

                            <span
                                onClick={() => {
                                    let today = new DateObject(startDate)
                                    let prevDay = today.setDate(today.add(1, 'day'))
                                    setStartDate(prevDay)
                                }}
                                style={{ cursor: 'pointer' }}
                            >
                                <ChevronRightLargeIcon
                                    label='right'
                                    size="small"
                                />
                            </span>
                        </div>
                    )
                }}
            />
        </div>
    )
};

export default HeaderTime