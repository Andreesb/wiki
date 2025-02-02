import { loadFooter } from './modules/footer.js';
import { changeImage, closeOverlay, openOverlay, showActiveImage, startAutoRotate } from './modules/galeria.js';
import { loadHeader } from './modules/header.js';
import { fetchLatestNews, homeContainer, rotateAsideSections } from './modules/home-Container.js';
import { showMaintenancePage } from './modules/mantenimiento.js';
import { showMenuDerecho } from './modules/menu-derecho.js';
import { showMenuIzquierdo } from './modules/menu-izquierda.js';
import { setupHuntSessionProcessor } from './modules/party-hunt.js';

document.addEventListener("DOMContentLoaded", () => {
    
    // Función para obtener los datos del boss destacado
    const urlBosses = "https://api.tibiadata.com/v4/boostablebosses";

    async function fetchBoostedBoss() {
        try {
            // Realizamos la solicitud GET a la API
            const response = await fetch(urlBosses);

            // Validamos que la respuesta sea exitosa
            if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status}`);
            }

            // Parseamos los datos como JSON
            const data = await response.json();

            // Extraemos el boss destacado (featured: true)
            const boostedBoss = data.boostable_bosses.boosted;

            // Seleccionamos los elementos del DOM donde mostraremos la información
            const bossImageElement = document.getElementById("bossBoosted");

            // Insertamos el nombre y la imagen en los elementos
            bossImageElement.src = boostedBoss.image_url;

            bossImageElement.title =  `Boss boosted: ${boostedBoss.name}`;

        } catch (error) {
            console.error("Error al obtener los datos del boss:", error);
        }
    }

    const urlCreatures = "https://api.tibiadata.com/v4/creatures";

    // Función para obtener los datos de la criatura destacada
    async function fetchBoostedCreature() {
        try {
            // Realizamos la solicitud GET a la API
            const response = await fetch(urlCreatures);

            // Validamos que la respuesta sea exitosa
            if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status}`);
            }

            // Parseamos los datos como JSON
            const data = await response.json();

            // Extraemos la criatura destacada (featured: true)
            const boostedCreature = data.creatures.boosted;

            // Seleccionamos el elemento de la imagen
            const creatureImageElement = document.getElementById("creatureBoosted");

            // Insertamos la URL de la imagen en el atributo src
            creatureImageElement.src = boostedCreature.image_url;

            // Agregamos el nombre de la criatura como título de la imagen
            creatureImageElement.title = `Creature boosted: ${boostedCreature.name}`

        } catch (error) {
            console.error("Error al obtener los datos de la criatura:", error);
        }
    }

    // Llamamos a la función al cargar la página
    fetchBoostedCreature();

    // Llamamos a la función al cargar la página
    fetchBoostedBoss();


    document.querySelector('.lupa').addEventListener('click', function () {
        const search = document.querySelector('.search');
        search.classList.toggle('active');
        const searchContainer = document.querySelector('.search-Bar');
        searchContainer.classList.toggle('active');
    });


    //Galeria
    const retratoGaleria = document.getElementById('retrato-galeria');
    const overlay = document.querySelector('#overlay');
    const closeBtn = document.querySelector('#close-overlay');
    const prevBtn = document.querySelector('#prev-btn');
    const nextBtn = document.querySelector('#next-btn');

    // Manejar clics en miniaturas

    // Manejar clic en el overlay para cerrarlo
    closeBtn.addEventListener('click', closeOverlay);

    // Navegación con flechas solo si el overlay está activo
    document.addEventListener('keydown', (e) => {
        if (overlay.classList.contains('active')) {
            if (e.key === 'ArrowRight') changeImage(1);
            if (e.key === 'ArrowLeft') changeImage(-1);
            if (e.key === 'Escape') closeOverlay(); // Cerrar overlay con Escape

            // Prevenir el comportamiento por defecto de las flechas
            e.preventDefault();
        }
    });

    // Evento para mostrar el overlay al hacer clic en "retrato-galeria"
    retratoGaleria.addEventListener('click', () => {
        openOverlay(currentImageIndex);

        const section = retratoGaleria.querySelector('.item-menu');
        if (section) {
        section.style.display = section.style.display === 'block' ? 'none' : 'block';
        }
    });

    // Cambiar imagen con los botones de navegación
    prevBtn.addEventListener('click', () => changeImage(-1));
    nextBtn.addEventListener('click', () => changeImage(1));





    const menuDinamicoItems = document.querySelectorAll('.menu-dinamico ul');

    menuDinamicoItems.forEach((item, index) => {
      // Evento 'click' en cada <ul>
        item.addEventListener('click', () => {
            console.log(`Se hizo clic en el elemento ${index + 1}`);
        
            // Buscar la sección hija
            const section = item.querySelector('section');
            if (section) {
            console.log('Se encontró una sección:', section);
        
            // Alternar la clase 'expandido'
            section.classList.toggle('expandido');
            console.log('Clase aplicada:', section.classList);
        
            // Cerrar otras secciones
            menuDinamicoItems.forEach((otherItem, otherIndex) => {
                if (otherItem !== item) {
                const otherSection = otherItem.querySelector('section');
                if (otherSection) {
                    otherSection.classList.remove('expandido');
                    console.log(`Se cerró la sección del elemento ${otherIndex + 1}`);
                }
                }
            });
            } else {
            console.log('No se encontró ninguna sección en este <ul>.');
            }
        });
    });
    
    
    document.addEventListener("click", (event) => {
        const target = event.target.closest("a");
        if (!target) return;
    
        const href = target.getAttribute("href");
        if (!href || href.trim() === "" || href === "#") {
            event.preventDefault();
            showMaintenancePage();
        }
    });

    setupHuntSessionProcessor("processButton", "sessionInput", "party-session");

    loadHeader();
    showMenuDerecho();
    rotateAsideSections();
    showActiveImage();
    startAutoRotate();
    homeContainer();
    showMenuIzquierdo();
    fetchLatestNews();
    loadFooter();

});