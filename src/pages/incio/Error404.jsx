import React from 'react'

const Error404 = () => {
    return (
        <div className="container-fluid py-5 min-vh-100 d-flex align-items-center animate__animated animate__fadeIn">
            <div className="container text-center">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        {/* Ícono con animación de advertencia */}
                        <i className="bi bi-exclamation-triangle display-1 text-primary mb-4 animate__animated animate__tada animate__infinite" />
                        
                        {/* Número 404 con animación de rebote */}
                        <h1 className="display-1 fw-bold text-dark mb-3 animate__animated animate__bounceIn animate__delay-1s">
                            404
                        </h1>
                        
                        {/* Título con animación de entrada */}
                        <h1 className="mb-4 text-uppercase fw-bold animate__animated animate__fadeInDown animate__delay-2s">
                            <span className="text-danger">Página</span> No Encontrada
                        </h1>
                        
                        {/* Mensaje descriptivo con animación */}
                        <p className="mb-4 fs-5 text-muted animate__animated animate__fadeInUp animate__delay-3s">
                            ¡Ups! La página que estás buscando parece haberse esfumado en el aire...
                            <br />
                            <small className="text-muted mt-2 d-block">
                                Como un cóctel que desaparece antes de probarlo
                            </small>
                        </p>
                        
                        {/* Mensaje adicional con animación de latido */}
                        <div className="alert alert-warning animate__animated animate__heartBeat animate__delay-4s mb-5">
                            <i className="fas fa-cocktail me-2"></i>
                            No se encontraron resultados que coincidan con tu búsqueda
                        </div>
                        
                        {/* Botón con animación hover */}
                        <div className="animate__animated animate__zoomIn animate__delay-5s">
                            <a 
                                className="btn btn-primary btn-lg rounded-pill py-3 px-5 shadow-lg"
                                href="/"
                                onMouseEnter={(e) => e.currentTarget.classList.add('animate__pulse')}
                                onMouseLeave={(e) => e.currentTarget.classList.remove('animate__pulse')}
                                style={{
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    border: 'none',
                                    fontWeight: '600',
                                    transition: 'all 0.3s ease',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                <i className="fas fa-home me-2 animate__animated animate__bounce animate__delay-6s"></i>
                                Volver al Inicio
                                <span className="position-absolute top-50 start-100 translate-middle badge rounded-pill bg-warning text-dark animate__animated animate__flash animate__infinite">
                                    <i className="fas fa-arrow-right"></i>
                                </span>
                            </a>
                        </div>
                        
                        {/* Animación decorativa de cócteles */}
                        <div className="mt-5 animate__animated animate__fadeIn animate__delay-6s">
                            <div className="row justify-content-center">
                                <div className="col-auto">
                                    <i className="fas fa-glass-martini-alt text-primary fs-1 mx-3 animate__animated animate__swing animate__infinite animate__slower"></i>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-wine-bottle text-success fs-1 mx-3 animate__animated animate__swing animate__infinite animate__slower animate__delay-1s"></i>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-cocktail text-danger fs-1 mx-3 animate__animated animate__swing animate__infinite animate__slower animate__delay-2s"></i>
                                </div>
                            </div>
                        </div>
                        
                        {/* Texto de ayuda con animación sutil */}
                        <div className="mt-4 animate__animated animate__fadeIn animate__delay-7s">
                            <p className="text-muted small">
                                <i className="fas fa-lightbulb me-1 text-warning animate__animated animate__flash animate__infinite animate__slower"></i>
                                <strong>Consejo:</strong> Prueba con otra búsqueda o navega por nuestras categorías de cócteles
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Error404