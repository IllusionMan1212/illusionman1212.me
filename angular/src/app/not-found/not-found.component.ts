import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { SEOService } from '../seo.service';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

    constructor(private router: Router, private seo: SEOService, private activatedRoute: ActivatedRoute) {
        this.router.events.pipe(
            filter((event) => event instanceof NavigationEnd),
            map(e => this.activatedRoute),
            map((route) => {
                while (route.firstChild) route = route.firstChild;
                return route;
            }),
            filter((route) => route.outlet === "primary"),
            mergeMap((route) => route.data),
        ).subscribe((event) => {
            console.log(event['title']);
            this.seo.updateTitle(event['title']);
            this.seo.updateOgUrl(event['ogUrl']);
            this.seo.updateDescription(event['description']);
        });
    }

    ngOnInit(): void { }

}
