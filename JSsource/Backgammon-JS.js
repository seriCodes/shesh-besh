//להחזיר אכולי- קוביה -

function initialgame() {  
 firstClickPosition=-1;
 secondClickPosition=-1;
 countClicks=0;
 moveCount=0;
 countOfWhiteCheckersEaten =0;
 countOfBlackCheckersEaten =0;
 countOfTakenOutWhiteCheckers =0;
 countOfTakenOutBlackCheckers =0;
 enterEatenCheckerPossible=false;
 oneTimeAlertTakeOutCheckrsInstruction=true;
 playerQuit=false;
 isDoubleDieAccepted = false;
 isDoubleDieKidnapped= false;

 initialBodyElement()
 initialBoardDivDivisions();
 initialBoardAndCheckers();
 resetAndCopyBoard();
 whoStarts();
 throwDiceResultAndDoubleCheck();
 
 //simulationData();
 
 alert("Move checkers on dice at a time");
 copyDice();
 whosTurnVisualised();
 checkersEatenVisualised();
}
function simulationData(){
 SimulationThrowDiceResultAndDoubleCheck();
 turnDecision();
}
function turnDecision(){
     input = prompt("w or b","");
     isWhiteTurn = input=="w"? true:false;
}
function SimulationThrowDiceResultAndDoubleCheck(){
    firstThrowResult = parseInt(prompt("firstThrowResult",""));
    secondThrowResult = parseInt(prompt("secondThrowResult",""));
    isDoubleVar = isDoubleAndChangeVariablesAccordingly();
    copyDice();
}

function throwDiceResultAndDoubleCheck(){
    firstThrowResult = dieThrow();
    secondThrowResult =dieThrow();
    isDoubleVar = isDoubleAndChangeVariablesAccordingly();
    alert("Dice result is ="+ firstThrowResult + " " + secondThrowResult);
}

function initialBodyElement(){
BoardDiv = document.createElement("div");
diceDiv =document.createElement("div");
whosTurnVisualizedHTML = document.createElement("div");
eatenWhiteVisualizedHTML = document.createElement("div");
eatenBlackVisualizedHTML = document.createElement("div");
doubleButtonVisualizedHTML = document.createElement("input");
doubleButtonVisualizedHTML.setAttribute("type", "button");
doubleButtonVisualizedHTML.setAttribute("value", "DOUBLE");
doubleButtonVisualizedHTML.setAttribute("onclick", "doubleTrilema()");


document.body.appendChild(BoardDiv);
document.body.appendChild(diceDiv);
document.body.appendChild(whosTurnVisualizedHTML);
document.body.appendChild(eatenWhiteVisualizedHTML);
document.body.appendChild(eatenBlackVisualizedHTML);
document.body.appendChild(doubleButtonVisualizedHTML);

}

function doubleTrilema(){
    var result = prompt("Enter \"I Accept\" to accept. \n Enter \"I am a QUITTER\" to quit or... \n \"bring it ON\" to kidnap the Double)", "be brave!\n I Accept\nI am a QUITTER \n bring it ON");

    switch(result) {
        case "I Accept":
            isDoubleDieAccepted=true;
        break;
        case "I am a QUITTER":
        playerQuit=true;
    break;
    case "bring it ON":
        isDoubleDieAccepted=true
        isDoubleDieKidnapped=true;
    break;      
    default:
    alert("Incorrect input")    
    doubleTrilema();

}
if(playerQuit){
            document.location.reload();
        }
}
  
function checkersEatenVisualised(){
    eatenWhiteVisualizedHTML.innerHTML= "white checkers have been eaten: "+ countOfWhiteCheckersEaten;
    eatenBlackVisualizedHTML.innerHTML= "black checkers have been eaten: "+countOfBlackCheckersEaten;

}
function whosTurnVisualised(){
    playerTurn = isWhiteTurn? "white turn":"black turn";
    whosTurnVisualizedHTML.innerHTML= playerTurn;


}
function whoStarts(){
    whiteThrowResult = dieThrow();
    blackThrowResult = dieThrow();
    if(whiteThrowResult == blackThrowResult){
        whoStarts();
    }
  if(whiteThrowResult>blackThrowResult){
    
    isWhiteTurn= true;
    
  }else{
    isWhiteTurn= false;
  }
  alert("whiteThrew="+whiteThrowResult + "blackThrew=" + blackThrowResult);

}
function dieThrow(){
    var randomNumber = Math.random()*6 +1;
    dieResult =  Math.floor(randomNumber);
    return dieResult;
}

