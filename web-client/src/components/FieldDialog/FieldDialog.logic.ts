import { ChangeEvent, useState } from "react";
import { FieldDialogProps } from "./FieldDialog";


export const useFieldDialogLogic = (props: FieldDialogProps) => {

    return {
       useForm: (): [
           name: string,
           onChange: (event: ChangeEvent<HTMLInputElement>) => void,
           onClose: () => void,
           onSubmit: () => void
       ] => {
           const [name, setName] = useState<string>("");

           const onChange = (event: ChangeEvent<HTMLInputElement>) => {
               setName(event.target.value);
           }

           const onClose = () => {
               props.handleClose();
               setName("");
           }

           const onSubmit = () => {
               props.handleSubmit(name);
               setName("");
           }

           return [name, onChange, onClose, onSubmit];
       }
    }
}