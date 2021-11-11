(() => {
    const selectors = {
        container: '.animation-container',
        item: '.animation-item'
    }

    const modifiers = {
        active: 'animation-item_active'
    }

    const observerOptions = {
        threshold: 0.4,
    }

    const observerCallback = (entries, observer) => {
        entries.forEach((entry) => {
            if(!entry.isIntersecting) {
                return;
            }

            const {target} = entry;
            target.querySelector(selectors.item).classList.add(modifiers.active);
            observer.unobserve(target);
        })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    window.addEventListener('load', () => {
        const animationContainers = document.querySelectorAll(selectors.container);

        animationContainers.forEach(container => {
            observer.observe(container);
        })
    })
})()