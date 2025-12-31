import React from 'react'

const Contact = () => {
    return (
        <div className="container-fluid p-5 animate__animated animate__fadeIn">
            <div className="mb-5 text-center animate__animated animate__fadeInDown" data-wow-delay="0.1s" style={{ maxWidth: 700, margin: 'auto' }}>
                <h5 className="section-title text-primary animate__animated animate__flipInX">Contact Us</h5>
                <h1 className="display-3 fw-bold animate__animated animate__bounceIn">Get In Touch</h1>
                <p className="mb-4 animate__animated animate__fadeIn animate__delay-1s">The contact form is currently inactive. Get a functional and working contact form with Ajax &amp; PHP in a few minutes. Just copy and paste the files, add a little code and you're done. <a href="https://htmlcodex.com/contact-form" className="text-primary fw-bold animate__animated animate__pulse animate__infinite">Download Now</a>.</p>
            </div>
            <div className="row g-5 mb-5">
                <div className="col-lg-4">
                    <div className="d-flex flex-column align-items-center bg-light rounded text-center py-5 px-3 animate__animated animate__fadeInLeft"
                        onMouseEnter={(e) => e.currentTarget.classList.add('animate__animated', 'animate__pulse')}
                        onMouseLeave={(e) => e.currentTarget.classList.remove('animate__animated', 'animate__pulse')}>
                        <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center mb-3 animate__animated animate__bounceIn" style={{ width: 60, height: 60 }}>
                            <i className="fa fa-map-marker-alt fs-4 text-white animate__animated animate__tada" />
                        </div>
                        <h3 className="animate__animated animate__fadeInDown">Visit Us</h3>
                        <p className="mb-0 animate__animated animate__fadeIn animate__delay-1s">123 Street, New York, USA</p>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="d-flex flex-column align-items-center bg-light rounded text-center py-5 px-3 animate__animated animate__fadeInUp"
                        onMouseEnter={(e) => e.currentTarget.classList.add('animate__animated', 'animate__pulse')}
                        onMouseLeave={(e) => e.currentTarget.classList.remove('animate__animated', 'animate__pulse')}>
                        <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center mb-3 animate__animated animate__bounceIn animate__delay-1s" style={{ width: 60, height: 60 }}>
                            <i className="fa fa-envelope fs-4 text-white animate__animated animate__rubberBand" />
                        </div>
                        <h3 className="animate__animated animate__fadeInDown">Email Us</h3>
                        <p className="mb-0 animate__animated animate__fadeIn animate__delay-2s">info@example.com</p>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="d-flex flex-column align-items-center bg-light rounded text-center py-5 px-3 animate__animated animate__fadeInRight"
                        onMouseEnter={(e) => e.currentTarget.classList.add('animate__animated', 'animate__pulse')}
                        onMouseLeave={(e) => e.currentTarget.classList.remove('animate__animated', 'animate__pulse')}>
                        <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center mb-3 animate__animated animate__bounceIn animate__delay-2s" style={{ width: 60, height: 60 }}>
                            <i className="fa fa-phone fs-4 text-white animate__animated animate__swing" />
                        </div>
                        <h3 className="animate__animated animate__fadeInDown">Call Us</h3>
                        <p className="mb-0 animate__animated animate__fadeIn animate__delay-3s">+012 345 6789</p>
                    </div>
                </div>
            </div>
            <div className="row g-5">
                <div className="col-lg-6">
                    <div className="bg-light rounded h-100 p-5 animate__animated animate__slideInLeft">
                        <form>
                            <div className="row g-3">
                                <div className="col-6 animate__animated animate__fadeInLeft" style={{ animationDelay: '0.1s' }}>
                                    <input type="text" className="form-control bg-white border-0 px-4" placeholder="Your Name" style={{ height: 55 }}
                                        onFocus={(e) => e.target.classList.add('animate__animated', 'animate__headShake')}
                                        onBlur={(e) => e.target.classList.remove('animate__animated', 'animate__headShake')} />
                                </div>
                                <div className="col-6 animate__animated animate__fadeInRight" style={{ animationDelay: '0.2s' }}>
                                    <input type="email" className="form-control bg-white border-0 px-4" placeholder="Your Email" style={{ height: 55 }}
                                        onFocus={(e) => e.target.classList.add('animate__animated', 'animate__headShake')}
                                        onBlur={(e) => e.target.classList.remove('animate__animated', 'animate__headShake')} />
                                </div>
                                <div className="col-12 animate__animated animate__fadeInUp" style={{ animationDelay: '0.3s' }}>
                                    <input type="text" className="form-control bg-white border-0 px-4" placeholder="Subject" style={{ height: 55 }}
                                        onFocus={(e) => e.target.classList.add('animate__animated', 'animate__headShake')}
                                        onBlur={(e) => e.target.classList.remove('animate__animated', 'animate__headShake')} />
                                </div>
                                <div className="col-12 animate__animated animate__fadeInUp" style={{ animationDelay: '0.4s' }}>
                                    <textarea className="form-control bg-white border-0 px-4 py-3" rows={4} placeholder="Message" defaultValue={""}
                                        onFocus={(e) => e.target.classList.add('animate__animated', 'animate__headShake')}
                                        onBlur={(e) => e.target.classList.remove('animate__animated', 'animate__headShake')} />
                                </div>
                                <div className="col-12 animate__animated animate__zoomIn" style={{ animationDelay: '0.5s' }}>
                                    <button className="btn btn-primary w-100 py-3 animate__animated animate__pulse animate__infinite animate__slower"
                                        type="submit"
                                        onMouseEnter={(e) => e.currentTarget.classList.add('animate__animated', 'animate__tada')}
                                        onMouseLeave={(e) => e.currentTarget.classList.remove('animate__animated', 'animate__tada')}>
                                        <i className="fas fa-paper-plane me-2 animate__animated animate__bounce"></i>Send Message
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-lg-6">
                    <iframe className="w-100 rounded animate__animated animate__slideInRight"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001156.4288297426!2d-78.01371936852176!3d42.72876761954724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ccc4bf0f123a5a9%3A0xddcfc6c1de189567!2sNew%20York%2C%20USA!5e0!3m2!1sen!2sbd!4v1603794290143!5m2!1sen!2sbd"
                        frameBorder={0}
                        style={{ height: '100%', minHeight: 300, border: 0 }}
                        allowFullScreen
                        aria-hidden="false"
                        tabIndex={0}
                        title="Mapa de ubicación" />
                </div>
            </div>
        </div>
    )
}

export default Contact;