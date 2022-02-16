import { useMoveContext } from '../../MoveContext'
import { useApiTablesContext } from '../../../../pages/ApiContext'
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
import { baseURL_tables } from '../../../../pages/ApiContext/baseURL'
import { useResetApiContext } from '../../../../pages/ApiContext/resetApiContext'

export interface Chair {
    top: string,
    left: string,
    numberChair: number,
    indexTable: number
}

export interface Table {
    top: string,
    left: string,
    index: number,
    move: boolean,
    primary1?: string,
    primary2?: string,
    percent?: number,
}


const AllTables = () => {
    const { move } = useMoveContext()
    const { reset, setReset } = useResetApiContext()
    const tables = useApiTablesContext()

    const handleColorTable = (status: number, id: number, percent: number) => {
        if (status === 0 || status === 1 || status === 2) {
            setTimeout(() => {
                // render > 4 ? setRender(0) : setRender(render + 1)
                // console.log(render)

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
                return {
                    primary1: '#A9EAFF',
                    primary2: '#FFFFFF',
                    percent: percent,
                }
            case 1:
                return {
                    primary1: '#FFE0A4',
                    primary2: '#FFFFFF',
                    percent: percent,
                }
            case 2:
                return {
                    primary1: '#FFD0EF',
                    primary2: '#FFFFFF',
                    percent: percent,
                }
            case 3:
                return {
                    primary1: '#A260DD',
                    primary2: '#FFFFFF',
                    percent: 100,
                }
            case 4:
                return {
                    primary1: '#DFDFDF',
                    primary2: '#FFFFFF',
                    percent: 100,
                }
            case 5:
                return {
                    primary1: '#FFFFFF',
                    primary2: '#FFFFFF',
                    percent: 100,
                }
            case 6:
                return {
                    primary1: '#FFA4A4',
                    primary2: '#FFFFFF',
                    percent: 100,
                }
            case 7:
                return {
                    primary1: '#DF4759',
                    primary2: '#FFFFFF',
                    percent: 100,
                }
            default:
                return {
                    primary1: '#FFFFFF',
                    primary2: '#FFFFFF',
                    percent: 100,
                }
        }
    }

    return (
        <div id="container-tables">
            {/* {console.log(tables[11].status % 7)} */}
            {console.log(new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" }))}
            <Table1v1
                top='50px'
                left='380px'
                index={11}
                move={move}
                primary1={`${handleColorTable(tables[11]?.status % 7, 11, tables[11]?.percent).primary1}`}
                primary2={`${handleColorTable(tables[11]?.status % 7, 11, tables[11]?.percent).primary2}`}
                percent={handleColorTable(tables[11]?.status % 7, 11, tables[11]?.percent).percent}
            />
            <Table1v1
                top='50px'
                left='436px'
                index={12}
                move={move}
                primary1={`${handleColorTable(tables[12]?.status % 7, 12, tables[12]?.percent).primary1}`}
                primary2={`${handleColorTable(tables[12]?.status % 7, 12, tables[12]?.percent).primary2}`}
                percent={handleColorTable(tables[12]?.status % 7, 12, tables[12]?.percent).percent}
            />
            <Table1v1
                top='50px'
                left='492px'
                index={13}
                move={move}
                primary1={`${handleColorTable(tables[13]?.status % 7, 13, tables[13]?.percent).primary1}`}
                primary2={`${handleColorTable(tables[13]?.status % 7, 13, tables[13]?.percent).primary2}`}
                percent={handleColorTable(tables[13]?.status % 7, 13, tables[13]?.percent).percent}
            />
            <Table1v1
                top='162px'
                left='408px'
                index={14}
                move={move}
                primary1={`${handleColorTable(tables[14]?.status % 7, 14, tables[14]?.percent).primary1}`}
                primary2={`${handleColorTable(tables[14]?.status % 7, 14, tables[14]?.percent).primary2}`}
                percent={handleColorTable(tables[14]?.status % 7, 14, tables[14]?.percent).percent}
            />

            <Table2v2Row
                top="162px"
                left="464px"
                index={15}
                move={move}
                primary1={`${handleColorTable(tables[15]?.status % 7, 15, tables[15]?.percent).primary1}`}
                primary2={`${handleColorTable(tables[15]?.status % 7, 15, tables[15]?.percent).primary2}`}
                percent={handleColorTable(tables[15]?.status % 7, 15, tables[15]?.percent).percent}
            />

            <Table6v6
                top="330px"
                left="408px"
                index={16}
                move={move}
                primary1={`${handleColorTable(tables[16]?.status % 7, 16, tables[16]?.percent).primary1}`}
                primary2={`${handleColorTable(tables[16]?.status % 7, 16, tables[16]?.percent).primary2}`}
                percent={handleColorTable(tables[16]?.status % 7, 16, tables[16]?.percent).percent}
            />
            <Table6v6
                top="420px"
                left="408px"
                index={17}
                move={move}
                primary1={`${handleColorTable(tables[17]?.status % 7, 17, tables[17]?.percent).primary1}`}
                primary2={`${handleColorTable(tables[17]?.status % 7, 17, tables[17]?.percent).primary2}`}
                percent={handleColorTable(tables[17]?.status % 7, 17, tables[17]?.percent).percent}
            />

            <Table2v2Column
                top="50px"
                left="128px"
                index={1}
                move={move}
                primary1={`${handleColorTable(tables[1]?.status % 7, 1, tables[1]?.percent).primary1}`}
                primary2={`${handleColorTable(tables[1]?.status % 7, 1, tables[1]?.percent).primary2}`}
                percent={handleColorTable(tables[1]?.status % 7, 1, tables[1]?.percent).percent}
            />

            <Table3v3
                top="50px"
                left="16px"
                index={0}
                move={move}
                primary1={`${handleColorTable(tables[0]?.status % 7, 0, tables[0]?.percent).primary1}`}
                primary2={`${handleColorTable(tables[0]?.status % 7, 0, tables[0]?.percent).primary2}`}
                percent={handleColorTable(tables[0]?.status % 7, 0, tables[0]?.percent).percent}
            />
            <Table3v3
                top="162px"
                left="324px"
                index={10}
                move={move}
                primary1={`${handleColorTable(tables[10]?.status % 7, 10, tables[10]?.percent).primary1}`}
                primary2={`${handleColorTable(tables[10]?.status % 7, 10, tables[10]?.percent).primary2}`}
                percent={handleColorTable(tables[10]?.status % 7, 10, tables[10]?.percent).percent}
            />
            <Table3v3
                top="330px"
                left="324px"
                index={9}
                move={move}
                primary1={`${handleColorTable(tables[9]?.status % 7, 9, tables[9]?.percent).primary1}`}
                primary2={`${handleColorTable(tables[9]?.status % 7, 9, tables[9]?.percent).primary2}`}
                percent={handleColorTable(tables[9]?.status % 7, 9, tables[9]?.percent).percent}
            />

            <Table7v7
                top="162px"
                left="212px"
                index={3}
                move={move}
                primary1={`${handleColorTable(tables[3]?.status % 7, 3, tables[3]?.percent).primary1}`}
                primary2={`${handleColorTable(tables[3]?.status % 7, 3, tables[3]?.percent).primary2}`}
                percent={handleColorTable(tables[3]?.status % 7, 3, tables[3]?.percent).percent}
            />

            <Circle6
                top="441px"
                left="16px"
                index={6}
                move={move}
                primary1={`${handleColorTable(tables[6]?.status % 7, 6, tables[6]?.percent).primary1}`}
                primary2={`${handleColorTable(tables[6]?.status % 7, 6, tables[6]?.percent).primary2}`}
                percent={handleColorTable(tables[6]?.status % 7, 6, tables[6]?.percent).percent}
            />
            <Circle6
                top="442px"
                left="128px"
                index={7}
                move={move}
                primary1={`${handleColorTable(tables[7]?.status % 7, 7, tables[7]?.percent).primary1}`}
                primary2={`${handleColorTable(tables[7]?.status % 7, 7, tables[7]?.percent).primary2}`}
                percent={handleColorTable(tables[7]?.status % 7, 7, tables[7]?.percent).percent}
            />

            <Circle8
                top="330px"
                left="16px"
                index={4}
                move={move}
                primary1={`${handleColorTable(tables[4]?.status % 7, 4, tables[4]?.percent).primary1}`}
                primary2={`${handleColorTable(tables[4]?.status % 7, 4, tables[4]?.percent).primary2}`}
                percent={handleColorTable(tables[4]?.status % 7, 4, tables[4]?.percent).percent}
            />
            <Circle8
                top="330px"
                left="128px"
                index={5}
                move={move}
                primary1={`${handleColorTable(tables[5]?.status % 7, 5, tables[5]?.percent).primary1}`}
                primary2={`${handleColorTable(tables[5]?.status % 7, 5, tables[5]?.percent).primary2}`}
                percent={handleColorTable(tables[5]?.status % 7, 5, tables[5]?.percent).percent}
            />
            <Circle8
                top="442px"
                left="212px"
                index={8}
                move={move}
                primary1={`${handleColorTable(tables[8]?.status % 7, 8, tables[8]?.percent).primary1}`}
                primary2={`${handleColorTable(tables[8]?.status % 7, 8, tables[8]?.percent).primary2}`}
                percent={handleColorTable(tables[8]?.status % 7, 8, tables[8]?.percent).percent}
            />

            <Circle12
                top="162px"
                left="100px"
                index={2}
                move={move}
                primary1={`${handleColorTable(tables[2]?.status % 7, 2, tables[2]?.percent).primary1}`}
                primary2={`${handleColorTable(tables[2]?.status % 7, 2, tables[2]?.percent).primary2}`}
                percent={handleColorTable(tables[2]?.status % 7, 2, tables[2]?.percent).percent}
            />
        </div>
    )
}
export default AllTables