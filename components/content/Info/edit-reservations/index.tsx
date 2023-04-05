import { useState, useEffect, memo } from 'react';

import DatePicker, { DateObject } from 'react-multi-date-picker';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { usePageContext } from '../../../context/PageContext';

import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';
import Save from '@atlaskit/icon/glyph/download';
import Phone from '@atlaskit/icon/glyph/mobile';
import EditorDoneIcon from '@atlaskit/icon/glyph/editor/done';
import ChevronLeftLargeIcon from '@atlaskit/icon/glyph/chevron-left-large';
import CalendarIcon from '@atlaskit/icon/glyph/calendar';
import ChevronRightLargeIcon from '@atlaskit/icon/glyph/chevron-right-large';
import Clock from '@atlaskit/icon/glyph/emoji/frequent';
import PeopleIcon from '@atlaskit/icon/glyph/people';
import Chair from '@atlaskit/icon/glyph/editor/media-wide';
import DocumentIcon from '@atlaskit/icon/glyph/document';
import NoShow from '@atlaskit/icon/glyph/media-services/preselected';
import Cancelled from '@atlaskit/icon/glyph/cross-circle';
import ModalCanCel from './modal-cancel';
import Warning from '@atlaskit/icon/glyph/jira/failed-build-status';
import ModalWarning from './modal-warning';
import { useAppDispatch, useAppSelector } from '../../../../redux/hook';
import {
    customerDF,
    CustomerStatus,
    tableDF,
} from '../../../../public/data-constant';
import { TCustomer } from '../../../../type/customer.type';
import {
    getOneCustomer,
    updateCustomer,
} from '../../../../redux/slices/customer.slice';
import { updateTable } from '../../../../redux/slices/table.silce';

