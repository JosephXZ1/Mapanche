
class Accordion
{
    constructor(el, allDetails)
    {
        // Guardamos el elemento <details> y el conjunto de todos los <details>
        this.el = el;
        this.allDetails = allDetails;
        this.summary = el.querySelector('summary'); // Elemento <summary> dentro de <details>
        this.content = el.querySelector('.content'); // Contenedor de los elementos dentro del <details>

        // Variables para controlar el estado de la animación
        this.animation = null;
        this.isClosing = false;
        this.isExpanding = false;

        // Agregamos un evento de clic al <summary>
        this.summary.addEventListener('click', (e) => this.onClick(e));
    }

    onClick(e)
    {
        e.preventDefault(); // Prevenimos el comportamiento predeterminado del navegador

        // Primero, revisamos si hay otro <details> abierto y lo cerramos con animación
        this.allDetails.forEach(detail =>
        {
            if (detail !== this.el && detail.open)
            { // Si es otro <details> y está abierto
                const instance = detail.accordionInstance; // Obtenemos la instancia de la clase
                if (instance) instance.shrink(); // Ejecutamos la animación de cierre
            }
        });

        // Evitamos que el contenido sobresalga durante la animación
        this.el.style.overflow = 'hidden';

        // Si el <details> está cerrándose o ya está cerrado, lo abrimos
        if (this.isClosing || !this.el.open)
        {
            this.open();
        }
        // Si el <details> está expandiéndose o ya está abierto, lo cerramos
        else if (this.isExpanding || this.el.open)
        {
            this.shrink();
        }
    }

    shrink()
    {
        // Indicamos que el elemento está en proceso de cierre
        this.isClosing = true;

        // Guardamos la altura inicial del elemento antes de cerrarlo
        const startHeight = `${this.el.offsetHeight}px`;
        // Calculamos la altura final, que será solo la del <summary>
        const endHeight = `${this.summary.offsetHeight}px`;

        // Si hay una animación en curso, la cancelamos antes de iniciar otra
        if (this.animation)
        {
            this.animation.cancel();
        }

        // Iniciamos la animación de reducción de altura
        this.animation = this.el.animate
        ({
            height: [startHeight, endHeight]
        },
        {
            duration: 400, // Duración de la animación en milisegundos
            easing: 'ease-out' // Suavizado de la animación
        });

        // Cuando la animación termine, ejecutamos onAnimationFinish(false)
        this.animation.onfinish = () => this.onAnimationFinish(false);
        // Si la animación se cancela, restablecemos el estado de cierre
        this.animation.oncancel = () => this.isClosing = false;
    }

    open()
    {
        // Fijamos la altura actual antes de cambiar la propiedad `open`
        this.el.style.height = `${this.el.offsetHeight}px`;

        // Marcamos el <details> como abierto para que el contenido sea accesible
        this.el.open = true;

        // Usamos requestAnimationFrame para esperar un frame antes de expandirlo
        window.requestAnimationFrame(() => this.expand());
    }

    expand()
    {
        // Indicamos que el elemento está en proceso de expansión
        this.isExpanding = true;

        // Obtenemos la altura actual antes de expandir
        const startHeight = `${this.el.offsetHeight}px`;
        // Calculamos la altura total una vez abierto
        const endHeight = `${this.summary.offsetHeight + this.content.offsetHeight}px`;

        // Si hay una animación en curso, la cancelamos antes de iniciar otra
        if (this.animation)
        {
            this.animation.cancel();
        }

        // Iniciamos la animación de expansión
        this.animation = this.el.animate
        ({
            height: [startHeight, endHeight]
        },
        {
            duration: 400, // Duración de la animación en milisegundos
            easing: 'ease-out' // Suavizado de la animación
        });

        // Cuando la animación termine, ejecutamos onAnimationFinish(true)
        this.animation.onfinish = () => this.onAnimationFinish(true);
        // Si la animación se cancela, restablecemos el estado de expansión
        this.animation.oncancel = () => this.isExpanding = false;
    }

    onAnimationFinish(open)
    {
        // Marcamos el atributo `open` según el estado final
        this.el.open = open;

        // Eliminamos cualquier referencia a la animación para liberar memoria
        this.animation = null;

        // Restablecemos los estados de animación
        this.isClosing = false;
        this.isExpanding = false;

        // Removemos el `overflow: hidden` y la altura fija
        this.el.style.height = this.el.style.overflow = '';
    }
}

// Esperamos a que la página cargue completamente
document.addEventListener("DOMContentLoaded", () =>
{
    // Seleccionamos todos los elementos <details>
    const allDetails = document.querySelectorAll("details");

    // Creamos una instancia de la clase Accordion para cada <details>
    allDetails.forEach(detail =>
    {
        const instance = new Accordion(detail, allDetails);
        detail.accordionInstance = instance; // Guardamos la instancia en el elemento <details>
    });
});