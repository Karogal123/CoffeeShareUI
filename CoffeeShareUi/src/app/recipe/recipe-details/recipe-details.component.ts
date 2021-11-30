import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  @Input() recipe : any;
  public comments: any = [];
  public isUserAuthenticated: boolean = false;
  public commentBody:any;
  public userScores: any = [];
  public overallScore: number = 0;
  constructor(private route: ActivatedRoute,
  private sharedService: SharedService, private userService: UserService) { }
  
  ngOnInit(): void {
    this.route.params
    .subscribe((params: Params) => {
      const id = params['id'];
      this.sharedService.getRecipeById(id).subscribe(recipe =>{
        this.recipe = recipe
        this.recipe.user.email.substring(0, this.recipe.user.email.lastIndexOf('@'));
      })
    });
    this.getRating();
    this.refreshCommentList();
    this.userService.authChanged
    .subscribe(res => {
      this.isUserAuthenticated = res;
    console.log("This is ngOnInit", this.userScores)
    })

}
  addComment(){
    var val = {
      commentBody:this.commentBody,
      recipeId:this.recipe.id
    };
    this.sharedService.createComment(val).subscribe(res=>{
      console.log(res);
    });
    this.refreshCommentList();
  }  

  refreshCommentList(){
    this.route.params
    .subscribe((params: Params) => {
      const id = params['id'];
      this.sharedService.getCommentsForRecipe(id).subscribe(comments =>{
        this.comments = comments
      })
  });
  }

  getRating(){
    this.route.params
    .subscribe((params: Params) => {
      const id = params['id'];
      this.sharedService.getRecipesScoresForRecipe(id).subscribe(scores =>{
        this.userScores = scores;
        this.overallScore = this.sumRatingValues()
      })
  });
  }

  getRecipe() : void{
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.sharedService.getRecipeById(id).subscribe(recipe => this.recipe = recipe);
  }
  sumRatingValues(){
    console.log("this is sumratingValues", this.userScores)
    this.overallScore = this.userScores.reduce((total: any, next: { score: any; }) => total + next.score, 0) / this.userScores.length;
    console.log(this.overallScore)
    return this.overallScore;

  }
}
