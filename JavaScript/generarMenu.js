// Función principal para cargar y generar el menú
function cargarMenu() {
    // Cargar datos de panes.json
    fetch("../json/panes.json")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            generarMenu(data.panes.productos, "dulce");
        })
        .catch(error => {
            console.error("Error al cargar el menú:", error);
            mostrarError();
        });

    // Cargar otros menús
    fetch("../json/pasteles.json")
        .then(response => response.json())
        .then(data => generarMenu(data.pasteles.productos, "postre"))
        .catch(error => console.error("Error al cargar pasteles:", error));

    fetch("../json/galletas.json")
        .then(response => response.json())
        .then(data => generarMenu(data.galletas.productos, "gallBiz"))
        .catch(error => console.error("Error al cargar galletas:", error));
        
    fetch("../json/temporada.json")
        .then(response => response.json())
        .then(data => generarMenu(data.temporada.productos, "panTemp"))
        .catch(error => console.error("Error al cargar temporada:", error));
}

// Función para generar los elementos del menú
function generarMenu(productos, seccionId) {
    const seccion = document.getElementById(seccionId);
    
    // Limpiar sección antes de agregar nuevos elementos
    seccion.innerHTML = '';
    
    // Verificar si hay productos
    if (!productos || productos.length === 0) {
        seccion.innerHTML = '<p class="mensaje-error">No hay productos disponibles en esta categoría.</p>';
        return;
    }
    
    // Crear contenedor grid
    const gridContainer = document.createElement('div');
    gridContainer.className = 'menuGrid';
    
    // Crear elementos para cada producto
    productos.forEach(producto => {
        const item = document.createElement('a');
        item.href = producto.url;
        item.className = 'menuItem cell';
        item.id = `${producto.id} pan`;
        
        // Crear imagen
        const img = document.createElement('img');
        img.src = producto.imagen;
        img.alt = producto.nombre;
        img.loading = 'lazy'; // Optimización de carga
        
        // Crear nombre del producto
        const nombre = document.createElement('p');
        nombre.textContent = producto.nombre;
        
        // Ensamblar elemento
        item.appendChild(img);
        item.appendChild(nombre);
        
        // Agregar al contenedor grid
        gridContainer.appendChild(item);
    });
    
    // Agregar grid a la sección
    seccion.appendChild(gridContainer);
}

// Función para mostrar mensaje de error
function mostrarError() {
    const secciones = ['dulce', 'postre', 'gallBiz', 'panTemp'];
    
    secciones.forEach(id => {
        const seccion = document.getElementById(id);
        if (seccion) {
            seccion.innerHTML = `
                <div class="mensaje-error">
                    <p>No pudimos cargar el menú. Por favor intenta nuevamente más tarde.</p>
                    <button onclick="cargarMenu()">Reintentar</button>
                </div>
            `;
        }
    });
}

// Manejar el efecto de enfoque para los enlaces del menú lateral
function configurarNavegacion() {
    const links = document.querySelectorAll(".menuNav nav a");
    
    links.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetCell = document.getElementById(`${targetId} pan`);
            
            if (targetCell) {
                // Remover enfoque previo
                document.querySelectorAll(".cell.focused").forEach(cell => {
                    cell.classList.remove("focused");
                });
                
                // Aplicar enfoque
                targetCell.classList.add("focused");
                
                // Scroll suave
                targetCell.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
                
                // Quitar enfoque después de 3 segundos
                setTimeout(() => {
                    targetCell.classList.remove("focused");
                }, 3000);
            }
        });
    });
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
    cargarMenu();
    configurarNavegacion();
});