import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

    constructor(private api: ApiService, private http: HttpClient) { }

    ngOnInit(): void { }

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
