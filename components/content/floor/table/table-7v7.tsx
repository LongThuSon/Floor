import { useState, memo } from 'react';
import { usePageContext } from '../../../context/PageContext';
import { useContentContext } from '../../../context/ContentContext';
import Draggable from 'react-draggable';
import Chair from './chair';
import Save from '@atlaskit/icon/glyph/download';
import LockIcon from '@atlaskit/icon/glyph/lock';
import TrashIcon from '@atlaskit/icon/glyph/trash';
import { TTableProps } from '../../../../type/table.type';
import { useAppDispatch, useAppSelector } from '../../../../redux/hook';
import { deleteTable, updateTable } from '../../../../redux/slices/table.silce';
import {
    reservTimeTable,
    styleTable,
} from '../../../../public/function-common';
import { customerDF, TableStatus } from '../../../../public/data-constant';

const positionTables = [
    {
        top: 10,
        numberLeft: 14,
        numberRight: 1,
    },
    {
        top: 38,
        numberLeft: 13,
        numberRight: 2,
    },
    {
        top: 66,
        numberLeft: 12,
        numberRight: 3,
    },
    {
        top: 94,
        numberLeft: 11,
        numberRight: 4,
    },
    {
        top: 122,
        numberLeft: 10,
        numberRight: 5,
    },
    {
        top: 150,
        numberLeft: 9,
        numberRight: 6,
    },
    {
        top: 178,
        numberLeft: 8,
        numberRight: 7,
    },
];

const Table7v7 = ({ table, customerChoosen, changedNTable }: TTableProps) => {
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
    const [showOption, setShowOption] = useState(false);

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

    const handleLookTb = () => {
        if (table.idCustomer === '') {
            var isBlock = true;
            if (table.isBlock) {
                isBlock = false;
            }
            const newTable = {
                id: table._id,
                data: {
                    isBlock: isBlock,
                },
            };

            dispatch(updateTable(newTable));
        }
    };

    const handleRemoveTb = () => {
        if (table.idCustomer === '') {
            dispatch(deleteTable(table._id));
        }
    };

    return (
        <Draggable disabled={move} onDrag={(e, data) => trackPos(data)}>
            <div
                className="container-table-7v7"
                style={{
                    top: `${(table.topPositon / 667) * winSize.height}px`,
                    left: `${(table.leftPositon / 1535) * winSize.width}px`,
                    cursor: `${move ? 'default' : 'move'}`,
                }}
            >
                {positionTables.map((positionTable, index) => (
                    <div key={index}>
                        <Chair
                            top={`${positionTable.top}px`}
                            left="-9px"
                            numberChair={positionTable.numberLeft}
                            table={table}
                            customer={customer}
                            currentPeople={customerChoosen.quantityBook}
                        />
                        <Chair
                            top={`${positionTable.top}px`}
                            left="29px"
                            numberChair={positionTable.numberRight}
                            table={table}
                            customer={customer}
                            currentPeople={customerChoosen.quantityBook}
                        />
                    </div>
                ))}

                <div
                    className="table-7v7"
                    style={styleTable(
                        table,
                        customer,
                        customerChanged.quantityBook,
                        changedNTable,
                    )}
                >
                    {table.number}
                </div>

                {reservTimeTable(
                    customer.statusTable,
                    customer,
                    'reserv-time-7v7',
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

                {showOption && move && (
                    <div className="save-position">
                        <div onClick={handleLookTb}>
                            <LockIcon
                                label="look"
                                size="small"
                                primaryColor="#067E30"
                            />
                        </div>

                        <div onClick={handleRemoveTb}>
                            <TrashIcon
                                label="trash"
                                size="small"
                                primaryColor="#067E30"
                            />
                        </div>
                    </div>
                )}
            </div>
        </Draggable>
    );
};
export default memo(Table7v7);
