import { useState } from "react";
import { useOutletContext } from "react-router-dom";

export const useLayoutLogic = () => {
    return {
        useLabel: ():[string, any] => {
            const [label, setLabel] = useState<string>("App name");
            return [label, setLabel];
        }
    }
}

export const useSetLabel = () => {
    return useOutletContext<CallableFunction>();
}