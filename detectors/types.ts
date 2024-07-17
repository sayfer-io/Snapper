export type Finding = {
    type: String;
    description: string;
    position: {
        filePath: string;
        lineNum: number;
    };
};