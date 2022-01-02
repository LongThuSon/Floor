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
}

const AllTables = () => {
    return (
        <div id="container-tables">
            <Table1v1
                top='50px'
                left='380px'
                number={116}
            />
            <Table1v1
                top='50px'
                left='436px'
                number={117}
            />
            <Table1v1
                top='50px'
                left='492px'
                number={118}
            />
            <Table1v1
                top='162px'
                left='408px'
                number={120}
            />

            <Table2v2Row
                top="162px"
                left="464px"
                number={121}
            />

            <Table6v6
                top="330px"
                left="408px"
                number={122}
            />
            <Table6v6
                top="420px"
                left="408px"
                number={123}
            />

            <Table2v2Column
                top="50px"
                left="128px"
                number={106}
            />

            <Table3v3
                top="50px"
                left="16px"
                number={105}
            />
            <Table3v3
                top="162px"
                left="324px"
                number={115}
            />
            <Table3v3
                top="330px"
                left="324px"
                number={114}
            />

            <Table7v7
                top="162px"
                left="212px"
                number={108}
            />

            <Circle6 
                top="441px"
                left="16px"
                number={111}
            />
            <Circle6 
                top="442px"
                left="128px"
                number={112}
            />

            <Circle8 
                top="330px"
                left="16px"
                number={109}
            />
            <Circle8 
                top="330px"
                left="128px"
                number={110}
            />
            <Circle8 
                top="442px"
                left="212px"
                number={113}
            />

            <Circle12 
                top="162px"
                left="100px"
                number={107}
            />
        </div>
    )
}
export default AllTables