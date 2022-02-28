import { useState } from 'react'
import { InfoContext } from "./InfoContext"
import SearchData from "./info-request/info-search-data"
import Request from "./info-request"
import Setting from "./info-setting"
import Customer from "./info-customer"

const Info = () => {
    const [showDetails, setShowDetails] = useState(false)
    const [searchField, setSearchField] = useState({
        request: {
            name: "",
            status: -1,
        }
    })

    return (
        <div id="container-info">
            <InfoContext.Provider
                value={{ showDetails, setShowDetails, searchField, setSearchField }}
            >
                <SearchData />
                <Request />
                <Setting />
                <Customer />
            </InfoContext.Provider>
        </div>
    )
}
export default Info