function copyDice(){
    
    diceDiv.innerHTML ="first:"+ firstThrowResult + " second:"+ secondThrowResult;
}

function drag(ev) {
    alert("drag is happening")
    makeMove(ev);
  }
  function allowDrop(ev){
    ev.preventDefault();
}
function drop(ev) {
    makeMove(ev);
  }

function initialBoardDivDivisions(){
    
    BoardDiv.setAttribute("class", "board");
    var divReference = document.createElement("div");
        divReference.setAttribute("class", "baseStyleDataRow");
        divReference.setAttribute("onclick", "makeMove(event)");
        divReference.setAttribute("ondragover", "allowDrop(event)");
        divReference.setAttribute("ondrop", "drop(event)");
       // divReference.setAttribute("ondragstart", "drag(event)");//ניסיון להקבלה בין הדיב לדמקה בזמן האיונט- לא עובד.

        
    for(var divisionsCount =0; divisionsCount<24; divisionsCount++) {        
        checkersDivision= divReference.cloneNode();
       // checkersDivision.innerHTML=divisionsCount;
        if(divisionsCount>5 && divisionsCount<12){
            checkersDivision.classList.add("secondSection");
        } 
        if(divisionsCount===6 || divisionsCount===18){
            divEaten = divReference.cloneNode();
            divEaten.setAttribute("onclick", "eventClickHandlerEatenDivisions(event)");
            if(divisionsCount===18){
                divEaten.classList.add("secondRow");                    
                divEaten.id = "whiteChecerksEaten";
            }else{
                divEaten.id = "blackChecerksEaten";
            }

            divEaten.classList.add("eatenDiv");
            BoardDiv.appendChild(divEaten);
        
        }

        if(divisionsCount===12){
            
            divclearFloat = document.createElement("div");
            
            divclearFloat.id = "clearFloat";
            BoardDiv.appendChild(divclearFloat);
                }
        if(divisionsCount>11 ){
            checkersDivision.classList.add("secondRow");
            }              
        if(divisionsCount>17){
                checkersDivision.classList.add("secondSectionforSecondRow");
                }  
            
            
            checkersDivision.id= divisionsCount;

            BoardDiv.appendChild(checkersDivision);

}
    }
function initialBoardAndCheckers(){
    var checkers = {
        isWhite: undefined,
        location: undefined,
        checkersAmountCount:undefined,        
    };
    function Checkers(isWhite,checkersAmountCount){
        this.isWhite=isWhite;
       // this.location=location;
        this.checkersAmountCount=checkersAmountCount;

};
/*
backgammonBoard =[
    new Checkers(true,2), new Checkers(false,1),new Checkers(false,1) ,
     new Checkers(false,1),new Checkers(false,1) ,new Checkers(false,5)
      ,new Checkers(undefined,0), new Checkers(false,3),new Checkers(undefined,0)
       , new Checkers(undefined,0), new Checkers(undefined,0), new Checkers(true,5),
       
        new Checkers(false,5), new Checkers(undefined,0),new Checkers(undefined,0) ,
        new Checkers(undefined,0), new Checkers(true,3) ,new Checkers(undefined,0)
         ,new Checkers(true,5), new Checkers(true,2),new Checkers(true,2)
          , new Checkers(true,2), new Checkers(true,2), new Checkers(false,2),
 ];
 */
backgammonBoard = [] ;
for (var i=0; i<24; i++){
    backgammonBoard[i]= new Checkers(undefined,0);
}
initCheckers();
//simulationBoard();
}

