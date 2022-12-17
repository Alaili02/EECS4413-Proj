// import { useAppDispatch } from "../app/hooks"
// import { addToCartStore } from "../store/cartSlice"
// import { filtersStateT } from "../store/filtersSlice"
// import { BasicProducts } from "./samples/Products"

export const hold = 1;

// export type ReviewT = {
//     "Author": string,
//     "Rating": string,
//     "Content": string
// }

// export type BareProductT = {
//     "id": string,
//     "name": string,
//     "price": number,
//     "thumbnail": string,
// }

// export type BasicProductT = BareProductT & {
//     "type": string,
//     "brand": string,
//     "rating": number
// }

// export type DetailedProductT = BasicProductT & {
//     "description": string,
//     "images": string[],
//     "reviews": ReviewT[],
// }

// const Products:DetailedProductT[] = [
//     {
//         "id": "0000",
//         "type": "Phone",
//         "brand": "Apple",
//         "name": "iPhone 14",
//         "price": 1000,
//         "thumbnail": "https://files.catbox.moe/rbizms.png",
//         "rating": 8.2,
//         "description" : "",
//         "images": [],
//         "reviews": []
//     },
//     {
//         "id": "0001",
//         "type": "Phone",
//         "brand": "Apple",
//         "name": "iPhone 14",
//         "price": 1000,
//         "thumbnail": "https://files.catbox.moe/j1zmju.png",
//         "rating": 8.2,
//         "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mauris a diam maecenas sed enim ut sem. Pellentesque habitant morbi tristique senectus. Fames ac turpis egestas sed. Felis eget velit aliquet sagittis id consectetur purus ut. Pellentesque nec nam aliquam sem et tortor. Amet nisl purus in mollis nunc. Gravida rutrum quisque non tellus. Elit ut aliquam purus sit amet luctus venenatis lectus magna. Facilisi morbi tempus iaculis urna id volutpat lacus. Nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae. Nec ultrices dui sapien eget mi proin sed libero. Leo a diam sollicitudin tempor id eu nisl. Ut tristique et egestas quis ipsum suspendisse. Egestas quis ipsum suspendisse ultrices. Sit amet nulla facilisi morbi tempus iaculis urna. Nisi lacus sed viverra tellus. Libero nunc consequat interdum varius sit amet mattis vulputate. Porta non pulvinar neque laoreet suspendisse. Volutpat est velit egestas dui id ornare arcu odio. Dolor sit amet consectetur adipiscing elit ut. Vulputate dignissim suspendisse in est ante. Sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc. At lectus urna duis convallis convallis tellus id interdum. Phasellus vestibulum lorem sed risus. Sit amet porttitor eget dolor morbi. Pharetra pharetra massa massa ultricies mi quis hendrerit dolor magna. Posuere morbi leo urna molestie at elementum eu facilisis sed. Morbi tristique senectus et netus. Libero justo laoreet sit amet. Mauris cursus mattis molestie a. Faucibus vitae aliquet nec ullamcorper sit amet risus. Nisl condimentum id venenatis a. Sed odio morbi quis commodo. Ut eu sem integer vitae. Pulvinar mattis nunc sed blandit libero volutpat sed cras. Nec dui nunc mattis enim ut. Ipsum dolor sit amet consectetur adipiscing elit duis tristique sollicitudin. Vitae sapien pellentesque habitant morbi tristique senectus. Sit amet aliquam id diam maecenas ultricies mi eget mauris. Faucibus nisl tincidunt eget nullam non nisi est. Ut tristique et egestas quis ipsum suspendisse ultrices gravida. Amet volutpat consequat mauris nunc congue nisi. Amet volutpat consequat mauris nunc congue. Ac orci phasellus egestas tellus. Nam aliquam sem et tortor consequat. Id diam maecenas ultricies mi eget mauris pharetra. Aliquet porttitor lacus luctus accumsan. Gravida quis blandit turpis cursus in hac. Dignissim enim sit amet venenatis urna cursus. Sed viverra tellus in hac habitasse platea dictumst vestibulum rhoncus. Etiam sit amet nisl purus in mollis nunc. Adipiscing enim eu turpis egestas pretium aenean. Scelerisque fermentum dui faucibus in ornare quam viverra orci. Ut consequat semper viverra nam libero justo laoreet. Turpis egestas integer eget aliquet nibh praesent tristique magna. Hendrerit dolor magna eget est. Nulla pharetra diam sit amet nisl. Fringilla phasellus faucibus scelerisque eleifend. Vitae auctor eu augue ut lectus arcu bibendum at. Faucibus vitae aliquet nec ullamcorper sit. Arcu risus quis varius quam quisque id diam. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant. Magna fringilla urna porttitor rhoncus. Enim nulla aliquet porttitor lacus luctus accumsan tortor posuere. Id velit ut tortor pretium viverra suspendisse potenti nullam ac. Sed vulputate odio ut enim. Non sodales neque sodales ut etiam sit amet. In hac habitasse platea dictumst quisque sagittis purus. Suspendisse ultrices gravida dictum fusce ut. Sagittis orci a scelerisque purus semper eget. Porta nibh venenatis cras sed. Sed augue lacus viverra vitae congue. Est placerat in egestas erat. Sed ullamcorper morbi tincidunt ornare massa eget egestas. Pretium nibh ipsum consequat nisl vel pretium lectus quam.",
//         "images": [],
//         "reviews": []
//     } ,
//     {
//         "id": "0002",
//         "type": "Phone",
//         "brand": "Apple",
//         "name": "iPhone 14",
//         "price": 1000,
//         "thumbnail": "https://files.catbox.moe/j1zmju.png",
//         "rating": 8.2,
//         "description" : "",
//         "images": [],
//         "reviews": []
//     } ,
//     {
//         "id": "0003",
//         "type": "Phone",
//         "brand": "Apple",
//         "name": "iPhone 14",
//         "price": 1000,
//         "thumbnail": "https://files.catbox.moe/j1zmju.png",
//         "rating": 8.2,
//         "description" : "",
//         "images": [],
//         "reviews": []
//     } ,
//     {
//         "id": "0004",
//         "type": "Phone",
//         "brand": "Apple",
//         "name": "iPhone 14",
//         "price": 1000,
//         "thumbnail": "https://files.catbox.moe/j1zmju.png",
//         "rating": 8.2,
//         "description" : "",
//         "images": [],
//         "reviews": []
//     } ,
//     {
//         "id": "0005",
//         "type": "Phone",
//         "brand": "Apple",
//         "name": "iPhone 14",
//         "price": 500,
//         "thumbnail": "https://files.catbox.moe/j1zmju.png",
//         "rating": 6,
//         "description" : "",
//         "images": [],
//         "reviews": []
//     } ,
//     {
//         "id": "0006",
//         "type": "Phone",
//         "brand": "Apple",
//         "name": "iPhone 14",
//         "price": 1000,
//         "thumbnail": "https://files.catbox.moe/j1zmju.png",
//         "rating": 8.2,
//         "description" : "",
//         "images": [],
//         "reviews": []
//     } ,
//     {
//         "id": "0007",
//         "type": "Phone",
//         "brand": "Apple",
//         "name": "iPhone 14",
//         "price": 1000,
//         "thumbnail": "https://files.catbox.moe/j1zmju.png",
//         "rating": 8.2,
//         "description" : "",
//         "images": [],
//         "reviews": []
//     } ,
//     {
//         "id": "0008",
//         "type": "Phone",
//         "brand": "Apple",
//         "name": "iPhone 14",
//         "price": 1000,
//         "thumbnail": "https://files.catbox.moe/j1zmju.png",
//         "rating": 8.2,
//         "description" : "",
//         "images": [],
//         "reviews": []
//     } ,
//     {
//         "id": "0009",
//         "type": "Phone",
//         "brand": "Apple",
//         "name": "iPhone 14",
//         "price": 1000,
//         "thumbnail": "https://files.catbox.moe/j1zmju.png",
//         "rating": 8.2,
//         "description" : "",
//         "images": [],
//         "reviews": []
//     },
//     {
//         "id": "0010",
//         "type": "Phone",
//         "brand": "Apple",
//         "name": "iPhone 14",
//         "price": 1000,
//         "thumbnail": "https://files.catbox.moe/rbizms.png",
//         "rating": 8.2,
//         "description" : "",
//         "images": [],
//         "reviews": []
//     },
//     {
//         "id": "0011",
//         "type": "Phone",
//         "brand": "Apple",
//         "name": "iPhone 14",
//         "price": 1000,
//         "thumbnail": "https://files.catbox.moe/j1zmju.png",
//         "rating": 8.2,
//         "description" : "",
//         "images": [],
//         "reviews": []
//     },
//     {
//         "id": "0012",
//         "type": "Phone",
//         "brand": "Apple",
//         "name": "iPhone 14",
//         "price": 1000,
//         "thumbnail": "https://files.catbox.moe/j1zmju.png",
//         "rating": 8.2,
//         "description" : "",
//         "images": [],
//         "reviews": []
//     },
//     {
//         "id": "0013",
//         "type": "Phone",
//         "brand": "Apple",
//         "name": "iPhone 14",
//         "price": 1000,
//         "thumbnail": "https://files.catbox.moe/j1zmju.png",
//         "rating": 8.2,
//         "description" : "",
//         "images": [],
//         "reviews": []
//     },
//     {
//         "id": "0014",
//         "type": "Phone",
//         "brand": "Apple",
//         "name": "iPhone 14",
//         "price": 1000,
//         "thumbnail": "https://files.catbox.moe/j1zmju.png",
//         "rating": 8.2,
//         "description" : "",
//         "images": [],
//         "reviews": []
//     },
//     {
//         "id": "0015",
//         "type": "Phone",
//         "brand": "Apple",
//         "name": "iPhone 14",
//         "price": 500,
//         "thumbnail": "https://files.catbox.moe/j1zmju.png",
//         "rating": 6,
//         "description" : "",
//         "images": [],
//         "reviews": []
//     },
//     {
//         "id": "0016",
//         "type": "Phone",
//         "brand": "Apple",
//         "name": "iPhone 14",
//         "price": 1000,
//         "thumbnail": "https://files.catbox.moe/j1zmju.png",
//         "rating": 8.2,
//         "description" : "",
//         "images": [],
//         "reviews": []
//     },
//     {
//         "id": "0017",
//         "type": "Phone",
//         "brand": "Apple",
//         "name": "iPhone 14",
//         "price": 1000,
//         "thumbnail": "https://files.catbox.moe/j1zmju.png",
//         "rating": 8.2,
//         "description" : "",
//         "images": [],
//         "reviews": []
//     },
//     {
//         "id": "0018",
//         "type": "Phone",
//         "brand": "Apple",
//         "name": "iPhone 14",
//         "price": 1000,
//         "thumbnail": "https://files.catbox.moe/j1zmju.png",
//         "rating": 8.2,
//         "description" : "",
//         "images": [],
//         "reviews": []
//     },
//     {
//         "id": "0019",
//         "type": "Phone",
//         "brand": "Apple",
//         "name": "iPhone 14",
//         "price": 1000,
//         "thumbnail": "https://files.catbox.moe/j1zmju.png",
//         "rating": 8.2,
//         "description" : "",
//         "images": [],
//         "reviews": []
//     } 
// ]
// const Cart:BareProductT[] = [];

