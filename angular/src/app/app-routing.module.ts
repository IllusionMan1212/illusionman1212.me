import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AddprojectComponent } from './addproject/addproject.component';
import { ContactComponent } from './contact/contact.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PortfolioComponent } from './portfolio/portfolio.component';

const routes: Routes = [
    {
        path: "",
        component: AboutComponent,
        data: {
            title: "IllusionMan1212 - Software Developer",
            ogUrl: "https://illusionman1212.me/",
            description: "I'm a software developer, web developer, gamer and freelancer on the hunt for more knowledge. Gimme all the softwares."
        }
    },
    {
        path: "portfolio",
        component: PortfolioComponent,
        data: {
            title: "IllusionMan1212 - Portfolio",
            ogUrl: "https://illusionman1212.me/portfolio",
            description: "Portfolio of all my project divided into categories for easier navigation",
        }
    },
    {
        path: "contact",
        component: ContactComponent,
        data: {
            title: "IllusionMan1212 - Contact",
            ogUrl: "https://illusionman1212.me/contact",
            description: "Contact me for offers, collaborations, feedback, or if you just want to send a heartfelt message.",
        }
    },
    {
        path: "admin/addproject",
        component: AddprojectComponent,
        data: {
            title: "IllusionMan1212 - Add Project",
            ogUrl: "",
            description: "Page to add my projects through."
        }
    },
    {
        path: "**",
        pathMatch: 'full',
        component: NotFoundComponent,
        data: {
            title: "IllusionMan1212 - 404",
            ogUrl: "",
            description: "Page not found"
        }
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
