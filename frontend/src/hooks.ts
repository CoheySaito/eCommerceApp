import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { RootState } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
// eslint-disable-next-line import/prefer-default-export
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
