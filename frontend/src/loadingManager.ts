type LoadingHandler = {
    show: () => void;
    hide: () => void;
}

let loadingHandler: LoadingHandler | null = null;

export const setLoadingHandler = (handler: LoadingHandler | null) => {
    loadingHandler = handler;
}

export const showLoadingSpinner = () => {
    loadingHandler?.show();
}

export const hideLoadingSpinner = () => {
    loadingHandler?.hide();
}