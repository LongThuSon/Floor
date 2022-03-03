import { useMoveContext } from '../../MoveContext'
import { baseURL_tables, baseURL_users } from '../../../ApiContext/baseURL'
import { useApiTablesContext } from '../../../ApiContext'
import { useResetApiContext } from '../../../ApiContext/resetApiContext'
import Circle12 from "./circle-14"
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
    primary1: string,
}

const AllTables = () => {
    const { move } = useMoveContext()
    const { reset, setReset } = useResetApiContext()
    const tables = useApiTablesContext()

    const colorTable = (status: number, id: number, percent: number) => {
        if (status === 0 || status === 1 || status === 2) {
            setTimeout(() => {
                switch (percent) {
                    case 0:
                        axios.put(`${baseURL_tables}/${id + 1}`, { percent: 16, })
                            .then(res => {
                                setReset(!reset)
                                console.log(res.data)
                            })
                            .catch(error => {
                                console.log('ERROR:', error)
                            })
                        break
                    case 16:
                        axios.put(`${baseURL_tables}/${id + 1}`, { percent: 33, })
                            .then(res => {
                                setReset(!reset)
                                console.log(res.data)
                            })
                            .catch(error => {
                                console.log('ERROR:', error)
                            })
                        break
                    case 33:
                        axios.put(`${baseURL_tables}/${id + 1}`, { percent: 50, })
                            .then(res => {
                                setReset(!reset)
                                console.log(res.data)
                            })
                            .catch(error => {
                                console.log('ERROR:', error)
                            })
                        break
                    case 50:
                        axios.put(`${baseURL_tables}/${id + 1}`, { percent: 66, })
                            .then(res => {
                                setReset(!reset)
                                console.log(res.data)
                            })
                            .catch(error => {
                                console.log('ERROR:', error)
                            })
                        break
                    case 66:
                        axios.put(`${baseURL_tables}/${id + 1}`, { percent: 83, })
                            .then(res => {
                                setReset(!reset)
                                console.log(res.data)
                            })
                            .catch(error => {
                                console.log('ERROR:', error)
                            })
                        break
                    default:
                        axios.put(`${baseURL_users}/${tables[id].idCustomer}`, { status: 4 })
                            .then(res => {
                                // setReset(!reset)
                                console.log(res.data)
                            })
                            .catch(error => {
                                console.log('ERROR:', error)
                            })

                        axios.put(`${baseURL_tables}/${id + 1}`, { status: 6, percent: 0 })
                            .then(res => {
                                setReset(!reset)
                                console.log(res.data)
                            })
                            .catch(error => {
                                console.log('ERROR:', error)
                            })


                }
            }, 60000);
        }

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
                primary1={`${colorTable(tables[11]?.status, 11, tables[11]?.percent)}`}
            />
            <Table1v1
                top={tables[12]?.top ?? 50}
                left={tables[12]?.left ?? 436}
                index={12}
                move={move}
                primary1={`${colorTable(tables[12]?.status, 12, tables[12]?.percent)}`}
            />
            <Table1v1
                top={tables[13]?.top ?? 50}
                left={tables[13]?.left ?? 492}
                index={13}
                move={move}
                primary1={`${colorTable(tables[13]?.status, 13, tables[13]?.percent)}`}
            />
            <Table1v1
                top={tables[14]?.top ?? 162}
                left={tables[14]?.left ?? 408}
                index={14}
                move={move}
                primary1={`${colorTable(tables[14]?.status, 14, tables[14]?.percent)}`}
            />

            <Table2v2Row
                top={tables[15]?.top ?? 162}
                left={tables[15]?.left ?? 464}
                index={15}
                move={move}
                primary1={`${colorTable(tables[15]?.status, 15, tables[15]?.percent)}`}
            />

            <Table6v6
                top={tables[16]?.top ?? 330}
                left={tables[16]?.left ?? 408}
                index={16}
                move={move}
                primary1={`${colorTable(tables[16]?.status, 16, tables[16]?.percent)}`}
            />
            <Table6v6
                top={tables[17]?.top ?? 420}
                left={tables[17]?.left ?? 408}
                index={17}
                move={move}
                primary1={`${colorTable(tables[17]?.status, 17, tables[17]?.percent)}`}
            />

            <Table2v2Column
                top={tables[1]?.top ?? 50}
                left={tables[1]?.left ?? 128}
                index={1}
                move={move}
                primary1={`${colorTable(tables[1]?.status, 1, tables[1]?.percent)}`}
            />

            <Table3v3
                top={tables[0]?.top ?? 50}
                left={tables[0]?.left ?? 16}
                index={0}
                move={move}
                primary1={`${colorTable(tables[0]?.status, 0, tables[0]?.percent)}`}
            />
            <Table3v3
                top={tables[10]?.top ?? 162}
                left={tables[10]?.left ?? 324}
                index={10}
                move={move}
                primary1={`${colorTable(tables[10]?.status, 10, tables[10]?.percent)}`}
            />
            <Table3v3
                top={tables[9]?.top ?? 330}
                left={tables[9]?.left ?? 324}
                index={9}
                move={move}
                primary1={`${colorTable(tables[9]?.status, 9, tables[9]?.percent)}`}
            />

            <Table7v7
                top={tables[3]?.top ?? 162}
                left={tables[3]?.left ?? 212}
                index={3}
                move={move}
                primary1={`${colorTable(tables[3]?.status, 3, tables[3]?.percent)}`}
            />

            <Circle6
                top={tables[6]?.top ?? 441}
                left={tables[6]?.left ?? 16}
                index={6}
                move={move}
                primary1={`${colorTable(tables[6]?.status, 6, tables[6]?.percent)}`}
            />
            <Circle6
                top={tables[7]?.top ?? 442}
                left={tables[7]?.left ?? 128}
                index={7}
                move={move}
                primary1={`${colorTable(tables[7]?.status, 7, tables[7]?.percent)}`}
            />

            <Circle8
                top={tables[4]?.top ?? 330}
                left={tables[4]?.left ?? 16}
                index={4}
                move={move}
                primary1={`${colorTable(tables[4]?.status, 4, tables[4]?.percent)}`}
            />
            <Circle8
                top={tables[5]?.top ?? 330}
                left={tables[5]?.left ?? 128}
                index={5}
                move={move}
                primary1={`${colorTable(tables[5]?.status, 5, tables[5]?.percent)}`}
            />
            <Circle8
                top={tables[8]?.top ?? 432}
                left={tables[8]?.left ?? 212}
                index={8}
                move={move}
                primary1={`${colorTable(tables[8]?.status, 8, tables[8]?.percent)}`}
            />

            <Circle12
                top={tables[0]?.top ?? 162}
                left={tables[2]?.left ?? 100}
                index={2}
                move={move}
                primary1={`${colorTable(tables[2]?.status, 2, tables[2]?.percent)}`}
            />
        </div>
    )
}

export default AllTables