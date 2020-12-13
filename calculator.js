expression=[];   //get expression on the screen
convetExp=['('];    //convert expression in legal terms
actualP=[];      //convert the expression in postfix form
oper=[];         //store operator while infix to postfix
solved=[];       //store the solved expression
trignometry = ['sin','cos','tan','cot','sec','cosec','acosec','asec','acot','atan','acos','asin']
qequation=[];
mod='deg';
var top=-1, up=-1;
var update ,count=1;
var num="", check="pr";
numbers=['1','2','3','4','5','6','7','8','9','0','e','pi','.'];
operators=['-','+','/','*','^','%','(',')','!','sqrt','E','pr-co'];
function changeMod(ident){
    if(ident=='rad'){
        mod='rad';
        document.getElementById('angle1').style.color='whitesmoke';
        document.getElementById('angle2').style.color='rgb(121, 115, 115)';
    }
    if(ident=='deg'){
        mod='deg';
        document.getElementById('angle1').style.color='rgb(121, 115, 115)';
        document.getElementById('angle2').style.color='whitesmoke';
    }
}
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
                case 'pr-co':
                    check='co';
                    break;
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
            console.log(convetExp);
            if(ident=='E'){
                convetExp.pop();
                convetExp.push('*');
                convetExp.push('10');
                convetExp.push('^');
            }
        }
        if(ident=='sqrt')
            ident=String.fromCharCode(8730)
        expression.push(ident);
        document.getElementById('screen-on-1').value+=ident;
    }
    if(ident == 'bspace'){
        console.log(expression.pop());
        update = convetExp.pop();   
        if(operators.includes(update) && num.length!=0){
            convetExp.push(update);
            num=num.slice(0,num.length-1);
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
            console.log(convetExp);
        num='';
        switch (check){
            case 'co':
                convetExp.pop();
                primeComposite(convetExp.pop());    
                break;
            case 'equation':
                console.log(document.getElementById('screen-on-1').value);
                quadraticEquation(document.getElementById('screen-on-1').value);
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
function factorial(number){
    var i=1;
    while(number!=0){
        i*=number;
        number-=1;
    }
    return i;
}
function primeComposite(number){
    console.log(number);
    document.getElementById('screen-on-2').value = "Prime or Composite ("+number+")";
    str = "Prime";
    if(number == 1){
        str = "Composite";
    }
    if(number == 0)
        str = "Neither Prime nor Composite";
    else{
        for(var i=2;i<=number/2;i++){
            if(number%i==0){
                str = "Composite";
                break;
            }
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
    if(a == 'sqrt')
        return 21;
}
function priority(item){
    if(trignometry.includes(item))
        return 1;
    if(item == "!" || item == 'sqrt')
        return 2;
    if(item == "^")
        return 3;
    if(item == "*" || item == "/" || item == '%')
        return 4;
    if(item == "+" || item == "-")
        return 5;
    if(item == "(" || item == ")")
        return 6;
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
            if(mod=='rad'){
                solved.push(Math.sin(a));
            }
            else{
                solved.push(Math.sin(a*Math.PI/180))
            }
            break;
        case 7:
            a=parseFloat(solved.pop());
            if(mod=='rad'){
                solved.push(Math.cos(a));
            }
            else{
                solved.push(Math.cos(a*Math.PI/180))
            }
            break;
        case 8:
            a=parseFloat(solved.pop());
            if(mod=='rad'){
                solved.push(Math.tan(a));
            }
            else{
                solved.push(Math.tan(a*Math.PI/180))
            }
            break;
        case 9:
            a=parseFloat(solved.pop());
            if(mod=='rad'){
                solved.push(1/Math.tan(a));
            }
            else{
                solved.push(1/Math.tan(a*Math.PI/180))
            }
            break;
        case 10:
            a=parseFloat(solved.pop());
            if(mod=='rad'){
                solved.push(1/Math.cos(a));
            }
            else{
                solved.push(1/Math.cos(a*Math.PI/180))
            }
            break;
        case 11:
            a=parseFloat(solved.pop());
            if(mod=='rad'){
                solved.push(1/Math.sin(a));
            }
            else{
                solved.push(1/Math.sin(a*Math.PI/180))
            }
            break;     
        case 12:
            a=parseFloat(solved.pop());
            if(mod=='rad')
                solved.push(Math.asin(a));
            else{
                solved.push(180*Math.asin(a)/Math.PI);
            }
            break;
        case 13:
            a=parseFloat(solved.pop());
            if(mod=='rad')
                solved.push(Math.acos(a));
            else{
                solved.push(180*Math.acos(a)/Math.PI);
            }
            break;
        case 14:
            a=parseFloat(solved.pop());
            if(mod=='rad')
                solved.push(Math.atan(a));
            else{
                solved.push(180*Math.atan(a)/Math.PI)
            }
            break;
        case 15:
            a=parseFloat(solved.pop());
            if(mod=='rad')
                solved.push(Math.atan(1/a));
            else{
                solved.push(180*Math.atan(1/a)/Math.PI)
            }
            break;
        case 16:
            a=parseFloat(solved.pop());
            if(mod=='rad')
                solved.push(Math.acos(1/a));
            else{
                solved.push(180*Math.acos(1/a)/Math.PI);
            }
            break;
        case 17:
            a=parseFloat(solved.pop());
            if(mod=='rad')
                solved.push(Math.asin(1/a));
            else{
                solved.push(180*Math.asin(1/a)/Math.PI);
            }
            break;   
        case 18:
            a=parseFloat(solved.pop());
            b=parseFloat(solved.pop());
            solved.push(b%a);
            break;
        case 19:
            a=parseFloat(solved.pop())
            solved.push(factorial(a));
            break;
        case 20:
            a=parseFloat(solved.pop());
            solved.push(0-a);
            break;
        case 21:
            a=parseFloat(solved.pop());
            solved.push(Math.sqrt(a));
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
function quadraticEquation(stri){
    check='equation';
    var num1="";
    console.log(stri);
    if(count==1){
        console.log('Quadratic equation');
        window.alert("Type in the quadratic equation using keyboard!");
        count++;
        return;
    }
    var index=0;
    while(index<stri.length){
        if(numbers.includes(stri.charAt(index)))
            num1+=stri.charAt(index);
        if(stri.charAt(index)=='x' || operators.includes(stri.charAt(index))){
            if(stri.charAt(index)=='-'){
                qequation.push(num1);
                num1='-';    
            }
            else{
                if(num1!="")
                    qequation.push(num1);
                num1="";
            }
        }
        index++;
    }
    if(num1!="")
        qequation.push(num1);
    console.log(qequation);
    var root1, root2;
    var a = parseFloat(qequation[0]), b = parseFloat(qequation[2]), c = parseFloat(qequation[4]);
    if((b**2)-4*a*c<0){
        mod=Math.abs((b**2)-4*a*c)
        coeffIota = Math.sqrt(mod);
        str1 = (-b/(2*a)).toFixed(3)+'', str2='+'+(coeffIota/(2*a)).toFixed(3)+'i';
        root1 = str1+str2;
        str1 = (-b/(2*a)).toFixed(3)+'', str2='-'+(coeffIota/(2*a)).toFixed(3)+'i';
        root2 = str1+str2;
        console.log(root1,root2);
    }
    else{
        root1 = (-b+Math.sqrt((b**2)-4*a*c))/(2*a);
        root2 = (-b-Math.sqrt((b**2)-4*a*c))/(2*a);
        console.log(root1,root2);
    }    
    var str = qequation[0]+'x'+qequation[1].sup()+qequation[2]+'x'+qequation[3].sup()+qequation[5];
    document.getElementById('screen-on-2').value=str;
    str = "Root 1 : "+root1+"   Root 2 : "+root2;
    document.getElementById('screen-on-1').value=str;
    check='pr';
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
