import { useState, useEffect } from 'react'
import { useMoveContext } from '../../MoveContext'
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
    const [render, setRender] = useState<number>(0)

    // useEffect(() => {
    //     setInterval((index) => {
    //         setPercent((oldArray: any) => [oldArray + 16])
    //         console.log(percent)
    //     }, 1000)
    // }, [])

    // const handlePercent = () => {
    //     setInterval(() => {

    //     }, 1000)
    // }


    const handleColorTable = (id: number) => {
        // let tasks = new Promise((resolve, reject) => {
        //     setTimeout(resolve, 3000)
        // })
        // tasks.then(() => {
        //     console.log(16)
        //     return 16
        // })
        // .then(() => {
        //     return new Promise((resolve, reject) => {
        //         setTimeout(resolve, 3000)
        //     })
        // })
        // .then(() => {
        //     console.log(32)
        //     return 32
        // })

        if (id === 0) {
            setTimeout(() => {
                render > 5 ? setRender(0) : setRender(prev => prev + 1)
                console.log(render)
            }, 10000);

        }

        switch (id) {
            case 0:
                return {
                    primary1: '#A9EAFF',
                    primary2: '#FFFFFF',
                    percent: [16, 33, 50, 66, 83, 100],
                }
            default:
                throw new Error('Error!')
        }
    }

    return (
        <div id="container-tables">
            {/* {console.log(handleColorTable(0).percent2)} */}
            <Table1v1
                top='50px'
                left='380px'
                index={11}
                move={move}
                primary1={`${handleColorTable(0).primary1}`}
                primary2={`${handleColorTable(0).primary2}`}
                percent={handleColorTable(0).percent[render]}
            />
            <Table1v1
                top='50px'
                left='436px'
                index={12}
                move={move}
            />
            <Table1v1
                top='50px'
                left='492px'
                index={13}
                move={move}
            />
            <Table1v1
                top='162px'
                left='408px'
                index={14}
                move={move}
            />

            <Table2v2Row
                top="162px"
                left="464px"
                index={15}
                move={move}
            />

            <Table6v6
                top="330px"
                left="408px"
                index={16}
                move={move}
            />
            <Table6v6
                top="420px"
                left="408px"
                index={17}
                move={move}
            />

            <Table2v2Column
                top="50px"
                left="128px"
                index={1}
                move={move}
            />

            <Table3v3
                top="50px"
                left="16px"
                index={0}
                move={move}
            />
            <Table3v3
                top="162px"
                left="324px"
                index={10}
                move={move}
            />
            <Table3v3
                top="330px"
                left="324px"
                index={9}
                move={move}
            />

            <Table7v7
                top="162px"
                left="212px"
                index={3}
                move={move}
            />

            <Circle6
                top="441px"
                left="16px"
                index={6}
                move={move}
            />
            <Circle6
                top="442px"
                left="128px"
                index={7}
                move={move}
            />

            <Circle8
                top="330px"
                left="16px"
                index={4}
                move={move}
            />
            <Circle8
                top="330px"
                left="128px"
                index={5}
                move={move}
            />
            <Circle8
                top="442px"
                left="212px"
                index={8}
                move={move}
            />

            <Circle12
                top="162px"
                left="100px"
                index={2}
                move={move}
            />
        </div>
    )
}
export default AllTables