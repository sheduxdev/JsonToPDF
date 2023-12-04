const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const handlebars = require("handlebars");
const dataSource = require("./dataChecker.js");

const GeneratePDF = async (data, fileName) => {
  try {
    const startTime = new Date().getTime();

    console.log("[DEBUG] Template dosyası yükleniyor.");
    const templateHtml = fs.readFileSync(
      path.join(process.cwd(), "template.html"),
      "utf8"
    );
    console.log("[DEBUG] Template dosyası yüklendi.");

    console.log("[DEBUG] Handlebars modülü yükleniyor.");
    handlebars.registerHelper(
      "math",
      function (lvalue, operator, rvalue, options) {
        lvalue = parseFloat(lvalue);
        rvalue = parseFloat(rvalue);

        return {
          "+": lvalue + rvalue,
          "-": lvalue - rvalue,
          "*": (lvalue * rvalue).toFixed(2),
          "/": lvalue / rvalue,
          "%": lvalue % rvalue,
        }[operator];
      }
    );
    console.log("[DEBUG] Handlebars modülü yüklendi.");

    console.log("[DEBUG] PDF Dosyası ayarları yapılıyor.");
    const template = handlebars.compile(templateHtml);

    const finalHtml = encodeURIComponent(template(data));

    const options = {
      format: "A4",
      headerTemplate: "<p></p>",
      footerTemplate: "<p></p>",
      displayHeaderFooter: false,
      margin: {},
      printBackground: true,
      path: fileName,
    };
    console.log("[DEBUG] PDF Dosyası ayarları yapıldı.");

    console.log("[DEBUG] Puppeteer modülü çalıştırılıyor.");
    const browser = await puppeteer.launch({
      args: ["--no-sandbox"],
      headless: "new",
      defaultViewport: null
    });

    const page = await browser.newPage();

    await page.goto(`data:text/html;charset=UTF-8,${finalHtml}`, {
      waitUntil: "networkidle0",
    });

    await page.pdf(options);
    await browser.close();
    console.log("[DEBUG] Puppeteer modülü başarıyla çalıştırıldı.");

    const endTime = new Date().getTime();
    const elapsedTime = (endTime - startTime) / 1000;

    console.log("Katalog başarıyla oluşturuldu. (" + elapsedTime + " saniye içerisinde oluştu)");
  } catch (err) {
    console.log("Bir hata meydana geldi:", err);
  }
};

(async () => {
  await GeneratePDF(await dataSource(), "catalog.pdf");
})();
