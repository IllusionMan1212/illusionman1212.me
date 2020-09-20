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
        component: AboutComponent
    },
    {
        path: "portfolio",
        component: PortfolioComponent
    },
    {
        path: "contact",
        component: ContactComponent
    },
    {
        path: "admin/addproject",
        component: AddprojectComponent,
    },
    {
        path: "**",
        pathMatch: 'full',
        component: NotFoundComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
