import { useState, useEffect, memo, useContext } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useInfoContext } from '../../../context/InfoContext';

import PeopleIcon from '@atlaskit/icon/glyph/people';
import Chair from '@atlaskit/icon/glyph/editor/media-wide';
import EditorDoneIcon from '@atlaskit/icon/glyph/editor/done';
import Tag from '@atlaskit/icon/glyph/creditcard';
import MobileIcon from '@atlaskit/icon/glyph/mobile';
import Clock from '@atlaskit/icon/glyph/recent';
import NoShow from '@atlaskit/icon/glyph/media-services/preselected';
import Cancelled from '@atlaskit/icon/glyph/cross-circle';
import EditFilledIcon from '@atlaskit/icon/glyph/edit-filled';
import Hold from '@atlaskit/icon/glyph/notification-all';
import { useAppDispatch, useAppSelector } from '../../../../redux/hook';
import {
    CustomerStatus,
    tableDF,
    TableStatus,
} from '../../../../public/data-constant';
import {
    getOneCustomer,
    updateCustomer,
} from '../../../../redux/slices/customer.slice';
import { TCustomer } from '../../../../type/customer.type';
import SocketContext from '../../../../socket/contexts/SocketContext';
import { updateTable } from '../../../../redux/slices/table.silce';

const CustomerList = () => {
    const dispatch = useAppDispatch();
    const tableList = useAppSelector((state) => state.tables.tableList);
    const customerList = useAppSelector(
        (state) => state.customers.customerList,
    );
    const { socket } = useContext(SocketContext).SocketState;
    const { showDetails, searchField } = useInfoContext();
    const [listShow, setListShow] = useState<string[]>([]);

    useEffect(() => {
        setListShow([]);
    }, []);

    const findTable = (id: string) => {
        const table = tableList.find((table) => table._id === id);
        return table ?? tableDF;
    };

    const customerFilter = (customer: TCustomer) => {
        if (searchField.request.status === -1) {
            return true;
        } else if (searchField.request.status === -2) {
            return (
                customer.status === CustomerStatus.NoShow ||
                customer.status === CustomerStatus.Cancelled
            );
        } else if (searchField.request.status === -3) {
            return (
                customer.status !== CustomerStatus.Seated &&
                customer.status !== CustomerStatus.Completed &&
                customer.status !== CustomerStatus.NoShow &&
                customer.status !== CustomerStatus.Cancelled
            );
        } else {
            return true;
        }
    };

    const settingcustomers = customerList.filter(customerFilter);

    const searchcustomers = settingcustomers.filter((person) => {
        return person.name
            ?.toLowerCase()
            .includes(searchField.request.name.toLowerCase());
    });

    const customerStatus = (status: CustomerStatus) => {
        switch (status) {
            case CustomerStatus.Confirmed:
                return (
                    <div
                        className="customer-status"
                        style={{
                            width: '89px',
                            color: '#506690',
                            backgroundColor: '#F1F4F8',
                        }}
                    >
                        <span>
                            <EditorDoneIcon
                                label="comfirmed"
                                size="small"
                                primaryColor="#506690"
                            />
                            Comfirmed
                        </span>
                    </div>
                );
            case CustomerStatus.Late:
                return (
                    <div
                        className="customer-status"
                        style={{
                            width: '61px',
                            color: '#FF5C00',
                            backgroundColor: '#FFF3EC',
                        }}
                    >
                        <span>
                            <Clock
                                label="late"
                                size="small"
                                primaryColor="#FF5C00"
                            />
                            Late
                        </span>
                    </div>
                );
            case CustomerStatus.Seated:
                return (
                    <div
                        className="customer-status"
                        style={{
                            width: '74px',
                            color: '#275EFE',
                            backgroundColor: '#F2F6FF',
                        }}
                    >
                        <span>
                            <Chair
                                label="seated"
                                size="small"
                                primaryColor="#275EFE"
                            />
                            Seated
                        </span>
                    </div>
                );
            case CustomerStatus.Completed:
                return (
                    <div
                        className="customer-status"
                        style={{
                            width: '95px',
                            color: '#358970',
                            backgroundColor: '#F1F4F8',
                        }}
                    >
                        <span>
                            <EditorDoneIcon
                                label="completed"
                                size="small"
                                primaryColor="#F1FFF6"
                            />
                            Completed
                        </span>
                    </div>
                );
            case CustomerStatus.NoShow:
                return (
                    <div
                        className="customer-status"
                        style={{
                            width: '83px',
                            color: '#DF4759',
                            backgroundColor: '#FFF6F5',
                        }}
                    >
                        <span>
                            <NoShow
                                label="no show"
                                size="small"
                                primaryColor="#FFF6F5"
                            />
                            No Show
                        </span>
                    </div>
                );
            case CustomerStatus.Cancelled:
                return (
                    <div
                        className="customer-status"
                        style={{
                            width: '89px',
                            color: '#DF4759',
                            backgroundColor: '#FFF6F5',
                        }}
                    >
                        <span>
                            <Cancelled
                                label="cancelled"
                                size="small"
                                primaryColor="#DF4759"
                            />
                            Cancelled
                        </span>
                    </div>
                );
            default:
                return (
                    <div
                        className="customer-status"
                        style={{
                            width: '71px',
                            color: '#506690',
                            backgroundColor: '#F1F4F8',
                        }}
                    >
                        <span>
                            <EditorDoneIcon
                                label="booked"
                                size="small"
                                primaryColor="#506690"
                            />
                            Booked
                        </span>
                    </div>
                );
        }
    };

    const handleshow = (index: string) => {
        if (listShow.indexOf(index) === -1) {
            setListShow((oldArray: string[]) => [...oldArray, index]);
        } else {
            setListShow((currentArray: string[]) =>
                currentArray.filter(
                    (remainElement: string) => remainElement !== index,
                ),
            );
        }
    };

    const notify = (status: string, name: string, numberTable?: number) => {
        if (status === 'comfirm') {
            toast.success(`Reservation confirmed for ${name}!`);
        } else if (status === 'seated') {
            toast.success(`${name} seated at Table ${numberTable}.`);
        } else {
            toast.success(`Table ${numberTable} has been put on hold.`);
        }
    };

    const updateSeat = (id: string) => {
        const updateCus = {
            id: id,
            data: {
                status: CustomerStatus.Seated,
                statusTable: TableStatus.InUse,
            },
        };

        dispatch(updateCustomer(updateCus))
            .then((_) => {
                socket?.emit('userInUse', id);
                console.log(`customer ${id} seated`);
            })
            .catch((error) => console.log(error));
    };

    const updateCompleted = (id: string, idTable: string) => {
        const updateCus = {
            id: id,
            data: {
                status: CustomerStatus.Completed,
            },
        };
        const updateTb = {
            id: idTable,
            data: {
                idCustomer: '',
            },
        };

        dispatch(updateCustomer(updateCus))
            .then((_) => {
                dispatch(updateTable(updateTb));
                console.log(`customer ${id} completed`);
            })
            .catch((error) => console.log(error));
    };

    const holdCustomer = (id: string) => {
        const updateCus = {
            id: id,
            data: {
                isHold: true,
            },
        };

        dispatch(updateCustomer(updateCus));
    };

    return (
        <>
            <ul
                style={{
                    listStyleType: 'none',
                    padding: 0,
                }}
            >
                {searchcustomers.map((customer) => (
                    <li
                        key={customer._id}
                        style={{
                            padding: 0,
                            margin: '-18px 0 18px',
                            backgroundColor: `${
                                customer.statusTable === TableStatus.Clash
                                    ? '#FFEEEB'
                                    : '#fff'
                            }`,
                        }}
                        onClick={() => handleshow(customer._id)}
                    >
                        <div className="info-customer">
                            <div className="customer-title">
                                <div style={{ fontWeight: 600 }}>
                                    {customer.name}
                                </div>

                                <div style={{ fontWeight: 600 }}>
                                    {customer.timeOrder}
                                </div>
                            </div>
                            <div className="customer-setup">
                                <div>
                                    <span
                                        style={{
                                            marginRight: '10px',
                                        }}
                                    >
                                        <PeopleIcon
                                            label="people"
                                            size="small"
                                            primaryColor={`${
                                                customer.quantityBook >
                                                    findTable(customer.idTable)
                                                        .totalChair &&
                                                customer.statusTable ===
                                                    TableStatus.Clash
                                                    ? '#DF4759'
                                                    : '#506690'
                                            }`}
                                        />
                                        <span
                                            style={{
                                                color: `${
                                                    customer.quantityBook >
                                                        findTable(
                                                            customer.idTable,
                                                        ).totalChair &&
                                                    customer.statusTable ===
                                                        TableStatus.Clash
                                                        ? '#DF4759'
                                                        : '#506690'
                                                }`,
                                            }}
                                        >
                                            {customer.quantityBook}
                                        </span>
                                    </span>
                                    <span>
                                        <Chair
                                            label="chair"
                                            size="small"
                                            primaryColor={`${
                                                customer.statusTable ===
                                                    TableStatus.Clash &&
                                                customer.quantityBook <=
                                                    findTable(customer.idTable)
                                                        .totalChair
                                                    ? '#DF4759'
                                                    : '#506690'
                                            }`}
                                        />
                                        <span
                                            style={{
                                                color: `${
                                                    customer.statusTable ===
                                                        TableStatus.Clash &&
                                                    customer.quantityBook <=
                                                        findTable(
                                                            customer.idTable,
                                                        ).totalChair
                                                        ? '#DF4759'
                                                        : '#506690'
                                                }`,
                                            }}
                                        >
                                            {findTable(customer.idTable)
                                                .number === -1
                                                ? 'Unassigned'
                                                : findTable(customer.idTable)
                                                      .number}
                                        </span>
                                    </span>
                                </div>

                                {customerStatus(customer.status)}
                            </div>

                            <div
                                className="customer-tag"
                                style={{
                                    display: `${
                                        showDetails ||
                                        listShow.includes(customer._id)
                                            ? ''
                                            : 'none'
                                    }`,
                                }}
                            >
                                <div className="tag-title">
                                    <MobileIcon
                                        label="tag"
                                        size="small"
                                        primaryColor="#506690"
                                    />
                                    {customer.phone}
                                </div>
                            </div>

                            <div
                                className="customer-tag"
                                style={{
                                    display: `${
                                        showDetails ||
                                        listShow.includes(customer._id)
                                            ? ''
                                            : 'none'
                                    }`,
                                }}
                            >
                                <div className="tag-title">
                                    <Tag
                                        label="tag"
                                        size="small"
                                        primaryColor="#506690"
                                    />
                                    Note
                                </div>
                                <div
                                    style={{
                                        paddingLeft: '16px',
                                    }}
                                >
                                    {customer.note}
                                </div>
                            </div>

                            <div
                                className="actions-status"
                                style={{
                                    display: `${
                                        listShow.includes(customer._id)
                                            ? ''
                                            : 'none'
                                    }`,
                                }}
                            >
                                <div
                                    className="item-action"
                                    style={{
                                        display: `${
                                            customer.status ===
                                                CustomerStatus.Confirmed ||
                                            customer.status ===
                                                CustomerStatus.Late
                                                ? ''
                                                : 'none'
                                        }`,
                                    }}
                                    onClick={() => {
                                        updateSeat(customer._id);
                                        // if (
                                        //     customer.quantityBook <=
                                        //         findTable(customer.idTable)
                                        //             .totalChair &&
                                        //     customer.statusTable ===
                                        //         TableStatus.Available
                                        // ) {
                                        //     notify(
                                        //         'seated',
                                        //         customer.name,
                                        //         findTable(customer.idTable).number,
                                        //     );
                                        // }
                                    }}
                                >
                                    <span>
                                        <Chair
                                            label="comfirm"
                                            size="large"
                                            primaryColor="#fff"
                                        />
                                    </span>
                                    <span>Seat</span>
                                </div>
                                <div
                                    className="item-action"
                                    style={{
                                        display: `${
                                            customer.status ===
                                                CustomerStatus.NoShow ||
                                            customer.status ===
                                                CustomerStatus.Cancelled
                                                ? 'none'
                                                : ''
                                        }`,
                                    }}
                                    onClick={() => {
                                        updateCompleted(
                                            customer._id,
                                            customer.idTable,
                                        );
                                        // if (
                                        //     customer.quantityBook <=
                                        //         findTable(customer.idTable)
                                        //             .totalChair &&
                                        //     customer.statusTable ===
                                        //         TableStatus.Available
                                        // ) {
                                        //     notify(
                                        //         'Complete',
                                        //         customer.name,
                                        //         findTable(customer.idTable).number,
                                        //     );
                                        // }
                                    }}
                                >
                                    <span>
                                        <EditorDoneIcon
                                            label="completed"
                                            size="large"
                                            primaryColor="#fff"
                                        />
                                    </span>
                                    <span>Completed</span>
                                </div>
                                <div
                                    className="item-action"
                                    onClick={() =>
                                        dispatch(getOneCustomer(customer._id))
                                    }
                                >
                                    <span>
                                        <EditFilledIcon
                                            label="edit"
                                            size="large"
                                            primaryColor="#fff"
                                        />
                                    </span>
                                    <span>Edit</span>
                                </div>
                                <div
                                    className="item-action"
                                    style={{
                                        display: `${
                                            customer.status ===
                                            CustomerStatus.Late
                                                ? ''
                                                : 'none'
                                        }`,
                                    }}
                                    onClick={() => {
                                        holdCustomer(customer._id);
                                        notify(
                                            'hold',
                                            customer.name,
                                            findTable(customer.idTable).number,
                                        );
                                    }}
                                >
                                    <span>
                                        <Hold
                                            label="edit"
                                            size="large"
                                            primaryColor="#fff"
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
    );
};

export default memo(CustomerList);
