/// <reference path="webgl.d.ts" />

let enemy = class {
    constructor(gl, pos,whichPart) {
        this.positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        this.positions = [
             // Front face
             -0.25, -0.25, 0.25,
             0.25, -0.25, 0.25,
             0.25, 0.25, 0.25,
             -0.25, 0.25, 0.25,
             //Back Face
             -0.25, -0.25, -0.25,
             0.25, -0.25, -0.25,
             0.25, 0.25, -0.25,
             -0.25, 0.25, -0.25,
             //Top Face
             -0.25, 0.25, -0.25,
             0.25, 0.25, -0.25,
             0.25, 0.25, 0.25,
             -0.25, 0.25, 0.25,
             //Bottom Face
             -0.25, -0.25, -0.25,
             0.25, -0.25, -0.25,
             0.25, -0.25, 0.25,
             -0.25, -0.25, 0.25,
             //Left Face
             -0.25, -0.25, -0.25,
             -0.25, 0.25, -0.25,
             -0.25, 0.25, 0.25,
             -0.25, -0.25, 0.25,
             //Right Face
             0.25, -0.25, -0.25,
             0.25, 0.25, -0.25,
             0.25, 0.25, 0.25,
             0.25, -0.25, 0.25,


             -0.7, -0.7-0.8, 0.7,
             0.7, -0.7-0.8, 0.7,
             0.7, 0.7-0.8, 0.7,
             -0.7, 0.7-0.8, 0.7,
             //Back Face
             -0.7, -0.7-0.8, -0.7,
             0.7, -0.7-0.8, -0.7,
             0.7, 0.7-0.8, -0.7,
             -0.7, 0.7-0.8, -0.7,
             //Top Face
             -0.7, 0.7-0.8, -0.7,
             0.7, 0.7-0.8, -0.7,
             0.7, 0.7-0.8, 0.7,
             -0.7, 0.7-0.8, 0.7,
             //Bottom Face
             -0.7, -0.7-0.8, -0.7,
             0.7, -0.7-0.8, -0.7,
             0.7, -0.7-0.8, 0.7,
             -0.7, -0.7-0.8, 0.7,
             //Left Face
             -0.7, -0.7-0.8, -0.7,
             -0.7, 0.7-0.8, -0.7,
             -0.7, 0.7-0.8, 0.7,
             -0.7, -0.7-0.8, 0.7,
             //Right Face
             0.7, -0.7-0.8, -0.7,
             0.7, 0.7-0.8, -0.7,
             0.7, 0.7-0.8, 0.7,
             0.7, -0.7-0.8, 0.7,
        ];
        this.rotation = 0;

        this.pos = pos;

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);
        this.faceColors = [
            [ 1.0, 0.8,0.6 , 1.0],
            [ 1.0, 0.8,0.6 , 1.0],
            [ 0.0, 0.1, 0.0 , 1.0],
            [ 1.0, 0.8,0.6 , 1.0],
            [ 1.0, 0.8,0.6 , 1.0],
            [ 1.0, 0.8,0.6 , 1.0],

            [ 0.0, 0.1, 0.0 , 1.0],
            [ 0.0, 0.1, 0.0 , 1.0],
            [ 0.0, 0.1, 0.0 , 1.0],
            [ 0.0, 0.1, 0.0 , 1.0],
            [ 0.0, 0.1, 0.0 , 1.0],
            [ 0.0, 0.1, 0.0 , 1.0],
        ];
        
        var colors = [];



        for (var j = 0; j < this.faceColors.length; ++j) {
            const c = this.faceColors[j];

            // Repeat each color four times for the four vertices of the face
            colors = colors.concat(c, c, c, c);
        }

        const colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

        // Build the element array buffer; this specifies the indices
        // into the vertex arrays for each face's vertices.

        const indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

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

            0+24, 1+24, 2+24,    0+24, 2+24, 3+24, // front
            4+24, 5+24, 6+24,    4+24, 6+24, 7+24,
            8+24, 9+24, 10+24,   8+24, 10+24, 11+24,
            12+24, 13+24, 14+24, 12+24, 14+24, 15+24,
            16+24, 17+24, 18+24, 16+24, 18+24, 19+24,
            20+24, 21+24, 22+24, 20+24, 22+24, 23+24, 
        ];

        // Now send the element array to GL

        
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
            new Uint16Array(indices), gl.STATIC_DRAW);

        this.buffer = {
            position: this.positionBuffer,
            color: colorBuffer,
            indices: indexBuffer,
        }

    }

    draw(gl, projectionMatrix, programInfo, deltaTime) {
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
            const vertexCount = 72;
            const type = gl.UNSIGNED_SHORT;
            const offset = 0;
            gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
        }

    }
};
