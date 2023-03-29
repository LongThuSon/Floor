import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';

//useDispatch hook with types.
export const useAppDispatch = () => useDispatch<AppDispatch>();
//useSelector hook with types
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;