import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'simbad-client-scroll-to-top-button',
    templateUrl: './scroll-to-top-button.component.html',
    styleUrls: ['./scroll-to-top-button.component.scss']
})
export class ScrollToTopButtonComponent implements OnInit {
    windowScrolled: boolean;

    constructor(@Inject(DOCUMENT) private document: Document) {
    }

    @HostListener('window:scroll', [])
    onWindowScroll() {
        if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
            this.windowScrolled = true;
        } else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
            this.windowScrolled = false;
        }
    }

    scrollToTop() {
        (function smoothScroll() {

            const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
            console.log('scrollingToTop...', currentScroll);
            if (currentScroll > 0) {
                window.requestAnimationFrame(smoothScroll);
                window.scrollTo(0, currentScroll - (currentScroll / 8));
            }

        })();
    }

    ngOnInit() {
    }

}