function simulationBoard(){
    backgammonBoard[15].isWhite=true;
    backgammonBoard[15].checkersAmountCount=2;
    backgammonBoard[1].isWhite=false;
    backgammonBoard[1].checkersAmountCount=2;
    /*
    backgammonBoard[0].isWhite=false;
    backgammonBoard[0].checkersAmountCount=1;
    backgammonBoard[1].isWhite=true;
    backgammonBoard[1].checkersAmountCount=2;
    backgammonBoard[2].isWhite=true;
    backgammonBoard[2].checkersAmountCount=2;
    backgammonBoard[3].isWhite=true;
    backgammonBoard[3].checkersAmountCount=2;
    backgammonBoard[4].isWhite=true;
    backgammonBoard[4].checkersAmountCount=2;
    backgammonBoard[5].isWhite=false;
    backgammonBoard[5].checkersAmountCount=1;
    backgammonBoard[8].isWhite=true;
    backgammonBoard[8].checkersAmountCount=1;
    
*/
     /*
    backgammonBoard[0].isWhite=true;
    backgammonBoard[0].checkersAmountCount=2;
    backgammonBoard[1].isWhite=true;
    backgammonBoard[1].checkersAmountCount=0;
    backgammonBoard[2].isWhite=true;
    backgammonBoard[2].checkersAmountCount=2;
    backgammonBoard[3].isWhite=true;
    backgammonBoard[3].checkersAmountCount=2;
    backgammonBoard[4].isWhite=true;
    backgammonBoard[4].checkersAmountCount=2;
    backgammonBoard[5].isWhite=false;
    backgammonBoard[5].checkersAmountCount=1;
    backgammonBoard[6].isWhite=true;
    backgammonBoard[6].checkersAmountCount=6;
    backgammonBoard[7].isWhite=false;
    backgammonBoard[7].checkersAmountCount=6;
    backgammonBoard[20].isWhite=undefined;
    backgammonBoard[20].checkersAmountCount=0;
   */
  /*
    backgammonBoard[0].isWhite=true;
    backgammonBoard[0].checkersAmountCount=1;
   // backgammonBoard[1].isWhite=false;
    backgammonBoard[1].checkersAmountCount=0;
    backgammonBoard[2].isWhite=false;
    backgammonBoard[2].checkersAmountCount=2;
    backgammonBoard[3].isWhite=false;
    backgammonBoard[3].checkersAmountCount=2;
    backgammonBoard[4].isWhite=false;
    backgammonBoard[4].checkersAmountCount=2;
    backgammonBoard[5].isWhite=false;
    backgammonBoard[5].checkersAmountCount=3;
    /*backgammonBoard[6].isWhite=false;
    backgammonBoard[6].checkersAmountCount=6;
    backgammonBoard[7].isWhite=false;
    backgammonBoard[7].checkersAmountCount=6;
    
    backgammonBoard[20].isWhite=true;
    backgammonBoard[20].checkersAmountCount=1;
*/
    /*
    
    backgammonBoard[0].isWhite=true;
    backgammonBoard[0].checkersAmountCount=1;
    backgammonBoard[1].isWhite=false;
    backgammonBoard[1].checkersAmountCount=1;
    backgammonBoard[5].isWhite=false;
    backgammonBoard[5].checkersAmountCount=0;
    backgammonBoard[3].isWhite=false;
    backgammonBoard[3].checkersAmountCount=0;
    backgammonBoard[2].isWhite=false;
    backgammonBoard[2].checkersAmountCount=1;
   // backgammonBoard[16].isWhite=true;
   // backgammonBoard[16].checkersAmountCount=3;
    backgammonBoard[22].isWhite=true;
    backgammonBoard[22].checkersAmountCount=1;
    backgammonBoard[18].isWhite=true;
    backgammonBoard[18].checkersAmountCount=1;
    */

}
    
