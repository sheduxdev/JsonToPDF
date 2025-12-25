import { AppConfig } from '../types';

export const config: AppConfig = {
    data: {
        apiUrl: process.env.API_URL || 'https://dummyjson.com/products',
        rootPath: 'products',
        timeout: 10000,
        fallbackItems: [
            {
                id: 0,
                title: 'Varsayılan Ürün (API Hatası)',
                brand: 'Varsayılan Marka',
                category: 'Genel',
                thumbnail: 'https://cdn.dummyjson.com/product-images/1/thumbnail.jpg'
            }
        ]
    },
    pdf: {
        fileName: 'catalog.pdf',
        format: 'A4',
        margin: { top: 20, right: 20, bottom: 20, left: 20 }
    },
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        viewport: {
            width: 794,
            height: 1123
        }
    },
    ui: {
        headerImageUrl: 'https://dummyjson.com/image/400x200/282828',
        colors: {
            background: '#ffffff',
            cardBackground: '#ecf0f1',
            cardBorder: '#bdc3c7',
            title: '#2c3e50',
            brand: '#555555',
            price: '#2c3e50'
        },
        fonts: {
            main: "'Inter', sans-serif",
            title: "'Poppins', sans-serif"
        }
    }
};
