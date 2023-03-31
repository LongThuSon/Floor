import { memo } from 'react';
import { useContentContext } from '../../../context/ContentContext';
import {
    useApiTablesContext,
    useApiPositionsContext,
} from '../../../context/ApiContext';
import { useAppSelector } from '../../../../redux/hook';
import Circle14 from './circle-14';
import Circle6 from './circle-6';
import Circle8 from './circle-8';
import Table1v1 from './table-1v1';
import Table2v2Column from './table-2v2-column';
import Table2v2Row from './table-2v2-row';
import Table3v3 from './table-3v3';
import Table6v6 from './table-6v6';
import Table7v7 from './table-7v7';
import { TableType } from '../../../../public/data-constant';
import { useAppDispatch } from '../../../../redux/hook';
import { deleteTable } from '../../../../redux/slices/table.silce';

const AllTables = () => {
    const tableList = useAppSelector((state) => state.tables.tableList);
    const dispatch = useAppDispatch();

    const primary1 = (updateBack: number, status: number) => {
        switch (status) {
            case 0:
                return '#A9EAFF';
            case 1:
                return '#FFE0A4';
            case 2:
                return '#FFD0EF';
            case 3:
                return '#A260DD';
            case 4:
                return '#DFDFDF';
            case 5:
                return '#FFFFFF';
            case 6:
                return '#FFA4A4';
            case 7:
                return '#DF4759';
            default:
                return '#FFFFFF';
        }
    };

    return (
        <div id="container-tables">
            {tableList.map((table) => {
                switch (table.type) {
                    case TableType._1v1:
                        return <Table1v1 table={table} />;
                    case TableType._2v2c:
                        return <Table2v2Column table={table} />;
                    case TableType._2v2c:
                        return <Table2v2Row table={table} />;
                    case TableType._3v3:
                        return <Table3v3 table={table} />;
                    case TableType._6v6:
                        return <Table6v6 table={table} />;
                    case TableType._7v7:
                        return <Table7v7 table={table} />;
                    case TableType.C6:
                        return <Circle6 table={table} />;
                    case TableType.C8:
                        return <Circle8 table={table} />;
                    case TableType.C14:
                        return <Circle14 table={table} />;
                    default:
                        return dispatch(deleteTable(table._id));
                }
            })}
        </div>
    );
};

export default memo(AllTables);
