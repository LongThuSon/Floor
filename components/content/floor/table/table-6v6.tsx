import { useState, memo } from 'react';
import { usePageContext } from '../../../context/PageContext';
import { useContentContext } from '../../../context/ContentContext';
import Draggable from 'react-draggable';
import Chair from './chair';
import Save from '@atlaskit/icon/glyph/download';
import { TTableProps } from '../../../../type/table.type';
import { useAppDispatch, useAppSelector } from '../../../../redux/hook';
import { updateTable } from '../../../../redux/slices/table.silce';
import {
    reservTimeTable,
    styleTable,
} from '../../../../public/function-common';
import { customerDF, TableStatus } from '../../../../public/data-constant';

const positionTables = [
    {
        left: 10,
        numberTop: 1,
        numberBottom: 7,
    },
    {
        left: 38,
        numberTop: 2,
        numberBottom: 8,
    },
    {
        left: 66,
        numberTop: 3,
        numberBottom: 9,
    },
    {
        left: 94,
        numberTop: 4,
        numberBottom: 10,
    },
    {
        left: 122,
        numberTop: 5,
        numberBottom: 11,
    },
    {
        left: 150,
        numberTop: 6,
        numberBottom: 12,
    },
];

const Table6v6 = ({ table, customerChoosen, changedNTable }: TTableProps) => {
    const dispatch = useAppDispatch();
    const customer =
        useAppSelector((state) =>
            state.customers.customerList.find(
                (cus) => cus._id === table.idCustomer,
            ),
        ) ?? customerDF;

    const { winSize, customerChanged } = usePageContext();
    const { move } = useContentContext();
    const [position, setPosition] = useState({ top: 0, left: 0 });

    const trackPos = (data: any) => {
        setPosition({
            top: table.topPositon + data.y,
            left: table.leftPositon + data.x,
        });
    };

    const handleSavePosition = () => {
        const newTable = {
            id: table._id,
            data: {
                topPositon: position.top,
                leftPositon: position.left,
            },
        };

        dispatch(updateTable(newTable));
    };

    return (
        <Draggable disabled={move} onDrag={(e, data) => trackPos(data)}>
            <div
                className="container-table-6v6"
                style={{
                    top: `${(table.topPositon / 667) * winSize.height}px`,
                    left: `${(table.leftPositon / 1535) * winSize.width}px`,
                    cursor: `${move ? 'default' : 'move'}`,
                }}
            >
                {positionTables.map((positionTable, index) => (
                    <div key={index}>
                        <Chair
                            top="-9px"
                            left={`${positionTable.left}px`}
                            numberChair={positionTable.numberTop}
                            table={table}
                            customer={customer}
                            currentPeople={customerChoosen.quantityBook}
                        />
                        <Chair
                            top="29px"
                            left={`${positionTable.left}px`}
                            numberChair={positionTable.numberBottom}
                            table={table}
                            customer={customer}
                            currentPeople={customerChoosen.quantityBook}
                        />
                    </div>
                ))}

                <div
                    className="table-6v6"
                    style={styleTable(
                        table,
                        customer?.statusTable ?? TableStatus.Available,
                        customerChoosen,
                        customerChanged.quantityBook,
                        changedNTable,
                    )}
                >
                    {table.number}
                </div>

                {reservTimeTable(
                    customer.statusTable,
                    customer,
                    'reserv-time-6v6',
                )}

                {!move && (
                    <div
                        className="save-position"
                        onClick={() => handleSavePosition()}
                    >
                        <Save
                            label="save"
                            size="small"
                            primaryColor="#067E30"
                        />
                    </div>
                )}
            </div>
        </Draggable>
    );
};
export default memo(Table6v6);
