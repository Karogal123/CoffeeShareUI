import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  public userId: any;
  public checkuser: boolean = false;
  public overallScore: number = 0;
  constructor(private route: ActivatedRoute,
  private sharedService: SharedService, public userService: UserService, private router:Router) { }
  
  ngOnInit(): void {
    this.route.params
    .subscribe((params: Params) => {
      const id = params['id'];
      this.sharedService.getRecipeById(id).subscribe(recipe =>{
        this.recipe = recipe
        this.recipe.user.email.substring(0, this.recipe.user.email.lastIndexOf('@'));  
        this.recipe.recipeBody = recipe.recipeBody.split('&').filter((e: any) => e)
        this.sharedService.getUserId().subscribe(res => {
          this.userId = res;
          if(this.userId == this.recipe.userId){
            this.checkuser = true
          }
          else{
            this.checkuser = false;
          }
        })
      })
    });
    this.getRating();
    this.refreshCommentList();
    this.userService.authChanged
    .subscribe(res => {
      this.isUserAuthenticated = res;
    })
  this.checkUserId()

}
  addComment(){
    var val = {
      commentBody:this.commentBody,
      recipeId:this.recipe.id
    };
    this.sharedService.createComment(val).subscribe(res=>{
      console.log(res);
      this.refreshCommentList();
    });
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
    this.sharedService.getRecipeById(id).subscribe(recipe => {{
      this.recipe = recipe
    }});
  }
  sumRatingValues(){
    this.overallScore = this.userScores.reduce((total: any, next: { score: any; }) => total + next.score, 0) / this.userScores.length;
    return this.overallScore;
  }
  onRateChange(rating : number){
    if(this.isUserAuthenticated == false){
      this.router.navigate(["/authentication/login"])
      return;
    }
    var val = {
      recipeId : this.recipe.id,
      score : rating
    };
    this.sharedService.createRecipeScore(val).subscribe(result => {
      console.log(result);
      this.getRating();
    })
  }


  deleteRecipe(){
    this.route.params
    .subscribe((params: Params) => {
      const id : number = params['id'];
      this.sharedService.deleteRecipe(id).subscribe(()=>{
        alert("Successfully deleted");
        this.router.navigate(["/recipes"])
      })
  });
  }
  
  checkUserId(){
    this.sharedService.getUserId().subscribe(res =>{
      this.userId = res;
      if(this.userId == this.recipe.userId){
        this.checkuser=true;
      }
      else{
        this.checkuser=false;
      }
    })
  }

}
