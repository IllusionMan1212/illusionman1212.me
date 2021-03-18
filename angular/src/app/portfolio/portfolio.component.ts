import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { SEOService } from '../seo.service';

declare var $;

@Component({
    selector: 'app-portfolio',
    templateUrl: './portfolio.component.html',
    styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
    public categories: any[] = [];
    public selectedProject = {};

    constructor(private api : ApiService, private router: Router, private seo: SEOService, private activatedRoute: ActivatedRoute) {
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

        let requestObject = {
            method: "GET",
            endpoint: "getportfolio"
        }
        this.api.makeRequest(requestObject).then((val) => {
            if (val) {
                this.categories = val.doc;
            }
        });
        
        document.addEventListener("keydown", (e: KeyboardEvent) => {
            this.hideModal();
        })
    }

    ngOnInit(): void { }

    public showModal(projName: string, catName: string) {
        $(`.project-modal-lg`).css("opacity", "0.93");
        $(`.project-modal-lg`).css("visibility", "visible");
        $("#main").css("filter", "blur(2px)");
        $("body").css("overflow-y", "hidden");
        let categoryIndex = 0;
        categoryIndex = this.categories.findIndex((cat) => {
            return cat.name == catName;
        })
        this.selectedProject = this.categories[categoryIndex].projects.find((elem) => {
            return elem.name == projName;
        })
    }

    public hideModal() {
        $(`.project-modal-lg`).css("opacity", "0");
        $('#main').css("filter", "blur(0px)");
        $("body").css("overflow-y", "visible");
        setTimeout(() => {
            $(`.project-modal-lg`).css("visibility", "hidden");
        }, 200);
    }

}
