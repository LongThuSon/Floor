import { useState, useEffect, memo, useContext } from 'react';

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
    TableStatus,
    TimeOrder,
    TypeErrorEdit,
    TypeService,
} from '../../../../public/data-constant';
import { TCustomer } from '../../../../type/customer.type';
import {
    clearCustomerChoosen,
    updateCustomer,
} from '../../../../redux/slices/customer.slice';
import { updateTable } from '../../../../redux/slices/table.silce';
import { MDBInput, MDBTextArea } from 'mdb-react-ui-kit';
import SocketContext from '../../../../socket/contexts/SocketContext';

const EditDetails = () => {
    const dispatch = useAppDispatch();
    const customerList = useAppSelector(
        (state) => state.customers.customerList,
    );
    const tableList = useAppSelector((state) => state.tables.tableList);
    const customerChoosen =
        useAppSelector((state) => state.customers.customerChoosen) ??
        customerDF;
    const { socket, key } = useContext(SocketContext).SocketState;
    const { customerChanged, setCustomerChanged, typeService, startDate } =
        usePageContext();
    const [editStartDate, seteditStartDate] = useState<any>(
        new DateObject(customerChoosen.dateOrder),
    );
    const [showModal, setShowModal] = useState(false);
    const [showWModal, setShowWModal] = useState(false);
    const [typeErrorList, setTypeErorList] = useState<TypeErrorEdit[]>([]);

    const findTable = (id: string) => {
        const table = tableList.find((table) => table._id === id);
        return table ?? tableDF;
    };
    useEffect(() => {
        setCustomerChanged(customerChoosen);
        getDefaultTypeErrorList();
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

    const addTypeError = (typeError: TypeErrorEdit) => {
        if (typeErrorList.indexOf(typeError) === -1) {
            setTypeErorList((oldArray: TypeErrorEdit[]) => [
                ...oldArray,
                typeError,
            ]);
        }
    };

    const removeTypeError = (typeError: TypeErrorEdit) => {
        if (typeErrorList.indexOf(typeError) !== -1) {
            setTypeErorList((currentArray: TypeErrorEdit[]) =>
                currentArray.filter(
                    (remainElement: TypeErrorEdit) =>
                        remainElement !== typeError,
                ),
            );
        }
    };

    const getDefaultTypeErrorList = () => {
        if (customerChoosen.status !== CustomerStatus.Booked) {
            // check over people
            if (
                customerChoosen.quantityBook >
                findTable(customerChoosen.idTable).totalChair
            ) {
                addTypeError(TypeErrorEdit.OverPeople);
            }

            // check same table
            const checkClashCusList = customerList.filter(
                (cus) => cus.idTable === customerChoosen.idTable,
            );
            if (checkClashCusList.length > 1) {
                addTypeError(TypeErrorEdit.SameTable);
            }
        }
    };

    const changeTimeOrder = (e: any) => {
        setCustomerChanged({
            ...customerChanged,
            timeOrder: String(e.target.value) as TimeOrder,
        } as TCustomer);
    };

    const changeTable = (e: any) => {
        setCustomerChanged({
            ...customerChanged,
            idTable: String(e.target.value),
        } as TCustomer);

        const newTable = tableList.find(
            (table) => table._id === String(e.target.value),
        );

        if (newTable !== undefined) {
            if (
                newTable !== undefined &&
                customerChanged.quantityBook > newTable.totalChair
            ) {
                addTypeError(TypeErrorEdit.OverPeople);
            } else {
                removeTypeError(TypeErrorEdit.OverPeople);
            }

            if (
                newTable.idCustomer !== '' &&
                newTable.idCustomer !== customerChanged._id
            ) {
                addTypeError(TypeErrorEdit.SameTable);
            } else {
                removeTypeError(TypeErrorEdit.SameTable);
            }
        }
    };

    const changeQuantity = (e: any) => {
        setCustomerChanged({
            ...customerChanged,
            quantityBook: Number(e.target.value),
        } as TCustomer);

        if (
            Number(e.target.value) >
            findTable(customerChanged.idTable).totalChair
        ) {
            addTypeError(TypeErrorEdit.OverPeople);
        } else {
            removeTypeError(TypeErrorEdit.OverPeople);
        }
    };

    const notify = () => toast.success('Reservation successfully updated!');

    const handleSave = async () => {
        var status = customerChanged.status;
        var statusTable = customerChanged.statusTable;
        if (
            customerChanged.statusTable === TableStatus.Available &&
            customerChanged.idTable !== ''
        ) {
            statusTable = TableStatus.Reserved;
            status = CustomerStatus.Confirmed;
        }

        var typeService = TypeService.Lunch;
        if (
            customerChanged.timeOrder === TimeOrder._18h ||
            customerChanged.timeOrder === TimeOrder._18r ||
            customerChanged.timeOrder === TimeOrder._19h ||
            customerChanged.timeOrder === TimeOrder._19r ||
            customerChanged.timeOrder === TimeOrder._20h ||
            customerChanged.timeOrder === TimeOrder._20r
        ) {
            typeService = TypeService.Dinner;
        }

        const oldTable = tableList.find(
            (table) => table._id === customerChoosen.idTable,
        );
        const newTable = tableList.find(
            (table) => table._id === customerChanged.idTable,
        );

        var otherIdCus = '';
        const oldCusClashNoCurrentList = customerList.filter(
            (cus) =>
                cus.idTable === customerChoosen.idTable &&
                cus._id !== customerChoosen._id,
        );
        if (oldCusClashNoCurrentList.length > 0) {
            otherIdCus = oldCusClashNoCurrentList[0]._id;
        }

        if (typeErrorList.length > 0) {
            statusTable = TableStatus.Clash;
        } else if (statusTable === TableStatus.Clash) {
            switch (status) {
                case CustomerStatus.Confirmed:
                    console.log('check');
                    statusTable = TableStatus.Reserved;
                    break;
                case (CustomerStatus.Seated, CustomerStatus.Late):
                    statusTable = TableStatus.InUse;
                    break;
                default:
                    statusTable = TableStatus.Available;
                    break;
            }
        }

        const newCus = {
            id: customerChanged._id,
            data: {
                dateOrder: customerChanged.dateOrder,
                timeOrder: customerChanged.timeOrder,
                note: customerChanged.note,
                idTable: customerChanged.idTable,
                quantityBook: customerChanged.quantityBook,
                statusTable: statusTable,
                status: status,
                typeService: typeService,
                errorClash: typeErrorList,
            },
        };

        await dispatch(updateCustomer(newCus))
            .then((_) => {
                if (typeErrorList.includes(TypeErrorEdit.SameTable)) {
                    const payload = {
                        keyRestaurant: key,
                        typeService: typeService,
                        dateOrder: startDate.unix * 1000,
                        idTable: customerChanged.idTable,
                    };
                    socket?.emit('handleClash', payload);
                }
                notify();
            })
            .catch((error) => console.log(error));

        if (newTable !== undefined && newTable._id !== oldTable?._id) {
            await dispatch(
                updateTable({
                    id: newTable._id,
                    data: {
                        idCustomer: customerChanged._id,
                    },
                }),
            );
            if (oldTable != undefined) {
                await dispatch(
                    updateTable({
                        id: oldTable._id,
                        data: {
                            idCustomer: otherIdCus,
                        },
                    }),
                );
            }
            if (oldCusClashNoCurrentList.length === 1) {
                var refixStatusTable;
                switch (oldCusClashNoCurrentList[0].status) {
                    case CustomerStatus.Confirmed:
                        refixStatusTable = TableStatus.Reserved;
                        break;
                    case (CustomerStatus.Seated, CustomerStatus.Late):
                        refixStatusTable = TableStatus.InUse;
                        break;
                    default:
                        refixStatusTable = TableStatus.Available;
                        break;
                }
                await dispatch(
                    updateCustomer({
                        id: otherIdCus,
                        data: {
                            statusTable: refixStatusTable,
                        },
                    }),
                );
            }
        }

        setTimeout(() => {
            setCustomerChanged(customerDF);
            dispatch(clearCustomerChoosen());
        }, 1000);
    };

    const handleCancelled = async () => {
        const newCus = {
            id: customerChanged._id,
            data: {
                status: CustomerStatus.Cancelled,
            },
        };
        const oldTable = tableList.find(
            (table) => table._id === customerChoosen.idTable,
        );

        await dispatch(updateCustomer(newCus));
        if (oldTable != undefined) {
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
            dispatch(clearCustomerChoosen());
        }, 1000);
    };

    const handleClashSave = () => {};

    return (
        <div className="container-edit">
            <div className="edit-header">
                <span
                    onClick={() => {
                        setCustomerChanged(customerDF);
                        dispatch(clearCustomerChoosen());
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
                            if (typeErrorList.length === 0) {
                                handleSave();
                            } else {
                                setShowWModal(true);
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
                        value={editStartDate}
                        format="DD MMM YYYY"
                        onChange={(array) => {
                            seteditStartDate(array);
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
                                                    editStartDate,
                                                );
                                                let prevDay = today.setDate(
                                                    today.subtract(1, 'day'),
                                                );
                                                seteditStartDate(prevDay);
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
                                                    editStartDate,
                                                );
                                                let prevDay = today.setDate(
                                                    today.add(1, 'day'),
                                                );
                                                seteditStartDate(prevDay);
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
                        onChange={changeTimeOrder}
                        style={{
                            color: typeErrorList.includes(
                                TypeErrorEdit.SameTable,
                            )
                                ? 'red'
                                : '#1B2A4E',
                        }}
                    >
                        <optgroup label="Time order">
                            <option value={TimeOrder._10h}>10:00PM</option>
                            <option value={TimeOrder._10r}>10:30PM</option>
                            <option value={TimeOrder._11h}>11:00PM</option>
                            <option value={TimeOrder._11r}>11:30PM</option>
                            <option value={TimeOrder._12h}>12:00PM</option>
                            <option value={TimeOrder._12r}>12:30PM</option>
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
                <MDBInput
                    id="typeNumber"
                    type="number"
                    className="select-element"
                    value={customerChanged.quantityBook}
                    disabled={
                        customerChanged.status === CustomerStatus.Completed ||
                        customerChanged.status === CustomerStatus.NoShow ||
                        customerChanged.status === CustomerStatus.Cancelled
                    }
                    style={{
                        color: typeErrorList.includes(TypeErrorEdit.OverPeople)
                            ? 'red'
                            : '#1B2A4E',
                    }}
                    onChange={changeQuantity}
                />
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
                        style={{
                            color:
                                typeErrorList.includes(
                                    TypeErrorEdit.SameTable,
                                ) ||
                                typeErrorList.includes(TypeErrorEdit.OverPeople)
                                    ? 'red'
                                    : '#1B2A4E',
                        }}
                    >
                        <optgroup label="Table">
                            {tableList.map((table) => (
                                <option value={table._id} key={table._id}>
                                    {table.number}
                                </option>
                            ))}
                        </optgroup>
                    </select>
                </div>
            </div>

            {typeErrorList.length !== 0 && (
                <div id="warning-edit">
                    <span>
                        <Warning
                            label="warning"
                            size="small"
                            primaryColor="#DF4759"
                        />
                    </span>
                    <div id="warning-noti">{`${
                        typeErrorList.length === 2
                            ? 'Total pax exceeds table’s capacity and Clashes with an ongoing reservation.'
                            : typeErrorList.includes(TypeErrorEdit.OverPeople)
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
                <MDBTextArea
                    className="edit-input"
                    rows={2}
                    value={customerChanged.note}
                    onChange={(e) =>
                        setCustomerChanged({
                            ...customerChanged,
                            note: String(e.target.value),
                        } as TCustomer)
                    }
                />
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
                        setTypeErorList([]);
                        setTimeout(() => handleSave(), 1000);
                    }}
                />
            )}
        </div>
    );
};

export default memo(EditDetails);
