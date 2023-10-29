This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Technological Decisions and Design Choices

## Technologies

Given our group's technological stack and the anticipated requirements of the project, I made the following decisions:

- **Next.js**: This framework offers out-of-the-box optimizations, especially concerning image and route handling.
- **Tailwind**: Integrated for a streamlined and efficient CSS framework.
- **Class Variant Authority**: Chosen for establishing our custom design system.
- **Shadcn**: This unopinionated, radix-based UI library complements our tech stack. It also supports server-side rendering without hydration issues.

## Website Design and Challenges

- **ID-Based Routing**: Adopted to facilitate direct device or room access via links. Such a design offers multiple benefits:
    - Clean representation of pages and code.
    - Leveraging Next.js's server-side rendering and caching.
    - Enhanced speed and efficiency.
    - Simplified debugging and testing as compared to popup-based navigation.

Example Routes:
- `localhost:3000/room/123`
- `localhost:3000/device/123`

Considering potential future needs, we might:
- Incorporate localization.
- Track page speed, information, and other relevant metrics. The ID-based structure is more apt for these purposes.

## Code Structure

- **UI Folder**: Contains minimal, reusable components, primarily design-system specific. They serve a single purpose.
- **Molecules**: These group multiple UI components while retaining a singular focus. They aren't tasked with data fetching.
- **Organisms**: Aggregates of several molecules, responsible for data fetching and rendering specific molecules.
- **Pages Folder**: Established to make certain pages reusable. While Next.js offers some route handling utilities, custom pages enhance reusability.
- **API Folders**: Functioning like a middleware (akin to BFF), they elevate the data transformation logic from the frontend to middleware. Given Next.js's caching capabilities for API endpoints, this also boosts performance during backend data fetches. This layer obfuscates our backend URLs and methods, adding an extra layer of security.
- **Server Components**: Certain components are designed this way to enable data fetching within the server. With the advent of React 18, we can also harness the power of streaming. By wrapping these components in Suspense, the UI remains unblocked during data fetching, allowing for skeleton displays.

## Future Enhancements

If granted more time, I would:

- Establish connections with a real-time database for both real-time info and historical data.
- Implement universal logging.
- Craft unit tests using Jest.
- Design end-to-end tests using Playwright.
- Launch a dedicated device information page.


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