function initCheckers(){
    backgammonBoard[0].isWhite=true;
    backgammonBoard[0].checkersAmountCount=2;
    backgammonBoard[11].isWhite=true;
    backgammonBoard[11].checkersAmountCount=5;
    backgammonBoard[16].isWhite=true;
    backgammonBoard[16].checkersAmountCount=3;
    backgammonBoard[18].isWhite=true;
    backgammonBoard[18].checkersAmountCount=5;

    backgammonBoard[23].isWhite=false;
    backgammonBoard[23].checkersAmountCount=2;
    backgammonBoard[12].isWhite=false;
    backgammonBoard[12].checkersAmountCount=5;
    backgammonBoard[7].isWhite=false;
    backgammonBoard[7].checkersAmountCount=3;
    backgammonBoard[5].isWhite=false;
    backgammonBoard[5].checkersAmountCount=5;
    

}
/*function visualBoardMove(firstClickPosition, secondClickPosition){
    initialPosition =  document.getElementById(firstClickPosition);
    landingPosition = document.getElementById(secondClickPosition);
    var oldChild = initialPosition.removeChild(initialPosition.childNodes[0]);
    landingPosition.appendChild(oldChild);
}
*/
function resetAndCopyBoard(){
        
whiteChecker =document.createElement("img");
whiteChecker.src="./imgSource/circle-white.png";
whiteChecker.width= 60;
whiteChecker.height= 60;
whiteChecker.alt="white checker" ;
//whiteChecker.draggable = "true";
whiteChecker.setAttribute("ondragstart", "drop(event)");

//whiteChecker.ondragstart="drag(event)";




blackChecker =document.createElement("img");
blackChecker.src="./imgSource/circle-black.png";
blackChecker.width= 60;
blackChecker.height= 60;
blackChecker.alt="black checker";
//blackChecker.draggable = "true";
// blackChecker.ondragstart="drag(event)";
blackChecker.setAttribute("ondragstart", "drop(event)");



for(var positionInArray =0; positionInArray<backgammonBoard.length; positionInArray++) {
    divReference =  document.getElementById(positionInArray);
    divReference.innerHTML="";
}
continueAddCheckers= true;

eatenCheckersDivNodeCreation("whiteChecerksEaten", countOfWhiteCheckersEaten, whiteChecker);
continueAddCheckers= true;
eatenCheckersDivNodeCreation("blackChecerksEaten",countOfBlackCheckersEaten,blackChecker );
continueAddCheckers= true;

    for(var positionInArray =0; positionInArray<backgammonBoard.length; positionInArray++) {
        divReference =  document.getElementById(positionInArray);
        continueAddCheckers = true;
        var checkersAmountCountVariable = backgammonBoard[positionInArray].checkersAmountCount;
        if(checkersAmountCountVariable>0){                           
                    for(var i =0; i<checkersAmountCountVariable && continueAddCheckers; i++){
                        if(backgammonBoard[positionInArray].isWhite){
                        divReference.appendChild(whiteChecker.cloneNode());
                    }
                    if(!backgammonBoard[positionInArray].isWhite){
                        divReference.appendChild(blackChecker.cloneNode());
                    }
                        if(i>3){
                            stopAddCheckerImages(backgammonBoard[positionInArray].checkersAmountCount)           
                
            }
            }

        }
            

    }


}
function eatenCheckersDivNodeCreation(idOfEatenCheckers, countOfCheckersEaten,imageCheckerNode){
    divReference =  document.getElementById(idOfEatenCheckers+"");
    divReference.innerHTML="";
    eatenImageNodeCreation(countOfCheckersEaten,imageCheckerNode);   
}
function eatenImageNodeCreation(countOfCheckersEaten,imageCheckerNode){
if(countOfCheckersEaten>0){
    for(var i = 0; i<countOfCheckersEaten && continueAddCheckers; i++){
        divReference.appendChild(imageCheckerNode.cloneNode());
        if(i>3){
            stopAddCheckerImages(countOfCheckersEaten)    
}
    }
        
}
}
function stopAddCheckerImages(checkersAmountTooBigToPresent){
    divReference.innerHTML +="the amount is "+checkersAmountTooBigToPresent;
    continueAddCheckers= false;    
}
function positionPossibleByDiceThrows() {  
    oppositeThrowResultsForCalculationIfBlackTurn();//הופכי אם שחור
    moveDifference = landPosition -initialPosition;
        if( moveDifference=== firstThrowResult || moveDifference=== secondThrowResult|| isACheckForTakingOutCHeckeroutTheBoard()){
        oppositeThrowResultsForCalculationIfBlackTurn();//חזרה לחיובי
        return true;
    }else{
        oppositeThrowResultsForCalculationIfBlackTurn();//חזרה לחיובי
        


        return false;       

    }
}
function isACheckForTakingOutCHeckeroutTheBoard(){
    if(isConditionToTakeOutCheckers()){
        if(isWhiteTurn &&((moveDifference<firstThrowResult)||
        ( moveDifference<secondThrowResult))
        ){
            return true;   
        }
        if(!isWhiteTurn &&((moveDifference>firstThrowResult)||
        ( moveDifference>secondThrowResult))
        ){
            return true;   
        }

        
    }
    return false;

}
function oppositeThrowResultsForCalculationIfBlackTurn(){
             
 if (!isWhiteTurn){
    firstThrowResult = -firstThrowResult;
    secondThrowResult = -secondThrowResult;
} 
}
function isEatenCheckersExistForTheMovingPlayer(){
    
    if(isWhiteTurn && countOfWhiteCheckersEaten){
                return true;
            }else if(!isWhiteTurn && countOfBlackCheckersEaten){
                return true;
            }
            return false;
}
/*function eatenCheckersExistence(){
    isEatenCheckersExist =  isEatenCheckersExistForTheMovingPlayer(isWhiteTurn);
    return isEatenCheckersExist? true: false;
}*/
function isItpossibleToEnterEAtenChecker(){
    
    if(isWhiteTurn){
        possibleEntrypositionFirstThrow= firstThrowResult-1;
        possibleEntrypositionSecondThrow= secondThrowResult-1;
        entryPositionStartingCheck=0; 
    }else{
        possibleEntrypositionFirstThrow= 24- firstThrowResult;
        possibleEntrypositionSecondThrow= 24- secondThrowResult;
        entryPositionStartingCheck=18; 

    }
    entryPositionStartingCheckcopy= entryPositionStartingCheck;
    countsChecksPossibleEntryposition = 0;

    isItASecondCheckInARowToEnterAnotherEatenChecker();

    
    for(;entryPositionStartingCheck<entryPositionStartingCheckcopy+6; entryPositionStartingCheck++){
        if(entryPositionStartingCheck===possibleEntrypositionFirstThrow ||
            entryPositionStartingCheck===possibleEntrypositionSecondThrow){
                
                // פוסל אפשרות יציאה
                if(!isLandingPositionFreeFromRivalMultipleTools(entryPositionStartingCheck)){
                        countsChecksPossibleEntryposition++;
                        if(countsChecksPossibleEntryposition===2 ||
                        (isItASecondCheckInARowToEnterAnotherEatenChecker() && countsChecksPossibleEntryposition===1)){
                            return false;
                        }
                    }
    }
    
}
return true;
}
function isItASecondCheckInARowToEnterAnotherEatenChecker(){
    if(isNaN(firstThrowResult) || isNaN(secondThrowResult)){
        return true;
    }
    return false;
}

