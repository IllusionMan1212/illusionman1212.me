import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { SEOService } from '../seo.service';
import { filter, map, mergeMap, tap } from 'rxjs/operators';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

    constructor(private api: ApiService, private router: Router, private seo: SEOService, private activatedRoute: ActivatedRoute) {
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

    ngOnInit(): void {}

    public formError = "";
    public formSuccess = "";

    public contact_info = {
        name: "",
        email: "",
        subject: "",
        message: ""
    }

    public submitMessage() {
        if (!this.contact_info.name || !this.contact_info.email || !this.contact_info.subject || !this.contact_info.message) {
            this.formError = "Please fill all the fields first";
            this.formSuccess = "";
            return;
        }
        let requestObject = {
            method: "POST",
            body: this.contact_info,
            endpoint: "contact",
        }

        this.api.makeRequest(requestObject).then((val) => {
            document.getElementsByTagName("form")[0].reset();
            if (val.success) {
                if (val.message) {
                    this.formSuccess = val.message;
                    this.formError = "";
                }
            }
            else {
                if (val.message) {
                    this.formError = val.message;
                    this.formSuccess = "";
                }
            }
        });
    }

}
