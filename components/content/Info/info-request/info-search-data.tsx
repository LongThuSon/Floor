import BookIcon from '@atlaskit/icon/glyph/book';
import PeopleIcon from '@atlaskit/icon/glyph/people';
import { useAppSelector } from '../../../../redux/hook';

const SearchData = () => {
    const customerList = useAppSelector(
        (state) => state.customers.customerList,
    );

    const sumQuantity = () => {
        let sumQuantity = 0;
        for (let i in customerList) {
            sumQuantity += customerList[i].quantityBook;
        }
        return sumQuantity;
    };

    return (
        <div id="info-search-data">
            <div className="search-data-item" style={{ marginLeft: '35px' }}>
                <span>
                    <BookIcon label="book" />
                </span>
                {customerList.length} Bookings
            </div>
            <div className="search-data-item" style={{ marginRight: '35px' }}>
                <span>
                    <PeopleIcon label="people" />
                </span>
                {sumQuantity()} Covers
            </div>
        </div>
    );
};
export default SearchData;
