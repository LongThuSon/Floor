import { useState, forwardRef } from 'react'

import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css'

import ChevronLeftLargeIcon from '@atlaskit/icon/glyph/chevron-left-large'
import CalendarIcon from '@atlaskit/icon/glyph/calendar'
import ChevronRightLargeIcon from '@atlaskit/icon/glyph/chevron-right-large'

const HeaderTime = () => {
    const [startDate, setStartDate]: any = useState(new Date());

    const ExampleCustomInput = forwardRef(({ value, onClick }: {
        value?: any;
        onClick?: any;
    }, ref) => (
        <div
            id='custom-input'
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

            {value}

            <span
                onClick={onClick}
                ref={ref as any}
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
            >
                <ChevronRightLargeIcon
                    label='right'
                    size="small"
                />
            </span>
        </div>
    ));
    return (
        <div id='container-time'>
            <DatePicker
                selected={startDate}
                onChange={(date: any) => setStartDate(date)}
                customInput={<ExampleCustomInput />}
                dateFormat='eee, dd MMM yyyy'
            />
        </div>

    );
};

export default HeaderTime