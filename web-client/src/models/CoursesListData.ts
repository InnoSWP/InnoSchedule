export interface CoursesListData {
    name: string;
    published: number;
    // lastModified: number;
}

export function createData(
    name: string,
    published: number
    // lastModified: number
): CoursesListData {
    return {
        name,
        published
        // lastModified
    };
}