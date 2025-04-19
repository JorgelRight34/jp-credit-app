import { useMemo, useState } from "react";
import { ApiFile } from "../models/apiFile";

const useMultipleFilesInput = (defaultFileSources: ApiFile[], setDefaultFileSources?: (
    files: ApiFile[] | ((prev: ApiFile[]) => ApiFile[])
) => void, maxLength = 10) => {
    const [files, setFiles] = useState<File[]>([]);

    const tableFiles = useMemo(
        () => [
            ...defaultFileSources,
            ...files.map((file) => ({
                publicId: "",
                url: URL.createObjectURL(file),
                id: 1,
                name: file.name,
                createdAt: "",
                lastModified: "",
                fileType: file.type,
            })),
        ]
        ,
        [files, defaultFileSources]
    );

    const handleOnFileChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        index?: number
    ) => {
        const uploadedFile = event.target?.files?.[0];
        event.target.value = "";
        if (!uploadedFile) return;

        if (tableFiles.length >= maxLength) {
            throw Error(`Solo ${maxLength} archivos son permitidos.`);
        }

        if (index) {
            setFiles((prev) => [...prev].splice(index, 0, uploadedFile));
        } else {
            setFiles((prev) => [...prev, uploadedFile]);
        }
    };

    const removeFile = (index: number) => {
        setFiles((prev) =>
            [...prev].filter((_, key) => key !== index)

        );
    };

    const removeDefaultFile = (index: number) => {
        console.log("Removing default");
        if (!setDefaultFileSources) return;
        console.log("passed the return")
        setDefaultFileSources((prev) => {
            const array = [...prev].filter((_, key) => key !== index)
            return array;
        }
        );
    };

    return { tableFiles, handleOnFileChange, removeFile, removeDefaultFile, files }
}

export default useMultipleFilesInput;