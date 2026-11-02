import { Product } from '../types';

export const RESTAURANT_INFO = {
  name: 'كينغ فود',
  nameEn: 'KING FOOD',
  phoneLocal: '0673883349',
  phoneIntl: '213673883349',
  currency: 'د.ج',
  currencyCode: 'DZD',
  logoUrl: 'https://ik.imagekit.io/gwbbqzgwj/301c895e0e55120dc4e32b7c1310c44d.jpg',
  heroBgUrl: 'https://ik.imagekit.io/gwbbqzgwj/e17610bc8d53e36a4a69a68a9123976f.jpg',
};

export const MENU_PRODUCTS: Product[] = [
  {
    id: 'burger',
    nameAr: 'برغر',
    nameEn: 'Burger',
    price: 500,
    image: 'https://ik.imagekit.io/gwbbqzgwj/c9c5013a47c78dde12d22a8659cdb945.jpg?updatedAt=1793617285413',
    description: 'شطيرة برغر شهية ولذيذة محضرة بمكونات طازجة وصلصة كينغ فود المميزة مع الخضار والجبن الذائب.',
  },
  {
    id: 'pizza',
    nameAr: 'بيتزا',
    nameEn: 'Pizza',
    price: 700,
    image: 'https://ik.imagekit.io/gwbbqzgwj/6caea827a32d3a608c275eb2ad0b3ee5.jpg?updatedAt=1793617411192',
    description: 'بيتزا إيطالية مخبوزة بإتقان بعجينة مقرمشة، غنية بجبن الموتزاريلا والصلصة الإيطالية الشهية.',
  },
  {
    id: 'tacos',
    nameAr: 'تاكوس',
    nameEn: 'Tacos',
    price: 400,
    image: 'https://ik.imagekit.io/gwbbqzgwj/188e473efe80f8c19c9962b4f383bd00.jpg?updatedAt=1793617533438',
    description: 'تاكوس فرنسي شهير محشو باللحم المتبل، البطاطس المقلية المقرمشة وصلصة الجبن الكريمية الغنية.',
  },
  {
    id: 'grilled-food',
    nameAr: 'مشاوي',
    nameEn: 'Grilled Food',
    price: 800,
    image: 'https://ik.imagekit.io/gwbbqzgwj/4bb1cd1316c7fe75a2e3173d17e6535e.jpg?updatedAt=1793617606907',
    description: 'طبق مشاوي فاخر مشوي على الفحم بتتبيلة كينغ فود السرية لنكهة مدخنة لا تقاوم.',
  },
];