function setLandingPosition(requestSourceAndDirective){
    if( requestSourceAndDirective){
        return isWhiteTurn? 25:0;
    }else{
        return secondClickPosition +1;
    } 
}
function setInitialPosition(positionAtArray){
    if(isEatenCheckersExistForTheMovingPlayer() ){
        return isWhiteTurn? 0:25;
    }else{
        return positionAtArray +1;
    } 
}
function isPlayerTurnAndHasEatenCheckers(){
    if((isWhiteTurn&& countOfWhiteCheckersEaten) || 
    (!isWhiteTurn && countOfBlackCheckersEaten)){
        return true;
    }
return false;
}
function isThereACheckerOutsideTheTakeOutColumns(){
    startCheckColumn = isWhiteTurn ? 0: 6;
    endCheckColumn = isWhiteTurn? 18: 23;
    for(var i = startCheckColumn;i<endCheckColumn; i++){
        if(backgammonBoard[i].isWhite === isWhiteTurn){
                return true;
        }
    }
    return false;

}
function isConditionToTakeOutCheckers(){    
    if(isEatenCheckersExistForTheMovingPlayer()|| isThereACheckerOutsideTheTakeOutColumns()){
        doesThePlayerCanTakeOutCheckers= false;
    }else{
        doesThePlayerCanTakeOutCheckers=true;        
    }
    return doesThePlayerCanTakeOutCheckers;
}
function makeMove(event) { 

    if(isConditionToTakeOutCheckers()){
        if( oneTimeAlertTakeOutCheckrsInstruction){
            alert("click twice to on a checker to take it out, or move regularly.")
            oneTimeAlertTakeOutCheckrsInstruction=false;
        }        
    }
    /*if(eatenCheckersExistence()){
        alert("First Enter your Eaten Checker")
        return;
    }*/
    if(countClicks===0){   
                if(event.currentTarget.id){
                    firstClickPosition=parseInt(event.currentTarget.id);
                }else{
                    firstClickPosition=  parseInt(event.currentTarget.parentNode.id);
                }
             

                if (isPlayerTurnAndHasEatenCheckers()||
                 (backgammonBoard[firstClickPosition].isWhite !== isWhiteTurn)){
                    alert("wrong checker or empty place you have eaten checkrs to enteror"+
                     "Must click on eaten checkrs to enter");
                    return;
                }
                countClicks++;             
        return;
    }
    
    if(event.currentTarget.id){
        secondClickPosition=parseInt(event.currentTarget.id);
    }else{
        secondClickPosition=  parseInt(event.currentTarget.parentNode.id);
    }
 
    //secondClickPosition = parseInt(event.currentTarget.id);
    
    
    landPosition = setLandingPosition(isPlayerDecidedToTakeOutAChecker());
    initialPosition = setInitialPosition(firstClickPosition);   
       
    if(isPlayerDecidedToTakeOutAChecker()){
        
        isLandingPositionLegitAccordingToDiceThrows = positionPossibleByDiceThrows();
        if(isLandingPositionLegitAccordingToDiceThrows){
            reduceInitialCheckerPosition(firstClickPosition);
            isWhiteTurn? countOfTakenOutWhiteCheckers++: countOfTakenOutBlackCheckers++;
        }else{
            if(isThereACheckerAboveTheClickedChecker()){
                alert("you need to take out above checkers first");
                countClicks--;
                return;
            }else{
                reduceInitialCheckerPosition(firstClickPosition);

            }
        }
            // מהלך הוצאת דמקה לגיטימי 
            if(!isDoubleVar){
                resetUsedThrow();
            }
            countClicks=0;
            resetAndCopyBoard();
            moveCount++;
           if(isWin()){
               document.location.reload();
           }

        if(moveCount==2|| checkPossibilityToCompleteTheRemainingMoves(isItACheckAfterCompletingOnlyOneThrow)){
        nextPlayerTurn();        
        }
            // צריך לבדוק אם כל הדברים האלה יכולים להיכנס לפו' אחודה של השלמת מהלך לגיטימי-רגיל או הוצאה מחוץ לתחום-
////////////////////////////////////////////////- צריך לןדא שהסדר בו הפו' נקראות במהלך לגימטימי רגיל לא פוגעת בפונ' שבין לבין- תבדוק גם במשחקטוגם בקוד עצמו- תגבה לפני

        return;//לבדוק שכל המשתנים בהמשך הפונ' מייק-מוב כמו שצריך.גם מפה. כמו ריסט למהלך שבוצע וטיפול בדאבל וקליקים-ספירה
    }

        isLandingPositionLegitAccordingToDiceThrows = positionPossibleByDiceThrows();
        isLandingPositionFreeFromOpponentMultipleTools= isLandingPositionFreeFromRivalMultipleTools(secondClickPosition);
        isLandingPositionHasOpponentSingularTool= isLandingPositionHasRivalSingularTool();
                    // מהלך לגיטימי רגיל בכל התנאים
   if(isLandingPositionLegitAccordingToDiceThrows && isLandingPositionFreeFromOpponentMultipleTools){
    
                if(!isDoubleVar){
                    resetUsedThrow();
                }
        
            countClicks=0;
            if(isLandingPositionHasOpponentSingularTool){
            removeCheckerFromArrayAndIncreaseEatenCountVariable();
            }
            
            if(enterEatenCheckerPossible){
                    enterEatenCheckers(secondClickPosition,isWhiteTurn);
            } else /*if(//בולייאני שמראה ששני הקליקים במקום זהה ומותר לאוציא דמקה מהמשחק){
                    // פו' שמוציאה דמקה ממערך משחק 
            }else*/{
                moveCheckersArray(firstClickPosition,secondClickPosition,isWhiteTurn)    
                }
        resetAndCopyBoard();
        //visualBoardMove(firstClickPosition, secondClickPosition);// פונ' ארכיון- לא תהיה בשימוש
        moveCount++;
        checkersEatenVisualised();
                isItACheckAfterCompletingOnlyOneThrow=true;
        if(moveCount==2 || checkPossibilityToCompleteTheRemainingMoves(isItACheckAfterCompletingOnlyOneThrow)){
            isItACheckAfterCompletingOnlyOneThrow=false;
        nextPlayerTurn();        
        }
        
        //isbringInEatenCheckersFeasible();
        // מהלך לא לגיטימי בכל התנאים
   }else{
    countClicks--;            
    alert("illegal landing Position. please choose a new checker to move");
    //return; //לבדוק אם זה מתאים פה.
   }
} 

