import { useState } from 'react';
import { getCategories, categoryPath } from '@/data/siteData';
import useLanguage from './useLanguage';

export default function useProjectsMenu() {
    const [open, setOpen] = useState(false);
    const { language, path } = useLanguage();
    const menuItems = getCategories(language).map((category) => ({
        slug: category.slug, name: category.name, to: path(categoryPath(category)),
    }));

    const toggle = (event) => {
        event.preventDefault();
        setOpen((isOpen) => !isOpen);
    };

    return { open, toggle, categories: menuItems };
}