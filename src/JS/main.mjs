import {phones} from './-smartphones.mjs';
import { computo } from './-computo.mjs';
import { tvs } from './-Tvs.mjs';

const smartphones = document.querySelector('.smartphonesSwiper')
const computer = document.querySelector('.computerSwiper')
const tv = document.querySelector('.tvSwiper')
const products = document.querySelector(".container__products")
let contenCar = document.querySelector('.carProducts')
let carTotal = document.querySelector('.carTotal')
const amountCart = document.querySelector(".count");

var swiper = new Swiper(".mySwiper", {
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,   
    slideShadows: true,
    },
    
    pagination: {     
    el: ".swiper-pagination" ,
    },
    });

let objCart = JSON.parse(localStorage.getItem("objCart")) || {};

function verifyAddToCart(findProduct, id) {
    if (objCart[id].stock === objCart[id].amount) {
        alert("No tengo mas en stock");
    } else {
        objCart[id].amount++;
    }
}

function seacrProduct(id) {
    if (objCart [id]) {
        return objCart[id] === id;
    }
}

function deleteProduct(id) {
    const res = confirm("Seguro quieres eliminar este producto");
    if (res) delete objCart[id];
}

function printAmountCart() {
    let sum = 0;

    const arrayCart = Object.values(objCart);

    if (!arrayCart.length) {
        return;
    }
    arrayCart.forEach(function ({ amount }) {
        sum += amount;
    });

    amountCart.textContent = sum;
}
function pritnTotalcart() {
    const arrayCart = Object.values(objCart)
    if (!arrayCart.length) {
        carTotal.innerHTML = `
        <h3>No hay nada a comprar</h3>
        `
        return
    }
    let sum = 0
    arrayCart.forEach(function ({amount,price}) {
        sum += amount * price
        
    })


    carTotal.innerHTML = `
    <h3> Total a pagar ${sum}</h3>
    <button class="btn btn__buy">Buy</button>
    `
}
function printCartProducts() {
    let html = ''
    const arrayCart = Object.values(objCart)

    arrayCart.forEach(function({id,category,price,name,image,amount }){
        html += `
            <div class=" item swiper-slide" >
                <h3> ${category}</h3>
                <h3>${name}</h3>
                <div class="product__img">
                    <img class="imgSmartphone" src="${image}" />
                </div>

                <div class="product__info">
                    <h3>$ ${price}.00 | <span>Amount: ${amount}</span></h3>
                </div>

                <div class="product__options" id="${id}">
                    <i class='bx bxs-minus-circle' ></i>
                    <i class='bx bxs-trash' ></i>
                    <i class='bx bxs-plus-circle' ></i>      
                </div>
            </div>
        `
    
})
contenCar.innerHTML=html
}

function printProducts() {
    let htmlPhone = ''
    let htmlComputo =''
    let htmlTvs = ''
    phones.forEach(function({id,category,price,name, stock,image }){
        htmlPhone += `
            <div class=" item swiper-slide" >
                <h3> ${category}</h3>
                <h3>${name}</h3>
                <div class="product__img">
                    <img class="imgSmartphone" src="${image}" />
                </div>

                <div class="product__info">
                    <h3>$ ${price}.00 | <span>Stock: ${stock}</span></h3>
                </div>

                <div class="product__options" id="${id}">
                    <button class="btn btn__add">Add to Cart</button>
                </div>
            </div>
        `
    })
    smartphones.innerHTML = htmlPhone
    computo.forEach(function({id,category,price,name, stock,image }){
        htmlComputo += `
        <div class=" item swiper-slide">
            <h3> ${category}</h3>
            <h3>${name}</h3>
            <div class="product__img">
                <img class="imgSmartphone" src="${image}" />
            </div>

            <div class="product__info">
                <h3>$ ${price}.00 | <span>Stock: ${stock}</span></h3>
            </div>

            <div class="product__options" id="${id}">
                <button class="btn btn__add">Add to Cart</button>
            </div>
        </div>
        `
    })
    computer.innerHTML = htmlComputo
    tvs.forEach(function({id,category,price,name, stock,image }){
        htmlTvs += `
        <div class=" item swiper-slide">
            <h3> ${category}</h3>
            <h3>${name}</h3>
            <div class="product__img">
                <img class="imgSmartphone" src="${image}" />
            </div>

            <div class="product__info">
                <h3>$ ${price}.00 | <span>Stock: ${stock}</span></h3>
            </div>

            <div class="product__options" id="${id}">
                <button class="btn btn__add">Add to Cart</button>
            </div>
        </div>
        `
    })
    tv.innerHTML = htmlTvs;
}

products.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn__add")) {
        const id = e.target.parentElement.id
        let findProduct = phones.find(function (phone) {
            return phone.id === id    
        })
        let findComputo = computo.find(function (comp) {
            return comp.id === id    
        })
        let findTvs = tvs.find(function (tv) {
            return tv.id === id    
        })
    
    if (objCart[id]) {
        verifyAddToCart(findProduct, id)
    }else{
        objCart[id] = {
            ...findProduct,
            amount: 1,
            ...findComputo,
            amount: 1,
            ...findTvs ,
            amount: 1
        }
    }
}
printCartProducts()
pritnTotalcart()
printAmountCart()
});

contenCar.addEventListener("click",function (e) {

        if (e.target.classList.contains('bxs-minus-circle')) {
            const id = e.target.parentElement.id
            if (objCart[id].amount === 1) {
                deleteProduct(id)    
                } else {
                    objCart[id].amount--
                    
                }
            }
        
        if (e.target.classList.contains('bxs-plus-circle')) {
            const id = e.target.parentElement.id
            let findProduct = seacrProduct(id)
            verifyAddToCart(findProduct,id)
        }
        if (e.target.classList.contains('bxs-trash')) {
            const id = e.target.parentElement.id
            deleteProduct(id) 
        }
        printCartProducts()
        pritnTotalcart()
        printAmountCart()
})
carTotal.addEventListener('click',function (e) {
    if (e.target.classList.contains("btn__buy")) {
        const res = confirm("Seguro quieres hacer la compra")
        if (!res) return
        let newArray = []

        phones.forEach(function (phone) {
            if (phone.id === objCart[phone.id]?.id) {
                newArray.push({
                    ...phone,
                    stock: phone.stock - objCart[phone.id].amount,
                });
            } else {
                newArray.push(phone);
            }
        });
        phones = newArray
        objCart = {};
        


        printProducts()
        printCartProducts()
        printAmountCart()
        pritnTotalcart()
}
})
printProducts()
pritnTotalcart()
printAmountCart()
printCartProducts()
