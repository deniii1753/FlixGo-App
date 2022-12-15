import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MoviesComponent } from './movies/movies.component';
import { SharedModule } from './shared/shared.module';
import { AppInterceptorProvider } from 'src/app.interceptor';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { TrailerContainerComponent } from './movie-details/trailer-container/trailer-container.component';
import { ProfileComponent } from './profile/profile.component';
import { MovieEditComponent } from './movie-edit/movie-edit.component';
import { DeleteModalComponent } from './movie-details/delete-modal/delete-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    MoviesComponent,
    AddMovieComponent,
    MovieDetailsComponent,
    TrailerContainerComponent,
    ProfileComponent,
    MovieEditComponent,
    DeleteModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    ReactiveFormsModule,
    MatIconModule,
    HttpClientModule,
    MatSelectModule,
    BrowserAnimationsModule
  ],
  providers: [
    AppInterceptorProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
