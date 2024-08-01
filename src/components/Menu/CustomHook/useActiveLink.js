import { useState } from 'react';

const useActiveLink = (initialPath) => {
    const [activeLink, setActiveLink] = useState(initialPath);

    const handleLinkClick = (path) => {
        setActiveLink(path);
    };

    return [activeLink, handleLinkClick];
};

export default useActiveLink;
