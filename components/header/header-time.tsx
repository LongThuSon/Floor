import { useState } from 'react'
import DatePicker from "react-multi-date-picker"
import {  usePageContext  } from '../context/PageContext'
import ChevronLeftLargeIcon from '@atlaskit/icon/glyph/chevron-left-large'
import CalendarIcon from '@atlaskit/icon/glyph/calendar'
import ChevronRightLargeIcon from '@atlaskit/icon/glyph/chevron-right-large'

const HeaderTime = () => {
    const [startDate, setStartDate]: any = useState(new Date());
    const {  winSize  } = usePageContext()

    return (
        <div id='container-time'>
            <DatePicker
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
                                    let today = new Date(startDate)
                                    let prevDay = today.setDate(today.getDate() - 1)
                                    setStartDate(prevDay)
                                }}
                                style={{  cursor: 'pointer'  }}
                            >
                                <ChevronLeftLargeIcon
                                    label='left'
                                    size="small"
                                />
                            </span>

                            {winSize.width > 600 && value}

                            <span
                                onClick={openCalendar}
                                style={{  cursor: 'pointer'  }}
                            >
                                <CalendarIcon
                                    label='calender'
                                />
                            </span>

                            <span
                                onClick={() => {
                                    let today = new Date(startDate)
                                    let prevDay = today.setDate(today.getDate() + 1)
                                    setStartDate(prevDay)
                                }}
                                style={{  cursor: 'pointer'  }}
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