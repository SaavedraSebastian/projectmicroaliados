import { Routes } from "@angular/router";
import { EmailMarketingComponent } from "./email-marketing/email-marketing.component";
import { CampaniaComponent } from "./campania/campania.component";

export const emailMarketing: Routes = [

    {
        path: 'comunication', component: EmailMarketingComponent
    },
    {
        path: 'campaigns', component: CampaniaComponent
    }
]