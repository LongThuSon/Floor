import { useState } from 'react'
import List from './list'
import TableList from './table-list'

export interface Check {
    checked : boolean
}

const TableStatusList = () => {
    const [hideList, setHideList] = useState(false)

    const handleShowList = () => {
        setHideList(!hideList)
    }

    return (
        <div
            id="table-status-list"
            onClick={handleShowList}
        >
            <TableList 
                checked={hideList}
            />
            {hideList && <List />}
        </div>
    )
}
export default TableStatusList