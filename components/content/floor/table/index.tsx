import {  useMoveContext  } from '../../MoveContext'
import Circle12 from "./circle-14"
import Circle6 from "./circle-6"
import Circle8 from "./circle-8"
import Table1v1 from "./table-1v1"
import Table2v2Column from "./table-2v2-column"
import Table2v2Row from "./table-2v2-row"
import Table3v3 from "./table-3v3"
import Table6v6 from "./table-6v6"
import Table7v7 from "./table-7v7"

export interface Chair {
    top: string;
    left: string;
}

export interface Table {
    top: string;
    left: string;
    number: number;
    move: boolean
}


const AllTables = () => {
    const { move } = useMoveContext()
    return (
        <div id="container-tables">
            <Table1v1
                top='50px'
                left='380px'
                number={116}
                move={move}
            />
            <Table1v1
                top='50px'
                left='436px'
                number={117}
                move={move}
            />
            <Table1v1
                top='50px'
                left='492px'
                number={118}
                move={move}
            />
            <Table1v1
                top='162px'
                left='408px'
                number={120}
                move={move}
            />

            <Table2v2Row
                top="162px"
                left="464px"
                number={121}
                move={move}
            />

            <Table6v6
                top="330px"
                left="408px"
                number={122}
                move={move}
            />
            <Table6v6
                top="420px"
                left="408px"
                number={123}
                move={move}
            />

            <Table2v2Column
                top="50px"
                left="128px"
                number={106}
                move={move}
            />

            <Table3v3
                top="50px"
                left="16px"
                number={105}
                move={move}
            />
            <Table3v3
                top="162px"
                left="324px"
                number={115}
                move={move}
            />
            <Table3v3
                top="330px"
                left="324px"
                number={114}
                move={move}
            />

            <Table7v7
                top="162px"
                left="212px"
                number={108}
                move={move}
            />

            <Circle6
                top="441px"
                left="16px"
                number={111}
                move={move}
            />
            <Circle6
                top="442px"
                left="128px"
                number={112}
                move={move}
            />

            <Circle8
                top="330px"
                left="16px"
                number={109}
                move={move}
            />
            <Circle8
                top="330px"
                left="128px"
                number={110}
                move={move}
            />
            <Circle8
                top="442px"
                left="212px"
                number={113}
                move={move}
            />

            <Circle12
                top="162px"
                left="100px"
                number={107}
                move={move}
            />
        </div>
    )
}
export default AllTables