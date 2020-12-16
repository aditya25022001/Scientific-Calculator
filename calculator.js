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
var s1, s2, s3, n, r, side='one', parameter='one';
numbers=['1','2','3','4','5','6','7','8','9','0','e','pi','.','x','G','R','N'];
operators=['-','+','/','*','^','%','(',')','!','sqrt','E','pr-co','ln','log','x'];
operations=['^','*','/','+','-','sin','cos','tan','cot','sec','cosec','asin','acos','atan','acot','asec','acosec','%','!','u-','sqrt','ln','log'];
area=['triangle']
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
    if(ident=='next' && check=='triangle'){
        if(side=='one'){
            s1=num;
            num='';
            document.getElementById('screen-on-1').value="b= ";
            side="two";
        }
        else{
            if(side=="two"){
                s2=num;
                num='';
                document.getElementById('screen-on-1').value="c= ";
            }
            else{
                s3=num;
                num='';
            }
        }
    }
    if(ident=='next' && (check=='combination' || check=='permutation')){
        if(parameter=='one'){
            n=num;
            num='';
            document.getElementById('screen-on-1').value="r= ";
            parameter='two';
        }
        else{
            if(parameter=='two'){
                r=num;
                num='';
            }
        }
    }
    if(ident=='C'){
        document.getElementById('screen-on-2').style.fontSize='34px';
        document.getElementById('screen-on-2').style.textAlign='right';
        document.getElementById('screen-on-1').value='';
        document.getElementById('screen-on-2').value='';
        expression = [];
        solved = [];
        actualP = [];
        check="pr";
        num='';
        convetExp = ['('];
        oper = [];
        side='one';
        parameter='one';
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
                case 'G':
                    num=6.6743*Math.pow(10,-11);
                    console.log(num);
                    break;                
                case 'N':
                    num=6.02214*Math.pow(10,23);
                    break;
                case 'R':
                    num=8.3145;
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
            ident=String.fromCharCode(8730);
        expression.push(ident);
        document.getElementById('screen-on-1').value+=ident;
    }
    if(ident == 'bspace'){
        expression.pop();
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
        if(num!=""){
            console.log({num});
            convetExp.push(num);
            convetExp.push(')');
        }
        switch (check){
            case 'co':
                convetExp.pop();
                primeComposite(convetExp.pop());    
                break;
            case 'equation':
                quadraticEquation(document.getElementById('screen-on-1').value);
                break;
            case 'triangle':
                s3=num;
                areaTriangle(s1,s2,s3);
                num='';
                break;
            case 'fahr':
                tempF(document.getElementById('screen-on-1').value);
                num='';
                break;
            case 'celc':
                tempC(document.getElementById('screen-on-1').value);
                num='';
                break;
            case 'combination':
                r=num;
                combination(n,r);
                num='';
                break;
            case 'permutation':
                r=num;
                permutation(n,r);
                num='';
                break;
            default : 
                getResult();
                console.log({convetExp});
                num='';
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
    return operations.indexOf(a)+1;
}
function priority(item){
    if(trignometry.includes(item) || item=='ln' || item=='log')
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
    if(oper.length==0 || parenthesis==1){
        oper.push(item);
    }
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
        if(item !='(' && item != ')'){
            actualP.push(item);
        }
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
    for(var i=oper.length-1;i>=0;i--){
        if(oper[i]!='(' && oper[i]!=')')
            pushElement(oper.pop(), 1);
        else{
            oper.pop();
        }
    }
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
        case 22:
            a=parseFloat(solved.pop());
            solved.push(Math.log(a));
            break;
        case 23:
            a=parseFloat(solved.pop());
            solved.push(Math.log10(a));
            break;
    }
}
function solve(){
    var rank;
    for(var i=0;i<actualP.length;i++){
        if(operators.includes(actualP[i]) || trignometry.includes(actualP[i])){
            if((actualP[i]=='-' && priority(actualP[i+1])<=4) || (actualP[i]=='-' && solved.length==1) || (actualP[i]=='-' && priority(actualP[i+1])==5))
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
    if(stri.length==2){
        check='equation';
        setStyle();
        document.getElementById('screen-on-2').value="Quadratic equation : ax2+"+"bx+c = 0";
        return;
    }
    var num1="";
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
    var root1, root2;
    var a = parseFloat(qequation[0]), b = parseFloat(qequation[2]), c = parseFloat(qequation[4]);
    if((b**2)-4*a*c<0){
        mod=Math.abs((b**2)-4*a*c)
        coeffIota = Math.sqrt(mod);
        str1 = (-b/(2*a)).toFixed(3)+'', str2='+'+(coeffIota/(2*a)).toFixed(3)+'i';
        root1 = str1+str2;
        str1 = (-b/(2*a)).toFixed(3)+'', str2='-'+(coeffIota/(2*a)).toFixed(3)+'i';
        root2 = str1+str2;
    }
    else{
        root1 = (-b+Math.sqrt((b**2)-4*a*c))/(2*a);
        root2 = (-b-Math.sqrt((b**2)-4*a*c))/(2*a);
    }       
    var str = "Root 1 : "+root1+"   Root 2 : "+root2;
    document.getElementById('screen-on-1').value=str;
    document.getElementById('screen-on-2').value="a="+a+" b="+b+" c="+c;
    check='pr';
    document.getElementById('screen-on-2').style.fontSize='34px';
    document.getElementById('screen-on-2').style.textAlign='right';
    document.getElementById('screen-on-2').value="";
}
function areaTriangle(side1, side2, side3){
    if(check!='triangle'){
        check='triangle';
        setStyle();
        document.getElementById('screen-on-2').value='Ar. '+String.fromCharCode(916);
        document.getElementById('screen-on-1').value='a= ';
        return;
    }
    else{
        var semiP=(parseFloat(side1)+parseFloat(side2)+parseFloat(side3))/2
        if(semiP<=side1 || semiP<=side2 || semiP<=side3){
            document.getElementById('screen-on-1').value="Invalid triangle sides";
            return;
        }
        else{
            var answer=Math.sqrt(semiP*(semiP-side1)*(semiP-side2)*(semiP-side3))
            document.getElementById('screen-on-1').value=answer+" sq. unit";
        }
    }
}
function tempF(num){
    if(check!='fahr'){
        check='fahr';
        setStyle();
        document.getElementById('screen-on-2').value=String.fromCharCode(8457)+String.fromCharCode(8594)+String.fromCharCode(8451);
        return;
    }
    else{
        answer=(5*parseFloat(num)-160)/9;
        document.getElementById('screen-on-1').value=answer+String.fromCharCode(8451);
    }
}
function tempC(num){
    if(check!='celc'){
        check='celc';
        setStyle();
        document.getElementById('screen-on-2').value=String.fromCharCode(8451)+String.fromCharCode(8594)+String.fromCharCode(8457);
        return;
    }
    else{
        answer=(9*parseFloat(num)/5)+32;
        document.getElementById('screen-on-1').value=answer+String.fromCharCode(8457);
    }
}
function combination(num,r){
    if(check!='combination'){
        check='combination';
        setStyle();
        document.getElementById('screen-on-2').value='nCr';
        document.getElementById('screen-on-1').value='n= ';
        return;
    }
    else{
        console.log({num},{r});
        if(parseFloat(r)<=parseFloat(num)){
            var n0=factorial(parseFloat(num));
            var r0=factorial(parseFloat(r));
            var n0r0=factorial(parseFloat(num)-parseFloat(r));
            var result=n0/(r0*n0r0);
            document.getElementById('screen-on-2').value='';
            document.getElementById('screen-on-1').value=result;
            convetExp=["("];
            expression=[];
            expression.push(result.toString())
            convetExp.push(result.toString());
            console.log(convetExp);
            check='pr';
            updateStyle();

        }
        else{
            document.getElementById('screen-on-1').value="Invalid inputs";
        }
    }
}
function permutation(num,r){
    if(check!='permutation'){
        check='permutation';
        setStyle();
        document.getElementById('screen-on-2').value='nPr';
        document.getElementById('screen-on-1').value='n= ';
        return;
    }
    else{
        console.log({num},{r});
        if(parseFloat(r)<=parseFloat(num)){
            var n0=factorial(parseFloat(num));
            var n0r0=factorial(parseFloat(num)-parseFloat(r));
            var result=n0/n0r0;
            document.getElementById('screen-on-2').value='';
            document.getElementById('screen-on-1').value=result;
            convstExp=["("];
            expression=[];
            expression.push(result.toString())
            convetExp.push(result.toString());
            check='pr';
            updateStyle();

        }
        else{
            document.getElementById('screen-on-1').value="Invalid inputs";
        }
    }
}
function setStyle(){
    document.getElementById('screen-on-2').style.textAlign='left';
    document.getElementById('screen-on-2').style.fontSize='20px';
}
function updateStyle(){
    document.getElementById('screen-on-2').style.fontSize='34px';
    document.getElementById('screen-on-2').style.textAlign='right';
}
function getResult(){
    if(check=='combination' || check=='permutation')
        convetExp.push(')');
    convert();
    solve();
    console.log({convetExp},{actualP},{solved});
    var str="";
    console.log({expression});
    for(var i=0;i<expression.length;i++)
        str+=expression[i];
    document.getElementById('screen-on-2').value=str;
    str=solved.pop();
    if (isNaN(str))
        str = "Invalid expression";
    document.getElementById('screen-on-1').value=str;
    expression = [];
    actualP = [];
    convetExp = ['('];
    convetExp.push(str);
    solved = [];
    oper = [];
}
