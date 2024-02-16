type categoryIdsType = {
    [index: string]: number | string;
    sport: number;
    technologies: number;
    karpov: number;
    fashion: number;
};

type categoryNamesType = {
    [index: string]: string;
    sport: string;
    technologies: string;
    karpov: string;
    fashion: string;
};

export const categoryIds: categoryIdsType = {
    index: 0,
    sport: 2,
    technologies: 1,
    karpov: 6,
    fashion: 3,
} as const;

export const categoryNames: categoryNamesType = {
    index: 'Главная',
    fashion: 'Мода',
    technologies: 'Технологии',
    sport: 'Спорт',
    karpov: 'Karpov',
};
