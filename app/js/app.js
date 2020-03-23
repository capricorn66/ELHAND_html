// JavaScript Document

import $ from "jquery";
import Swiper from "swiper";
import "./hasAttr";
import {rwdMedia} from "./rwdMedia";
import lightbox from "lightbox2";
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/popover';
import 'bootstrap/js/dist/tab';
import 'jquery-parallax.js';

window.rwdMedia = rwdMedia;

$(document).ready(function(e) {

    const jumbotronSwiper = new Swiper('.jumbotron.swiper-container', {
        pagination: {
            el: '.jumbotron.swiper-container .swiper-pagination',
            type: 'bullets',
        },
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

    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true
    });

});

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

const isVisible = elem => !!elem && !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length )


// jQuery.fn.jquery
// $.fn.popover.Constructor.VERSION
// $.fn.hasAttr
