import axios from 'axios';
import { Product, PDFData } from '../types';
import { config } from '../config';

export class DataService {
    public static async fetchData(): Promise<PDFData> {
        try {
            console.log(`[LOG] Veri çekiliyor: ${config.data.apiUrl}`);
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

            console.log(`[LOG] Toplam ${items.length} ürün başarıyla alındı.`);
            return { items };
        } catch (error: any) {
            console.error('[ERROR] Veri çekme hatası:', error.message);

            console.log('[LOG] Konfigürasyondaki fallback verileri kullanılıyor.');
            return {
                items: config.data.fallbackItems,
            };
        }
    }
}
