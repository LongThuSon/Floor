import { memo } from 'react'
import { useContentContext } from '../../../context/ContentContext'
import { baseURL_tables, baseURL_users } from '../../../context/ApiContext/baseURL'
import { useApiTablesContext, useApiPositionsContext } from '../../../context/ApiContext'
import Circle14 from "./circle-14"
import Circle6 from "./circle-6"
import Circle8 from "./circle-8"
import Table1v1 from "./table-1v1"
import Table2v2Column from "./table-2v2-column"
import Table2v2Row from "./table-2v2-row"
import Table3v3 from "./table-3v3"
import Table6v6 from "./table-6v6"
import Table7v7 from "./table-7v7"
import axios from 'axios'

export interface Chair {
    top: string,
    left: string,
    numberChair: number,
    indexTable: number
}

export interface Table {
    top: number,
    left: number,
    index: number,
    move: boolean,
    primary1?: string,
}

const AllTables = () => {
    const { move } = useContentContext()
    const tables = useApiTablesContext()
    const TPositions = useApiPositionsContext()

    const primary1 = (status: number) => {
        switch (status) {
            case 0:
                return '#A9EAFF'
            case 1:
                return '#FFE0A4'
            case 2:
                return '#FFD0EF'
            case 3:
                return '#A260DD'
            case 4:
                return '#DFDFDF'
            case 5:
                return '#FFFFFF'
            case 6:
                return '#FFA4A4'
            case 7:
                return '#DF4759'
            default:
                return '#FFFFFF'
        }
    }

    return (
        <div id="container-tables">
            <Table1v1
                top={TPositions[11]?.top ?? -500}
                left={TPositions[11]?.left ?? -500}
                index={11}
                move={move}
                primary1={`${primary1(tables[0]?.tables[11]?.status)}`}
            />
            <Table1v1
                top={TPositions[12]?.top ?? -500}
                left={TPositions[12]?.left ?? -500}
                index={12}
                move={move}
                primary1={`${primary1(tables[0]?.tables[12]?.status)}`}
            />
            <Table1v1
                top={TPositions[13]?.top ?? -500}
                left={TPositions[13]?.left ?? -500}
                index={13}
                move={move}
                primary1={`${primary1(tables[0]?.tables[13]?.status)}`}
            />
            <Table1v1
                top={TPositions[14]?.top ?? -500}
                left={TPositions[14]?.left ?? -500}
                index={14}
                move={move}
                primary1={`${primary1(tables[0]?.tables[14]?.status)}`}
            />

            <Table2v2Row
                top={TPositions[15]?.top ?? -500}
                left={TPositions[15]?.left ?? -500}
                index={15}
                move={move}
                primary1={`${primary1(tables[0]?.tables[15]?.status)}`}
            />

            <Table6v6
                top={TPositions[16]?.top ?? -500}
                left={TPositions[16]?.left ?? -500}
                index={16}
                move={move}
                primary1={`${primary1(tables[0]?.tables[16]?.status)}`}
            />
            <Table6v6
                top={TPositions[17]?.top ?? -500}
                left={TPositions[17]?.left ?? -500}
                index={17}
                move={move}
                primary1={`${primary1(tables[0]?.tables[17]?.status)}`}
            />

            <Table2v2Column
                top={TPositions[1]?.top ?? -500}
                left={TPositions[1]?.left ?? -500}
                index={1}
                move={move}
                primary1={`${primary1(tables[0]?.tables[1]?.status)}`}
            />

            <Table3v3
                top={TPositions[0]?.top ?? -500}
                left={TPositions[0]?.left ?? -500}
                index={0}
                move={move}
                primary1={`${primary1(tables[0]?.tables[0]?.status)}`}
            />
            <Table3v3
                top={TPositions[10]?.top ?? -500}
                left={TPositions[10]?.left ?? -500}
                index={10}
                move={move}
                primary1={`${primary1(tables[0]?.tables[10]?.status)}`}
            />
            <Table3v3
                top={TPositions[9]?.top ?? -500}
                left={TPositions[9]?.left ?? -500}
                index={9}
                move={move}
                primary1={`${primary1(tables[0]?.tables[9]?.status)}`}
            />

            <Table7v7
                top={TPositions[3]?.top ?? -500}
                left={TPositions[3]?.left ?? -500}
                index={3}
                move={move}
                primary1={`${primary1(tables[0]?.tables[3]?.status)}`}
            />

            <Circle6
                top={TPositions[6]?.top ?? -500}
                left={TPositions[6]?.left ?? -500}
                index={6}
                move={move}
                primary1={`${primary1(tables[0]?.tables[6]?.status)}`}
            />
            <Circle6
                top={TPositions[7]?.top ?? -500}
                left={TPositions[7]?.left ?? -500}
                index={7}
                move={move}
                primary1={`${primary1(tables[0]?.tables[7]?.status)}`}
            />

            <Circle8
                top={TPositions[4]?.top ?? -500}
                left={TPositions[4]?.left ?? -500}
                index={4}
                move={move}
                primary1={`${primary1(tables[0]?.tables[4]?.status)}`}
            />
            <Circle8
                top={TPositions[5]?.top ?? -500}
                left={TPositions[5]?.left ?? -500}
                index={5}
                move={move}
                primary1={`${primary1(tables[0]?.tables[5]?.status)}`}
            />
            <Circle8
                top={TPositions[8]?.top ?? -500}
                left={TPositions[8]?.left ?? -500}
                index={8}
                move={move}
                primary1={`${primary1(tables[0]?.tables[8]?.status)}`}
            />

            <Circle14
                top={TPositions[2]?.top ?? -500}
                left={TPositions[2]?.left ?? -500}
                index={2}
                move={move}
                primary1={`${primary1(tables[0]?.tables[2]?.status)}`}
            />
        </div >
    )
}

export default memo(AllTables)