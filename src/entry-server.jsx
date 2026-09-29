import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';

export { getPageMeta, getRoutes } from './seo/meta';
export { headHtml, sitemapXml, llmsTxt } from './seo/files';

export function render(url) {
    return renderToString(
        <StrictMode>
            <StaticRouter location={url}>
                <App />
            </StaticRouter>
        </StrictMode>,
    );
}