import $ from 'jquery';
import { initCommonHandlers } from '../handlers';
import { getProductTiles, addProductTiles } from '../productTile';
import { initTopSlider, initFeaturedSlider, initPopularProductsSlider } from '../sliders';
import helpers from '../helpers'

let top = require('../../templates/top.ejs');
let banner = require('../../templates/banner.ejs');
let benefits = require('../../templates/benefits.ejs');
let popular = require('../../templates/popular.ejs');
let featured = require('../../templates/featured.ejs');

function initHomePage(onLoad) {
    let homePage = [top(), popular(), banner(), featured(), benefits()].join('');
    helpers.showPage(homePage);
    initCommonHandlers();
    initTopSlider();
    initFeaturedSlider();
    $('#popular').removeClass('product-page-section');
    $('#load-more-button').click(() => {
        getProductTiles('api/products-page-2.json', productTiles => {
            addProductTiles(productTiles, $('.products-container'), true);
            onLoad();
        });
        $('#load-more-button').addClass('hidden');
    });
    getProductTiles('api/products-page-1.json', productTiles => {
        if (helpers.isMobile()) {
            addProductTiles(productTiles, $('#popular-products-slider'), false);
            initPopularProductsSlider();
        } else {
            addProductTiles(productTiles, $('.products-container'), true);
        }
        onLoad();
    });
}

export { initHomePage };