import { usePageContext } from '../context/PageContext';
import MenuIcon from '@atlaskit/icon/glyph/menu';
import { clearCustomerChoosen } from '../../redux/slices/customer.slice';
import { useAppDispatch } from '../../redux/hook';

const HeaderMenu = () => {
    const dispatch = useAppDispatch();
    const { enableInfo, setEnableInfo, showZoom } = usePageContext();

    const handleEnableInfo = () => {
        if (!showZoom) {
            setEnableInfo(!enableInfo);
            dispatch(clearCustomerChoosen());
        }
    };

    return (
        <span id="menu" onClick={handleEnableInfo}>
            <MenuIcon label="menu" size="medium" primaryColor="#869AB8" />
        </span>
    );
};

export default HeaderMenu;
