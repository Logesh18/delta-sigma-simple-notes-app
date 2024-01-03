interface ProcessEnv {
    REACT_APP_BACKEND_URL: string;
}

declare var process: {
    env: ProcessEnv;
};