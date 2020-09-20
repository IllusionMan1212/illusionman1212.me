import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

declare var $;

@Component({
    selector: 'app-portfolio',
    templateUrl: './portfolio.component.html',
    styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
    public categories: any[] = [];
    public selectedProject = {};

    constructor(private api : ApiService) {
        let requestObject = {
            method: "GET",
            endpoint: "getportfolio"
        }
        this.api.makeRequest(requestObject).then((val) => {
            if (val) {
                this.categories = val.doc;
            }
        });
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
