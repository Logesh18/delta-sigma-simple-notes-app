interface ProcessEnv {
    REACT_APP_BACKEND_URL: string;
    REACT_APP_TOAST_TIME: any;
}

declare var process: {
    env: ProcessEnv;
};