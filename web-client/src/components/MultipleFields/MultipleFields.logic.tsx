import {MultipleFieldsProps} from "./MultipleFields";
import {ReactElement, useEffect, useState} from "react";
import { Field } from "./Field";

export const useMultipleFieldsLogic = (props: MultipleFieldsProps) => {
    return {
        useMultipleFields: ():[Array<JSX.Element>, () => void] => {

            const [fieldsList, setFieldsList] = useState<Array<ReactElement>>([]);

            const removeField = (id: string) => {
                setFieldsList((fieldsList) => {
                    if (fieldsList.length === 1) return fieldsList;

                    let newFieldsList = [...fieldsList];
                    newFieldsList = newFieldsList.filter((element) => element.props.id !== id);
                    return newFieldsList;
                });
            }

            const addField = () => {

                let newFieldId = props.id + "-0";
                if (fieldsList[fieldsList.length-1]) {
                    let splitPrevId = fieldsList[fieldsList.length-1].props.id.split("-");
                    let newIdNum = parseInt(splitPrevId[splitPrevId.length-1]) + 1;

                    newFieldId = props.id + "-" + newIdNum;

                }

                setFieldsList([...fieldsList,
                    <Field id={newFieldId}
                           key={newFieldId}
                           onRemove={removeField}
                           placeholder={props.placeholder}
                           autoFocus />
                ]);
            }

            useEffect(() => {
                addField();
            }, []);

            return [fieldsList, addField];
        }
    }
}