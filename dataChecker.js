const axios = require('axios');

const fetchData = async () => {
  try {
    const response = await axios.get('http://oriongida.com/wp-json/custom/v2/products');
    return response.data;
  } catch (error) {
    console.error('Veri çekme hatası:', error.message);
    return { error: 'Veri çekme hatası', details: error.message };
  }
};

const getData = async () => {
  try {
    const remoteData = await fetchData();

    if (remoteData && !remoteData.error) {
      console.log(`Toplam ${remoteData.length} ürün koyuldu.`);

      return {
        items: remoteData,
      };
    } else {
      return {
        items: [
          {
            "urun_adi": "Lütfen veri sunucusunu kontrol edin.",
            "marka": "Lütfen veri sunucusunu kontrol edin.",
            "cat_name": "Lütfen veri sunucusunu kontrol edin.",
            "stok_kodu": "504",
            "img": "https://imgur.com/UQWpx7I.png"
          }
        ],
      };
    }
  } catch (error) {
    console.error('getData fonksiyonunda bir hata oluştu:', error.message);
    return { error: 'getData fonksiyonunda bir hata oluştu', details: error.message };
  }
};

module.exports = getData;
