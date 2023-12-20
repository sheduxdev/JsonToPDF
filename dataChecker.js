const axios = require('axios');

const fetchData = async () => {
  try {
    const response = await axios.get('http://oriongida.com/wp-json/custom/v2/posts');
    return response.data;
  } catch (error) {
    console.error('Veri çekme hatası:', error.message);
    return { error: 'Veri çekme hatası', details: error.message };
  }
};

const getData = async () => {
  try {
    const remoteData = await fetchData();

    if (!remoteData || remoteData.error) {
      console.log('Veri alınamadı veya hata oluştu, sabit veriler kullanılıyor.');

      return {
        items: [
          {
            "thumbnail_url": "https://oriongida.com/wp-content/uploads/2023/12/WhatsApp-Image-2023-12-04-at-14.33.57.jpeg",
            "urun_adi": "Ürünün adı alınamadı.",
            "marka": "Ürünü üreten marka alınamadı.",
            "cat_name": "Ürünün kategorisi alınamadı."
          }
        ],
      };
    }

    console.log(`Toplam ${remoteData.length} ürün koyuldu.`);

    return {
      items: remoteData,
    };
  } catch (error) {
    console.error('getData fonksiyonunda bir hata oluştu:', error.message);
    return { error: 'getData fonksiyonunda bir hata oluştu', details: error.message };
  }
};

module.exports = getData;
