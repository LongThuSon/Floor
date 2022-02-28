import { useInfoContext } from '../../Info/InfoContext'
import Textfield from '@atlaskit/textfield'

const Search = () => {
    const { setSearchField } = useInfoContext()

    const handleSearchChange = (event: any) => {
        setSearchField((prev: any) => ({
            request: {
                ...prev.request,
                name: event.target.value,
            }
        }))
    }


    return (
        <div id="info-search">
            <input
                id='search-input'
                type='search'
                placeholder='Search'
                onChange={handleSearchChange}
            />

            {/* <Textfield
                placeholder='Search'
                style={{ height: "34px" }}
            /> */}
        </div>
    )
}
export default Search