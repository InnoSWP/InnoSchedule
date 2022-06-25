import { MultipleGroupsProps } from "./MultipleGroups";
import { ReactElement, useEffect, useState } from "react";
import { Group } from "./Group";

export const useMultipleGroupsLogic = (props: MultipleGroupsProps) => {
    return {
        useMultipleGroups: ():[Array<ReactElement>, () => void] => {

            const [groupsList, setGroupsList] = useState<Array<ReactElement>>([]);

            const removeGroup = (id: string) => {
                setGroupsList((groupsList) => {
                    if (groupsList.length === 1) return groupsList;

                    let newGroupsList = [...groupsList];
                    newGroupsList = newGroupsList.filter((element) => element.props.id !== id);
                    return newGroupsList;
                });
            }

            const getGroupId = (groupsList: Array<ReactElement>) => {

                let newGroupId = props.id + "-0";
                if (groupsList[groupsList.length-1]) {
                    const splitPrevId = groupsList[groupsList.length-1].props.id.split("-");
                    const newIdNum = parseInt(splitPrevId[splitPrevId.length-1]) + 1;

                    newGroupId = props.id + "-" + newIdNum;
                }

                return newGroupId;
            }

            const autofill = () => {

                const autofillGroups:Array<ReactElement> = [];

                props.autofill?.forEach((e) => {

                    const newGroupId = getGroupId(autofillGroups);

                    autofillGroups.push(
                        <Group id={newGroupId}
                               key={newGroupId}
                               onRemove={removeGroup}
                               placeholder={props.placeholder}
                               autofill={e}
                               type={props.type}
                               variants={props.variants} />
                    );
                })

                setGroupsList(autofillGroups);
            }

            const addGroup = () => {
                setGroupsList((groupsList) => {

                    const newGroupId = getGroupId(groupsList);

                    return [
                        ...groupsList,
                        <Group id={newGroupId}
                               key={newGroupId}
                               onRemove={removeGroup}
                               placeholder={props.placeholder}
                               autoFocus
                               type={props.type}
                               variants={props.variants} />
                    ]
                });
            }

            useEffect(() => {
                if (props.autofill) {
                    autofill();
                    return;
                }

                setGroupsList((groupsList) => {

                    const newGroupId = getGroupId(groupsList);

                    return [
                        <Group id={newGroupId}
                               key={newGroupId}
                               onRemove={removeGroup}
                               placeholder={props.placeholder}
                               autoFocus
                               type={props.type}
                               variants={props.variants} />
                    ]
                });
            }, []);

            return [groupsList, addGroup];
        }
    }
}