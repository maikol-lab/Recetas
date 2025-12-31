import React from 'react'

const InstagramStart = () => {
    return (
        <div className="container-fluid position-relative instagram p-0 mt-5">
            <a href className="d-flex align-items-center justify-content-center position-absolute top-50 start-50 translate-middle bg-white rounded-circle" style={{ width: 100, height: 100, zIndex: 1 }}>
                <i className="fab fa-instagram fa-2x text-secondary" />
            </a>
            <div className="row g-0">
                <div className="col-lg-2 col-md-3 col-sm-4 wow fadeIn" data-wow-delay="0.1s">
                    <img className="img-fluid" src="img/menu-2.jpg" alt />
                </div>
                <div className="col-lg-2 col-md-3 col-sm-4 wow fadeIn" data-wow-delay="0.2s">
                    <img className="img-fluid" src="img/menu-3.jpg" alt />
                </div>
                <div className="col-lg-2 col-md-3 col-sm-4 wow fadeIn" data-wow-delay="0.3s">
                    <img className="img-fluid" src="img/menu-4.jpg" alt />
                </div>
                <div className="col-lg-2 col-md-3 col-sm-4 wow fadeIn" data-wow-delay="0.4s">
                    <img className="img-fluid" src="img/menu-5.jpg" alt />
                </div>
                <div className="col-lg-2 col-md-3 col-sm-4 wow fadeIn" data-wow-delay="0.5s">
                    <img className="img-fluid" src="img/menu-6.jpg" alt />
                </div>
                <div className="col-lg-2 col-md-3 col-sm-4 wow fadeIn" data-wow-delay="0.6s">
                    <img className="img-fluid" src="img/menu-7.jpg" alt />
                </div>
            </div>
        </div>

    )
}

export default InstagramStart
