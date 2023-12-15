//Bu dosyaya temel olarak sabit olması ve proje boyunca yeniden kullanılması  gereken tüm değişkenleri koyacağız.Bunun amacı ise bu yapılandırma dosyasındaki bazı verileri değiştirerek projeyi kolayca yapılandırmamıza olanak sağlayacak.Tabii ki de bütün değişkenleri buraya koymayacağız.Buraya koyacağımız değişken projenin kendisi hakkında bazı önemli verileri tanımlamaktan sorumlu olan değişkendir.Bunlardan bir api url'sidir

export const API_URL = 'https://forkify-api.herokuapp.com/api/v2/recipes';
export const TIMEOUT_SEC = 10;
export const SEARCH_URL = 'https://forkify-api.herokuapp.com/api/search?q=';
export const RES_PER_PAGE = 10;
