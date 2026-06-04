export const buildMenuTree = (menus) => {

    const parents =
        menus.filter(
            x => !x.parentMenuId
        );

    return parents
        .map(parent => ({
            ...parent,

            children: menus
                .filter(
                    x =>
                        x.parentMenuId ===
                        parent.menuId
                )
                .sort(
                    (a, b) =>
                        a.displayOrder -
                        b.displayOrder
                )
        }))
        .sort(
            (a, b) =>
                a.displayOrder -
                b.displayOrder
        );

};