import { Component, OnInit, ViewChild, Output  } from '@angular/core';
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
  posts: Post[];
  @Output() comments: Comment[];

  constructor(
    public postService: PostsService,
    public commentService: CommentsService,
    public toastr: ToastrService,
    public spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.postService.getPosts().subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  addNewPost(post: Post) {
    this.posts.unshift(post);
    this.toastr.success('Post added success', 'Message');
  }

  onEdit(post:Post) {
    this.postService.emitEditEvent(post);
  }

  updatePost(post:Post) {
    this.posts.forEach((arrEl, i) => {
      if (arrEl.id === post.id) {
        this.posts.splice(i, 1, post);
        this.toastr.success('Post edited!', 'Message')
      }
    });
    this.postService.emitEditEvent({title: '', body: '', userId: 1});
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
