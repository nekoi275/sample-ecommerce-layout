import helpers from '../helpers'
import { initCommonHandlers } from '../handlers';

let page404 = require('../../templates/404.ejs');

function notFoundHandler(onLoad) {
    helpers.showPage(page404({
        previousPageUrl: '#',
        currentPage: '404',
        previousPage: 'Home',
    }));
    onLoad();
    initCommonHandlers();
}

export { notFoundHandler };