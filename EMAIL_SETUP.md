# Simple Email Setup for contact@ferdienervida.com

## Option 1: Simple Mailto Link (Easiest)

Replace the form with a simple mailto link that opens the user's email client:

```html
<div class="contact-form" id="booking">
    <div class="form-info">
        <h3>Ready to Book?</h3>
        <p>Click the button below to send me an email directly:</p>
        <a href="mailto:contact@ferdienervida.com?subject=Booking Inquiry - Speaking/Training&body=Hi Ferdie,%0D%0A%0D%0AI'm interested in booking your services.%0D%0A%0D%0APlease include:%0D%0A- Your name%0D%0A- Your organization%0D%0A- Service needed (speaking/training/consultation)%0D%0A- Event details or requirements%0D%0A- Preferred dates%0D%0A%0D%0AThank you!" class="btn btn-primary btn-large">Send Email to contact@ferdienervida.com</a>
    </div>
</div>
```

## Option 2: Formspree (Recommended)

1. Go to [formspree.io](https://formspree.io)
2. Sign up for free account
3. Create a new form
4. Set the email to: `contact@ferdienervida.com`
5. Copy your form ID
6. Update the form action in `index.html`:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

## Option 3: Netlify Forms (If hosting on Netlify)

If you host on Netlify, add this to your form:
```html
<form name="contact" method="POST" data-netlify="true">
```

## Current Form Status
Your form is currently set up with EmailJS but needs configuration. The simplest solution is Option 1 (mailto link) which works immediately.

## Recommendation
Use **Option 1** for immediate results, then upgrade to **Option 2** (Formspree) for a better user experience. 