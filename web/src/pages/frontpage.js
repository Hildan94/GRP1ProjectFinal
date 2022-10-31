import {observer} from "mobx-react-lite";
import anime from "animejs";
import {useEffect} from "react";


function Frontpage() {
    let current = null;

    useEffect(() => {
        document.querySelector('#email').addEventListener('focus', function (e) {
            if (current) current.pause();
            current = anime({
                targets: 'path',
                strokeDashoffset: {
                    value: 0,
                    duration: 700,
                    easing: 'easeOutQuart'
                },
                strokeDasharray: {
                    value: '240 1386',
                    duration: 700,
                    easing: 'easeOutQuart'
                }
            });
        });
        document.querySelector('#Password').addEventListener('focus', function (e) {
            if (current) current.pause();
            current = anime({
                targets: 'path',
                strokeDashoffset: {
                    value: -336,
                    duration: 700,
                    easing: 'easeOutQuart'
                },
                strokeDasharray: {
                    value: '240 1386',
                    duration: 700,
                    easing: 'easeOutQuart'
                }
            });
        });
        document.querySelector('#submit').addEventListener('focus', function (e) {
            if (current) current.pause();
            current = anime({
                targets: 'path',
                strokeDashoffset: {
                    value: -730,
                    duration: 700,
                    easing: 'easeOutQuart'
                },
                strokeDasharray: {
                    value: '530 1386',
                    duration: 700,
                    easing: 'easeOutQuart'
                }
            });
        });
    })

    return (
        <div className="container">
            <div className="iphone">
                <div className="header">
                    <div className="order-summary">
                        <div className="order-status">Arriving date</div>
                        <div className="order-date">
                            19 April, 2022
                        </div>
                        <div className="order-day">
                            Friday
                        </div>
                    </div>
                    <div className="action-btn">
                        <div className="back-btn"><i className="far fa-long-arrow-left"></i></div>
                    </div>
                </div>
                <div className="hero-img-container">
                    <div className="triangle1"></div>
                    <div className="arc"></div>
                    <div className="pattern"></div>
                </div>
                <div className="order-status-container">
                    <div className="status-item first">
                        <div className="status-circle"></div>
                        <div className="status-text">
                            today
                        </div>
                    </div>
                    <div className="status-item second">
                        <div className="status-circle"></div>
                        <div className="status-text">
                            Shipped
                        </div>
                    </div>
                    <div className="status-item">
                        <div className="status-circle"></div>
                        <div className="status-text green">
                            <span>Out</span><span>for delivery</span>
                        </div>
                    </div>
                    <div className="status-item">
                        <div className="status-circle"></div>
                        <div className="status-text green">
                            <span>Ariving</span>
                            <span>03&nbsp;-&nbsp;21</span>
                        </div>
                    </div>
                </div>
                <div className="order-details-container">
                    <div className="odc-header">
                        <div className="cta-text">See your product details</div>
                        <div className="cta-button-container">
                            <button className="cta-button">View</button>
                        </div>
                    </div>
                    <div className="odc-wrapper">
                        <div className="odc-header-line">
                            Your order details
                        </div>
                        <div className="odc-header-details">
                            Your product details (order 040-904-790)
                        </div>
                        <div className="product-container">
                            <div className="product">
                                <div className="product-photo">
                                </div>
                                <div className="product-desc">
                                    <span>Nike Air Jordan 1</span>
                                    <span>9740 INR</span>
                                </div>
                            </div>
                            <div className="product">
                                <div className="product-photo">
                                </div>
                                <div className="product-desc">
                                    <span>Alex rider: Never say die Novel 12</span>
                                    <span>655 INR</span>
                                </div>
                            </div>
                        </div>
                        <a href="order-cancellationReqtoken12.netlify.app">
                            <div className="cancellation">
                                Request Cancellation
                            </div>
                        </a>
                        <div className="shipping-desc">Your Shipping Address</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Frontpage;