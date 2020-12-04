expression=[];   //get expression on the screen
convetExp=['('];    //convert expression in legal terms
actualP=[];      //convert the expression in postfix form
oper=[];         //store operator while infix to postfix
solved=[];       //store the solved expression
trignometry = ['sin','cos','tan','cot','sec','cosec','acosec','asec','acot','atan','acos','asin']
var top=-1, up=-1;
var update;
var num="", check="pr";
numbers=['1','2','3','4','5','6','7','8','9','0','e','pi','.'];
operators=['-','+','/','*','^','%','(',')','!'];
function feedExpression(ident){
    if(ident=='C'){
        document.getElementById('screen-on-1').value='';
        document.getElementById('screen-on-2').value='';
        expression = [];
        solved = [];
        actualP = [];
        check="pr";
        convetExp = ['('];
        oper = [];
    }
    if(numbers.includes(ident) || operators.includes(ident) || trignometry.includes(ident)){
        if(operators.includes(ident)!=true && trignometry.includes(ident)!=true){
            switch(ident){
                case 'e':
                    num=Math.E;
                    break;
                case 'pi':
                    num=Math.PI;
                    ident=Math.PI;
                    break;
                case "%":
                    ident="%";
                default:
                    num+=ident;
                    break;
            }
        }
        else{
            if(num!="")
                convetExp.push(num);
            num="";
            convetExp.push(ident);
        }
        expression.push(ident);
        document.getElementById('screen-on-1').value+=ident;
    }
    if(ident == 'bspace'){
        expression.pop();
        if(convetExp.length>1){
            update = convetExp.pop();   
            if(update!='+' && update!='-' && update!='*' && update!='/' && update!='^' && update.length>1){
                update = update.slice(0,update.length-1);
                convetExp.push(update);
            }
        }

        var str="";
        for(var i=0;i<expression.length;i++)
        str+=expression[i]
        document.getElementById('screen-on-1').value=str;
    }
    if(ident == '='){
        if(num!="")
            convetExp.push(num);
            convetExp.push(')');
        num='';
        switch (check){
            case 'co':
                primeComposite(convetExp.pop());    
                break;
            default : 
                getResult();
                break;
        }
        
    }
    if(ident == "pr-co"){
        check = "co";
        document.getElementById('screen-on-1').value = "Prime or Composite (";
    }
}
function primeComposite(number){
    document.getElementById('screen-on-2').value = "Prime or Composite ("+number+")";
    str = "Prime";
    if(number == 1){
        str = "Composite";
    }
    if(number == 0)
        str = "Neither Prime nor Composite";
    else{
        for(var i=2;i<=number/2;i++){
            if(number%2==0)
                str = "Composite";
                break;
        }
    }
    document.getElementById('screen-on-1').value=str;
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
    if(a=="sin")
        return 6;
    if(a=="cos")
        return 7;
    if(a=="tan")
        return 8;
    if(a=="cot")
        return 9;
    if(a=="sec")
        return 10;
    if(a=="cosec")
        return 11;
    if(a=="asin")
        return 12;
    if(a=="acos")
        return 13;
    if(a=="atan")
        return 14;
    if(a=="acot")
        return 15;
    if(a=="asec")
        return 16;
    if(a=="acosec")
        return 17;
    if(a=="%")
        return 18;
    if(a=='!')
        return 19;
    if(a == 'u-')
        return 20;
}
function priority(item){
    if(trignometry.includes(item))
        return 1;
    if(item == "^")
        return 2;
    if(item == "*" || item == "/" || item == '%')
        return 3;
    if(item == "+" || item == "-")
        return 4;
    if(item == "(" || item == ")")
        return 5;
}
function pushOperator(item, value, parenthesis){
    if(oper.length==0 || parenthesis==1)
        oper.push(item);
    else{
        for(var i=oper.length-1;i>=0;i--){
            if(priority(oper[i])<=value && oper[i]!='(' && oper[i]!=')'){
                pushElement(oper.pop(), 1);
            }
            else{
                if(priority(oper[i])>=value || oper.length==0){
                    oper.push(item);
                    break;
                }
            }
        }
    }
    if(parenthesis==2){
        i = oper.length-1;
        while(oper[i]!='('){
                pushElement(oper.pop(),1);
            i--;
        }
        oper.pop();
    }
}
function pushElement(item, mark){
    if(mark == 1){
        if(item !='(' && item != ')')
            actualP.push(item);
    }
    else{
        if(item == '(')
            pushOperator(item, priority(item), 1);
        if(item == ')')
            pushOperator(item, priority(item), 2);
        else{
            pushOperator(item, priority(item), 0);
        }

    }
}
function convert(){
    var id;
    for(var i=0;i<convetExp.length;i++){
        id = convetExp[i];
        if(operators.includes(id)!=true && trignometry.includes(id)!=true){
            pushElement(id, 1);            
        }    
        else{
            pushElement(id, 2);
        }
    }
    for(var i=oper.length-1;i>=0;i--)
        if(oper[i]!='(' && oper[i]!=')')
            pushElement(oper.pop(), 1);
    console.log(convetExp);
    console.log(actualP);
}
function popElementSolved(r){
    switch (r){
        case 1:
            a=parseFloat(solved.pop());
            b=parseFloat(solved.pop());
            solved.push(Math.pow(b,a)); 
            break;
        case 2:
            a=parseFloat(solved.pop());
            b=parseFloat(solved.pop());
            solved.push(b*a); 
            break;
        case 3:
            a=parseFloat(solved.pop());
            b=parseFloat(solved.pop());
            solved.push(b/a); 
            break;
        case 4:
            a=parseFloat(solved.pop());
            b=parseFloat(solved.pop());
            solved.push(a+b); 
            break;
        case 5:
            a=parseFloat(solved.pop());
            b=parseFloat(solved.pop());
            solved.push(b-a); 
            break;
        case 6:
            a=parseFloat(solved.pop());
            solved.push(Math.sin(a));
            break;
        case 7:
            a=parseFloat(solved.pop());
            solved.push(Math.cos(a));
            break;
        case 8:
            a=parseFloat(solved.pop());
            solved.push(Math.tan(a));
            break;
        case 9:
            a=parseFloat(solved.pop());
            solved.push(1/Math.tan(a));
            break;
        case 10:
            a=parseFloat(solved.pop());
            solved.push(1/Math.cos(a));
            break;
        case 11:
            a=parseFloat(solved.pop());
            solved.push(1/Math.sin(a));
            break;     
        case 12:
            a=parseFloat(solved.pop());
            solved.push(Math.asin(a));
            break;
        case 13:
            a=parseFloat(solved.pop());
            solved.push(Math.acos(a));
            break;
        case 14:
            a=parseFloat(solved.pop());
            solved.push(Math.atan(a));
            break;
        case 15:
            a=parseFloat(solved.pop());
            solved.push(Math.atan(1/a));
            break;
        case 16:
            a=parseFloat(solved.pop());
            solved.push(Math.acos(1/a));
            break;
        case 17:
            a=parseFloat(solved.pop());
            solved.push(Math.asin(1/a));
            break;   
        case 18:
            a=parseFloat(solved.pop());
            b=parseFloat(solved.pop());
            solved.push(b%a);
            break;
        case 20:
            a=parseFloat(solved.pop());
            solved.push(0-a);
            break;
    }
}
function solve(){
    var rank;
    for(var i=0;i<actualP.length;i++){
        if(operators.includes(actualP[i]) || trignometry.includes(actualP[i])){
            if((actualP[i]=='-' && priority(actualP[i+1])<=4) || (actualP[i]=='-' && solved.length==1))
                rank=operation('u-');
            else{
                rank = operation(actualP[i])
            }
            popElementSolved(rank);
        }
        else{
            solved.push(parseFloat(actualP[i]));
        }
    }
}
function getResult(){
    convert();
    solve();
    console.log(actualP);
    console.log(convetExp);
    console.log(solved);
    var str="";
    for(var i=0;i<expression.length;i++)
        str+=expression[i];
    document.getElementById('screen-on-2').value=str;
    str=solved.pop();
    console.log(str);
    if (isNaN(str))
        str = "Invalid expression";
    document.getElementById('screen-on-1').value=str;
    expression = [];
    actualP = [];
    convetExp = [];
    solved = [];
    oper = [];
}
