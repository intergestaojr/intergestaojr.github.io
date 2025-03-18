// scripts para funcionalidades da página principal index.html

const menuMobile = document.querySelector('.menu-mobile');
const navList = document.querySelector('.ul_navbar');

menuMobile.addEventListener('click', () => {
    navList.classList.toggle('active');
    menuMobile.classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Função para iniciar o timer
    function startSlideTimer() {
        clearInterval(slideInterval); // Limpa o timer existente
        slideInterval = setInterval(nextSlide, 6000);
    }

    // Inicializar carrossel
    showSlide(0);
    startSlideTimer();

    // Eventos dos botões
    nextBtn.addEventListener('click', () => {
        nextSlide();
        startSlideTimer(); // Reseta o timer após clicar
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        startSlideTimer(); // Reseta o timer após clicar
    });

    // Eventos dos indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            startSlideTimer(); // Reseta o timer após clicar
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            } else {
                entry.target.classList.remove('animate'); // Remove a classe quando sair da view
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '-40px' // Margem para controlar quando a animação dispara
    });

    document.querySelectorAll('.texto p').forEach((p) => {
        observer.observe(p);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todos os links do navbar
    const navLinks = document.querySelectorAll('.ul_navbar a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Pega o id da seção do href
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Ajuste para considerar a altura fixa do navbar
            const navbarHeight = 60;
            const targetPosition = targetSection.offsetTop - navbarHeight;
            
            // Scroll suave
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Fecha o menu mobile se estiver aberto
            const navList = document.querySelector('.ul_navbar');
            const menuMobile = document.querySelector('.menu-mobile');
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
                menuMobile.classList.remove('active');
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Fechar menu ao clicar nos links
    const menuLinks = document.querySelectorAll('.ul_navbar a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            const navList = document.querySelector('.ul_navbar');
            const menuMobile = document.querySelector('.menu-mobile');
            navList.classList.remove('active');
            menuMobile.classList.remove('active');
        });
    });

    // Touch swipe para carrossel
    let touchStartX = 0;
    let touchEndX = 0;
    
    const hero = document.querySelector('.hero');
    
    hero.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    hero.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const minSwipeDistance = 50;
        const swipeDistance = touchEndX - touchStartX;
        
        if (Math.abs(swipeDistance) > minSwipeDistance) {
            if (swipeDistance > 0) {
                // Swipe direita
                document.querySelector('.prev').click();
            } else {
                // Swipe esquerda
                document.querySelector('.next').click();
            }
        }
    }
});
