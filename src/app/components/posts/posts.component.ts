import { Component, OnInit, ViewChild } from '@angular/core';
import { PostsService } from "../../services/posts.service";
import { CommentsService } from "../../services/comments.service";
import { Post } from "../../models/post";
import { Comment } from "../../models/comments";
import { NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  @ViewChild('form') form1: NgForm;
  posts: Post[];
  comments: Comment[];
  isAdmin = true;
  post: Post = {
    userId: 0,
    title: '',
    body: ''
  };
  constructor(
    public postService: PostsService,
    public commentService: CommentsService,
    public toastr: ToastrService,
    public spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.postService.getPosts().subscribe((posts: Post[]) => {
      this.posts = posts;
      console.log(posts);
    })
  }

  onSubmit(form ) {
    if (form.invalid) return;
    this.spinner.show();

    const newPost: Post = {
      title: form.value.title,
      body: form.value.text,
      userId:this.posts.length
    };

    this.postService.addPost(newPost).subscribe((post: Post) => {
      this.posts.unshift(post);

      this.toastr.success('Post added, success', 'Message');

      this.spinner.hide();
    }, error => {
      this.toastr.error(error.message, 'Error');
    });

    this.form1.resetForm();
  }

  onDelete(id: number) {
    this.spinner.show();
    this.postService.deletePost(id).subscribe((data: Object) =>{
      this.posts = this.posts.filter(post =>post.id != id);

      this.toastr.success('Post deleted, success', 'Message');
      this.spinner.hide();
    }, error =>{
      this.spinner.hide();
      this.toastr.error(error.message, 'Error');
    } );
  }

  getComments(id: number) {
    this.spinner.show();

    this.commentService.getComments(id).subscribe( (comments: Comment[]) => {
      this.comments = comments;

      this.spinner.hide();
    });
  }
}
