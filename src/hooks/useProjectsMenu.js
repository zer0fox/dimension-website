import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getCategories, categoryPath } from '@/data/siteData';
import useLanguage from './useLanguage';

export default function useProjectsMenu() {
    const { pathname } = useLocation();
    const { language, path } = useLanguage();
    const projectsPath = path('/projects');
    const isProjectsPath = pathname === projectsPath || pathname.startsWith(projectsPath + '/');
    const [open, setOpen] = useState(isProjectsPath);

    useEffect(() => {
        setOpen(isProjectsPath);
    }, [pathname, isProjectsPath]);
    const menuItems = getCategories(language).map((category) => ({
        slug: category.slug, name: category.name, to: path(categoryPath(category)),
    }));

    const toggle = (event) => {
        event.preventDefault();
        setOpen((isOpen) => !isOpen);
    };

    return { open, toggle, categories: menuItems };
}