import { useEffect, useRef } from 'react';

const Footer = () => {
    const footerRef = useRef(null);
    const newsletterRef = useRef(null);
    const socialRef = useRef(null);
    const quickLinksRef = useRef(null);

    // Efecto para animaciones al hacer scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (entry.target === footerRef.current) {
                            entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                        } else if (entry.target === newsletterRef.current) {
                            entry.target.classList.add('animate__animated', 'animate__bounceIn', 'animate__delay-1s');
                        } else if (entry.target === socialRef.current) {
                            entry.target.classList.add('animate__animated', 'animate__rubberBand', 'animate__delay-2s');
                        } else if (entry.target === quickLinksRef.current) {
                            entry.target.classList.add('animate__animated', 'animate__fadeInLeft', 'animate__delay-3s');
                        }
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        if (footerRef.current) observer.observe(footerRef.current);
        if (newsletterRef.current) observer.observe(newsletterRef.current);
        if (socialRef.current) observer.observe(socialRef.current);
        if (quickLinksRef.current) observer.observe(quickLinksRef.current);

        return () => {
            observer.disconnect();
        };
    }, []);

    // Función para animar el botón de suscripción
    const handleSubscribe = (e) => {
        e.preventDefault();
        const button = e.currentTarget;
        const input = e.currentTarget.closest('.input-group').querySelector('input');
        
        if (!input.value.trim()) {
            button.classList.add('animate__animated', 'animate__headShake');
            setTimeout(() => {
                button.classList.remove('animate__animated', 'animate__headShake');
            }, 1000);
            return;
        }
        
        // Animación de éxito
        button.classList.add('animate__animated', 'animate__heartBeat');
        button.innerHTML = '<i class="fas fa-check me-2"></i>¡Enviado!';
        button.disabled = true;
        
        setTimeout(() => {
            button.classList.remove('animate__animated', 'animate__heartBeat');
            button.innerHTML = 'Sign Up';
            button.disabled = false;
            input.value = '';
        }, 2000);
    };

    // Función para animar íconos sociales
    const animateSocialIcon = (e) => {
        const icon = e.currentTarget;
        icon.classList.add('animate__animated', 'animate__tada');
        setTimeout(() => {
            icon.classList.remove('animate__animated', 'animate__tada');
        }, 1000);
    };

    // Función para animar enlaces
    const animateLink = (e) => {
        const link = e.currentTarget;
        const icon = link.querySelector('i');
        
        if (icon) {
            icon.classList.add('animate__animated', 'animate__flip');
            setTimeout(() => {
                icon.classList.remove('animate__animated', 'animate__flip');
            }, 500);
        }
    };

    return (
        <div className="animate__animated animate__fadeIn">
            <div className="container-fluid bg-dark text-secondary px-5">
                <div className="row gx-5" ref={footerRef}>
                    <div className="col-lg-8 col-md-6">
                        <div className="row gx-5">
                            <div className="col-lg-4 col-md-12 pt-5 mb-5">
                                <h3 className="text-light mb-4 animate__animated animate__fadeInDown">
                                    Get In Touch
                                </h3>
                                <div className="d-flex mb-2 animate__animated animate__fadeInLeft animate__delay-1s">
                                    <i className="bi bi-geo-alt text-primary me-2" />
                                    <p className="mb-0">123 Street, New York, USA</p>
                                </div>
                                <div className="d-flex mb-2 animate__animated animate__fadeInLeft animate__delay-2s">
                                    <i className="bi bi-envelope-open text-primary me-2" />
                                    <p className="mb-0">info@example.com</p>
                                </div>
                                <div className="d-flex mb-2 animate__animated animate__fadeInLeft animate__delay-3s">
                                    <i className="bi bi-telephone text-primary me-2" />
                                    <p className="mb-0">+012 345 67890</p>
                                </div>
                                <div className="d-flex mt-4" ref={socialRef}>
                                    <a 
                                        className="btn btn-primary btn-square rounded-circle me-2 animate__animated animate__pulse animate__infinite animate__slow"
                                        href="https://www.twitter.com/" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        onMouseEnter={animateSocialIcon}
                                    >
                                        <i className="fab fa-twitter" />
                                    </a>
                                    <a 
                                        className="btn btn-primary btn-square rounded-circle me-2 animate__animated animate__pulse animate__infinite animate__slow animate__delay-1s"
                                        href="https://www.facebook.com/" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        onMouseEnter={animateSocialIcon}
                                    >
                                        <i className="fab fa-facebook-f" />
                                    </a>
                                    <a 
                                        className="btn btn-primary btn-square rounded-circle me-2 animate__animated animate__pulse animate__infinite animate__slow animate__delay-2s"
                                        href="https://www.linkedin.com/" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        onMouseEnter={animateSocialIcon}
                                    >
                                        <i className="fab fa-linkedin-in" />
                                    </a>
                                    <a 
                                        className="btn btn-primary btn-square rounded-circle me-2 animate__animated animate__pulse animate__infinite animate__slow animate__delay-3s"
                                        href="https://www.instagram.com/" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        onMouseEnter={animateSocialIcon}
                                    >
                                        <i className="fab fa-instagram" />
                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-12 pt-0 pt-lg-5 mb-5" ref={quickLinksRef}>
                                <h3 className="text-light mb-4">Quick Links</h3>
                                <div className="d-flex flex-column justify-content-start">
                                    <a 
                                        className="text-secondary mb-2" 
                                        href="#"
                                        onMouseEnter={animateLink}
                                    >
                                        <i className="bi bi-arrow-right text-primary me-2" />Home
                                    </a>
                                    <a 
                                        className="text-secondary mb-2" 
                                        href="#"
                                        onMouseEnter={animateLink}
                                    >
                                        <i className="bi bi-arrow-right text-primary me-2" />About Us
                                    </a>
                                    <a 
                                        className="text-secondary mb-2" 
                                        href="#"
                                        onMouseEnter={animateLink}
                                    >
                                        <i className="bi bi-arrow-right text-primary me-2" />Food Menu
                                    </a>
                                    <a 
                                        className="text-secondary mb-2" 
                                        href="#"
                                        onMouseEnter={animateLink}
                                    >
                                        <i className="bi bi-arrow-right text-primary me-2" />Our Chefs
                                    </a>
                                    <a 
                                        className="text-secondary mb-2" 
                                        href="#"
                                        onMouseEnter={animateLink}
                                    >
                                        <i className="bi bi-arrow-right text-primary me-2" />Latest Blog
                                    </a>
                                    <a 
                                        className="text-secondary" 
                                        href="#"
                                        onMouseEnter={animateLink}
                                    >
                                        <i className="bi bi-arrow-right text-primary me-2" />Contact Us
                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-12 pt-0 pt-lg-5 mb-5 animate__animated animate__fadeInRight animate__delay-4s">
                                <h3 className="text-light mb-4">More Links</h3>
                                <div className="d-flex flex-column justify-content-start">
                                    <a 
                                        className="text-secondary mb-2" 
                                        href="#"
                                        onMouseEnter={animateLink}
                                    >
                                        <i className="bi bi-arrow-right text-primary me-2" />Home
                                    </a>
                                    <a 
                                        className="text-secondary mb-2" 
                                        href="#"
                                        onMouseEnter={animateLink}
                                    >
                                        <i className="bi bi-arrow-right text-primary me-2" />About Us
                                    </a>
                                    <a 
                                        className="text-secondary mb-2" 
                                        href="#"
                                        onMouseEnter={animateLink}
                                    >
                                        <i className="bi bi-arrow-right text-primary me-2" />Food Menu
                                    </a>
                                    <a 
                                        className="text-secondary mb-2" 
                                        href="#"
                                        onMouseEnter={animateLink}
                                    >
                                        <i className="bi bi-arrow-right text-primary me-2" />Our Chefs
                                    </a>
                                    <a 
                                        className="text-secondary mb-2" 
                                        href="#"
                                        onMouseEnter={animateLink}
                                    >
                                        <i className="bi bi-arrow-right text-primary me-2" />Latest Blog
                                    </a>
                                    <a 
                                        className="text-secondary" 
                                        href="#"
                                        onMouseEnter={animateLink}
                                    >
                                        <i className="bi bi-arrow-right text-primary me-2" />Contact Us
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div 
                            className="d-flex flex-column align-items-center justify-content-center text-center h-100 p-5" 
                            style={{ background: '#111111' }}
                            ref={newsletterRef}
                        >
                            <h3 className="text-white mb-4 animate__animated animate__bounceIn">Newsletter</h3>
                            <h6 className="text-uppercase text-light mb-2 animate__animated animate__fadeIn animate__delay-1s">
                                Subscribe Our Newsletter
                            </h6>
                            <p className="small text-secondary mb-4 animate__animated animate__fadeIn animate__delay-2s">
                                Recibe las últimas recetas y cócteles directamente en tu email
                            </p>
                            <form action="#">
                                <div className="input-group animate__animated animate__zoomIn animate__delay-3s">
                                    <input 
                                        type="email" 
                                        className="form-control border-white p-3 animate__animated animate__pulse animate__infinite animate__slow" 
                                        placeholder="Tu Email" 
                                        required
                                    />
                                    <button 
                                        className="btn btn-primary animate__animated animate__pulse"
                                        type="submit"
                                        onClick={handleSubscribe}
                                    >
                                        Suscribirse
                                    </button>
                                </div>
                            </form>
                            <p className="text-muted small mt-3 animate__animated animate__fadeIn animate__delay-4s">
                                <i className="fas fa-lock me-1"></i>
                                Tu privacidad es importante para nosotros
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid py-4 py-lg-0 px-5" style={{ background: '#111111' }}>
                <div className="row gx-5">
                    <div className="col-lg-8">
                        <div className="py-lg-4 text-center">
                            <p className="text-secondary mb-0 animate__animated animate__fadeIn animate__delay-5s">
                                © <a className="text-light fw-bold animate__animated animate__flash animate__infinite animate__slower" href="#">Chefer</a>. 
                                Todos los Derechos Reservados.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="py-lg-4 text-center credit">
                            <p className="text-light mb-0 animate__animated animate__lightSpeedInRight animate__delay-5s">
                                Designed by <a className="text-light fw-bold" target="_blank" rel="noopener noreferrer" href="https://htmlcodex.com">HTML Codex</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            
        </div>
    );
};

export default Footer;