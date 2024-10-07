import Elysia, { error, t } from "elysia";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware";
import { stringValidation } from "../error/validation.error";

interface Article {
    source: {
        id: string | null;
        name: string;
    };
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string;
}

const NewsRoute = new Elysia()
    .use(isAuthenticated)
    .get("/news", async () => {
        try {
            const API_KEY = '287d64adade74b9b832258f2e7af85cd';
            const query = 'climate starvation conflict';

            const response = await fetch(`https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${API_KEY}`);
            const data = await response.json();

            if (!response.ok) {
                return {
                    success: false,
                    message: data.message || 'Failed to fetch news',
                };
            }

            // Ensure the data.articles is an array of Article
            const filteredArticles = (data.articles as Article[]).filter(article => {
                return article.title && article.description && article.author;
            });

            return {
                success: true,
                messsage : "success",
                articles: filteredArticles,
            };

        } catch (err) {
            throw err
        }
    }, {
        headers: t.Object({
            authorization: t.String({
                example: "Bearer 12345",
                error({ errors }) {
                    stringValidation("header", 1, 500, errors);
                }
            }),
        }),

        detail: {
            summary: "news api",
            tags: ["News"],
        }
    });

export default NewsRoute;
