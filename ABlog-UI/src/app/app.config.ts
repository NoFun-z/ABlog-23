import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './interceptors/jwt.interceptor';
import { errorInterceptor } from './interceptors/error.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([jwtInterceptor, errorInterceptor]),
    ),
    provideAnimations(),
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-top-right',
    }),
    importProvidersFrom(
      [
        FormsModule, ReactiveFormsModule,
        BsDropdownModule.forRoot(),
        CollapseModule.forRoot(),
        TypeaheadModule.forRoot(),
        CarouselModule.forRoot(),
        PaginationModule.forRoot()
      ]
    )
  ]
};
