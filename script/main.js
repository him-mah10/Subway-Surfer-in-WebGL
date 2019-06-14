var no_coins_l=parseInt(Math.random()*50)+100;
var no_coins_r=parseInt(Math.random()*50)+100;
var no_coins_m=parseInt(Math.random()*50)+100;
var no_jhadi=parseInt(Math.random()*50)+50;
var no_sb=parseInt(Math.random()*50)+50;
var no_walls=parseInt(Math.random()*50)+10;
var no_fb=parseInt(Math.random()*5)+5;
var no_jb=parseInt(Math.random()*5)+5;
var no_bus=parseInt(Math.random()*5)+5;
var coinsl=[];
var coinsr=[];
var coinsm=[];
var jhadi=[];
var walls=[];
var sb=[];
var fb=[];
var bb=[];
var bbb=[]
var jb=[];
var player_speed=0.4;
var enemy_speed=0.15;
var number_of_coins=0;
var collision=1;
var end_of_game=0;
var bright_count=0;
var flying_count=0;
var flying=0;
var jumping_height=2.5;
var jumping=0;
var jumping_count=0;
var on_bus=0;
var won=0;
var background_music;
var track_texture;
var sidewall_texture;
var wall_texture;
var speedbreaker_texture;
var end_texture;
var flyingboost_texture;
var jumpingboots_texture;
var busback_texture;
var busbody_texture;
var which_bus;

function start_game()
{
 document.getElementById('glcanvas').style.visibility='visible';
 main();
}

