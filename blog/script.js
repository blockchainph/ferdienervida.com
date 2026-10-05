document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.ds-nav').forEach((nav) => {
        const toggle = nav.querySelector('.ds-nav-toggle');
        const links = nav.querySelector('.ds-nav-links');
        if (!toggle || !links) return;

        toggle.addEventListener('click', () => {
            const isOpen = links.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', String(isOpen));
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (event) {
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;
            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    const article = document.querySelector('.article-page-card .post-content');
    const articleMeta = document.querySelector('.article-page-card .post-meta');
    if (article && articleMeta) {
        const wordCount = article.textContent.trim().split(/\s+/).length;
        const readingTime = Math.max(1, Math.ceil(wordCount / 220));
        const readingTimeElement = document.createElement('div');
        readingTimeElement.className = 'reading-time';
        readingTimeElement.innerHTML = `<span>${readingTime} min read</span>`;
        articleMeta.appendChild(readingTimeElement);
    }

    if (document.body.classList.contains('article-template')) {
        import('/blog/engagement.js').catch((error) => {
            console.error('Blog engagement module failed to load.', error);
        });
    }
});
