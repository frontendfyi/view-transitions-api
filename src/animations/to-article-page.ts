export const animateToArticlePage = (articlePath: string, content: string) => {
  const main = document.querySelector("main");
  const clickedArticle = document
    .querySelector(`.card a[href="${articlePath}"]`)
    ?.closest(".card");

  if (!main || !clickedArticle) return;

  const cardTitle = clickedArticle.querySelector("h2");
  if (cardTitle) cardTitle.style.viewTransitionName = "articletitle";

  const cardImage = clickedArticle.querySelector("img");
  if (cardImage) cardImage.style.viewTransitionName = "articleimage";

  document.startViewTransition(() => {
    main.innerHTML = content;
    document.documentElement.scrollTop = 0;
  });
};