// export const getBasicProducts = (filter: boolean, filterValue: filtersStateT):BasicProductT[] => {
//     if (filter === true) {
//         const {Brand, Price, Rating, Type} = filterValue;
//         return Products
//             .filter(prod => 
//                 (prod.brand === Brand || Brand === "")
//                 && (prod.type === Type || Type === "")
//                 && Rating.min < prod.rating && prod.rating < Rating.max
//                 && Price.min < prod.price && prod.price < Price.max)
//             .map(prod => ({
//                 "id": prod.id,
//                 "type": prod.type,
//                 "brand": prod.brand,
//                 "name": prod.name,
//                 "price": prod.price,
//                 "thumbnail": prod.thumbnail,
//                 "rating": prod.rating,
//             }));
//     }
//     return Products.map(prod => ({
//         "id": prod.id,
//         "type": prod.type,
//         "brand": prod.brand,
//         "name": prod.name,
//         "price": prod.price,
//         "thumbnail": prod.thumbnail,
//         "rating": prod.rating,
//     }));;
// }

// export const getCart = () => {
//     return Cart;
// }

// export const getDetailedProduct = (id: String):DetailedProductT => {
//     return Products.filter(prod => prod.id === id)[0];
// }

// export const getBasicProduct = (id: String):BasicProductT => {
//     const prod = getDetailedProduct(id);
//     return {
//         "id": prod.id,
//         "name": prod.name,
//         "price": prod.price,
//         "thumbnail": prod.thumbnail,
//         "type": prod.type,
//         "brand": prod.brand,
//         "rating": prod.rating
//     };
// }

// export const getBareProduct = (id: String): BareProductT => {
//     const prod = getBasicProduct(id);
//     return {
//         "id": prod.id,
//         "name": prod.name,
//         "price": prod.price,
//         "thumbnail": prod.thumbnail,
//     }
// }

// export const addToCart = (id: string) => {
//     const dispatch = useAppDispatch();
//     dispatch(addToCartStore({
//         ...getBareProduct(id),
//         Quantity: 1
//     }));
// }