function isThereACheckerAboveTheClickedChecker(){
    if(isWhiteTurn){
        for(var i = firstClickPosition-1; i>17;i--){
            if(backgammonBoard[i].isWhite=== isWhiteTurn){
                return true;
            }
        }
    return false;
    }else{
        for(var i = firstClickPosition+1; i<6;i++){
            if(backgammonBoard[i].isWhite=== isWhiteTurn){
                return true;
            }
        }
    return false;
    }
    
}
function isPositionPossibleByDiceThrowsFortakingOutCheckers(){
    if(backgammonBoard[firstClickPosition].isWhite!==isWhiteTurn ){// פוסל לחיצה על מקומות ריקים או של השקן היריב.
        alert("click on your own checkers");
        return false;
    }else{

        if(firstClickPosition-landPosition ) {       
        //clickedPositionAdjustedForTakingoutCheckers = 
        //setClickPosition();
        
    }
}
}
/*function setClickPosition(){
    if(isWhiteTurn){
        return firstClickPosition+1;
    }
*/
function isPlayerDecidedToTakeOutAChecker(){
    if(firstClickPosition===secondClickPosition && doesThePlayerCanTakeOutCheckers){
        return true;
    }else{
        return false;
    }

}

function enterEatenCheckers(secondClickPosition,isWhiteTurn){
    enterEatenCheckerPossible= false;
    isWhiteTurn?countOfWhiteCheckersEaten--: countOfBlackCheckersEaten--;
    setlandingPositionArray(secondClickPosition);

}
function eventClickHandlerEatenDivisions(event){
    if(isPlayerTurnAndHasEatenCheckers()){
        countClicks++;
        enterEatenCheckerPossible= true;
    }else{
        alert("not the time to click here");
    }
    

}
function removeCheckerFromArrayAndIncreaseEatenCountVariable(){
    backgammonBoard[secondClickPosition].checkersAmountCount--;
    backgammonBoard[secondClickPosition].isWhite=undefined;
    isWhiteTurn? countOfBlackCheckersEaten++: countOfWhiteCheckersEaten++;

}
function isLandingPositionHasRivalSingularTool(){

if(backgammonBoard[secondClickPosition].checkersAmountCount ===1 && 
    backgammonBoard[secondClickPosition].isWhite !== isWhiteTurn){//אכילה
    return true;
}
return false
}
function isLandingPositionFreeFromRivalMultipleTools(positionCheck){
    if(backgammonBoard[positionCheck].isWhite !== isWhiteTurn){

        if(  backgammonBoard[positionCheck].checkersAmountCount >1 ){// סיבות הסטוריות לפיצול התנאים- לאחד אח"כ
            return false;
        }
    }
    return true;
}
function resetUsedThrow(){
oppositeThrowResultsForCalculationIfBlackTurn();//הופכי אם שחור
    if(moveDifference === firstThrowResult){
        firstThrowResult=NaN;
    }else if(moveDifference=== secondThrowResult){
        secondThrowResult=NaN;       
    }
oppositeThrowResultsForCalculationIfBlackTurn();//איפוס למקורי

} 

