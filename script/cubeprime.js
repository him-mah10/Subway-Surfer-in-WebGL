/// <reference path="webgl.d.ts" />

let cube = class {
    constructor(gl, pos,whichPart) {
        this.positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        var multiplier=1.0
        if(whichPart=="head")
        {
            multiplier=0.25;
        }
        else if(whichPart=="body")
        {
            multiplier=0.6;
        }
        this.positions = [
             // Front face
             -1.0, -1.0, 1.0,
             1.0, -1.0, 1.0,
             1.0, 1.0, 1.0,
             -1.0, 1.0, 1.0,
             //Back Face
             -1.0, -1.0, -1.0,
             1.0, -1.0, -1.0,
             1.0, 1.0, -1.0,
             -1.0, 1.0, -1.0,
             //Top Face
             -1.0, 1.0, -1.0,
             1.0, 1.0, -1.0,
             1.0, 1.0, 1.0,
             -1.0, 1.0, 1.0,
             //Bottom Face
             -1.0, -1.0, -1.0,
             1.0, -1.0, -1.0,
             1.0, -1.0, 1.0,
             -1.0, -1.0, 1.0,
             //Left Face
             -1.0, -1.0, -1.0,
             -1.0, 1.0, -1.0,
             -1.0, 1.0, 1.0,
             -1.0, -1.0, 1.0,
             //Right Face
             1.0, -1.0, -1.0,
             1.0, 1.0, -1.0,
             1.0, 1.0, 1.0,
             1.0, -1.0, 1.0,
        ];
        
        for(var i=0;i<this.positions.length;i++)
            this.positions[i]*=multiplier;

        this.rotation = 0;

        this.pos = pos;

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);
        if(whichPart=="head")
        {
            this.faceColors = [
                [ 1.0, 0.8,0.6 , 1.0],
                [ 1.0, 0.8,0.6 , 1.0],
                [ 255/255, 255/255,255/255 , 1.0],
                [ 1.0, 0.8,0.6 , 1.0],
                [ 1.0, 0.8,0.6 , 1.0],
                [ 1.0, 0.8,0.6 , 1.0],
            ];
        }
        else if(whichPart=="body")
        {
            this.faceColors = [

                [1.0,1.0,0.0,1.0],
                [1.0,1.0,0.0,1.0],
                [1.0,1.0,0.0,1.0],
                [1.0,1.0,0.0,1.0],
                [1.0,1.0,0.0,1.0],
                [1.0,1.0,0.0,1.0],
            ];
        }

        var colors = [];



        for (var j = 0; j < this.faceColors.length; ++j) {
            const c = this.faceColors[j];

            // Repeat each color four times for the four vertices of the face
            colors = colors.concat(c, c, c, c);
        }

        this.colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

        // Build the element array buffer; this specifies the indices
        // into the vertex arrays for each face's vertices.

        this.indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

        // This array defines each face as two triangles, using the
        // indices into the vertex array to specify each triangle's
        // position.

        const indices = [
            0, 1, 2,    0, 2, 3, // front
            4, 5, 6,    4, 6, 7,
            8, 9, 10,   8, 10, 11,
            12, 13, 14, 12, 14, 15,
            16, 17, 18, 16, 18, 19,
            20, 21, 22, 20, 22, 23, 
        ];

        // Now send the element array to GL

        
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
            new Uint16Array(indices), gl.STATIC_DRAW);

        this.buffer = {
            position: this.positionBuffer,
            color: this.colorBuffer,
            indices: this.indexBuffer,
        }

    }

    drawCube(gl, projectionMatrix, programInfo, deltaTime) {
        var colors = [];



        for (var j = 0; j < this.faceColors.length; ++j) {
            const c = this.faceColors[j];

            // Repeat each color four times for the four vertices of the face
            colors = colors.concat(c, c, c, c);
        }

        this.colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

        this.buffer = {
            position: this.positionBuffer,
            color: this.colorBuffer,
            indices: this.indexBuffer,
        }
        const modelViewMatrix = mat4.create();
        mat4.translate(
            modelViewMatrix,
            modelViewMatrix,
            this.pos
        );
        
        //this.rotation += Math.PI / (((Math.random()) % 100) + 50);

        mat4.rotate(modelViewMatrix,
            modelViewMatrix,
            this.rotation,
            [1, 1, 1]);

        {
            const numComponents = 3;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer.position);
            gl.vertexAttribPointer(
                programInfo.attribLocations.vertexPosition,
                numComponents,
                type,
                normalize,
                stride,
                offset);
            gl.enableVertexAttribArray(
                programInfo.attribLocations.vertexPosition);
        }

        // Tell WebGL how to pull out the colors from the color buffer
        // into the vertexColor attribute.
        {
            const numComponents = 4;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer.color);
            gl.vertexAttribPointer(
                programInfo.attribLocations.vertexColor,
                numComponents,
                type,
                normalize,
                stride,
                offset);
            gl.enableVertexAttribArray(
                programInfo.attribLocations.vertexColor);
        }

        // Tell WebGL which indices to use to index the vertices
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffer.indices);

        // Tell WebGL to use our program when drawing

        gl.useProgram(programInfo.program);

        // Set the shader uniforms

        gl.uniformMatrix4fv(
            programInfo.uniformLocations.projectionMatrix,
            false,
            projectionMatrix);
        gl.uniformMatrix4fv(
            programInfo.uniformLocations.modelViewMatrix,
            false,
            modelViewMatrix);

        {
            const vertexCount = 36;
            const type = gl.UNSIGNED_SHORT;
            const offset = 0;
            gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
        }

    }
};
