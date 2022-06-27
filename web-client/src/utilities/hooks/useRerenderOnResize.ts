import { useLayoutEffect, useState } from "react";

export const useRerenderOnResize = () => {
    let [rerenderFlag, setRerenderFlag] = useState(false);
    useLayoutEffect(() => {
        const onSizeUpdate = () => {
            console.log(rerenderFlag);
            setRerenderFlag(!rerenderFlag);
        }
        window.addEventListener('resize', onSizeUpdate);
        return () => window.removeEventListener('resize', onSizeUpdate);
    }, [rerenderFlag]);

    return rerenderFlag;
}