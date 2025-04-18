import { ApiFile } from "./apiFile";

export interface Photo extends ApiFile {
    publicId: string;
    url: string;
    id: number;
}