main();
function main() {
  if(document.getElementById('glcanvas').style.visibility != "hidden")
  {
    document.getElementById('score').style.visibility="visible";
    document.getElementById('starting').style.visibility="hidden";
    document.getElementById('starting_inside').innerHTML="";
    const canvas = document.querySelector('#glcanvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    trackl = new track(gl ,[ -5,0 , 0.8 , 0 ]);
    trackm = new track(gl ,[ 0,0 , 0.8 , 0 ]);
    trackr = new track(gl ,[ 5,0 , 0.8 , 0 ]);
    head = new cube(gl, [0.0, 0.0, -2.0],"head");
    body = new cube(gl, [0.0, -0.8, -2.0],"body");
    floor = new Floor(gl, [0.0, -0.8, -2.0]);
    endm = new end(gl, [0.0, 0.0, -950.0]);
    endr = new end(gl, [5.0, 0.0, -950.0]);
    endl = new end(gl, [-5.0, 0.0, -950.0]);
    sw = new sidewalls(gl, [0.0, 0.0, -2.0]);
    ene = new enemy(gl,[0,0,0,0,0.0])
    track_texture = loadTexture(gl, "./images/track_texture.jpg");
    speedbreaker_texture = loadTexture(gl, "./images/speedbreaker_texture.jpg");
    wall_texture = loadTexture(gl, "./images/wall_texture.jpg");
    sidewall_texture = loadTexture(gl, "./images/sidewall_texture.jpg");
    flyingboost_texture = loadTexture(gl, "./images/flyingboost_texture.jpg");
    jumpingboots_texture = loadTexture(gl, "./images/jumpingboots_texture.jpg");
    busback_texture = loadTexture(gl, "./images/busback_texture.jpg");
    end_texture = loadTexture(gl, "./images/end_texture.jpg");
    busbody_texture = loadTexture(gl, "./images/busbody_texture.png");
    //console.log(wall_texture);
    coinsl.push(new coins(gl,[-5.0,-0.5, 2]));
    for(var i=1;i<no_coins_l;i++)
    {
      coinsl.push(new coins(gl,[-5.0,-0.5, coinsl[i-1].pos[2]-Math.random()*18 ]));
    }
    coinsm.push(new coins(gl,[-5.0,-0.5, 2]));
    for(var i=1;i<no_coins_m;i++)
    {
      coinsm.push(new coins(gl,[0.0,-0.5,coinsm[i-1].pos[2]-Math.random()*20 ]));
    }
    coinsr.push(new coins(gl,[-5.0,-0.5, 2]));
    for(var i=1;i<no_coins_r;i++)
    {
      coinsr.push(new coins(gl,[5.0,-0.5,coinsr[i-1].pos[2]-Math.random()*25 ]));
    }

    jhadi.push(new jhadiya(gl,[-5.0,-0.5, 2]));
    for(var i=1;i<no_jhadi;i++)
    {
      if(i%3==1)
        a=-5.0;
      else if(i%3==0)
        a=0.0;
      else
        a=5.0;
      jhadi.push(new jhadiya(gl,[a,-1.5,jhadi[i-1].pos[2]-(Math.random()*50+20)]));
    }

    sb.push(new speedbreaker(gl,[-5.0,-0.5, 2]));
    for(var i=1;i<no_sb;i++)
    {
      if(i%3==2)
        a=-5.0;
      else if(i%3==1)
        a=0.0;
      else
        a=5.0;
      sb.push(new speedbreaker(gl,[a,-1.5,sb[i-1].pos[2]-(Math.random()*40+20)]));
    }

    walls.push(new speedbreaker(gl,[-5.0,-0.5, 2]));
    for(var i=1;i<no_walls;i++)
    {
      if(i%3==1)
        a=-5.0;
      else if(i%3==2)
        a=0.0;
      else
        a=5.0;
      walls.push(new wall(gl,[a,-1.5,walls[i-1].pos[2]-(Math.random()*100+150)]));
    }

    fb.push(new flying_boost(gl,[-5.0,-0.5, -20]));
    for(var i=1;i<no_fb;i++)
    {
      if(i%3==0)
        a=-5.0;
      else if(i%3==1)
        a=0.0;
      else
        a=5.0;
      fb.push(new flying_boost(gl,[a,-1.5,fb[i-1].pos[2]-(Math.random()*200+150)]));
    }

    bb.push(new bus_back(gl,[-5.0,-1.5, -2]));
    for(var i=1;i<no_bus;i++)
    {
      if(i%2==0)
        a=-5.0;
      else
        a=5.0;
      bb.push(new bus_back(gl,[a,-1.5,bb[i-1].pos[2]-(Math.random()*200+150)]));
    }
    bbb.push(new bus_body(gl,[-5.0,-1.5, -2-0.01]));
    for(var i=1;i<no_bus;i++)
    {
      if(i%2==0)
        a=-5.0;
      else
        a=5.0;
      bbb.push(new bus_body(gl,[a,-1.5, bb[i].pos[2]-0.01 ]));
    }

    jb.push(new flying_boost(gl,[5.0,-0.5, -2]));
    for(var i=1;i<no_jb;i++)
    {
      if(i%3==2)
        a=-5.0;
      else if(i%3==0)
        a=0.0;
      else
        a=5.0;
      jb.push(new flying_boost(gl,[a,-0.5,jb[i-1].pos[2]-(Math.random()*200+150)]));
    }
    // If we don't have a GL context, give up now

    if (!gl) {
      alert('Unable to initialize WebGL. Your browser or machine may not support it.');
      return;
    }

    // Vertex shader program

    const vsSource = `
      attribute vec4 aVertexPosition;
      attribute vec4 aVertexColor;

      uniform mat4 uModelViewMatrix;
      uniform mat4 uProjectionMatrix;

      varying lowp vec4 vColor;

      void main(void) {
        gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
        vColor = aVertexColor;
      }
    `;

    // Fragment shader program

    const fsSource = `
      varying lowp vec4 vColor;

      void main(void) {
        gl_FragColor = vColor;
      }
    `;

    const vsSourceTexture = `
      attribute vec4 aVertexPosition;
      attribute vec2 aTextureCoord;
      uniform mat4 uModelViewMatrix;
      uniform mat4 uProjectionMatrix;
      varying highp vec2 vTextureCoord;
      void main(void) {
        gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
        vTextureCoord = aTextureCoord;
      }
    `;

    // Fragment shader program

    const fsSourceTexture = `
      varying highp vec2 vTextureCoord;
      uniform sampler2D uSampler;
      void main(void) {
        gl_FragColor = texture2D(uSampler, vTextureCoord);
      }
    `;
    // Initialize a shader program; this is where all the lighting
    // for the vertices and so forth is established.
    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
    const shaderProgramTexture = initShaderProgram(gl, vsSourceTexture, fsSourceTexture);


    // Collect all the info needed to use the shader program.
    // Look up which attributes our shader program is using
    // for aVertexPosition, aVevrtexColor and also
    // look up uniform locations.
    const programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
        vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
      },
      uniformLocations: {
        projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
        modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
      },
    };

    const programInfoTexture = {
      program: shaderProgramTexture,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgramTexture, 'aVertexPosition'),
        textureCoord: gl.getAttribLocation(shaderProgramTexture, 'aTextureCoord'),
      },
      uniformLocations: {
        projectionMatrix: gl.getUniformLocation(shaderProgramTexture, 'uProjectionMatrix'),
        modelViewMatrix: gl.getUniformLocation(shaderProgramTexture, 'uModelViewMatrix'),
        uSampler: gl.getUniformLocation(shaderProgramTexture, 'uSampler'),
      },
  };

    // Here's where we call the routine that builds all the
    // objects we'll be drawing.
    //const buffers

    var then = 0;
    trackl.pos[1]=head.pos[1]-2.0;
    floor.pos[1]=head.pos[1]-2.5;
    endr.pos[1]=head.pos[1]-1.45;
    endm.pos[1]=head.pos[1]-1.45;
    endl.pos[1]=head.pos[1]-1.45;
    trackr.pos[1]=head.pos[1]-2.0;
    trackm.pos[1]=head.pos[1]-2.0;
    // Draw the scene repeatedly
    function render(now) {
      now *= 0.001;  // convert to seconds
      bright_count+=1;
      const deltaTime = now - then;
      then = now;
      drawScene(gl, programInfo,programInfoTexture, deltaTime);
      tick();
      if(!end_of_game && !won)
      {
        requestAnimationFrame(render);
      }
      else
      {
        document.getElementById('starting').style.visibility="visible";
        document.getElementById('glcanvas').style.visibility = "hidden";
        document.getElementById('score').innerHTML="";
        document.getElementById('score_table').setAttribute("border", "0");
        if(won)
        {
          a="<h1 style='color:red;'>Congratulations on winning</h1><br><center>Number of coins collected: "+number_of_coins+"</ceter>";
        }
        else
        {
          a="<h1 style='color:red;'>Game Over</h1><br><center>Number of coins collected: "+number_of_coins+"</ceter>";
        }
        document.getElementById('starting_inside').innerHTML=a;

      }
    }
    requestAnimationFrame(render);
  }
}

