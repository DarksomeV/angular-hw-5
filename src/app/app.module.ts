import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PostsService } from "./services/posts.service";
import { PostsComponent } from './components/posts/posts.component';
import { HttpClientModule } from "@angular/common/http";
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from "@angular/forms";
import { NgxSpinnerModule } from 'ngx-spinner';
import { CommentsService } from "./services/comments.service";
import { PostItemComponent } from './components/post-item/post-item.component';
import { AddNewPostFormComponent } from './components/add-new-post-form/add-new-post-form.component';
import { CommentsComponent } from './components/comments/comments.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PostsComponent,
    PostItemComponent,
    AddNewPostFormComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    NgxSpinnerModule
  ],
  providers: [PostsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
