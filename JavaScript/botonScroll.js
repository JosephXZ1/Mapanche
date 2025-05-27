//Primero la constante del botón de scroll que se busca por su id en el HTML
const scrollBtn = document.getElementById('scrollBtn');
//Después la función que añade o quita la clase visible al botón dependiendo de la posición del scroll

window.addEventListener('scroll', () =>
{
    //Si el scroll es mayor a 200px (scroll en eje Y), se añade la clase visible (add) si no, se quita (remove)
    if (window.scrollY > 100)
    {
        scrollBtn.classList.add('visible');
    }
    else
    {
        scrollBtn.classList.remove('visible');
    }
});