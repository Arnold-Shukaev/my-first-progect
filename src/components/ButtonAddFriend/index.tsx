import { interactionLocalStorage } from '../../shared';
import s from './ButtonAddFriend.module.scss';

type Props = {
    selectedThing: any
}

export const ButtonAddFriend = ({selectedThing} : Props) => {
    function handlerClick() {
        let specialId: string = selectedThing.fName + selectedThing.sName + selectedThing._id;
        interactionLocalStorage( (oldStorage, ...arg) => {
            oldStorage[arg[0][0]] = {...arg[0][1]}
        }, specialId, selectedThing)
    }
    
    return (
        <button onClick={handlerClick} className={s.but}>Добавить друга</button>
    )
}