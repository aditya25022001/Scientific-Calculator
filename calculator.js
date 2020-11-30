expression=[];   //get expression on the screen
convetExp=[];    //convert expression in legal terms
actualP=[];      //convert the expression in postfix form
oper=[];         //store operator while infix to postfix
solved=[];       //store the solved expression
var top=-1, up=-1;
var update;
var num="";
numbers=['1','2','3','4','5','6','7','8','9','0'];
operators=['-','+','/','*','.','^'];
function feedExpression(ident){
    if(ident=='C'){
        document.getElementById('screen-on-1').value='';
        document.getElementById('screen-on-2').value='';
        expression = [];
        solved = [];
        actualP = [];
        convetExp = [];
        oper = [];
        console.log(expression,solved,oper,actualP,convetExp);
    }
    if(numbers.includes(ident) || operators.includes(ident)){
        if(ident!='+' && ident!='-' && ident!='*' && ident!='/' && ident!='^'){
            num+=ident;
        }
        else{
            convetExp.push(num);
            num="";
            convetExp.push(ident);
        }
        expression.push(ident);
        document.getElementById('screen-on-1').value+=ident;
    }
    if(ident == 'bspace'){
        expression.pop();
        update = convetExp.pop();
        if(update!='+' && update!='-' && update!='*' && update!='/' && update!='^'){
            update = update.slice(0,update.length-1);
            convetExp.push(update);
        }
        console.log(convetExp);
        var str="";
        for(var i=0;i<expression.length;i++)
        str+=expression[i]
        document.getElementById('screen-on-1').value=str;
    }
    if(ident == '='){
        convetExp.push(num);
        num='';
        console.log(convetExp);
        getResult();
    }
}
function operation(a){
    if(a=="^")
        return 1;
    if(a=="*")
        return 2;
    if(a=="/")
        return 3;
    if(a=="+")
        return 4;
    if(a=="-")
        return 5;
}
function priority(item){
    if(item == "^")
        return 1;
    if(item == "*" || item == "/")
        return 2;
    if(item == "+" || item == "-")
        return 3;
}
function pushOperator(item, value){
    if(oper.length==0)
        oper.push(item);
    else{
        for(var i=oper.length-1;i>=0;i--){
            if(priority(oper[i])<=value){
                pushElement(oper.pop(), 1);
                if(i==0)
                    oper.push(item);
            }
            else{
                if(priority(oper[i])>=value || oper.length==0){
                    oper.push(item);
                    break;
                }
            }
        }
    }
}
function pushElement(item, mark){
    if(mark == 1)
        actualP.push(item);
    else{
        pushOperator(item, priority(item));
    }
}
function convert(){
    var id;
    for(var i=0;i<convetExp.length;i++){
        id = convetExp[i];
        if(id!='+' && id!='-' && id!='*' && id!='/' && id!='^'){
            pushElement(id, 1);            
        
        }    
        else{
            pushElement(id, 2);
        }
    }
    for(var i=oper.length-1;i>=0;i--)
        pushElement(oper.pop(), 1);
}
function popElementSolved(r){
    a=parseFloat(solved.pop());
    b=parseFloat(solved.pop());
    switch (r){
        case 1:
            solved.push(Math.pow(b,a)); 
            break;
        case 2:
            solved.push(b*a); 
            break;
        case 3:
            solved.push(b/a); 
            break;
        case 4:
            solved.push(a+b); 
            break;
        case 5:
            solved.push(b-a); 
            break;
    }
}
function solve(){
    if(actualP[1]=="-")
        solved.push(0);
    for(var i=0;i<actualP.length;i++){
        if(actualP[i]=="*" || actualP[i]=="^" || actualP[i]=="-" || actualP[i]=="+" || actualP[i]=="/" || actualP[i]=="!"|| actualP[i]=="|"|| actualP[i]=="&"){
            rank=operation(actualP[i]);
            popElementSolved(rank);
        }
        else{
            solved.push(parseFloat(actualP[i]));
        }
    }
}
function getResult(){
    console.log(convetExp);
    convert();
    solve();
    var str="";
    for(var i=0;i<expression.length;i++)
        str+=expression[i];
    document.getElementById('screen-on-2').value=str;
    str=solved.pop();
    console.log(solved);
    document.getElementById('screen-on-1').value=str;
    expression = [];
    actualP = [];
    convetExp = [];
    solved = [];
    oper = [];
}
