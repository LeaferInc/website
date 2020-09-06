import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, LOCALE_ID, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HeadersInterceptor } from './core/interceptors/headers/headers.interceptor';
import { AuthInterceptor } from './core/interceptors/auth/auth.interceptor';
import { ApiUrlInterceptor } from './core/interceptors/api-url/api-url.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N, fr_FR } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import { UserOutline, LockOutline, BellOutline } from '@ant-design/icons-angular/icons';
import localeFr from '@angular/common/locales/fr';
import localeFrExtra from '@angular/common/locales/extra/fr';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { GlobalErrorHandler } from './core/services/error-handler/global-error.handler';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NotificationItemModule } from './shared/components/notification-item/notification-item.module';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { AboutComponent } from './shared/components/about/about.component';
import { MarkdownModule } from 'ngx-markdown';
import { NzGridModule } from 'ng-zorro-antd/grid';

const icons: IconDefinition[] = [UserOutline, LockOutline, BellOutline];

registerLocaleData(localeFr, 'fr-FR', localeFrExtra);

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    NzLayoutModule,
    NzGridModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzAvatarModule,
    NzIconModule.forRoot(icons),
    NzDropDownModule,
    NotificationItemModule,
    NzBadgeModule,
    MarkdownModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ApiUrlInterceptor, multi: true },
    { provide: NZ_I18N, useValue: fr_FR },
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
