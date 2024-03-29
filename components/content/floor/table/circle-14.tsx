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
        // Chair 1
        top: -9,
        left: 30,
    },
    {
        // Chair 2
        top: -6,
        left: 47,
    },
    {
        // Chair 3
        top: 5,
        left: 60,
    },
    {
        // Chair 4
        top: 21,
        left: 68,
    },
    {
        // Chair 5
        top: 39,
        left: 68,
    },
    {
        // Chair 6
        top: 55,
        left: 60,
    },
    {
        // Chair 7
        top: 66,
        left: 46,
    },
    {
        // Chair 8
        top: 69,
        left: 28,
    },
    {
        // Chair 9
        top: 65,
        left: 11,
    },
    {
        // Chair 10
        top: 53,
        left: -2,
    },
    {
        // Chair 11
        top: 37,
        left: -9,
    },
    {
        // Chair 12
        top: 20,
        left: -8,
    },
    {
        // Chair 13
        top: 5,
        left: 0,
    },
    {
        // Chair 14
        top: -6,
        left: 13,
    },
];

const Circle14 = ({ table, customerChoosen, changedNTable }: TTableProps) => {
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
                className="container-circle-14"
                style={{
                    top: `${(table.topPositon / 667) * winSize.height}px`,
                    left: `${(table.leftPositon / 1535) * winSize.width}px`,
                    cursor: `${move ? 'default' : 'move'}`,
                }}
            >
                {positionTables.map((positionTable, index) => (
                    <Chair
                        key={index}
                        top={`${positionTable.top}px`}
                        left={`${positionTable.left}px`}
                        numberChair={index + 1}
                        table={table}
                        customer={customer}
                        currentPeople={customerChoosen.quantityBook}
                    />
                ))}

                <div
                    className="circle-14"
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
                    'reserv-time-circle-14',
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
export default memo(Circle14);