//
// Draw the scene.
//
function tick()
{
    document.getElementById("score").innerHTML="<b>Number of coins: </b>"+number_of_coins;
    head.pos[2]-=player_speed;
    ene.pos[2]-=enemy_speed;
    head.pos[0]=5*track_mul;
    body.pos[2]=head.pos[2];
    body.pos[1]=head.pos[1]-0.8;
    body.pos[0]=head.pos[0];
    ene.pos[0]=head.pos[0];
    ene.pos[1]=head.pos[1];
    if(jumpup)
    {
      head.pos[1]+=0.2;
      if(head.pos[1]>jumping_height)
      {
        jumpup=0;
        jumpdown=1;
      }
    }
    if(jumpdown)
    {
      head.pos[1]-=0.2;
      if(head.pos[1]<0)
      {
        head.pos[1]=0
        jumpdown=0;
      } 
    }
    if(on_bus)
    {
      jumpup=0;
      jumpdown=0;
      jumping=0;
      head.pos[1]=2.4;
      if(Math.abs(head.pos[2]-bbb[which_bus].pos[2])>2.5)
      {
        on_bus=0;
        jumpdown=1;
      }
    }
    if(head.pos[2]<-952)
      won=1;
    if(track_mul==-1.0)
    {
      for(var i=0;i<coinsl.length;i++)
      {
        if(Math.abs(body.pos[2] - coinsl[i].pos[2]) < 0.1 && (head.pos[1]==0.0||flying))
        {
          coinsl.splice(i,1);
          number_of_coins+=1;
          no_coins_l-=1;
          break;
        }
      }
    }
    else if(track_mul==0.0)
    {
      for(var i=0;i<coinsm.length;i++)
      {
        if((body.pos[2] - coinsm[i].pos[2]) < 0.1 && (head.pos[1]==0.0||flying))
        {
          coinsm.splice(i,1);
          number_of_coins+=1;
          no_coins_m-=1;
          break;
        }
      }
    }
    else
    {
      for(var i=0;i<coinsr.length;i++)
      {
        if((body.pos[2] - coinsr[i].pos[2]) < 0.1 && (head.pos[1]==0.0||flying))
        {
          coinsr.splice(i,1);
          number_of_coins+=1;
          no_coins_r-=1;
          break;
        }
      }
    }

    for(var i=0;i<no_jhadi;i++)
    {
        if( Math.abs(head.pos[2] - jhadi[i].pos[2]) < 0.3 && head.pos[1]==0.0 && head.pos[0]==jhadi[i].pos[0] )
        {
          jhadi.splice(i,1);
          no_jhadi-=1;
          ene.pos[2]=head.pos[2]+3;
          if(collision==1)
          {
            end_of_game=1;
          }
          collision=1;
          break;
        }
    }

    for(var i=0;i<no_sb;i++)
    {
        if( Math.abs(head.pos[2] - sb[i].pos[2]) < 0.3 && head.pos[1]==0.0 && head.pos[0]==sb[i].pos[0] )
        {
          sb.splice(i,1);
          no_sb-=1;
          ene.pos[2]=head.pos[2]+3;
          if(collision==1)
          {
            end_of_game=1;
          }
          collision=1;
          break;
        }
    }

    for(var i=0;i<no_walls;i++)
    {
        if( Math.abs(head.pos[2] - walls[i].pos[2]) < 0.3 && head.pos[0]==walls[i].pos[0] )
        {
          end_of_game=1;
          break;
        }
    }

    for(var i=0;i<no_bus;i++)
    {
        if( Math.abs(head.pos[2] - bbb[i].pos[2]+2.5) < 2.0 && head.pos[0]==bbb[i].pos[0] && !flying && !on_bus)
        {
          if(head.pos[1]>=1.2 && !flying)
          {
            which_bus=i;
            on_bus=1;
          }
          else
          {
            end_of_game=1;
          }
          console.log(body.pos[1]);
          break;
        }
    }

    for(var i=0;i<no_fb;i++)
    {
        if( Math.abs(head.pos[2] - fb[i].pos[2]) < 0.3 && head.pos[0]==fb[i].pos[0] )
        {
          fb.splice(i,1);
          no_fb-=1;
          flying=1;
          break;
        }
    }
    for(var i=0;i<no_jb;i++)
    {
        if( Math.abs(head.pos[2] - jb[i].pos[2]) < 0.3 && head.pos[0]==jb[i].pos[0] && head.pos[1]==0.0)
        {
          jb.splice(i,1);
          no_jb-=1;
          jumping=1;
          break;
        }
    }

    if(collision)
    {
      player_speed=0.2;
      if(Math.abs(head.pos[2] - ene.pos[2]) >8.0)
      {
        collision=0;
      } 
    }
    if(!collision)
    {
      player_speed=0.4;
    }
    if(flying)
    {
      if(flying_count>500)
      {
        head.pos[1]-=0.2;
        if(head.pos[1]<0.0)
        {
          head.pos[1]=0.0;
          flying_count=0;
          flying=0;
        }
      }
      else
      {
        ene.pos[1]=0.0;
        head.pos[1]=2.0;
        body.pos[1]=head.pos[1];
        jumpdown=0;
        jumpup=0;
        flying_count+=1;
        if(flying_count%2==0)
        {
          body.faceColors = [
              [ 1.0, 0.0,0.0 , 1.0],
              [ 1.0, 0.0,0.0 , 1.0],
              [ 1.0, 0.0,0.0 , 1.0],
              [ 1.0, 0.0,0.0 , 1.0],
              [ 1.0, 0.0,0.0 , 1.0],
              [ 1.0, 0.0,0.0 , 1.0],
            ];
        }
        else
        {
          body.faceColors = [

                [1.0,1.0,0.0,1.0],
                [1.0,1.0,0.0,1.0],
                [1.0,1.0,0.0,1.0],
                [1.0,1.0,0.0,1.0],
                [1.0,1.0,0.0,1.0],
                [1.0,1.0,0.0,1.0],
            ];
        }
      }
    }
    if(jumping)
    {
      if(jumping_count>500)
      {
        jumping_height=2.5;
        jumping_count=0;
        jumping=0;
      }
      else
      {
        jumping_height=4.0;
        jumping_count+=1;
        if(jumping_count%2==0)
        {
          body.faceColors = [
              [ 0.6, 0.0,0.9 , 1.0],
              [ 0.6, 0.0,0.9 , 1.0],
              [ 0.6, 0.0,0.9 , 1.0],
              [ 0.6, 0.0,0.9 , 1.0],
              [ 0.6, 0.0,0.9 , 1.0],
              [ 0.6, 0.0,0.9 , 1.0],
            ];
        }
        else
        {
          body.faceColors = [

                [1.0,1.0,0.0,1.0],
                [1.0,1.0,0.0,1.0],
                [1.0,1.0,0.0,1.0],
                [1.0,1.0,0.0,1.0],
                [1.0,1.0,0.0,1.0],
                [1.0,1.0,0.0,1.0],
            ];
        }
      }
    }

    if( Math.floor(bright_count/200)%2 ==0 )
      document.getElementById('glcanvas').style.filter="brightness(100%)";
    else
      document.getElementById('glcanvas').style.filter="brightness(130%)";
    //To check for coins
    
}

