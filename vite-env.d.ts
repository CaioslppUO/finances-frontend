/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    // adicione outras variáveis de ambiente que você usa aqui
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
