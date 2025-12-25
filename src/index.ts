import { DataService } from './services/data.service';
import { PDFService } from './services/pdf.service';

const main = async () => {
    try {
        const data = await DataService.fetchData();

        await PDFService.generatePDF(data);

    } catch (error) {
        console.error('[CRITICAL] Uygulama hatası:', error);
    } finally {
        await PDFService.closeBrowser();
        process.exit(0);
    }
};

main();
