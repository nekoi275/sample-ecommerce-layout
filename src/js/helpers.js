import $ from 'jquery';

const MOBILE_WIDTH = 768;

export default {
    isMobile: () => {
        return $(window).width() < MOBILE_WIDTH;
    },
    showPage: (content) => {
        $('main').html(content);
        if (!localStorage.isCookiesAccepted) {
            setTimeout(() => { $('#cookies-message').addClass('active') }, 10000);
        }
    }
}