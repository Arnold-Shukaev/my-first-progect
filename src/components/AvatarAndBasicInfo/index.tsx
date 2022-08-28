import { Dispatch, SetStateAction } from "react";
import { Avatar } from "../Avatar";
import { BasicInfoThing } from "../BasicInfoThing";
import s from "./AvatarAndBasicInfo.module.scss";

type Props = {
  selectedThing: { [prop: string]: string } | null;
  activateStatus: boolean;
  setActivateStatus: Dispatch<SetStateAction<boolean>>;
  paramForDisplay: string[];
  nameParamForDisplay: string[];
};
export const AvatarAndBasicInfo = ({
  selectedThing,
  activateStatus,
  setActivateStatus,
  paramForDisplay,
  nameParamForDisplay,
}: Props) => {
  return (
    <div className={activateStatus ? s.avatarAndBasicActive : undefined}>
      <Avatar
        selectedThing={selectedThing}
        activateStatus={activateStatus}
        setActivateStatus={setActivateStatus}
      />
      {!activateStatus ? null : (
        <BasicInfoThing
          thing={selectedThing}
          paramForDisplay={paramForDisplay}
          nameParamForDisplay={nameParamForDisplay}
        />
      )}
    </div>
  );
};
