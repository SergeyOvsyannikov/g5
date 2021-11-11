document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider');

    const slides = document.querySelectorAll('.js_slide');
    const frame = document.querySelector('.frame');

    const width = frame.closest('.container').offsetWidth - 40;
    frame.style.width = width + 'px';

    slides.forEach(slide => {
        slide.style.width = width + 'px'; // для нормальной работы слайдера
    })

    const lorySlider = lory(slider, {
        infinite: 1
    });

    const observerOptions = {
        threshold: 0.9,
    }

    let timeoutId = null;

    const animationSlider = () => {
        timeoutId = setTimeout(() => {
            lorySlider.next();
        }, 3000)
    }

    slider.addEventListener('after.lory.slide', () => {
            clearTimeout(timeoutId);
            animationSlider()
        }
    )

    const observerCallback = (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                if (timeoutId) {
                    clearTimeout(timeoutId)
                }
                return;
            }
            animationSlider();
        })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    observer.observe(slider);
});