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
    const [startDate, setStartDate] = useState<any>(Date.now());
    const [typeService, setTypeService] = useState(TypeService.Lunch);
    const [timeOrder, setTimeOrder] = useState(TimeOrder._10h);
    const [key, setKey] = useState('');

    const handleBook = () => {
        const data: TCustomerCreate = {
            name: name,
            quantityBook: quantity,
            phone: phone,
            dateOrder: startDate.unix,
            typeService: typeService,
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
                <select className="select-element" defaultValue={typeService}>
                    <optgroup label="Type service">
                        <option
                            value={TypeService.Lunch}
                            onClick={() => setTypeService(TypeService.Lunch)}
                        >
                            Lunch
                        </option>
                        <option
                            value={TypeService.Dinner}
                            onClick={() => setTypeService(TypeService.Dinner)}
                        >
                            Dinner
                        </option>
                    </optgroup>
                </select>
            </div>

            <div>
                <select className="select-element" defaultValue={timeOrder}>
                    {typeService === TypeService.Lunch ? (
                        <optgroup label="Time order">
                            <option
                                value={TimeOrder._10h}
                                onClick={() => setTimeOrder(TimeOrder._10h)}
                            >
                                10:00PM
                            </option>
                            <option
                                value={TimeOrder._10r}
                                onClick={() => setTimeOrder(TimeOrder._10r)}
                            >
                                10:30PM
                            </option>
                            <option
                                value={TimeOrder._11h}
                                onClick={() => setTimeOrder(TimeOrder._11h)}
                            >
                                11:00PM
                            </option>
                            <option
                                value={TimeOrder._11r}
                                onClick={() => setTimeOrder(TimeOrder._11r)}
                            >
                                11:30PM
                            </option>
                            <option
                                value={TimeOrder._12h}
                                onClick={() => setTimeOrder(TimeOrder._12h)}
                            >
                                12:00PM
                            </option>
                            <option
                                value={TimeOrder._12r}
                                onClick={() => setTimeOrder(TimeOrder._12r)}
                            >
                                12:30PM
                            </option>
                            <option
                                value={TimeOrder._other}
                                onClick={() => setTimeOrder(TimeOrder._other)}
                            >
                                Other
                            </option>
                        </optgroup>
                    ) : (
                        <optgroup label="Time order">
                            <option
                                value={TimeOrder._18h}
                                onClick={() => setTimeOrder(TimeOrder._18h)}
                            >
                                18:00PM
                            </option>
                            <option
                                value={TimeOrder._18r}
                                onClick={() => setTimeOrder(TimeOrder._18r)}
                            >
                                18:30PM
                            </option>
                            <option
                                value={TimeOrder._19h}
                                onClick={() => setTimeOrder(TimeOrder._19h)}
                            >
                                19:00PM
                            </option>
                            <option
                                value={TimeOrder._19r}
                                onClick={() => setTimeOrder(TimeOrder._19r)}
                            >
                                19:30PM
                            </option>
                            <option
                                value={TimeOrder._20h}
                                onClick={() => setTimeOrder(TimeOrder._20h)}
                            >
                                20:00PM
                            </option>
                            <option
                                value={TimeOrder._20r}
                                onClick={() => setTimeOrder(TimeOrder._20r)}
                            >
                                20:30PM
                            </option>
                            <option
                                value={TimeOrder._other}
                                onClick={() => setTimeOrder(TimeOrder._other)}
                            >
                                Other
                            </option>
                        </optgroup>
                    )}
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
