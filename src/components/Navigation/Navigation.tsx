import React, { FC } from 'react';
import { categoryNames } from '../../utils';
import './Navigation.css';
import logo from '../../assets/logo.svg';

type NavigationType = {
    currentCategory: string;
    onNavClick: (e: React.MouseEvent<HTMLElement>) => void;
    placement: string;
    className: string;
};

export const Navigation: FC<NavigationType> = ({
    onNavClick,
    currentCategory,
    className = '',
    placement = 'header',
}) => {
    return (
        <nav
            className={`grid navigation navigation--${placement} ${className}`}
        >
            <a className="navigation__logo" data-href="index" href="#">
                <img
                    className="navigation__logo-image"
                    src={logo}
                    alt="Логотип"
                />
            </a>
            <ul className="navigation__list">
                {['index', 'fashion', 'technologies', 'sport', 'karpov'].map(
                    (item) => {
                        return (
                            <li className="navigation__item" key={item}>
                                <a
                                    onClick={onNavClick}
                                    className={`navigation__link ${
                                        currentCategory === item
                                            ? 'navigation__link--active'
                                            : ''
                                    }`}
                                    data-href={item}
                                    href="#"
                                >
                                    {categoryNames[item]}
                                </a>
                            </li>
                        );
                    }
                )}
            </ul>
        </nav>
    );
};
