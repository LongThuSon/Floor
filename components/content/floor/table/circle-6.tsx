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

const Circle6 = ({ table, customerChoosen, changedNTable }: TTableProps) => {
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
                className="container-circle-6"
                style={{
                    top: `${(table.topPositon / 667) * winSize.height}px`,
                    left: `${(table.leftPositon / 1535) * winSize.width}px`,
                    cursor: `${move ? 'default' : 'move'}`,
                }}
            >
                <Chair
                    top="-9px"
                    left="15px"
                    numberChair={1}
                    table={table}
                    customer={customer}
                    currentPeople={customerChanged.quantityBook}
                />
                <Chair
                    top="3px"
                    left="35px"
                    numberChair={2}
                    table={table}
                    customer={customer}
                    currentPeople={customerChanged.quantityBook}
                />
                <Chair
                    top="26px"
                    left="35px"
                    numberChair={3}
                    table={table}
                    customer={customer}
                    currentPeople={customerChanged.quantityBook}
                />
                <Chair
                    top="39px"
                    left="15px"
                    numberChair={4}
                    table={table}
                    customer={customer}
                    currentPeople={customerChanged.quantityBook}
                />
                <Chair
                    top="3px"
                    left="-5px"
                    numberChair={5}
                    table={table}
                    customer={customer}
                    currentPeople={customerChanged.quantityBook}
                />
                <Chair
                    top="26px"
                    left="-5px"
                    numberChair={6}
                    table={table}
                    customer={customer}
                    currentPeople={customerChanged.quantityBook}
                />

                <div
                    className="circle-6"
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
                    'reserv-time-circle-6',
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
export default memo(Circle6);
