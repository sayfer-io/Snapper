export type Finding = {
    Type: String;
    description: string;
    position: {
        filePath: string;
        lineNum: number;
    };
};