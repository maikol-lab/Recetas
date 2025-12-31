import hero1 from '../assets/hero1.jpg';

const Hero = () => {
    return (
        <div className='container-fluid bg-gradient-custom py-5 animate__animated animate__fadeIn'>
            <div className='container'>
                <h3 className='text-center py-4 fw-bold text-primary animate__animated animate__bounceIn'>
                    API de TheCocktailDB
                </h3>
                <div className='row p-4 align-items-center'>
                    <div className='col-lg-8 mb-4 mb-lg-0'>
                        <div className='card border-0 shadow-lg p-4 animate__animated animate__slideInLeft'>
                            <h5 className='fw-semibold mb-3 animate__animated animate__fadeIn animate__delay-1s'>
                                <span className='text-primary animate__animated animate__pulse animate__infinite animate__slower'>El API de TheCocktailDB</span> es una fuente de datos
                                abierta y en línea que proporciona información sobre bebidas y cócteles de todo el mundo.
                                Es una API simple en formato JSON que ofrece una base de datos en línea de recetas de cócteles.
                                Puedes acceder a una amplia variedad de información, como el nombre de las bebidas, los
                                ingredientes, las imágenes y más.
                            </h5>
                            <h5 className='mb-4 animate__animated animate__fadeIn animate__delay-2s'>
                                El API de TheCocktailDB es utilizado por desarrolladores para crear aplicaciones y sitios
                                web relacionados con cócteles. También es utilizado por universidades para enseñar diseño
                                web y programación debido a su API fácil de usar y su contenido interesante.
                            </h5>
                            <div className='mt-4 animate__animated animate__fadeIn animate__delay-3s'>
                                <h6 className='fw-bold mb-3 text-secondary'>
                                    Algunas características y funcionalidades del API de TheCocktailDB incluyen:
                                </h6>
                                <ul className='list-group list-group-flush'>
                                    <li className='list-group-item d-flex align-items-start border-0 py-2 animate__animated animate__fadeInLeft'
                                        style={{ animationDelay: '0.1s' }}>
                                        <span className='badge bg-primary me-2 animate__animated animate__tada animate__delay-4s'>✓</span>
                                        Obtener una lista de todas las bebidas disponibles, junto con sus ingredientes y imágenes.
                                    </li>
                                    <li className='list-group-item d-flex align-items-start border-0 py-2 animate__animated animate__fadeInLeft'
                                        style={{ animationDelay: '0.2s' }}>
                                        <span className='badge bg-primary me-2 animate__animated animate__tada animate__delay-4s'>✓</span>
                                        Buscar bebidas por nombre, tipo, ingrediente, tipo de vaso, y más.
                                    </li>
                                    <li className='list-group-item d-flex align-items-start border-0 py-2 animate__animated animate__fadeInLeft'
                                        style={{ animationDelay: '0.3s' }}>
                                        <span className='badge bg-primary me-2 animate__animated animate__tada animate__delay-4s'>✓</span>
                                        Obtener información detallada sobre una bebida específica utilizando su ID.
                                    </li>
                                    <li className='list-group-item d-flex align-items-start border-0 py-2 animate__animated animate__fadeInLeft'
                                        style={{ animationDelay: '0.4s' }}>
                                        <span className='badge bg-primary me-2 animate__animated animate__tada animate__delay-4s'>✓</span>
                                        Buscar una selección de 10 bebidas al azar.
                                    </li>
                                    <li className='list-group-item d-flex align-items-start border-0 py-2 animate__animated animate__fadeInLeft'
                                        style={{ animationDelay: '0.5s' }}>
                                        <span className='badge bg-primary me-2 animate__animated animate__tada animate__delay-4s'>✓</span>
                                        Obtener imágenes en miniatura de bebidas y ingredientes.
                                    </li>
                                    <li className='list-group-item d-flex align-items-start border-0 py-2 animate__animated animate__fadeInLeft'
                                        style={{ animationDelay: '0.6s' }}>
                                        <span className='badge bg-primary me-2 animate__animated animate__tada animate__delay-4s'>✓</span>
                                        Filtrar bebidas por si son alcohólicas o no alcohólicas.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4'>
                        <div className='card border-0 shadow-lg overflow-hidden animate__animated animate__slideInRight animate__delay-1s'>
                            <img
                                src={hero1}
                                alt="Cócteles y bebidas"
                                className='img-fluid rounded-3 animate__animated animate__zoomIn animate__delay-2s'
                                style={{
                                    height: '100%',
                                    objectFit: 'cover',
                                    minHeight: '500px'
                                }}
                            />
                            <div className='card-img-overlay d-flex flex-column justify-content-end bg-gradient-overlay animate__animated animate__fadeInUp animate__delay-3s'>
                                <div className='p-3'>
                                    <span className='badge bg-light text-dark mb-2 animate__animated animate__bounceIn animate__delay-4s'>
                                        Fuente de datos abierta
                                    </span>
                                    <h6 className='text-white mb-0 animate__animated animate__fadeIn animate__delay-4s'>
                                        Cientos de recetas de cócteles disponibles
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;