const EditDetails = () => {
    const dispatch = useAppDispatch();
    const tableList = useAppSelector((state) => state.tables.tableList);
    const customerChoosen =
        useAppSelector((state) => state.customers.customerChoosen) ??
        customerDF;

    const { customerChanged, setCustomerChanged } = usePageContext();
    const [startDate, setStartDate] = useState<any>(customerChoosen.dateOrder);
    const [showModal, setShowModal] = useState(false);
    const [showWModal, setShowWModal] = useState(false);
    const [colorText, setColorText] = useState({
        text: {
            table: '#1B2A4E',
            people: '#1B2A4E',
            time: '#1B2A4E',
        },
    });

    const findTable = (id: string) => {
        const table = tableList.find((table) => table.idCustomer === id);
        return table ?? tableDF;
    };

    useEffect(() => {
        setCustomerChanged(customerChoosen);
    }, [customerChoosen, setCustomerChanged]);

    const customerStatusEdit = (status: CustomerStatus) => {
        switch (status) {
            case CustomerStatus.Confirmed:
                return (
                    <div
                        className="edit-stt"
                        style={{
                            color: '#1B2A4E',
                            backgroundColor: '#F1F4F8',
                        }}
                    >
                        <span>
                            <EditorDoneIcon
                                label="booked"
                                size="small"
                                primaryColor="#1B2A4E"
                            />
                        </span>
                        <span className="stt-text">Comfirmed</span>
                    </div>
                );
            case CustomerStatus.Late:
                return (
                    <div
                        className="edit-stt"
                        style={{
                            color: '#FF5C00',
                            backgroundColor: '#FFF5EF',
                        }}
                    >
                        <span>
                            <Clock
                                label="booked"
                                size="small"
                                primaryColor="#FF5C00"
                            />
                        </span>
                        <span className="stt-text">Late</span>
                    </div>
                );
            case CustomerStatus.Seated:
                return (
                    <div
                        className="edit-stt"
                        style={{
                            color: '#275EFE',
                            backgroundColor: '#F2F6FF',
                        }}
                    >
                        <span>
                            <Chair
                                label="booked"
                                size="small"
                                primaryColor="#275EFE"
                            />
                        </span>
                        <span className="stt-text">Seated</span>
                    </div>
                );
            case CustomerStatus.Completed:
                return (
                    <div
                        className="edit-stt"
                        style={{
                            color: '#358970',
                            backgroundColor: '#F0FFF6',
                        }}
                    >
                        <span>
                            <EditorDoneIcon
                                label="booked"
                                size="small"
                                primaryColor="#358970"
                            />
                        </span>
                        <span className="stt-text">Completed</span>
                    </div>
                );
            case CustomerStatus.NoShow:
                return (
                    <div
                        className="edit-stt"
                        style={{
                            color: '#DF4759',
                            backgroundColor: '#FFF6F5',
                        }}
                    >
                        <span>
                            <NoShow
                                label="booked"
                                size="small"
                                primaryColor="#DF4759"
                            />
                        </span>
                        <span className="stt-text">No Show</span>
                    </div>
                );
            case CustomerStatus.Cancelled:
                return (
                    <div
                        className="edit-stt"
                        style={{
                            color: '#DF4759',
                            backgroundColor: '#FFF6F5',
                        }}
                    >
                        <span>
                            <Cancelled
                                label="booked"
                                size="small"
                                primaryColor="#DF4759"
                            />
                        </span>
                        <span className="stt-text">Cancelled</span>
                    </div>
                );
            default:
                return (
                    <div
                        className="edit-stt"
                        style={{
                            color: '#1B2A4E',
                            backgroundColor: '#F1F4F8',
                        }}
                    >
                        <span>
                            <EditorDoneIcon
                                label="booked"
                                size="small"
                                primaryColor="#1B2A4E"
                            />
                        </span>
                        <span className="stt-text">Booked</span>
                    </div>
                );
        }
    };

    const changeTable = (event: any) => {
        setCustomerChanged({
            ...customerChanged,
            idTable: String(event.target.value),
        } as TCustomer);

        if (
            customerChanged.quantityBook >
            findTable(String(event.target.value)).totalChair
        ) {
            setColorText((prev) => ({
                text: {
                    ...prev.text,
                    people: 'red',
                    table: 'red',
                },
            }));
        } else {
            setColorText((prev) => ({
                text: {
                    ...prev.text,
                    people: '#1B2A4E',
                    table: '#1B2A4E',
                },
            }));
        }
    };

    const changeQuantity = (event: any) => {
        setCustomerChanged({
            ...customerChanged,
            quantityBook: Number(event.target.value),
        } as TCustomer);

        if (
            Number(event.target.value) >
            findTable(customerChanged.idTable).totalChair
        ) {
            setColorText((prev) => ({
                text: {
                    ...prev.text,
                    people: 'red',
                    table: 'red',
                },
            }));
        } else {
            setColorText((prev) => ({
                text: {
                    ...prev.text,
                    people: '#1B2A4E',
                    table: '#1B2A4E',
                },
            }));
        }
    };

    const notify = () => toast.success('Reservation successfully updated!');

    const handleSave = async () => {
        if (
            colorText.text.people === '#1B2A4E' &&
            colorText.text.table === '#1B2A4E' &&
            colorText.text.time === '#1B2A4E'
        ) {
            const { _id: _, ...newObj } = customerChanged;
            const newCus = {
                id: customerChanged._id,
                data: newObj,
            };
            const oldTable = tableList.find(
                (table) => table.idCustomer === customerChoosen.idTable,
            );
            const newTable =
                tableList.find(
                    (table) => table.idCustomer === customerChanged.idTable,
                ) ?? tableDF;

            await dispatch(updateCustomer(newCus));
            await dispatch(
                updateTable({
                    id: newTable._id,
                    data: {
                        idCustomer: customerChanged._id,
                    },
                }),
            );
            if (oldTable != null) {
                await dispatch(
                    updateTable({
                        id: oldTable._id,
                        data: {
                            idCustomer: '',
                        },
                    }),
                );
            }

            setTimeout(() => {
                setCustomerChanged(customerDF);
                dispatch(getOneCustomer(''));
            }, 1000);
        } else {
            setShowWModal(true);
        }
    };

    const handleCancelled = async () => {
        const newCus = {
            id: customerChanged._id,
            data: {
                status: CustomerStatus.Cancelled,
            },
        };
        const oldTable = tableList.find(
            (table) => table.idCustomer === customerChoosen.idTable,
        );

        await dispatch(updateCustomer(newCus));
        if (oldTable != null) {
            await dispatch(
                updateTable({
                    id: oldTable._id,
                    data: {
                        idCustomer: '',
                    },
                }),
            );
        }

        setTimeout(() => {
            setCustomerChanged(customerDF);
            dispatch(getOneCustomer(''));
        }, 1000);
    };

    return (
        <div className="container-edit">
            <div className="edit-header">
                <span
                    onClick={() => {
                        setCustomerChanged(customerDF);
                        dispatch(getOneCustomer(''));
                    }}
                >
                    <ArrowLeftIcon
                        label="comeback"
                        size="medium"
                        primaryColor="#000"
                    />
                </span>
                <div>
                    <span>
                        <Save label="save" size="small" primaryColor="#000" />
                    </span>
                    <span
                        onClick={() => {
                            handleSave();
                            if (
                                colorText.text.people === '#1B2A4E' &&
                                colorText.text.table === '#1B2A4E' &&
                                colorText.text.time === '#1B2A4E'
                            ) {
                                notify();
                            }
                        }}
                    >
                        Save Changes
                    </span>
                </div>
            </div>

            <div className="edit-name">
                <div style={{ fontWeight: 600 }}>{customerChanged.name}</div>
            </div>

            <div className="reserv-id">
                Reservation ID: #{customerChanged._id}
            </div>

            <div className="phone-viewprofile">
                <div>
                    <span>
                        <Phone
                            label="phone"
                            size="small"
                            primaryColor="#506690"
                        />
                    </span>
                    <span>{customerChanged.phone}</span>
                </div>
                <div>View Profile</div>
            </div>

            {customerStatusEdit(customerChanged.status)}

            <div className="edit-select">
                <div>
                    <span>
                        <CalendarIcon
                            label="calender"
                            size="small"
                            primaryColor="#1B2A4E"
                        />
                    </span>
                    <span
                        style={{
                            fontSize: 15,
                            fontWeight: 600,
                            paddingLeft: 7,
                            color: '#1B2A4E',
                        }}
                    >
                        Date
                    </span>
                </div>
                <div className="datePickerEdit">
                    <DatePicker
                        value={startDate}
                        format="DD MMM YYYY"
                        onChange={(array) => {
                            setStartDate(array);
                        }}
                        disabled={
                            customerChanged.status === CustomerStatus.Seated ||
                            customerChanged.status ===
                                CustomerStatus.Completed ||
                            customerChanged.status === CustomerStatus.NoShow ||
                            customerChanged.status === CustomerStatus.Cancelled
                        }
                        render={(value: Date, openCalendar: any) => {
                            return (
                                <div
                                    className="custom-time-edit"
                                    style={{
                                        backgroundColor: `${
                                            customerChanged.status ===
                                                CustomerStatus.Seated ||
                                            customerChanged.status ===
                                                CustomerStatus.Completed ||
                                            customerChanged.status ===
                                                CustomerStatus.NoShow ||
                                            customerChanged.status ===
                                                CustomerStatus.Cancelled
                                                ? '#ccc'
                                                : '#fff'
                                        }`,
                                        cursor: 'pointer',
                                    }}
                                >
                                    <span
                                        onClick={() => {
                                            if (
                                                customerChanged.status !==
                                                    CustomerStatus.Seated &&
                                                customerChanged.status !==
                                                    CustomerStatus.Completed &&
                                                customerChanged.status !==
                                                    CustomerStatus.NoShow &&
                                                customerChanged.status !==
                                                    CustomerStatus.Cancelled
                                            ) {
                                                let today = new DateObject(
                                                    startDate,
                                                );
                                                let prevDay = today.setDate(
                                                    today.subtract(1, 'day'),
                                                );
                                                setStartDate(prevDay);
                                            }
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
                                            if (
                                                customerChanged.status !== 3 &&
                                                customerChanged.status !== 4 &&
                                                customerChanged.status !== 5 &&
                                                customerChanged.status !== 6
                                            ) {
                                                let today = new DateObject(
                                                    startDate,
                                                );
                                                let prevDay = today.setDate(
                                                    today.add(1, 'day'),
                                                );
                                                setStartDate(prevDay);
                                            }
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
            </div>

            <div className="edit-select">
                <div>
                    <span>
                        <Clock
                            label="clock"
                            size="small"
                            primaryColor="#1B2A4E"
                        />
                    </span>
                    <span
                        style={{
                            fontSize: 15,
                            fontWeight: 600,
                            paddingLeft: 7,
                            color: '#1B2A4E',
                        }}
                    >
                        Time
                    </span>
                </div>
                <div>
                    <select
                        className="select-element"
                        value={customerChanged.timeOrder}
                        disabled={
                            customerChanged.status === CustomerStatus.Seated ||
                            customerChanged.status ===
                                CustomerStatus.Completed ||
                            customerChanged.status === CustomerStatus.NoShow ||
                            customerChanged.status === CustomerStatus.Cancelled
                        }
                        style={{ color: colorText.text.time }}
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

            <div className="edit-select">
                <div>
                    <span>
                        <PeopleIcon
                            label="people"
                            size="small"
                            primaryColor="#1B2A4E"
                        />
                    </span>
                    <span
                        style={{
                            fontSize: 15,
                            fontWeight: 600,
                            paddingLeft: 7,
                            color: '#1B2A4E',
                        }}
                    >
                        People
                    </span>
                </div>
                <div>
                    <select
                        className="select-element"
                        value={customerChanged.quantityBook}
                        onChange={changeQuantity}
                        disabled={
                            customerChanged.status ===
                                CustomerStatus.Completed ||
                            customerChanged.status === CustomerStatus.NoShow ||
                            customerChanged.status === CustomerStatus.Cancelled
                        }
                        style={{ color: colorText.text.people }}
                    >
                        <optgroup label="Adults">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            {/* <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option> */}
                        </optgroup>
                    </select>
                </div>
            </div>

            <div className="edit-select">
                <div>
                    <span>
                        <Chair
                            label="chair"
                            size="small"
                            primaryColor="#1B2A4E"
                        />
                    </span>
                    <span
                        style={{
                            fontSize: 15,
                            fontWeight: 600,
                            paddingLeft: 7,
                            color: '#1B2A4E',
                        }}
                    >
                        Table
                    </span>
                </div>
                <div>
                    <select
                        className="select-element"
                        value={findTable(customerChanged.idTable).number}
                        onChange={changeTable}
                        disabled={
                            customerChanged.status ===
                                CustomerStatus.Completed ||
                            customerChanged.status === CustomerStatus.NoShow ||
                            customerChanged.status === CustomerStatus.Cancelled
                        }
                        style={{ color: colorText.text.table }}
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

            {(colorText.text.people === 'red' ||
                colorText.text.table === 'red' ||
                colorText.text.time === 'red') && (
                <div id="warning-edit">
                    <span>
                        <Warning
                            label="warning"
                            size="small"
                            primaryColor="#DF4759"
                        />
                    </span>
                    <div id="warning-noti">{`${
                        colorText.text.people === 'red' &&
                        colorText.text.time === 'red'
                            ? 'Total pax exceeds table’s capacity and Clashes with an ongoing reservation.'
                            : colorText.text.people === 'red'
                            ? 'Total pax exceeds table’s capacity.'
                            : 'Clashes with an ongoing reservation.'
                    }`}</div>
                </div>
            )}

            <div
                className="edit-select"
                style={{
                    display: 'block',
                }}
            >
                <div>
                    <span>
                        <DocumentIcon
                            label="tag"
                            size="small"
                            primaryColor="#1B2A4E"
                        />
                    </span>
                    <span
                        style={{
                            fontSize: 15,
                            fontWeight: 600,
                            paddingLeft: 7,
                            color: '#1B2A4E',
                        }}
                    >
                        Notes
                    </span>
                </div>
                <div>
                    <textarea className="edit-input" />
                </div>
            </div>

            {customerChanged.status !== 6 && (
                <div>
                    <button
                        className="cancel-reserv-btn"
                        onClick={() => setShowModal(true)}
                    >
                        Cancel Reservation
                    </button>
                </div>
            )}

            {showModal && (
                <ModalCanCel
                    setShowModal={() => setShowModal(false)}
                    handleCancelled={() => handleCancelled()}
                />
            )}

            {showWModal && (
                <ModalWarning
                    setShowWModal={() => setShowWModal(false)}
                    handleSave={() => {
                        setColorText({
                            text: {
                                table: '#1B2A4E',
                                people: '#1B2A4E',
                                time: '#1B2A4E',
                            },
                        });
                        setTimeout(() => handleSave(), 1000);
                    }}
                />
            )}
        </div>
    );
};

export default memo(EditDetails);
