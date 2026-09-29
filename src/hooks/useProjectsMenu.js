import { useState } from 'react';
import { categories, categoryPath } from '@/data/siteData';

const menuItems = categories.map((category) => ({
    slug: category.slug,
    name: category.name,
    to: categoryPath(category),
}));

export default function useProjectsMenu() {
    const [open, setOpen] = useState(false);

    const toggle = (event) => {
        event.preventDefault();
        setOpen((isOpen) => !isOpen);
    };

    return { open, toggle, categories: menuItems };
}