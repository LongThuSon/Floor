import React, { useState } from 'react';
import {
    MDBRow,
    MDBCol,
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBTextArea,
} from 'mdb-react-ui-kit';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import ChevronLeftLargeIcon from '@atlaskit/icon/glyph/chevron-left-large';
import ChevronRightLargeIcon from '@atlaskit/icon/glyph/chevron-right-large';
import { TimeOrder, TypeService } from '../../../public/data-constant';
import { useAppDispatch } from '../../../redux/hook';
import { TCustomerCreate } from '../../../type/customer.type';
import { createCustomer } from '../../../redux/slices/customer.slice';

const BookingForm = () => {
    const dispatch = useAppDispatch();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [note, setNote] = useState('');
    const [startDate, setStartDate] = useState<any>(new DateObject());
    const [timeOrder, setTimeOrder] = useState(TimeOrder._10h);
    const [key, setKey] = useState('');

    const handleBook = () => {
        var dateCheck = startDate.unix;
        if (
            Math.abs(Date.now() - dateCheck) >
            Math.abs(Date.now() - dateCheck * 1000)
        ) {
            dateCheck = dateCheck * 1000;
        }

        const data: TCustomerCreate = {
            name: name,
            quantityBook: quantity,
            phone: phone,
            dateOrder: dateCheck,
            timeOrder: timeOrder,
            note: note,
            keyRestaurant: '',
        };

        dispatch(createCustomer(data));
    };

    return (
        <form style={{ maxWidth: 600 }}>
            <MDBInput
                wrapperClass="mb-4"
                id="form6Example3"
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <MDBInput
                className="mb-4"
                type="tel"
                id="form1Example1"
                label="phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <MDBInput
                label="Quantity"
                id="typeNumber"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <div className="datePickerEdit">
                <DatePicker
                    value={startDate}
                    format="DD MMM YYYY"
                    onChange={(array) => {
                        setStartDate(array);
                    }}
                    render={(value: Date, openCalendar: any) => {
                        return (
                            <div
                                className="custom-time-edit"
                                style={{
                                    backgroundColor: '#fff',
                                    cursor: 'pointer',
                                }}
                            >
                                <span
                                    onClick={() => {
                                        let today = new DateObject(startDate);
                                        let prevDay = today.setDate(
                                            today.subtract(1, 'day'),
                                        );
                                        setStartDate(prevDay);
                                    }}
                                >
                                    <ChevronLeftLargeIcon
                                        label="left"
                                        size="small"
                                    />
                                </span>

                                <span onClick={openCalendar}>{value}</span>

                                <span
                                    onClick={() => {
                                        let today = new DateObject(startDate);
                                        let prevDay = today.setDate(
                                            today.add(1, 'day'),
                                        );
                                        setStartDate(prevDay);
                                    }}
                                >
                                    <ChevronRightLargeIcon
                                        label="right"
                                        size="small"
                                    />
                                </span>
                            </div>
                        );
                    }}
                />
            </div>

            <div>
                <select
                    className="select-element"
                    defaultValue={timeOrder}
                    onChange={(e) =>
                        setTimeOrder(String(e.target.value) as TimeOrder)
                    }
                >
                    <optgroup label="Time order">
                        <option value={TimeOrder._10h}>10:00AM</option>
                        <option value={TimeOrder._10r}>10:30AM</option>
                        <option value={TimeOrder._11h}>11:00AM</option>
                        <option value={TimeOrder._11r}>11:30AM</option>
                        <option value={TimeOrder._12h}>12:00AM</option>
                        <option value={TimeOrder._12r}>12:30AM</option>
                        <option value={TimeOrder._18h}>06:00PM</option>
                        <option value={TimeOrder._18r}>06:30PM</option>
                        <option value={TimeOrder._19h}>07:00PM</option>
                        <option value={TimeOrder._19r}>07:30PM</option>
                        <option value={TimeOrder._20h}>08:00PM</option>
                        <option value={TimeOrder._20r}>08:30PM</option>
                        <option value={TimeOrder._other}>Other</option>
                    </optgroup>
                </select>
            </div>

            <MDBTextArea
                label="Note"
                id="textAreaExample"
                rows={2}
                value={note}
                onChange={(e) => setNote(e.target.value)}
            />

            <div onClick={handleBook}>Booking</div>
        </form>
    );
};

export default BookingForm;
