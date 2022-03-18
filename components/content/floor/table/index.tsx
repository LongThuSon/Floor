import { memo } from 'react'
import { useContentContext } from '../../../context/ContentContext'
import { baseURL_tables, baseURL_users } from '../../../context/ApiContext/baseURL'
import { useApiTablesContext } from '../../../context/ApiContext'
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


export const colorTable = (id: number, status: number, timeSeated: number, updateBack: number, idCustomer: number) => {
    if (status === 0 || status === 1 || status === 2) {
        let currentTime = new Date().getTime()
        console.log(currentTime - timeSeated)

        if (currentTime - timeSeated <= 600000 && updateBack !== 1) {
            axios.put(`${baseURL_tables}/${id}`, { percent: 16, updateBack: 1 })
                .then(res => {
                    console.log(res.data)
                })
                .catch(error => {
                    console.log('ERROR:', error)
                })
        } else if (600000 < currentTime - timeSeated && currentTime - timeSeated <= 1200000 && updateBack !== 2) {
            axios.put(`${baseURL_tables}/${id}`, { percent: 33, updateBack: 2 })
                .then(res => {
                    console.log(res.data)
                })
                .catch(error => {
                    console.log('ERROR:', error)
                })
        } else if (1200000 < currentTime - timeSeated && currentTime - timeSeated <= 1800000 && updateBack !== 3) {
            axios.put(`${baseURL_tables}/${id}`, { percent: 50, updateBack: 3 })
                .then(res => {
                    console.log(res.data)
                })
                .catch(error => {
                    console.log('ERROR:', error)
                })
        } else if (1800000 < currentTime - timeSeated && currentTime - timeSeated <= 2400000 && updateBack !== 4) {
            axios.put(`${baseURL_tables}/${id}`, { percent: 66, updateBack: 4 })
                .then(res => {
                    console.log(res.data)
                })
                .catch(error => {
                    console.log('ERROR:', error)
                })
        } else if (2400000 < currentTime - timeSeated && currentTime - timeSeated <= 3000000 && updateBack !== 5) {
            axios.put(`${baseURL_tables}/${id}`, { percent: 83, updateBack: 5 })
                .then(res => {
                    console.log(res.data)
                })
                .catch(error => {
                    console.log('ERROR:', error)
                })
        } else if (currentTime - timeSeated > 3000000) {
            axios.put(`${baseURL_users}/${idCustomer}`, { status: 4 })
                .then(res => {
                    console.log(res.data)
                })
                .catch(error => {
                    console.log('ERROR:', error)
                })

            axios.put(`${baseURL_tables}/${id}`, { status: 6, percent: 0, timeSeated: 0, updateBack: 0 })
                .then(res => {
                    console.log(res.data)
                })
                .catch(error => {
                    console.log('ERROR:', error)
                })
        }
    }
}

const AllTables = () => {
    const { move } = useContentContext()
    const tables = useApiTablesContext()

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
                top={tables[11]?.top ?? 50}
                left={tables[11]?.left ?? 380}
                index={11}
                move={move}
                primary1={`${primary1(tables[11]?.status)}`}
            />
            <Table1v1
                top={tables[12]?.top ?? 50}
                left={tables[12]?.left ?? 436}
                index={12}
                move={move}
                primary1={`${primary1(tables[12]?.status)}`}
            />
            <Table1v1
                top={tables[13]?.top ?? 50}
                left={tables[13]?.left ?? 492}
                index={13}
                move={move}
                primary1={`${primary1(tables[13]?.status)}`}
            />
            <Table1v1
                top={tables[14]?.top ?? 162}
                left={tables[14]?.left ?? 408}
                index={14}
                move={move}
                primary1={`${primary1(tables[14]?.status)}`}
            />

            <Table2v2Row
                top={tables[15]?.top ?? 162}
                left={tables[15]?.left ?? 464}
                index={15}
                move={move}
                primary1={`${primary1(tables[15]?.status)}`}
            />

            <Table6v6
                top={tables[16]?.top ?? 330}
                left={tables[16]?.left ?? 408}
                index={16}
                move={move}
                primary1={`${primary1(tables[16]?.status)}`}
            />
            <Table6v6
                top={tables[17]?.top ?? 420}
                left={tables[17]?.left ?? 408}
                index={17}
                move={move}
                primary1={`${primary1(tables[17]?.status)}`}
            />

            <Table2v2Column
                top={tables[1]?.top ?? 50}
                left={tables[1]?.left ?? 128}
                index={1}
                move={move}
                primary1={`${primary1(tables[1]?.status)}`}
            />

            <Table3v3
                top={tables[0]?.top ?? 50}
                left={tables[0]?.left ?? 16}
                index={0}
                move={move}
                primary1={`${primary1(tables[0]?.status)}`}
            />
            <Table3v3
                top={tables[10]?.top ?? 162}
                left={tables[10]?.left ?? 324}
                index={10}
                move={move}
                primary1={`${primary1(tables[10]?.status)}`}
            />
            <Table3v3
                top={tables[9]?.top ?? 330}
                left={tables[9]?.left ?? 324}
                index={9}
                move={move}
                primary1={`${primary1(tables[9]?.status)}`}
            />

            <Table7v7
                top={tables[3]?.top ?? 162}
                left={tables[3]?.left ?? 212}
                index={3}
                move={move}
                primary1={`${primary1(tables[3]?.status)}`}
            />

            <Circle6
                top={tables[6]?.top ?? 441}
                left={tables[6]?.left ?? 16}
                index={6}
                move={move}
                primary1={`${primary1(tables[6]?.status)}`}
            />
            <Circle6
                top={tables[7]?.top ?? 442}
                left={tables[7]?.left ?? 128}
                index={7}
                move={move}
                primary1={`${primary1(tables[7]?.status)}`}
            />

            <Circle8
                top={tables[4]?.top ?? 330}
                left={tables[4]?.left ?? 16}
                index={4}
                move={move}
                primary1={`${primary1(tables[4]?.status)}`}
            />
            <Circle8
                top={tables[5]?.top ?? 330}
                left={tables[5]?.left ?? 128}
                index={5}
                move={move}
                primary1={`${primary1(tables[5]?.status)}`}
            />
            <Circle8
                top={tables[8]?.top ?? 432}
                left={tables[8]?.left ?? 212}
                index={8}
                move={move}
                primary1={`${primary1(tables[8]?.status)}`}
            />

            <Circle14
                top={tables[2]?.top ?? 162}
                left={tables[2]?.left ?? 100}
                index={2}
                move={move}
                primary1={`${primary1(tables[2]?.status)}`}
            />
        </div >
    )
}

export default memo(AllTables)