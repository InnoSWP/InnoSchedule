import {useEffect, useState} from "react";
import { useOutletContext } from "react-router-dom";

export const useLayoutLogic = () => {
    return {
        useLabel: ():[string, any] => { // TODO Make useLabel() => useHeader() with onClickCallback function

            const [label, setLabel] = useState<string>("App name");
            return [label, setLabel];
        }
    }
}

export const useSetLabel = (label: string) => {
    const setLabel = useOutletContext<CallableFunction>();

    useEffect(() => {
        setLabel(label);
    }, []);
}