function setlandingPositionArray(secondClickPosition){
    backgammonBoard[secondClickPosition].checkersAmountCount++;
    backgammonBoard[secondClickPosition].isWhite= isWhiteTurn;
}
function reduceInitialCheckerPosition(firstClickPosition){
    backgammonBoard[firstClickPosition].checkersAmountCount--;
    if(backgammonBoard[firstClickPosition].checkersAmountCount===0){
        backgammonBoard[firstClickPosition].isWhite = undefined;
    }
}
function moveCheckersArray(firstClickPosition,secondClickPosition, isWhiteTurn ) {  
     
    reduceInitialCheckerPosition(firstClickPosition);
   
    setlandingPositionArray(secondClickPosition);       
}
function isDoubleAndChangeVariablesAccordingly(){
    if(firstThrowResult===secondThrowResult){
        moveCount=-2;
        return true;
    }
    return false;
}
function nextPlayerTurn(){
    moveCount=0;
    if(isDoubleVar){// ייתכן והתנאי עצמו מיותר ואפשר להשאיר רק את ההשמה.
        isDoubleVar=false;
    }
    if(!isWin()){
    throwDiceResultAndDoubleCheck();
   
    isWhiteTurn = !isWhiteTurn; 
     //simulationData();
     copyDice();   
    whosTurnVisualised( );
    //checkersEatenVisualised(); הורדתי מפה כי אני רוצה שיראה אחרי כל מהלך שמשוחק.
    isItACheckAfterCompletingOnlyOneThrow = false;
    checkPossibilityToCompleteTheRemainingMoves(isItACheckAfterCompletingOnlyOneThrow);// לא יבדוק את הפו' השניה אם הראשונה היא טרו
    //בדיקה אם שחקן יכול לזוז או להוציא דמקות לפני תחילת כל תור checkPossibilityToCompleteTheRemainingMoves();    
    
     
    }else{
        document.location.reload();
    }    
}
//
function checkPossibilityToCompleteTheRemainingMoves(isItACheckAfterCompletingOnlyOneThrow){
        if(isItACheckAfterCompletingOnlyOneThrow){
            if(isbringInEatenCheckersFeasible()){
                return true;
            }
            
        }
        isItACheckAfterCompletingOnlyOneThrow = false;
    if(!(isThrowEnableMovement(firstThrowResult) || isThrowEnableMovement(secondThrowResult))){// לא יכול לקרות במצב בו יש דמקה אכולה
        if(isConditionToTakeOutCheckers()){//בודק אם הדמקות יכולות לצאת מהמשחק למרות שהן  לא יכולות לזוז בתוך המשחק
           //בדיקה עבור כל דמקה שנמצאת בבית של השחקן 
           if(isPlayerHaveAPossibilityToTakeOutAChecker()){
              // alert("YES possible to complete the throws- can isPlayerHaveAPossibilityToTakeOutAChecker ");
           }else{
            alert("Not possible to complete the throws bc no isPlayerHaveAPossibilityToTakeOutAChecker");
            nextPlayerTurn()
           }


        }else{
            alert("not possible to complete the throws bc no isConditionToTakeOutCheckers");
            nextPlayerTurn()
        }
    }
}
//
function isPlayerHaveAPossibilityToTakeOutAChecker(){
    LandingPositionCheckForUnableMovingPlayer=true;
    landPosition = setLandingPosition(LandingPositionCheckForUnableMovingPlayer);// צריך משתנה בלוייאני - לאפס לפני ואחרי השליחה משתנה בולייאני
     
     
    checkStartPoint= isWhiteTurn? 18:0;
     checkEndPoint= isWhiteTurn? 24:6;

     for(var i = checkStartPoint; i<checkEndPoint; i++){
        if(backgammonBoard[i].isWhite == isWhiteTurn){
         initialPosition = setInitialPosition(i);   // לא צריך משתנה בלוייאני אבל צריך להשתנות בהתאם למיקום דמקה

         isLandingPositionLegitAccordingToDiceThrows = positionPossibleByDiceThrows();//אין צורך לאפס משתנה כי הוא תמיד מאותחל מחדש לפני שימוש
             
             if(isLandingPositionLegitAccordingToDiceThrows&& !(isThereACheckerAboveTheClickedChecker())){
                 LandingPositionCheckForUnableMovingPlayer=false;   
                 return true;
                  }  
             LandingPositionCheckForUnableMovingPlayer=false;                     
             }            
      
 }
 return false;
     }


