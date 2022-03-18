import { useInfoContext } from '../../../context/InfoContext'

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
                autoComplete="off"
            />
        </div>
    )
}
export default Search