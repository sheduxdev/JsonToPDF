const axios = require('axios');

const fetchData = async () => {
  try {
    const response = await axios.get('http://oriongida.com/wp-json/custom/v2/products');
    return response.data;
  } catch (error) {
    console.error('Veri çekme hatası:', error);
    return null;
  }
};

const getData = async () => {
  const remoteData = await fetchData();

  if (remoteData) {
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
};

module.exports = getData;