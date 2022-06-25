import {FieldData, MultipleFieldsProps} from "./MultipleFields";
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

            const getFieldId = (fieldsList: Array<ReactElement>) => {
                let newFieldId = props.id + "-0";
                if (fieldsList[fieldsList.length-1]) {
                    const splitPrevId = fieldsList[fieldsList.length-1].props.id.split("-");
                    const newIdNum = parseInt(splitPrevId[splitPrevId.length-1]) + 1;

                    newFieldId = props.id + "-" + newIdNum;
                }

                return newFieldId;
            }

            const autofill = () => {
                const autofillGroups: Array<ReactElement> = [];

                props.autofill?.forEach((e) => {

                    const newFieldId = getFieldId(autofillGroups);
                    autofillGroups.push(
                        <Field id={newFieldId}
                               key={newFieldId}
                               onRemove={removeField}
                               placeholder={props.placeholder}
                               autofill={e}
                               type={props.type}
                               variants={props.variants} />
                    );
                })
                setFieldsList(autofillGroups);
            }

            const addField = (field?: FieldData) => {

                setFieldsList((fieldsList) => {

                    const newFieldId = getFieldId(fieldsList);

                    return [
                        ...fieldsList,
                        <Field id={newFieldId}
                               key={newFieldId}
                               onRemove={removeField}
                               placeholder={props.placeholder}
                               autoFocus={props.autoFocus}
                               autofill={field}
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

                setFieldsList((fieldsList) => {

                    const newFieldId = getFieldId(fieldsList);

                    return [
                        <Field id={newFieldId}
                               key={newFieldId}
                               onRemove={removeField}
                               placeholder={props.placeholder}
                               autoFocus={props.autoFocus}
                               type={props.type}
                               variants={props.variants} />
                    ]
                });
            }, []);

            return [fieldsList, addField];
        }
    }
}