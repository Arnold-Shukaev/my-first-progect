import { Dispatch } from 'react';
import { ActionType } from '../../pages/Friends';
import { ButtonRemoveFriend } from '../ButtonRemoveFriend';
import s from './ButtonsBlock.module.scss';

type Props = {
    idThing: string | null,
    removerSelectedThing: Dispatch<ActionType>
}
export const ButtonsBlock = ({idThing, removerSelectedThing}: Props) => {
    return (
        <div className={s.action}>
            <ButtonRemoveFriend
                idThing={idThing}
                removerSelectedThing={removerSelectedThing}
            />
        </div>
    )
}