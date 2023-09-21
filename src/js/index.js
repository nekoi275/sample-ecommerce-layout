import $ from 'jquery';
import Navigo from 'navigo';
import helpers from './helpers'
import { initHomePage } from './pages/home';
import { initCategoryLanding } from './pages/categoryLanding';
import { notFoundHandler } from './pages/notFound';
import { initProductPage } from './pages/product';
let main = require('../templates/main.ejs');

let root = null;
let useHash = true;
let router = new Navigo(root, useHash);

global.jQuery = $;
global.$ = $;

$('head').append('<link rel="stylesheet" href="css/style.css"></link>');
$(document.body).html(main({
    year: new Date().getFullYear(),
    wishlistCount: localStorage.getItem('wishlist') || 0,
    cartCount: localStorage.getItem('cart') || 0
}));

function switchToMobile() {
    if (helpers.isMobile()) {
        $('.desktop').addClass('hidden');
        $('.mobile').removeClass('hidden');
    } else {
        $('.desktop').removeClass('hidden');
        $('.mobile').addClass('hidden');
    }
}

function onLoad() {
    router.updatePageLinks(); 
    switchToMobile();
}

router.on({
    '/': () => initHomePage(onLoad),
    'category': () => initCategoryLanding(onLoad),
    'product-detail': () => initProductPage(onLoad),
}).notFound(() => notFoundHandler(onLoad)).resolve();

$(document).ready(switchToMobile);
$(window).resize(switchToMobile);