export const animateToHome = (articlePath: string, content: string) => {
  document.startViewTransition(() => {
    const main = document.querySelector("main");
    if (!main) return;
    main.innerHTML = content;

    const articleCard = document
      .querySelector<HTMLAnchorElement>(`.card a[href="${articlePath}"]`)
      ?.closest(".card");

    if (!articleCard) return;

    const title = articleCard.querySelector("h2");
    if (title) title.style.viewTransitionName = "articletitle";

    const img = articleCard.querySelector("img");
    if (img) img.style.viewTransitionName = "articleimage";

    document.documentElement.scrollTop = 0;
  });
};
