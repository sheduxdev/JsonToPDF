import axios from 'axios';
import { Product, PDFData } from '../types';
import { config } from '../config';

export class DataService {
    public static async fetchData(): Promise<PDFData> {
        try {
            const response = await axios.get<any>(config.data.apiUrl, {
                timeout: config.data.timeout,
            });

            let items: Product[] = [];

            if (config.data.rootPath && response.data[config.data.rootPath]) {
                items = response.data[config.data.rootPath];
            } else if (Array.isArray(response.data)) {
                items = response.data;
            } else {
                throw new Error('Geçersiz veri formatı');
            }

            return { items };
        } catch (error: any) {
            return {
                items: config.data.fallbackItems,
            };
        }
    }
}
