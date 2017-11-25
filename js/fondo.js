//inicializa el index en 0 que es la direccion de la imagen
var index = 0;
//se agrega las imagenes en un arreglo
var listaimg = [ "http://universe-beauty.com/albums/userpics/1/3/galaxy-art-wallpaper-img167-JPG.jpg", "http://www.fonditos3d.com/Imagenes/naves-espaciales.jpg"];
//la funcion que hace el cambio segun el tiempo asignado
$(function () {

    setInterval(changeImage, 2000);

});
//la funcion que en el direcctorio de css con la propiedad background-image agrega las imagenes
//el index se va a ir incrementado segun el numero de imagenes que se quieran poner
//hasta que llegue al numero de imagenes estara reiniciando las imagenes haciendo el efecto de que se repiten
function changeImage() {

    $('body').css("background-image", 'url(' + listaimg[index] + ')');

    index++;

    if (index == 3)
        index = 0;

}