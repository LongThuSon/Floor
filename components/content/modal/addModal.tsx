import React, { useState } from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBInput,
    MDBTextArea,
} from 'mdb-react-ui-kit';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import {
    TableType,
    TimeOrder,
    TypeActive,
    TypeService,
} from '../../../public/data-constant';
import ChevronLeftLargeIcon from '@atlaskit/icon/glyph/chevron-left-large';
import ChevronRightLargeIcon from '@atlaskit/icon/glyph/chevron-right-large';
import { TCustomerCreate } from '../../../type/customer.type';
import { useAppDispatch } from '../../../redux/hook';
import { createCustomer } from '../../../redux/slices/customer.slice';
import { createTable } from '../../../redux/slices/table.silce';
import { TTableCreate } from '../../../type/table.type';

export default function App() {
    const dispatch = useAppDispatch();

    // state modal
    const [showModal, setShowModal] = useState(false);
    const [typeActive, setTypeActive] = useState(TypeActive.Customer);

    // state customer
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [note, setNote] = useState('');
    const [startDate, setStartDate] = useState<any>(Date.now());
    const [typeService, setTypeService] = useState(TypeService.Lunch);
    const [timeOrder, setTimeOrder] = useState(TimeOrder._10h);

    // state table
    const [numberTb, setNumberTb] = useState(0);
    const [topPos, setTopPos] = useState(0);
    const [leftPos, setLeftPos] = useState(0);
    const [typeTb, setTypeTb] = useState(TableType._1v1);

    const toggleShow = () => setShowModal(!showModal);

    const handleAddCus = () => {
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

        dispatch(createCustomer(data))
            .then((_) => clearCusState())
            .catch((err) => console.log(err));
    };

    const handleAddTb = () => {
        const data: TTableCreate = {
            number: numberTb,
            type: typeTb,
            topPositon: topPos,
            leftPositon: leftPos,
            keyRestaurant: '',
        };

        dispatch(createTable(data))
            .then((_) => clearTbState())
            .catch((err) => console.log(err));
    };

    const clearCusState = () => {
        setName('');
        setPhone('');
        setQuantity(0);
        setNote('');
        setStartDate(Date.now());
        setTypeService(TypeService.Lunch);
        setTimeOrder(TimeOrder._10h);
    };

    const clearTbState = () => {
        setNumberTb(0);
        setTopPos(0);
        setLeftPos(0);
        setTypeTb(TableType._1v1);
    };

    return (
        <>
            <MDBBtn id="button-add" onClick={toggleShow}>
                +
            </MDBBtn>
            <MDBModal show={showModal} setShow={setShowModal} tabIndex="-1">
                <MDBModalDialog size="lg">
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Create data</MDBModalTitle>
                            <MDBBtn
                                className="btn-close"
                                color="none"
                                onClick={toggleShow}
                            ></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <div>
                                <MDBTabs pills justify className="mb-3">
                                    <MDBTabsItem>
                                        <MDBTabsLink
                                            onClick={() =>
                                                setTypeActive(
                                                    TypeActive.Customer,
                                                )
                                            }
                                            active={
                                                typeActive ===
                                                TypeActive.Customer
                                            }
                                        >
                                            Customer
                                        </MDBTabsLink>
                                    </MDBTabsItem>
                                    <MDBTabsItem>
                                        <MDBTabsLink
                                            onClick={() =>
                                                setTypeActive(TypeActive.Table)
                                            }
                                            active={
                                                typeActive === TypeActive.Table
                                            }
                                        >
                                            Table
                                        </MDBTabsLink>
                                    </MDBTabsItem>
                                </MDBTabs>

                                <MDBTabsContent>
                                    <MDBTabsPane
                                        show={
                                            typeActive === TypeActive.Customer
                                        }
                                    >
                                        <form>
                                            <MDBInput
                                                wrapperClass="mb-4"
                                                id="form6Example3"
                                                label="Name"
                                                value={name}
                                                onChange={(e) =>
                                                    setName(e.target.value)
                                                }
                                            />
                                            <MDBInput
                                                className="mb-4"
                                                type="tel"
                                                id="form1Example1"
                                                label="phone number"
                                                value={phone}
                                                onChange={(e) =>
                                                    setPhone(e.target.value)
                                                }
                                            />
                                            <MDBInput
                                                label="Quantity"
                                                id="typeNumber"
                                                type="number"
                                                value={quantity}
                                                onChange={(e) =>
                                                    setQuantity(
                                                        Number(e.target.value),
                                                    )
                                                }
                                            />
                                            <div className="datePickerEdit">
                                                <DatePicker
                                                    value={startDate}
                                                    format="DD MMM YYYY"
                                                    onChange={(array) => {
                                                        setStartDate(array);
                                                    }}
                                                    render={(
                                                        value: Date,
                                                        openCalendar: any,
                                                    ) => {
                                                        return (
                                                            <div
                                                                className="custom-time-edit"
                                                                style={{
                                                                    backgroundColor:
                                                                        '#fff',
                                                                    cursor: 'pointer',
                                                                }}
                                                            >
                                                                <span
                                                                    onClick={() => {
                                                                        let today =
                                                                            new DateObject(
                                                                                startDate,
                                                                            );
                                                                        let prevDay =
                                                                            today.setDate(
                                                                                today.subtract(
                                                                                    1,
                                                                                    'day',
                                                                                ),
                                                                            );
                                                                        setStartDate(
                                                                            prevDay,
                                                                        );
                                                                    }}
                                                                >
                                                                    <ChevronLeftLargeIcon
                                                                        label="left"
                                                                        size="small"
                                                                    />
                                                                </span>

                                                                <span
                                                                    onClick={
                                                                        openCalendar
                                                                    }
                                                                >
                                                                    {value}
                                                                </span>

                                                                <span
                                                                    onClick={() => {
                                                                        let today =
                                                                            new DateObject(
                                                                                startDate,
                                                                            );
                                                                        let prevDay =
                                                                            today.setDate(
                                                                                today.add(
                                                                                    1,
                                                                                    'day',
                                                                                ),
                                                                            );
                                                                        setStartDate(
                                                                            prevDay,
                                                                        );
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
                                                    defaultValue={typeService}
                                                >
                                                    <optgroup label="Type service">
                                                        <option
                                                            value={
                                                                TypeService.Lunch
                                                            }
                                                            onClick={() =>
                                                                setTypeService(
                                                                    TypeService.Lunch,
                                                                )
                                                            }
                                                        >
                                                            Lunch
                                                        </option>
                                                        <option
                                                            value={
                                                                TypeService.Dinner
                                                            }
                                                            onClick={() =>
                                                                setTypeService(
                                                                    TypeService.Dinner,
                                                                )
                                                            }
                                                        >
                                                            Dinner
                                                        </option>
                                                    </optgroup>
                                                </select>
                                            </div>

                                            <div>
                                                <select
                                                    className="select-element"
                                                    defaultValue={timeOrder}
                                                >
                                                    {typeService ===
                                                    TypeService.Lunch ? (
                                                        <optgroup label="Time order">
                                                            <option
                                                                value={
                                                                    TimeOrder._10h
                                                                }
                                                                onClick={() =>
                                                                    setTimeOrder(
                                                                        TimeOrder._10h,
                                                                    )
                                                                }
                                                            >
                                                                10:00PM
                                                            </option>
                                                            <option
                                                                value={
                                                                    TimeOrder._10r
                                                                }
                                                                onClick={() =>
                                                                    setTimeOrder(
                                                                        TimeOrder._10r,
                                                                    )
                                                                }
                                                            >
                                                                10:30PM
                                                            </option>
                                                            <option
                                                                value={
                                                                    TimeOrder._11h
                                                                }
                                                                onClick={() =>
                                                                    setTimeOrder(
                                                                        TimeOrder._11h,
                                                                    )
                                                                }
                                                            >
                                                                11:00PM
                                                            </option>
                                                            <option
                                                                value={
                                                                    TimeOrder._11r
                                                                }
                                                                onClick={() =>
                                                                    setTimeOrder(
                                                                        TimeOrder._11r,
                                                                    )
                                                                }
                                                            >
                                                                11:30PM
                                                            </option>
                                                            <option
                                                                value={
                                                                    TimeOrder._12h
                                                                }
                                                                onClick={() =>
                                                                    setTimeOrder(
                                                                        TimeOrder._12h,
                                                                    )
                                                                }
                                                            >
                                                                12:00PM
                                                            </option>
                                                            <option
                                                                value={
                                                                    TimeOrder._12r
                                                                }
                                                                onClick={() =>
                                                                    setTimeOrder(
                                                                        TimeOrder._12r,
                                                                    )
                                                                }
                                                            >
                                                                12:30PM
                                                            </option>
                                                            <option
                                                                value={
                                                                    TimeOrder._other
                                                                }
                                                                onClick={() =>
                                                                    setTimeOrder(
                                                                        TimeOrder._other,
                                                                    )
                                                                }
                                                            >
                                                                Other
                                                            </option>
                                                        </optgroup>
                                                    ) : (
                                                        <optgroup label="Time order">
                                                            <option
                                                                value={
                                                                    TimeOrder._18h
                                                                }
                                                                onClick={() =>
                                                                    setTimeOrder(
                                                                        TimeOrder._18h,
                                                                    )
                                                                }
                                                            >
                                                                18:00PM
                                                            </option>
                                                            <option
                                                                value={
                                                                    TimeOrder._18r
                                                                }
                                                                onClick={() =>
                                                                    setTimeOrder(
                                                                        TimeOrder._18r,
                                                                    )
                                                                }
                                                            >
                                                                18:30PM
                                                            </option>
                                                            <option
                                                                value={
                                                                    TimeOrder._19h
                                                                }
                                                                onClick={() =>
                                                                    setTimeOrder(
                                                                        TimeOrder._19h,
                                                                    )
                                                                }
                                                            >
                                                                19:00PM
                                                            </option>
                                                            <option
                                                                value={
                                                                    TimeOrder._19r
                                                                }
                                                                onClick={() =>
                                                                    setTimeOrder(
                                                                        TimeOrder._19r,
                                                                    )
                                                                }
                                                            >
                                                                19:30PM
                                                            </option>
                                                            <option
                                                                value={
                                                                    TimeOrder._20h
                                                                }
                                                                onClick={() =>
                                                                    setTimeOrder(
                                                                        TimeOrder._20h,
                                                                    )
                                                                }
                                                            >
                                                                20:00PM
                                                            </option>
                                                            <option
                                                                value={
                                                                    TimeOrder._20r
                                                                }
                                                                onClick={() =>
                                                                    setTimeOrder(
                                                                        TimeOrder._20r,
                                                                    )
                                                                }
                                                            >
                                                                20:30PM
                                                            </option>
                                                            <option
                                                                value={
                                                                    TimeOrder._other
                                                                }
                                                                onClick={() =>
                                                                    setTimeOrder(
                                                                        TimeOrder._other,
                                                                    )
                                                                }
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
                                                onChange={(e) =>
                                                    setNote(e.target.value)
                                                }
                                            />

                                            <div onClick={handleAddCus}>
                                                Add customer
                                            </div>
                                        </form>
                                    </MDBTabsPane>

                                    <MDBTabsPane
                                        show={typeActive === TypeActive.Table}
                                    >
                                        <form>
                                            <MDBInput
                                                label="Number table"
                                                id="number-tb"
                                                type="number"
                                                value={numberTb}
                                                onChange={(e) =>
                                                    setNumberTb(
                                                        Number(e.target.value),
                                                    )
                                                }
                                            />

                                            <div>
                                                <select
                                                    className="select-element"
                                                    defaultValue={typeTb}
                                                >
                                                    <optgroup label="Type table">
                                                        <option
                                                            value={
                                                                TableType._1v1
                                                            }
                                                            onClick={() =>
                                                                setTypeTb(
                                                                    TableType._1v1,
                                                                )
                                                            }
                                                        >
                                                            1 vs 1
                                                        </option>
                                                        <option
                                                            value={
                                                                TableType._2v2c
                                                            }
                                                            onClick={() =>
                                                                setTypeTb(
                                                                    TableType._2v2c,
                                                                )
                                                            }
                                                        >
                                                            2 vs 2 - column
                                                        </option>
                                                        <option
                                                            value={
                                                                TableType._2v2r
                                                            }
                                                            onClick={() =>
                                                                setTypeTb(
                                                                    TableType._2v2r,
                                                                )
                                                            }
                                                        >
                                                            2 vs 2 - row
                                                        </option>
                                                        <option
                                                            value={
                                                                TableType._3v3
                                                            }
                                                            onClick={() =>
                                                                setTypeTb(
                                                                    TableType._3v3,
                                                                )
                                                            }
                                                        >
                                                            3 vs 3
                                                        </option>
                                                        <option
                                                            value={
                                                                TableType._6v6
                                                            }
                                                            onClick={() =>
                                                                setTypeTb(
                                                                    TableType._6v6,
                                                                )
                                                            }
                                                        >
                                                            6 vs 6
                                                        </option>
                                                        <option
                                                            value={
                                                                TableType._7v7
                                                            }
                                                            onClick={() =>
                                                                setTypeTb(
                                                                    TableType._7v7,
                                                                )
                                                            }
                                                        >
                                                            7 vs 7
                                                        </option>
                                                        <option
                                                            value={TableType.C6}
                                                            onClick={() =>
                                                                setTypeTb(
                                                                    TableType.C6,
                                                                )
                                                            }
                                                        >
                                                            Circle 6
                                                        </option>
                                                        <option
                                                            value={TableType.C8}
                                                            onClick={() =>
                                                                setTypeTb(
                                                                    TableType.C8,
                                                                )
                                                            }
                                                        >
                                                            Circle 8
                                                        </option>
                                                        <option
                                                            value={
                                                                TableType.C14
                                                            }
                                                            onClick={() =>
                                                                setTypeTb(
                                                                    TableType.C14,
                                                                )
                                                            }
                                                        >
                                                            Circle 14
                                                        </option>
                                                    </optgroup>
                                                </select>
                                            </div>

                                            <MDBInput
                                                label="Top position"
                                                id="top-position-tb"
                                                type="number"
                                                value={topPos}
                                                onChange={(e) =>
                                                    setTopPos(
                                                        Number(e.target.value),
                                                    )
                                                }
                                            />

                                            <MDBInput
                                                label="Left position"
                                                id="left-position-tb"
                                                type="number"
                                                value={leftPos}
                                                onChange={(e) =>
                                                    setLeftPos(
                                                        Number(e.target.value),
                                                    )
                                                }
                                            />

                                            <div onClick={handleAddTb}>
                                                Add table
                                            </div>
                                        </form>
                                    </MDBTabsPane>
                                </MDBTabsContent>
                            </div>
                        </MDBModalBody>

                        <MDBModalFooter>
                            <MDBBtn color="secondary" onClick={toggleShow}>
                                Close
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}
