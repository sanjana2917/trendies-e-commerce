import p1_img from "./m1.jpg";
import p2_img from "./m2.jpg";
import p3_img from "./m3.jpg";
import p4_img from "./m4.jpg";
import p5_img from "./m5.jpg";
import p6_img from "./m6.jpg";
import p7_img from "./m7.jpg";
import p8_img from "./m8.jpg";
import p9_img from "./m9.jpg";
import p10_img from "./m10.jpg";
import p11_img from "./m11.jpg";
import p12_img from "./m12.png";
import p13_img from "./w1.jpg";
import p14_img from "./w2.jpg";
import p15_img from "./w3.jpg";
import p16_img from "./w4.jpg";
import p17_img from "./w5.jpg";
import p18_img from "./w6.jpg";
import p19_img from "./w7.jpg";
import p20_img from "./w8.jpg";
import p21_img from "./w9.jpg";
import p22_img from "./w10.jpg";
import p23_img from "./w11.jpg";
import p24_img from "./w12.jpg";
import p25_img from "./k1.jpg";
import p26_img from "./k2.jpg";
import p27_img from "./k3.jpg";
import p28_img from "./k4.jpg";
import p29_img from "./k5.jpg";
import p30_img from "./k6.jpg";
import p31_img from "./k7.jpg";
import p32_img from "./k8.jpg";
import p33_img from "./k9.jpg";
import p34_img from "./k10.jpg";
import p35_img from "./k11.jpg";
import p36_img from "./k12.jpg";


let all_products = [
    // Men's Collection
    {
        id: 1,
        name: "Men Casual Cotton Shirt",
        category: "mens",
        image: p1_img,
        new_price: 599,
        old_price: 899
    },
    {
        id: 2,
        name: "Men Stylish Printed Shirt",
        category: "mens",
        image: p2_img,
        new_price: 699,
        old_price: 999
    },
    {
        id: 3,
        name: "Men Regular Fit Shirt",
        category: "mens",
        image: p3_img,
        new_price: 549,
        old_price: 799
    },
    {
        id: 4,
        name: "Men Classic Formal Shirt",
        category: "mens",
        image: p4_img,
        new_price: 799,
        old_price: 1199
    },
    {
        id: 5,
        name: "Men Casual Wear Shirt",
        category: "mens",
        image: p5_img,
        new_price: 649,
        old_price: 999
    },
    {
        id: 6,
        name: "Men Slim Fit Shirt",
        category: "mens",
        image: p6_img,
        new_price: 899,
        old_price: 1299
    },
    {
        id: 7,
        name: "Men Trendy Casual Shirt",
        category: "mens",
        image: p7_img,
        new_price: 599,
        old_price: 899
    },
    {
        id: 8,
        name: "Men Designer Shirt",
        category: "mens",
        image: p8_img,
        new_price: 749,
        old_price: 1099
    },
    {
        id: 9,
        name: "Men Cotton Casual Shirt",
        category: "mens",
        image: p9_img,
        new_price: 699,
        old_price: 999
    },
    {
        id: 10,
        name: "Men Party Wear Shirt",
        category: "mens",
        image: p10_img,
        new_price: 999,
        old_price: 1499
    },
    {
        id: 11,
        name: "Men Latest Fashion Shirt",
        category: "mens",
        image: p11_img,
        new_price: 799,
        old_price: 1199
    },
    {
        id: 12,
        name: "Men Premium Casual Shirt",
        category: "mens",
        image: p12_img,
        new_price: 899,
        old_price: 1399
    },

    // Women's Collection
    {
        id: 13,
        name: "Women Floral Kurti",
        category: "women",
        image: p13_img,
        new_price: 599,
        old_price: 899
    },
    {
        id: 14,
        name: "Women Designer Kurti",
        category: "women",
        image: p14_img,
        new_price: 699,
        old_price: 999
    },
    {
        id: 15,
        name: "Women Cotton Kurta",
        category: "women",
        image: p15_img,
        new_price: 549,
        old_price: 799
    },
    {
        id: 16,
        name: "Women Printed Kurti",
        category: "women",
        image: p16_img,
        new_price: 799,
        old_price: 1199
    },
    {
        id: 17,
        name: "Women Party Wear Kurti",
        category: "women",
        image: p17_img,
        new_price: 899,
        old_price: 1299
    },
    {
        id: 18,
        name: "Women Ethnic Wear Kurta",
        category: "women",
        image: p18_img,
        new_price: 749,
        old_price: 1099
    },
    {
        id: 19,
        name: "Women Stylish Long Kurti",
        category: "women",
        image: p19_img,
        new_price: 699,
        old_price: 999
    },
    {
        id: 20,
        name: "Women Casual Wear Kurti",
        category: "women",
        image: p20_img,
        new_price: 599,
        old_price: 899
    },
    {
        id: 21,
        name: "Women Latest Fashion Kurti",
        category: "women",
        image: p21_img,
        new_price: 999,
        old_price: 1499
    },
    {
        id: 22,
        name: "Women Embroidery Kurti",
        category: "women",
        image: p22_img,
        new_price: 849,
        old_price: 1299
    },
    {
        id: 23,
        name: "Women Traditional Kurta",
        category: "women",
        image: p23_img,
        new_price: 799,
        old_price: 1199
    },
    {
        id: 24,
        name: "Women Elegant Designer Kurti",
        category: "women",
        image: p24_img,
        new_price: 899,
        old_price: 1399
    },

    // Kids Collection
    {
        id: 25,
        name: "Kids Traditional Kurta",
        category: "kids",
        image: p25_img,
        new_price: 399,
        old_price: 599
    },
    {
        id: 26,
        name: "Kids Cotton Kurta Set",
        category: "kids",
        image: p26_img,
        new_price: 499,
        old_price: 699
    },
    {
        id: 27,
        name: "Kids Party Wear Dress",
        category: "kids",
        image: p27_img,
        new_price: 599,
        old_price: 899
    },
    {
        id: 28,
        name: "Kids Stylish Ethnic Wear",
        category: "kids",
        image: p28_img,
        new_price: 449,
        old_price: 699
    },
    {
        id: 29,
        name: "Kids Casual Dress",
        category: "kids",
        image: p29_img,
        new_price: 399,
        old_price: 599
    },
    {
        id: 30,
        name: "Kids Designer Kurta",
        category: "kids",
        image: p30_img,
        new_price: 549,
        old_price: 799
    },
    {
        id: 31,
        name: "Kids Traditional Wear",
        category: "kids",
        image: p31_img,
        new_price: 499,
        old_price: 749
    },
    {
        id: 32,
        name: "Kids Festive Wear Dress",
        category: "kids",
        image: p32_img,
        new_price: 699,
        old_price: 999
    },
    {
        id: 33,
        name: "Kids Fashion Kurta Set",
        category: "kids",
        image: p33_img,
        new_price: 599,
        old_price: 899
    },
    {
        id: 34,
        name: "Kids Printed Kurta",
        category: "kids",
        image: p34_img,
        new_price: 449,
        old_price: 699
    },
    {
        id: 35,
        name: "Kids Modern Ethnic Dress",
        category: "kids",
        image: p35_img,
        new_price: 649,
        old_price: 949
    },
    {
        id: 36,
        name: "Kids Premium Party Wear",
        category: "kids",
        image: p36_img,
        new_price: 799,
        old_price: 1199
    }
];

export default all_products;

