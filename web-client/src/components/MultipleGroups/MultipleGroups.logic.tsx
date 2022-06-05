import { MultipleGroupsProps } from "./MultipleGroups";
import { ReactElement, useEffect, useState } from "react";
import { Group } from "./Group";

export const useMultipleGroupsLogic = (props: MultipleGroupsProps) => {
    return {
        useMultipleGroups: ():[Array<JSX.Element>, () => void] => {

            const [groupsList, setGroupsList] = useState<Array<ReactElement>>([]);

            const removeGroup = (id: string) => {
                setGroupsList((groupsList) => {
                    if (groupsList.length === 1) return groupsList;

                    let newGroupsList = [...groupsList];
                    newGroupsList = newGroupsList.filter((element) => element.props.id !== id);
                    return newGroupsList;
                });
            }

            const addGroup = () => {

                let newGroupId = props.id + "-0";
                if (groupsList[groupsList.length-1]) {
                    let splitPrevId = groupsList[groupsList.length-1].props.id.split("-");
                    let newIdNum = parseInt(splitPrevId[splitPrevId.length-1]) + 1;
                    
                    newGroupId = props.id + "-" + newIdNum;
                }

                setGroupsList([...groupsList,
                    <Group id={newGroupId}
                           key={newGroupId}
                           onRemove={removeGroup}
                           placeholder={props.placeholder}
                           autoFocus />
                ]);
            }

            useEffect(() => {
                addGroup();
            }, []);

            return [groupsList, addGroup];
        }
    }
}