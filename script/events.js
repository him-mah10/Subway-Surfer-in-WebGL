var track_mul=0;
var jumpup=0;
var gray=0;
var jumpdown=0;
document.onkeypress = function (e) {
    e = e || window.event;
    if(e.key=='a')
    {
        track_mul-=1;
        if(track_mul<-1)
            track_mul=-1;
    }
    else if(e.key=='d')
    {
        track_mul+=1;
        if(track_mul>1)
            track_mul=1;    
    }
    else if(e.key==' '&&!jumpup&&!jumpdown)
    {
        jumpup=1;
    }
    else if(e.key=='g')
    {
        if(!gray)
        {
            gray=1;
            document.getElementById('body').style.filter="grayscale(100%)";
        }
        else
        {
            gray=0;
            document.getElementById('body').style.filter="grayscale(0%)";
        }
    }
};