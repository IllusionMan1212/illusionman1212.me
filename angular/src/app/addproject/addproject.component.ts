import { Component, ElementRef, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
	selector: 'app-addproject',
	templateUrl: './addproject.component.html',
	styleUrls: ['./addproject.component.css']
})

export class AddprojectComponent implements OnInit {

	constructor(private api: ApiService) { }

	ngOnInit(): void { }

	public project = {
		name: "",
		link: "",
		category: "",
		color1: "",
		color2: "",
		tags: "",
		description: "",
		password: "",
	}

	file: File;
	onChange(event: EventTarget) {
		let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
        let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
        let files: FileList = target.files;
		this.file = files[0];
	}

	public addProject() {
		let formData: FormData = new FormData();
		formData.append("name", this.project.name);
		if (this.project.link) {
			formData.append("link", this.project.link);
		}
		formData.append("category", this.project.category);
		formData.append("color1", this.project.color1);
		formData.append("color2", this.project.color2);
		formData.append("tags", this.project.tags);
		formData.append("description", this.project.description);
		formData.append("password", this.project.password);
		if (this.file) {
			formData.append("file", this.file, this.file.name);
		}
		let requestObject = {
			method: "POST",
			body: formData,
			endpoint: "admin/addproject"
		}
		this.api.makeRequest(requestObject).then((val) => {
			if (val.success) {
				console.log(val);
			} else {
				console.log(val.message);
			}
		});
	}
}
