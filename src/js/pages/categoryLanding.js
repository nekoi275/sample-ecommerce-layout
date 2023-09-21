import $ from 'jquery';
import helpers from '../helpers'
import { initCommonHandlers } from '../handlers';
import { initFeaturedSlider } from '../sliders';
import { getProductTiles, addProductTiles } from '../productTile';

let category = require('../../templates/category.ejs');
let featured = require('../../templates/featured.ejs');

function showProducts(onLoad) {
    return productTiles => {
        addProductTiles(productTiles, $('.products-container'), true);
        onLoad();
    }
}

function initCategoryLanding(onLoad) {
    let categoryPage = [category({
        previousPageUrl: '#',
        previousPage: 'Home',
        currentPage: 'Products category'
    }), featured()].join('');
    helpers.showPage(categoryPage);
    initCommonHandlers();
    initFeaturedSlider();
    $('#category-load-more-button').click(() => {
        getProductTiles('api/products-page-2.json', showProducts(onLoad));
        $('#category-load-more-button').addClass('hidden');
    });
    getProductTiles('api/products-category-page.json', showProducts(onLoad));
}

export { initCategoryLanding };