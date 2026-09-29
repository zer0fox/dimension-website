import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import { basename } from './data/siteData';

export { getPageMeta, getRoutes } from './seo/meta';
export { headHtml, sitemapXml, llmsTxt } from './seo/files';

export function render(url) {
    return renderToString(
        <StrictMode>
            <StaticRouter basename={basename} location={basename === '/' ? url : basename + url}>
                <App />
            </StaticRouter>
        </StrictMode>,
    );
}