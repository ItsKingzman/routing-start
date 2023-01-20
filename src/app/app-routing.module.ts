import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./auth-guard.service";
import { ErrorPageComponent } from "./error-page/error-page.component"
import { HomeComponent } from "./home/home.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { CanDeactivateGuard } from "./servers/edit-server/can-deactivate-guard.service";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { ServerResolver } from "./servers/server/server-resolver.service";
import { ServerComponent } from "./servers/server/server.component";
import { ServersComponent } from "./servers/servers.component";
import { UserComponent } from "./users/user/user.component";
import { UsersComponent } from "./users/users.component";

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'users', component: UsersComponent, children: [ //SETTING UP CHILD (Nested) ROUTES
            { path: ':id/:name', component: UserComponent }, //PASSING PARAMETERS TO ROUTES
        ]
    },
    {
        path: 'servers',
        //   canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: ServersComponent, children: [ //SETTING UP CHILD (Nested) ROUTES
            { path: ':id', component: ServerComponent, resolve: {server: ServerResolver} },
            { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] } //PASSING QUERY PARMETERS & FRAGMENTS & Controlling Navigation with canDeactivate
        ]
    },
    // { path: 'not-found', component: PageNotFoundComponent },
    { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} },
    { path: '**', redirectTo: '/not-found' }
    //IF YOU DON'T WANT TO SPECIFY A COMPONENT TO LOAD, USE redirectTo: '/not-found'
    //REDIRECT TO ANOTHER PATH. ** IS THE WILDCARD ROUTE WHICH MEANS CATCH ALL PATHS YOU DON'T KNOW
    //MAKE SURE IT IS THE LAST ROUTE IN THE ARRAY OF ROUTES
];

//APP ROUTING MODULE USED TO OUTSOURCE ROUTES
// @NgModule({
//     imports: [
//         RouterModule.forRoot(appRoutes, {useHash: true})
//     ],
//     exports: [RouterModule]
// })
@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})

//Add in app.module.ts imports
export class AppRoutingModule {

}