/* ...................מקרה קצה של אפשרות להוציא דמקה אבל אין אפשרות לזוז.........שאלה לטל....................................
function getPoitionsOfThePlayerCheckersAtHisBase(){
    checkStartPoint= isWhiteTurn? 18:0;
    checkEndPoint= isWhiteTurn? 24:6;

    for(var i = checkStartPoint; i<checkEndPoint; i++){
       if(backgammonBoard[i].isWhite == isWhiteTurn){
           return i;
       }
    }
    return false;
}*/
function isThrowEnableMovement(throwCheck){
  if( isNaN(throwCheck)){
        return false;
    }
    for(var i= 0; i<backgammonBoard.length; i++){
        if(backgammonBoard[i].isWhite===isWhiteTurn){
            directionAndStepsToMoveCheck= isWhiteTurn? +throwCheck:-throwCheck;
            var postionCheck = i+directionAndStepsToMoveCheck;
            if(postionCheck<=23 && postionCheck >=0 && isLandingPositionFreeFromRivalMultipleTools(postionCheck)){
             return true;
             }            
        }
    }
    return false;

}

function isbringInEatenCheckersFeasible(){
    if(isEatenCheckersExistForTheMovingPlayer()){
        if(!isItpossibleToEnterEAtenChecker()){// טרו אם יאן אפשרות להיכנס עם הדמקות האכולות
            alert("Not possible to enter");
            isItACheckAfterCompletingOnlyOneThrow=false;
            nextPlayerTurn();
        }else{
            alert("You can get inside. plaese make your FIRST click on the eaten cheker")
        }
    }
}
function isWin(){
    amountTakenOutCheckers= isWhiteTurn? countOfTakenOutWhiteCheckers : countOfTakenOutBlackCheckers;
    if(amountTakenOutCheckers===15){
        typeOfWin();
        return true;
    }
    return false; 
}
function typeOfWin(){    
    pointsWin = 1; 
    winningPlayer = isWhiteTurn? "white":"black";
    winType = "regular";//ברירת מחדל היא ניצחון רגיל ולכן אותו לא בודקים
    
    if((isWhiteTurn && countOfTakenOutBlackCheckers==0)||
    (!isWhiteTurn && countOfTakenOutWhiteCheckers==0)){        
        winType = "mars"
        pointsWin = 2; 
        if(isOpponentplayerHasCheckersAtRivalBase()){
            winType = " Turkish mars"
            pointsWin = 3;             
        }
    }

    if(isDoubleDieAccepted)  {
        pointsWin*=2;
        if(isDoubleDieKidnapped)  {          
            pointsWin*=2;
      }
    
        }
        
       alert(winningPlayer+" Wins" + winType+ " win"+pointsWin);
  
        
}

function isOpponentplayerHasCheckersAtRivalBase(){
     checkStartPoint= isWhiteTurn? 18:0;
     checkEndPoint= isWhiteTurn? 24:6;
     opponentPlayerToCheck = !isWhiteTurn;
     for(var i = checkStartPoint; i<checkEndPoint; i++){
        if(backgammonBoard[i].isWhite == opponentPlayerToCheck){
            return true;
        }
     }
     return false;
}