function drawScene(gl, programInfo,programInfoTexture, deltaTime) {
  gl.clearColor(149/255,191/255, 255/255, 1.0);  // Clear to black, fully opaque
  gl.clearDepth(1.0);                 // Clear everything
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

  // Clear the canvas before we start drawing on it.

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Create a perspective matrix, a special matrix that is
  // used to simulate the distortion of perspective in a camera.
  // Our field of view is 45 degrees, with a width/height
  // ratio that matches the display size of the canvas
  // and we only want to see objects between 0.1 units
  // and 100 units away from the camera.

  const fieldOfView = 45 * Math.PI / 180;   // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  mat4.perspective(projectionMatrix,
                   fieldOfView,
                   aspect,
                   zNear,
                   zFar);

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
    var cameraMatrix = mat4.create();
    mat4.translate(cameraMatrix, cameraMatrix, [0, 2+head.pos[1], 10+head.pos[2]]);
    var cameraPosition = [
      cameraMatrix[12],
      cameraMatrix[13],
      cameraMatrix[14],
    ];

    var up = [0, 1, 0];
    lookx=0;
    looky=head.pos[1];
    lookz=head.pos[2];
    mat4.lookAt(cameraMatrix, cameraPosition, [lookx,looky,lookz], up);

    var viewMatrix = cameraMatrix;//mat4.create();

    //mat4.invert(viewMatrix, cameraMatrix);

    var viewProjectionMatrix = mat4.create();

  mat4.multiply(viewProjectionMatrix, projectionMatrix, viewMatrix);
  for(var i=0;i<no_coins_l;i++)
  {
    if(coinsl[i].pos[2]<-952)
      continue;
    coinsl[i].draw(gl, viewProjectionMatrix, programInfo, deltaTime);
  }
  for(var i=0;i<no_coins_m;i++)
  {
    if(coinsm[i].pos[2]<-952)
      continue;
    coinsm[i].draw(gl, viewProjectionMatrix, programInfo, deltaTime);
  }
  for(var i=0;i<no_coins_r;i++)
  {
    if(coinsr[i].pos[2]<-952)
      continue;
    coinsr[i].draw(gl, viewProjectionMatrix, programInfo, deltaTime);
  }
  for(var i=0;i<no_jhadi;i++)
  {
    if(jhadi[i].pos[2]<-952)
      continue;
    jhadi[i].draw(gl, viewProjectionMatrix, programInfo, deltaTime);
  }
  for(var i=0;i<no_walls;i++)
  {
    if(walls[i].pos[2]<-952)
      continue;
    walls[i].draw(gl, viewProjectionMatrix, programInfoTexture, deltaTime,wall_texture);
  }
  for(var i=0;i<no_sb;i++)
  {
    if(sb[i].pos[2]<-952)
      continue;
    sb[i].draw(gl, viewProjectionMatrix, programInfoTexture, deltaTime,speedbreaker_texture);
  }
  for(var i=0;i<no_fb;i++)
  {
    if(fb[i].pos[2]<-952)
      continue;
    fb[i].draw(gl, viewProjectionMatrix, programInfoTexture, deltaTime,flyingboost_texture);
  }
  for(var i=0;i<no_bus;i++)
  {
    if(bb[i].pos[2]<-952)
      continue;
    bb[i].draw(gl, viewProjectionMatrix, programInfoTexture, deltaTime,busback_texture);
  }
  for(var i=0;i<no_bus;i++)
  {
    if(bbb[i].pos[2]<-952)
      continue;
    bbb[i].draw(gl, viewProjectionMatrix, programInfoTexture, deltaTime,busbody_texture);
  }
  for(var i=0;i<no_jb;i++)
  {
    if(jb[i].pos[2]<-952)
      continue;
    jb[i].draw(gl, viewProjectionMatrix, programInfoTexture, deltaTime,jumpingboots_texture);
  }

  head.drawCube(gl, viewProjectionMatrix, programInfo, deltaTime);
  ene.draw(gl, viewProjectionMatrix, programInfo, deltaTime);
  body.drawCube(gl, viewProjectionMatrix, programInfo, deltaTime);
  floor.draw(gl, viewProjectionMatrix, programInfo, deltaTime);
  endm.draw(gl, viewProjectionMatrix, programInfoTexture, deltaTime,end_texture);
  endl.draw(gl, viewProjectionMatrix, programInfoTexture, deltaTime,end_texture);
  endr.draw(gl, viewProjectionMatrix, programInfoTexture, deltaTime,end_texture);
  trackl.draw(gl, viewProjectionMatrix, programInfoTexture, deltaTime,track_texture);
  trackm.draw(gl, viewProjectionMatrix, programInfoTexture, deltaTime,track_texture);
  trackr.draw(gl, viewProjectionMatrix, programInfoTexture, deltaTime,track_texture);
  sw.draw(gl, viewProjectionMatrix, programInfoTexture, deltaTime,sidewall_texture);
  //c1.drawCube(gl, projectionMatrix, programInfo, deltaTime);

}

//
// Initialize a shader program, so WebGL knows how to draw our data
//
function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Create the shader program

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}

//
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  // Send the source to the shader object

  gl.shaderSource(shader, source);

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}
