document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('inquiryForm');
    const serviceInputs = document.querySelectorAll('input[name="service_type"]');
    const conditionalSections = document.querySelectorAll('.conditional-section');
    const subjectField = document.getElementById('subjectField');
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');
    const modal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const submitLabel = submitBtn.querySelector('.btn-text');

    const submitLabels = {
        'Speaking Inquiry': 'Send Speaking Request',
        'Training Inquiry': 'Send Training Request',
        'Crypto Recovery Case Evaluation': 'Send Case Evaluation Request',
        'Service Fit and Availability Inquiry': 'Send Service-Fit Inquiry'
    };

    function getSubmitLabel() {
        const selected = document.querySelector('input[name="service_type"]:checked')?.value || '';
        return submitLabels[selected] || 'Send Request';
    }

    function updateVisibleSection() {
        const selected = document.querySelector('input[name="service_type"]:checked')?.value || '';

        conditionalSections.forEach((section) => {
            const shouldShow = section.dataset.group === selected;
            section.hidden = !shouldShow;

            section.querySelectorAll('input, select, textarea').forEach((field) => {
                field.disabled = !shouldShow;
            });
        });

        subjectField.value = selected
            ? `${selected} | Ferdie Nervida Inquiry`
            : 'New Inquiry for Ferdie Nervida';

        submitLabel.textContent = getSubmitLabel();
    }

    function validateForm() {
        let isValid = true;

        form.querySelectorAll('.field-error').forEach((node) => node.remove());
        form.querySelectorAll('.is-error').forEach((node) => node.classList.remove('is-error'));

        const requiredSelectors = [
            '#fullName',
            '#email',
            'input[name="service_type"]:checked'
        ];

        requiredSelectors.forEach((selector) => {
            const field = form.querySelector(selector);
            if (!field) {
                isValid = false;
                const serviceGrid = document.querySelector('.service-grid');
                if (serviceGrid && !serviceGrid.querySelector('.field-error')) {
                    const error = document.createElement('p');
                    error.className = 'field-error';
                    error.textContent = 'Please select the type of request.';
                    serviceGrid.appendChild(error);
                }
                return;
            }

            if ('value' in field && !field.value.trim()) {
                showFieldError(field, 'This field is required.');
                isValid = false;
            }
        });

        const emailField = document.getElementById('email');
        if (emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
            showFieldError(emailField, 'Please enter a valid email address.');
            isValid = false;
        }

        return isValid;
    }

    function showFieldError(field, message) {
        field.classList.add('is-error');
        const error = document.createElement('p');
        error.className = 'field-error';
        error.textContent = message;
        field.parentNode.appendChild(error);
    }

    function setSubmittingState(isSubmitting) {
        submitBtn.disabled = isSubmitting;
        submitBtn.classList.toggle('is-loading', isSubmitting);
        submitLabel.textContent = isSubmitting ? 'Sending...' : getSubmitLabel();
        formStatus.textContent = isSubmitting ? 'Submitting your request...' : '';
    }

    function showSuccessModal() {
        modal.hidden = false;
        document.body.classList.add('modal-open');
    }

    function closeModal() {
        modal.hidden = true;
        document.body.classList.remove('modal-open');
    }

    serviceInputs.forEach((input) => {
        input.addEventListener('change', updateVisibleSection);
    });

    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !modal.hidden) {
            closeModal();
        }
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            formStatus.textContent = 'Please review the highlighted fields and try again.';
            return;
        }

        setSubmittingState(true);

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: new FormData(form)
            });

            const result = await response.json().catch(() => ({}));

            if (!response.ok || result.success === 'false') {
                throw new Error('Submission failed');
            }

            form.reset();
            updateVisibleSection();
            formStatus.textContent = '';
            showSuccessModal();
        } catch (error) {
            formStatus.textContent = 'There was a problem sending your request. Please try again or email contact@ferdienervida.com directly.';
        } finally {
            setSubmittingState(false);
        }
    });

    updateVisibleSection();
});
