
(function () { //FLOUSURE: FUNCION ANONIMA QUE SE LLAMA A SI MISMA
 var objects = [];
    let scene = new THREE.Scene(); //Creacion de la esena
    const aspectRatio = window.innerWidth / window.innerHeight;
    let camera = new THREE.PerspectiveCamera(85, aspectRatio, 0.1, 100); //Perspectiva de la camara
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    var controls = new THREE.TrackballControls(camera);

    renderer.shadowMap.enabled = true;//DAR DE ALTA EL SERVICIO DE LAS SOBRAS PARA PODER USARLAS
    renderer.shadowMap.soft = true;//LA SOMBRA MAS SUAVE CON RESPECTO LA LUZ QUE ESTOY PROYECTANDO
    renderer.shadowMap.type = THREE.PCFShadowMap;//TIPO DE SOMBRA QUE VAMOS A USAR

    camera.position.z = 35; //PROFUNDIDAD CON LA QUE SE VIZUALISARA LA CAMARA
    camera.position.y = 5; //ALTURA DE LA CAMARA

    var groupcarro = new THREE.Group();
    //cuerpo
    var cuerpoGeometria = new THREE.BoxGeometry(15, 4, 7 );
    var cuerpo = new THREE.Mesh(cuerpoGeometria, color());
    cuerpo.position.y = 5;
    cuerpo.position.x = 4;
    cuerpo.position.z = 4;
    groupcarro.add(cuerpo);

    var cuerpo2Geometria = new THREE.BoxGeometry(4, 4, 4 );
    var cuerpo2 = new THREE.Mesh(cuerpo2Geometria, color());
    cuerpo2.position.y = 8;
    cuerpo2.position.x = 4;
    cuerpo2.position.z = 4;
    groupcarro.add(cuerpo2);
    //cuerpo.add(cuerpo2)

    var groupllantas = new THREE.Group();
    //llantas
    for (var i = 0; i < 2; i++) {
        for (var j = 0; j < 2; j++) {
            var llantasGeometria = new THREE.TorusGeometry(2, 1.5, 9, 23);
            var llantas = new THREE.Mesh(llantasGeometria, colorLlantas());
            llantas.position.x = 8 * i;
            llantas.position.z = 8 * j;
            llantas.position.y = 4;
            groupllantas.add(llantas);
            objects.push(llantas);
            

            
    
        }
    }
    scene.add(groupllantas);
    groupcarro.add(groupllantas);
    
    let planeGeometry = new THREE.PlaneGeometry(200, 900); //Creacion del plano y su tamano 
    planeGeometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2)); //Matrix de 4 ejes

    var piramideGeometria = new THREE.BoxGeometry(3, 2, 4);
    var piramide = new THREE.Mesh(piramideGeometria, color());
    let groundMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
    piramide.position.y = 8;
    piramide.position.x = 7.5;
    piramide.position.z = 4;
    groupcarro.add(piramide);

    var piramideGeometria2 = new THREE.BoxGeometry(1, 2, 5);
    var piramide2 = new THREE.Mesh(piramideGeometria2, color());
    piramide2.position.y = 9;
    piramide2.position.x = -3;
    piramide2.position.z = 4;
    groupcarro.add(piramide2);

    var piramideGeometria3 = new THREE.BoxGeometry(1, 2, 5);
    var piramide3 = new THREE.Mesh(piramideGeometria3, color());
    piramide3.position.y = 5;
    piramide3.position.x = 12;
    piramide3.position.z = 4;
    groupcarro.add(piramide3);


    scene.add(groupcarro);
    let plane = new THREE.Mesh(planeGeometry, groundMaterial);

    //Sombra
    piramide.castShadow = true;
    llantas.castShadow = true;
    plane.receiveShadow = true;

    //Luz
    let puntoLuz = new THREE.PointLight(0xdfebff, .9);
    let luzAmbiente = new THREE.AmbientLight('#DFFBFF'); //Luz de ambiente
    puntoLuz.position.set(50, 80, 20); //Definimos una posición para la luz
    puntoLuz.castShadow = true; //Agregamos true en castShadow por que es el que transmitirá la sombra

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    document.addEventListener('mousedown', onDocumentMouseDown, false);

    //Objetos a la escena

    scene.add(plane);

    //Cambiar de textura
    let changeTexture = 0;
    document.body.onkeypress = function () { // Detecta si se preciona una tecla
        if (changeTexture % 2 == 0) {// La funcion se inicializa que obtiene el mod para cambiar entre varias
            //texturas
            texture = new THREE.TextureLoader().load('img/Star.jpg');
        } else {
            texture = new THREE.TextureLoader().load('img/sun.jpg');
        }
        //Los materiales se alternan al precionar una tecla y se vuelve a cargar las primitivas
        dona.material = new THREE.MeshBasicMaterial({ map: texture });
        piramide.material = new THREE.MeshBasicMaterial({ map: texture });
        cubo.material = new THREE.MeshBasicMaterial({ map: texture });
        renderer.render(scene, camera);

        changeTexture += 1; // Se aumenta en uno para que se alterne.
    }
    //Luz a la escena
    scene.add(puntoLuz);
    scene.add(luzAmbiente);

    function colorLlantas() { //Funcion para el cambio de material con las formas
        var groundMaterialFormas = new THREE.MeshPhongMaterial({
            //color: Math.random() * 0xffff00,
            color: '#3498DB',
            shading:THREE.FlatShading
            //wireframe: !null
           // transparent: true,
           // opacity: .3
        });
        console.log(groundMaterialFormas);
        return groundMaterialFormas;
    }
    function color() { //Funcion para el cambio de material con las formas
        var groundMaterialFormas = new THREE.MeshPhongMaterial({
            color: Math.random() * 0xffff00,
            shading:THREE.FlatShading
            //wireframe: !null
           // transparent: true,
           // opacity: .3
        });
        console.log(groundMaterialFormas);
        return groundMaterialFormas;
    }

    function onDocumentMouseDown(event) {
        event.preventDefault();
        mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
        mouse.y = - (event.clientY / renderer.domElement.clientHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObjects(scene.children);
        if (intersects.length > 0) {
            var intersect = intersects[0];
            if (intersect.object.geometry.type == "ConeGeometry") {
                intersect.object.material = color();
                //intersect.object.material.color.set(Math.random() * 0xffff00);
                console.log("piramide");
            }
            if (intersect.object.geometry.type == "BoxGeometry") {
                intersect.object.material = color();
                //intersect.object.material.color.set(Math.random() * 0xffff00);
                console.log("Cubo");
            }
            if (intersect.object.geometry.type == "TorusGeometry") {
                intersect.object.material = color();
                //intersect.object.material.color.set(Math.random() * 0xffff00);
                console.log("Dona");
            }
        }
    }
    function loop() {
        controls.update(); //Actualizacion de los controles de camara
        requestAnimationFrame(loop);
        for (var i = 0, l = groupllantas.children.length; i < l; i++) {
            var llantas = groupllantas.children[i];
            llantas.rotation.z -= 0.009;
        }
    /*    for (var i = 0, l = groupcarro.children.length; i < l; i++) {
            var carro = groupcarro.children[i];
            carro.position.x -= 0.2 * i;
            
            //carro.rotation.x -= 0.009;
        } */
        //llantas.rotation.z += 0.009;
        renderer.render(scene, camera);
    }
    loop();
})();