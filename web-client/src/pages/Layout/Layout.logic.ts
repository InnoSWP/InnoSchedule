import {useEffect, useState} from "react";
import { useOutletContext } from "react-router-dom";

export const useLayoutLogic = () => {
    return {
        useHeader: ():[string, string, (label: string) => void, (link: string) => void] => {

            const [label, setLabel] = useState<string>("App name");
            const [buttonLink, setButtonLink] = useState<string>("");
            return [label, buttonLink, setLabel, setButtonLink];
        }
    }
}

export const useSetHeader = (label: string, buttonLink?: string):[
    setLabel: (label: string) => void,
    setButtonLink: (buttonLink: string) => void
] => {
    const { setLabel, setButtonLink } = useOutletContext<any>();

    if (buttonLink === undefined) buttonLink = "";

    useEffect(() => {
        setLabel(label);
        setButtonLink(buttonLink);
    }, []);

    return [setLabel, setButtonLink];
}