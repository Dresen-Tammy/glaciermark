import { SharedModule } from './shared/shared.module';
import { ProjectModule } from './project/project.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { ContactModule } from './contact/contact.module';
import { ServicesPageModule } from './services-page/services-page.module';
import { AboutModule } from './about/about.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InformationComponent } from './home/information/information.component';
import { ColorTilesComponent } from './home/color-tiles/color-tiles.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    InformationComponent,
    ColorTilesComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AboutModule,
    ServicesPageModule,
    PortfolioModule,
    ContactModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ProjectModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
