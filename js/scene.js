(function () { //FLOUSURE: FUNCION ANONIMA QUE SE LLAMA A SI MISMA
    var keyboard = new THREEx.KeyboardState();
    var scene = new THREE.Scene();//Creacion de la esena
    scene.background = new THREE.TextureLoader().load("img/otoño.jpg");//agregar textura a la scene

    const aspectRatio = window.innerWidth / window.innerHeight;
    var camera = new THREE.PerspectiveCamera(100, aspectRatio, 0.1, 500); //Perspectiva de la camara
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    var controls = new THREE.TrackballControls(camera);

    renderer.shadowMap.enabled = true;//DAR DE ALTA EL SERVICIO DE LAS SOBRAS PARA PODER USARLAS
    renderer.shadowMap.soft = true;//LA SOMBRA MAS SUAVE CON RESPECTO LA LUZ QUE ESTOY PROYECTANDO
    renderer.shadowMap.type = THREE.PCFShadowMap;//TIPO DE SOMBRA QUE VAMOS A USAR

    camera.position.z = 35; //PROFUNDIDAD CON LA QUE SE VIZUALISARA LA CAMARA
    camera.position.y = 5; //ALTURA DE LA CAMARA

    this.meshAuto = new THREE.Object3D();
    //CARRO//
    //CuerpoAuto
    var cuerpoGeometria = new THREE.BoxGeometry(15, 4, 7);
    var cuerpo = new THREE.Mesh(cuerpoGeometria, color());
    cuerpo.position.y = 5;
    cuerpo.position.x = 4;
    cuerpo.position.z = 4;
    //TechoAuto
    var techoGeometria = new THREE.BoxGeometry(4, 4, 4);
    var techo = new THREE.Mesh(techoGeometria, color());
    techo.position.y = 8;
    techo.position.x = 4;
    techo.position.z = 4;
    //LlantasAuto
    var groupllantas = new THREE.Group();
    for (var i = 0; i < 2; i++) {
        for (var j = 0; j < 2; j++) {
            var llantasGeometria = new THREE.TorusGeometry(2, 1.5, 9, 23);
            var llantas = new THREE.Mesh(llantasGeometria, colorLlantas());
            llantas.position.x = 8 * i;
            llantas.position.z = 8 * j;
            llantas.position.y = 4;
            groupllantas.add(llantas);
        }
    }
    //EspejoAuto
    var espejoGeometria = new THREE.BoxGeometry(3, 2, 4);
    var espejo = new THREE.Mesh(espejoGeometria, color());
    espejo.position.y = 8;
    espejo.position.x = 7.5;
    espejo.position.z = 4;
    //AleronAuto
    var aleronGeometria = new THREE.BoxGeometry(1, 2, 5);
    var aleron = new THREE.Mesh(aleronGeometria, color());
    aleron.position.y = 9;
    aleron.position.x = -3;
    aleron.position.z = 4;
    //ParachoquesAuto
    var parachoquesGeometria = new THREE.BoxGeometry(1, 2, 5);
    var parachoques = new THREE.Mesh(parachoquesGeometria, color());
    parachoques.position.y = 5;
    parachoques.position.x = 12;
    parachoques.position.z = 4;

    //Agregando los objetos a un solo mesh
    meshAuto.add(cuerpo);
    meshAuto.add(techo);
    meshAuto.add(groupllantas);
    meshAuto.add(espejo);
    meshAuto.add(aleron);
    meshAuto.add(parachoques);



    //TexturasArboles
    let loader = new THREE.TextureLoader(); // permite activar el uso de las texturas
    var hojas_texture = new THREE.TextureLoader().load("img/hojas.jpg");
    var tronco_texture = new THREE.TextureLoader().load("img/tronco.jpg");

    this.meshArboles = new THREE.Object3D();
    var groupArboles = new THREE.Group();
    for (var i = 0; i < 100; i++) {
        //TroncoPino
        var geometrytronco = new THREE.CylinderBufferGeometry(1, 2, 10, 32);
        var materialtronco = new THREE.MeshBasicMaterial({ map: tronco_texture });
        var tronco = new THREE.Mesh(geometrytronco, materialtronco);
        tronco.position.y = 6;
        tronco.position.x = Math.random() * 2000 - 1000;
        tronco.position.z = Math.random() * 2000 - 1000;

        //HojasPino
        var geometrycopa1 = new THREE.ConeBufferGeometry(6, 5, 32);
        var geometrycopa2 = new THREE.ConeBufferGeometry(5, 5, 32);
        var geometrycopa3 = new THREE.ConeBufferGeometry(3, 5, 32);
        var materialpino = new THREE.MeshBasicMaterial({ map: hojas_texture });
        var copa1 = new THREE.Mesh(geometrycopa1, materialpino);
        var copa2 = new THREE.Mesh(geometrycopa2, materialpino);
        var copa3 = new THREE.Mesh(geometrycopa3, materialpino);

        copa1.position.y = 10;
        copa2.position.y = 12;
        copa3.position.y = 15;

        copa1.position.x = tronco.position.x;
        copa2.position.x = tronco.position.x;
        copa3.position.x = tronco.position.x;

        copa1.position.z = tronco.position.z;
        copa2.position.z = tronco.position.z;
        copa3.position.z = tronco.position.z;

        //TroncoArbol
        var geometrytroncoarbol = new THREE.CylinderBufferGeometry(1, 2, 20, 32);
        var materialtroncoarbol = new THREE.MeshBasicMaterial({ map: tronco_texture });
        var troncoarbol = new THREE.Mesh(geometrytroncoarbol, materialtroncoarbol);

        troncoarbol.position.y = 7;
        troncoarbol.position.x = Math.random() * 2000 - 1000;
        troncoarbol.position.z = Math.random() * 2000 - 1000;

        //HojasArbol
        var geometryarbol = new THREE.DodecahedronGeometry(7, 1);
        var geometryarbol2 = new THREE.SphereGeometry(7, 10, 6, 0, 6, 3, 3.4);
        var materialarbol = new THREE.MeshBasicMaterial({ map: hojas_texture });
        var arbol = new THREE.Mesh(geometryarbol, materialarbol);
        var arbol2 = new THREE.Mesh(geometryarbol2, materialarbol);

        arbol.position.y = 16;
        arbol.position.x = troncoarbol.position.x;
        arbol.position.z = troncoarbol.position.z;

        arbol2.position.y = 16;
        arbol2.position.x = arbol.position.x + 1;
        arbol2.position.z = arbol.position.z;

        //Arbol
        groupArboles.add(arbol);
        groupArboles.add(arbol2);
        groupArboles.add(troncoarbol);
        //Pino
        groupArboles.add(tronco);
        groupArboles.add(copa1);
        groupArboles.add(copa2);
        groupArboles.add(copa3);

    }
    this.meshArboles.add(groupArboles);

    //TexturasNubes
    var nubes_texture = new THREE.TextureLoader().load("img/nube.jpg");
    var groupNubes = new THREE.Group();
    for (var i = 0; i < 500; i++) {
        var materialnube = new THREE.MeshBasicMaterial({ map: nubes_texture });
        var nubepequena = new THREE.SphereBufferGeometry(3, 32, 32);
        var pequena = new THREE.Mesh(nubepequena, materialnube);
        pequena.position.y = 40;
        pequena.position.x = Math.random() * 2000 - 1000;
        pequena.position.z = Math.random() * 2000 - 1000;

        var nubegrande = new THREE.SphereBufferGeometry(4, 32, 32);
        var grande = new THREE.Mesh(nubegrande, materialnube);
        grande.position.y = 40;
        grande.position.x = pequena.position.x - 1;
        grande.position.z = pequena.position.z;

        var nubemediana = new THREE.SphereBufferGeometry(3, 32, 32);
        var mediana = new THREE.Mesh(nubemediana, materialnube);
        mediana.position.y = 40;
        mediana.position.x = grande.position.x + 5;
        mediana.position.z = pequena.position.z;

        groupNubes.add(pequena);
        groupNubes.add(grande);
        groupNubes.add(mediana);

    }
    scene.add(meshAuto);
    //scene.add(meshp);
    scene.add(meshArboles);
    scene.add(groupNubes);

    //se le agrega textura al plano y la imagen se repita en 4x4
    var texture = new THREE.TextureLoader().load("img/sesped2.jpg");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(40, 40);
    let planeGeometry = new THREE.PlaneGeometry(2000, 2000); //Creacion del plano y su tamano 
    let groundMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, map: texture });
    planeGeometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2)); //Matrix de 4 ejes
    let plane = new THREE.Mesh(planeGeometry, groundMaterial);

    //Sombra
    plane.receiveShadow = true;

    //Luz
    let puntoLuz = new THREE.PointLight(0xdfebff, .9);
    let luzAmbiente = new THREE.AmbientLight('#DFFBFF'); //Luz de ambiente
    puntoLuz.position.set(50, 80, 20); //Definimos una posición para la luz
    puntoLuz.castShadow = true; //Agregamos true en castShadow por que es el que transmitirá la sombra

    scene.add(plane);

    //Luz a la escena
    scene.add(puntoLuz);
    scene.add(luzAmbiente);

    function colorLlantas() { //Funcion para el cambio de material con las formas
        var groundMaterialFormas = new THREE.MeshPhongMaterial({
            color: '#3498DB',
            shading: THREE.FlatShading
        });
        return groundMaterialFormas;
    }

    function color() { //Funcion para el cambio de material con las formas
        var groundMaterialFormas = new THREE.MeshPhongMaterial({
            color: Math.random() * 0xffff00,
            shading: THREE.FlatShading
        });
        return groundMaterialFormas;
    }
    function color2() { //Funcion para el cambio de material con las formas
        var groundMaterialFormas = new THREE.MeshPhongMaterial({
            color: Math.random() * 0xffff00,
            tranparent: true,
            opacity: 0
        });
        return groundMaterialFormas;
    }

    var clock = new THREE.Clock();

    function loop() {
        controls.update(); //Actualizacion de los controles de camara
        requestAnimationFrame(loop);

        var delta = clock.getDelta(); // seconds.
        var moveDistance = 200 * delta; // 200 pixels per second
        var rotateAngle = Math.PI / 2 * delta;   // pi/2 radians (90 degrees) per second

        if (keyboard.pressed("C")) {
            camera.position.y = 30;
            camera.position.x = -30;
            camera.position.z = 5;
            meshAuto.add(camera);

        }
        if (keyboard.pressed("X")) {
            camera.position.y = 10;
            camera.position.x = 15;
            camera.position.z = 0;
            meshAuto.add(camera);

        }

        if (keyboard.pressed("B")) {
            camera.position.y = 12;
            camera.position.x = -14;
            camera.position.z = 4;
            meshAuto.add(camera);

        }
        if (keyboard.pressed("v")) {
            camera.position.set(0, 150, 400);
            scene.add(camera);
        }

        // move forwards/backwards/left/right
        if (keyboard.pressed("W")) {
            meshAuto.translateX(+moveDistance);
            for (var i = 0, l = groupllantas.children.length; i < l; i++) {
                var llantas = groupllantas.children[i];
                llantas.rotation.z -= 0.009;
            }
        }
        if (keyboard.pressed("S")) {
            meshAuto.translateX(-moveDistance);
            for (var i = 0, l = groupllantas.children.length; i < l; i++) {
                var llantas = groupllantas.children[i];
                llantas.rotation.z += 0.009;
            }
        }
        if (keyboard.pressed("A")) {
            meshAuto.rotateOnAxis(new THREE.Vector3(0, 1, 0), rotateAngle);
            for (var i = 0, l = groupllantas.children.length; i < l; i++) {
                var llantas = groupllantas.children[i];
                llantas.rotation.y += 0.009;
            }
        } else if (keyboard.pressed("D")) {
            meshAuto.rotateOnAxis(new THREE.Vector3(0, 1, 0), -rotateAngle);
            for (var i = 0, l = groupllantas.children.length; i < l; i++) {
                var llantas = groupllantas.children[i];
                llantas.rotation.y -= 0.009;
            }
        } else {
            for (var i = 0, l = groupllantas.children.length; i < l; i++) {
                var llantas = groupllantas.children[i];
                llantas.rotation.y = 0;
            }
        }
        renderer.render(scene, camera);

    }
    loop();
})();