const encodeHTML = (str) => {
    return str
        .replace(/javascript:/gi, '')
        .replace(/[^\w-_. ]/gi, function (c) {
            return `&#${c.charCodeAt(0)};`;
        });
};

let data = null;

const mainNewsTemplate = document.getElementById('main-news-item');
const smallNewsTemplate = document.getElementById('small-article-item');
const mainNewsContainer = document.querySelector('.articles__big-column');
const smallNewsContainer = document.querySelector('.articles__small-column');

const renderNews = (categoryId) => {
    fetch(
        'http://frontend.karpovcourses.net/api/v2/ru/news/' + (categoryId ?? '')
    )
        .then((response) => response.json())
        .then((responseData) => {
            data = responseData;

            console.log('data: ', data);

            const mainNews = data?.items?.slice(0, 3);
            const smallNews = data?.items?.slice(3, 12);

            mainNews.forEach((item) => {
                const template = document.createElement('template');
                const categoryData = data.categories.find(
                    (el) => el.id === item.category_id
                );
                const sourceData = data.sources.find(
                    (el) => el.id === item.source_id
                );

                template.innerHTML = `
    <article class="main-article">
                <div class="main-article__image-container">
                    <img
                        class="main-article__image"
                        src="${encodeHTML(item.image)}"
                        alt="Фото новости"
                    />
                </div>
                <div class="main-article__content">
                    <span class="article-category main-article__category"
                        >${categoryData?.name}</span
                    >
                    <h2 class="main-article__title">
                       ${encodeHTML(item.title)}
                    </h2>
                    <p class="main-article__text">
                        ${encodeHTML(item.description)}
                    </p>
                    <span class="article-source main-article__source"
                        >${encodeHTML(sourceData?.name)}</span
                    >
                </div>
            </article>
    `;

                mainNewsContainer?.appendChild(template.content);
            });

            smallNews.forEach((item) => {
                const template = document.createElement('template');

                const sourceData = data.sources.find(
                    (el) => el.id === item.source_id
                );

                const dateData = new Date(item.date).toLocaleDateString(
                    'ru-RU',
                    {
                        month: 'long',
                        day: 'numeric',
                    }
                );

                template.innerHTML = `
   <article class="small-article">
                <h2 class="small-article__title">
                    ${encodeHTML(item.title)}
                </h2>
                <p class="small-article__caption">
                    <span class="article-date small-article__date"
                        >${dateData}</span
                    >
                    <span class="article-source small-article__source"
                        >${encodeHTML(sourceData?.name)}</span
                    >
                </p>
            </article>
    `;

                smallNewsContainer?.appendChild(template.content);
            });
        });
};
