import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index'; // 这里的 index 就是你刚才写的那个文件

// 1. 导出自定义的派发钩子
export const useAppDispatch = () => useDispatch<AppDispatch>();

// 2. 导出自定义的选择钩子
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;