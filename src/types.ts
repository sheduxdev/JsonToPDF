export interface Product {
    id?: number;
    title: string;
    description?: string;
    price?: number;
    brand?: string;
    category?: string;
    thumbnail: string;
    images?: string[];
}

export interface PDFData {
    items: Product[];
}

export interface PDFOptions {
    fileName: string;
    format?: "Letter" | "Legal" | "Tabloid" | "Ledger" | "A0" | "A1" | "A2" | "A3" | "A4" | "A5" | "A6";
    margin?: {
        top: string | number;
        right: string | number;
        bottom: string | number;
        left: string | number;
    };
}

export interface DataConfig {
    apiUrl: string;
    rootPath?: string; // e.g., 'products' for dummyjson
    fallbackItems: Product[];
    timeout?: number;
}

export interface PuppeteerConfig {
    headless: boolean | "new" | "shell";
    args: string[];
    viewport: {
        width: number;
        height: number;
    };
}

export interface AppConfig {
    data: DataConfig;
    pdf: PDFOptions;
    puppeteer: PuppeteerConfig;
}
