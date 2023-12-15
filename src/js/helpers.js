import { TIMEOUT_SEC } from './config';

//Tekrar tekrrar kullanacağımız fonksiyonları buraya ekliyoruz bu dosyanın amacı bu,
//mesela buraya örnek olarak JSON alan bir fonksiyon yapacağız
//apiden gelen verinin timeoutunu belirleyen fonksiyon veri buradaki saniyeden önce gelmezse hata alıyoruz
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
