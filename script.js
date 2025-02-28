document.addEventListener('DOMContentLoaded', () => {
    const loaderWrapper = document.querySelector('.loader-wrapper');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loaderWrapper.style.opacity = '0';
            setTimeout(() => {
                loaderWrapper.style.display = 'none';
            }, 500);
        }, 1000);
    });

    const revealSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                const children = entry.target.children;
                Array.from(children).forEach((child, index) => {
                    child.style.animationDelay = `${index * 0.1}s`;
                });
                observer.unobserve(entry.target);
            }
        });
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15,
    });

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('opacity-0');
        sectionObserver.observe(section);
    });

    const products = document.querySelectorAll('.item');
    products.forEach(product => {
        product.addEventListener('mouseenter', (e) => {
            const img = e.currentTarget.querySelector('img');
            const itemName = e.currentTarget.querySelector('.item-name');
            const itemPrice = e.currentTarget.querySelector('.item-price');
            
            img.style.transform = 'scale(1.1) rotate(5deg)';
            itemName.style.color = 'var(--main-color)';
            itemPrice.style.transform = 'scale(1.1)';
        });

        product.addEventListener('mouseleave', (e) => {
            const img = e.currentTarget.querySelector('img');
            const itemName = e.currentTarget.querySelector('.item-name');
            const itemPrice = e.currentTarget.querySelector('.item-price');
            
            img.style.transform = 'scale(1) rotate(0)';
            itemName.style.color = '';
            itemPrice.style.transform = 'scale(1)';
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = `$${(progress * (end - start) + start).toFixed(2)}`;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    const priceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const price = parseFloat(entry.target.innerText.replace('$', ''));
                animateValue(entry.target, 0, price, 1000);
                priceObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.item-price').forEach(price => {
        priceObserver.observe(price);
    });
});