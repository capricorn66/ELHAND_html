// JavaScript Document

import $ from "jquery";
import Swiper from "swiper";
import debounce from 'lodash.debounce';
import "./hasAttr";
import {rwdMedia} from "./rwdMedia";
import {rippletInit} from './ripplet';
import './nav-scroll';
import lightbox from "lightbox2";
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/popover';
import 'bootstrap/js/dist/alert';
import 'bootstrap/js/dist/tab';
import 'jquery-parallax.js';
import Cookies from 'js-cookie';
import bsCustomFileInput from 'bs-custom-file-input';
import {addBackToTop} from 'vanilla-back-to-top';

window.debounce = debounce;
window.rwdMedia = rwdMedia;
window.Cookies = Cookies;
window.rippletInit = rippletInit;
window.bsCustomFileInput = bsCustomFileInput;
window.addBackToTop = addBackToTop;
window.lightbox = lightbox;

$(document).ready(function(e) {

    bsCustomFileInput.init();

    const jumbotronSwiperSettings = {
        autoplay: {
            delay: 5000,
        },
        effect: 'fade',
        pagination: {
            el: '.jumbotron.swiper-container .swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
    };

    const jumbotronSwiper = new Swiper('.jumbotron.swiper-container', jumbotronSwiperSettings);

    window.onscroll = function() {handleHeader()};
    handleHeader();

    rippletInit();

    addBackToTop({
        diameter: 56,
        backgroundColor: '#FFFFFF',
        textColor: '#F28300',
        innerHTML: ''
    });

    $('.nav-scroll').navScroll();

    $('[data-toggle="popover"]').popover({
        content: function () {
            return $(this.dataset['contentid']).contents().clone()
        }
    });

    const html = document.documentElement;
    const navbarToggler = $('#navbarSupportedContent');

    navbarToggler.on('show.bs.collapse', function () {
        if( rwdMedia.xs() || rwdMedia.sm() || rwdMedia.md() ) {
            html.classList.add('bodyLock');
        }
    });

    $('.close-collapse').on('click', function () {
        $('#navbarSupportedContent').collapse('hide');
        html.classList.remove('bodyLock');
    });

    [...document.querySelectorAll(".collapse-dropdown")].map( elem => {
        $('.close-dropdown', elem).on('click', function () {
            $(elem).collapse('hide');
        });
        $(elem).on('show.bs.collapse', function () {
            hideOnClickOutside(elem);
        });
    });


    [...document.querySelectorAll(".aside-sub-nav")].map( elem => {
        $(elem).on('show.bs.collapse', function () {
            hideOnClickOutside(elem);
        });
    });

    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true
    });

});

function toggle(source) {
    const checkboxes = document.getElementsByClassName('toggle-checkbox');
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i] !== source)
            checkboxes[i].checked = source.checked;
    }
}

window.toggle = toggle;

function hideOnClickOutside(element) {

    const outsideClickListener = event => {
        if (!element.contains(event.target) && isVisible(element)) {
            $(element).collapse('hide');
            removeClickListener()
        }
    };

    const onEscListener = event => {
        if( event.key === 'Escape' || event.key === 'Esc' || event.keyCode === 27 ) {
            if (isVisible(element)) {
                $(element).collapse('hide');
                removeClickListener()
            }
        }
    };

    const removeClickListener = () => {
        document.removeEventListener('click', outsideClickListener);
        document.removeEventListener('keydown', onEscListener);
    };

    document.addEventListener('click', outsideClickListener);
    document.addEventListener('keydown', onEscListener,);

}

const isVisible = elem => !!elem && !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );


function handleHeader() {
    if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
        document.body.className = "sm";
    } else {
        document.body.className = "";
    }
}

// jQuery.fn.jquery
// $.fn.popover.Constructor.VERSION
// $.fn.hasAttr
