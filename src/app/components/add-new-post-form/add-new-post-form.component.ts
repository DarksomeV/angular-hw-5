import {Component, OnInit, EventEmitter, Output, ViewChild} from '@angular/core';
import { NgForm} from "@angular/forms";
import { Post } from "../../models/post";
import { PostsService } from "../../services/posts.service";
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-new-post-form',
  templateUrl: './add-new-post-form.component.html',
  styleUrls: ['./add-new-post-form.component.css']
})
export class AddNewPostFormComponent implements OnInit {
  @ViewChild('form') form1: NgForm;
  @Output() addNewPost: EventEmitter<Post> = new EventEmitter();
  @Output() updatePost: EventEmitter<Post> = new EventEmitter();

  formData: Post ={
    title: '',
    body: '',
    userId: 1
  };
  constructor(
    public postService: PostsService,
    public spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.postService.editTaskEvent.subscribe((post: Post) => {
      this.formData = post;
    })
  }

  onSubmit(form) {
    if (form.invalid) return;
    this.spinner.show();

    const formPost: Post = {
      title: this.formData.title,
      body: this.formData.body,
      userId: this.formData.userId
    };

    // Check if its add or update action
    if (this.formData.id) {
      // update post
      formPost.id = this.formData.id;
      this.postService.updatePost(formPost).subscribe((post) => {
        this.updatePost.emit(post);
        this.spinner.hide();
      });
    } else {
      // add new post
      this.postService.addPost(formPost).subscribe((data: Post) => {
        if (data.id) this.addNewPost.emit(data);
        this.spinner.hide();
      });
    }

    form.resetForm();
  }

  onCancel() {
    this.postService.emitEditEvent({title: '', body: '', userId: 1});
  }
}
