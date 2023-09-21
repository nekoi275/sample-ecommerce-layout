import $ from 'jquery';

export default {
    toggleMenu: function (event) {
        if ($(event.target).parents('.active').length == 0) {
            this.hideAllMenu();
        }
        this.showMenu(event);
    },
    toggleMobileMenu: function (event) {
        let action = $(event.target).data('mobile-menu');
        if (action == 'open') {
            $('#mega-menu-mobile').addClass('active');
        } else {
            $('#mega-menu-mobile').removeClass('active');
        }
        $('[data-mobile-menu]').removeClass('not-shown');
        $(event.target).addClass('not-shown');
    },
    hideAllMenu: () => {
        $('.dropdown').removeClass('active');
        $('.dropdown-button').removeClass('active');
    },
    showMenu: event => {
        let menuID = $(event.target).data('toggle');
        if (menuID) {
            $('#' + menuID).addClass('active');
            $(event.target).addClass('active');
        }
    },
    changeLanguage: event => {
        let activeLang = $(event.target).text();
        $('.lang[data-toggle="lang-dropdown"]').text(activeLang);
    },
    changeCurrency: event => {
        let activeCurrency = $(event.target).text();
        $('.lang[data-toggle="currency-dropdown"]').text(activeCurrency);
    },
    toggleModal: event => {
        let modal = $(event.target).data('modal-id');
        let action = $(event.target).data('modal');
        if (action == 'close') {
            $('.modal-container').removeClass('active');
        } else {
            $('#' + modal).addClass('active');
        }
    },
    togglePass: passwordField => {
        if ($(passwordField).attr('type') === 'password') {
            $(passwordField).attr('type', 'text');
        } else {
            $(passwordField).attr('type', 'password');
        }
    },
    changeGalleryImage: event => {
        let bigImg = $('.gallery-big-image > img');
        $('.gallery-small-image').removeClass('active');
        $(event.target).addClass('active');
        $(bigImg).attr('src', $(event.target).attr('src'));
    },
    enlargeGalleryImage: () => {
        let currentImg = $('.gallery-big-image > img').attr('src');
        $('#gallery-modal > img').attr('src', currentImg);
        $('#gallery-modal').addClass('active');
    },
    changeTab: event => {
        $('[data-tab]').removeClass('active');
        $('.tabs-content').removeClass('active');
        let currentTab = $('[data-tab-content=' + $(event.target).data('tab') + ']');

        $(event.target).addClass('active');
        currentTab.addClass('active');
    },
    increaseCount: (event, number) => {
        let counterName = $(event.target).data('count');
        let countTarget = $('.' + counterName + '-counter');
        let count = Number(localStorage.getItem(counterName)) || 0;
        let result;
        if (number) {
            result = count + number;
        } else {
            result = ++count;
        }
        $(countTarget).each(function () { $(this).text(result) });
        localStorage.setItem(counterName, result);
    },
    validateNumbers: event => {
        let numberVal = Number.isInteger(Number($(event.target).val()));
        if (!numberVal) {
            $(event.target).val('');
        }
    },
    changeInputNumber: event => {
        let action = $(event.target).data('input');
        let count = $('.quantity-value').val();
        if (action == 'increase') {
            $('.quantity-value').val(++count);
        } else {
            $('.quantity-value').val(--count);
        }
    }
}

