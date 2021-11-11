class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
  
    question.hide();

    background("Yellow");
    
    textSize(30); 
    text("Result of the Quiz",340, 50);

    Contestant.getPlayerInfo();
    if (allContestants !== undefined){
      var displayAnswers=250;
      background("yellow");
      fill("blue");
      textSize(20);
      text("*NOTE: Contestent who answered correct are hilighted in green colour!",130,230);

      for (var plr in allContestants){
        var correctAns = "2";
        if (correctAns === allContestants[plr].answer)
        fill("green")
        else
        fill("red");
        displayAnswers+=30;
        textSize(20);
      text(allContestants[plr].name+" => "+allContestants[plr].answer,200,displayAnswers);
      } 
    }
  }
}