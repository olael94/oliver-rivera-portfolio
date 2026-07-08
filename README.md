# Oliver Rivera's Portfolio

[![Live Site](https://img.shields.io/badge/Live-oliver--rivera--portfolio.vercel.app-84cc16?style=flat&labelColor=1a1a1a)](https://oliver-rivera-portfolio.vercel.app)

![Portfolio Preview](./public/images/portfolioView.png)

Personal portfolio showcasing my projects, skills, and experience as a Software Engineer.

## Features

- Scroll-driven section animations and direction-aware reveals
- Hero photo card with neumorphic frame, gradient backdrop, and hover parallax
- Horizontal project showcase with scroll-jacking
- Contact form with server-side email delivery via Nodemailer
- WebGL fluid ambient background (desktop only), dark/light mode

## Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Motion](https://img.shields.io/badge/Motion-84cc16?style=flat&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)
![Nodemailer](https://img.shields.io/badge/Nodemailer-22B573?style=flat&logoColor=white)

## Design

Neumorphic design language with a lime accent throughout; soft depth on cards and
icons, scroll-driven section color shifts, and a WebGL fluid ambient background on
desktop. The hero photo card uses a background-removed cutout over a procedurally
generated gradient with a diagonal hatch texture.

Key decisions:

- Mobile-first layout that degrades gracefully (WebGL disabled on touch devices)
- Scroll-reveal animations driven by scroll direction, not just IntersectionObserver
- Contact form handled server-side via Nodemailer. No third-party form services

## Run Locally

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000

## Deployment

Deployed automatically to Vercel on every push to `main`.

## Contact

[orivera94@gmail.com](mailto:orivera94@gmail.com)