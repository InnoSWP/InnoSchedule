
export class ResourceStandardFetcherAPI<I extends { id: string, name: string }, O extends { uuid: string, name: string }> {

    endPointUrl: string;
    resource: string;

    updateReduxAction: any;
    dispatch: any;

    constructor(endPointUrl: string, resource: string, updateReduxAction: any, dispatch: any) {
        this.endPointUrl = endPointUrl;
        this.resource = resource;
        this.updateReduxAction = updateReduxAction;
        this.dispatch = dispatch;
    }

    updateResource = () => {

        fetch(this.endPointUrl + "/api/v1/" + this.resource + "/")
            .then((res) => res.text())
            .then((res) => JSON.parse(res) as I[])
            .then((res) => {
                const newData = res.map((e) => {
                    return {
                        uuid: e.id,
                        name: e.name
                    }
                }) as O[];

                this.dispatch(this.updateReduxAction({
                    data: newData
                }));
            });
    }

    addResource = (name: string) => {

        const options = {
            method: "POST",
            body: JSON.stringify({
                name: name
            }),
            headers: {
                "Content-Type": "application/json"
            },
            mode: 'cors' as RequestMode
        };

        fetch(this.endPointUrl + "/api/v1/" + this.resource + "/", options)
            .then(() => {
                this.updateResource();
            })
    }

    removeResource = (uuid: string) => {

        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            mode: 'cors' as RequestMode
        };

        fetch(this.endPointUrl + "/api/v1/" + this.resource + "/" + uuid + "/", options)
            .then(() => {
                this.updateResource();
            })
    }
}