import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Post} from "../../models/post";
import {PostsService} from "../../services/posts.service";
import { CommentsService } from "../../services/comments.service";
import { Comment } from "../../models/comments";
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {
  @Input('post') postItem: Post;
  @Output() deletePost: EventEmitter<number> = new EventEmitter();
  @Output() editPost: EventEmitter<Post> = new EventEmitter();
  @Output() showComments: EventEmitter<Post> = new EventEmitter();
  @Output() comments: Comment[];
  editPostId:number;


  constructor(
    public postService: PostsService,
    public commentsService: CommentsService,
    public toastr: ToastrService,
    public spinner: NgxSpinnerService
  ) { }


  ngOnInit() {
    this.postService.editTaskEvent.subscribe((post:Post) => {
      if (post.id === this.postItem.id)
        this.editPostId = post.id;
      else
        this.editPostId = 0;
    });
  }

  onEdit(post:Post) {
    const updatePost:Post = {
      title: post.title,
      body: post.body,
      userId: post.userId,
      id: post.id
    };

    this.editPost.emit(updatePost);
  }

  onDelete(id: number) {
    this.deletePost.emit(id);
  }

  onCancel() {
    this.editPost.emit({title: '', body: '', userId: 1});
  }

  getComments(id:number) {
    this.spinner.show();

    this.commentsService.getComments(id).subscribe( comments => {
      this.comments = comments;

      this.postItem.showComments = !this.postItem.showComments;

      this.spinner.hide();
    });
  }
}
