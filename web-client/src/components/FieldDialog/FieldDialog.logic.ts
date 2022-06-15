import { ChangeEvent, useState } from "react";
import { FieldDialogProps } from "./FieldDialog";


export const useFieldDialogLogic = (props: FieldDialogProps) => {

    return {
       useForm: (): [
           name: string,
           onChange: (event: ChangeEvent<HTMLInputElement>) => void
       ] => {
           const [name, setName] = useState<string>("");

           const onChange = (event: ChangeEvent<HTMLInputElement>) => {
               setName(event.target.value);
           }

           return [name, onChange];
       }
    }
}