import { Dispatch, SetStateAction } from 'react';
// import s from './ButtonExit.module.scss';

type Props = {
    setActiveProperty: Dispatch<SetStateAction<HTMLDivElement | null>>
}
export const ButtonExit = ({setActiveProperty}: Props) => {
    return (
        <button onClick={ () => setActiveProperty(null) }>Выход</button>
    )
}