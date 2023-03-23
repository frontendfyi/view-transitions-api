import { animateToArticlePage } from "./animations/to-article-page";
import { animateToHome } from "./animations/to-home";
import "./style.css";

window.navigation.addEventListener("navigate", (navigateEvent) => {
  const nextUrl = new URL(navigateEvent.destination.url);
  const currentUrl = new URL(navigation?.currentEntry?.url || "");

  if (shouldNotIntercept(navigateEvent)) return;

  navigateEvent.intercept({
    async handler() {
      const content = await getNewContent(nextUrl);

      if (nextUrl.pathname.indexOf("/articles") === -1) {
        animateToHome(currentUrl.pathname, content || "");
      } else {
        animateToArticlePage(nextUrl.pathname, content || "");
      }
    },
  });
});

/**
 * Small helper function that decides if we should intercept the navigation or not.
 * Especially when a hash changes or for example a download is trigger, that's not
 * something we want to animate. This method might not be complete, but does
 * give you some ideas in which scenarios you might not want to  intercept the navigation.
 */
const shouldNotIntercept = (navigateEvent: NavigateEvent) => {
  const nextUrl = new URL(navigateEvent.destination.url);

  // Don't animate anything if we're leaving to another domain.
  if (location.origin !== nextUrl.origin) return true;

  // If we're going to the same page, this could be hot reloading on localhost,
  // we don't intercept there.
  if (nextUrl.pathname === window.location.pathname || !nextUrl.pathname) {
    return true;
  }

  if (
    !navigateEvent.canIntercept ||
    navigateEvent.hashChange ||
    navigateEvent.formData ||
    navigateEvent.downloadRequest
  ) {
    return true;
  }
  return false;
};

const getNewContent = async (url: URL) => {
  const page = await fetch(url);
  const data = await page.text();
  const mainTagContent = data.match(/<main>(.*?)<\/main>/s)?.[1];

  return mainTagContent;
};
