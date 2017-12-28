const collisionBtn = (obj1, obj2) => {
    const distanceX = obj1.x >= obj2.x && obj1.x <= obj2.x + 110;
    const distanceY = obj1.y >= obj2.y && obj1.y <= obj2.y + 50;

    return (distanceX && distanceY);
};

const collisionMeteor = (obj1, obj2) => {
    const distanceX = (obj1.x - obj2.x) * (obj1.x - obj2.x);
    const distanceY = (obj1.y - obj2.y) * (obj1.y - obj2.y);

    const distanceSquared = distanceX + distanceY;
    const radiiSquared = (obj2.radius * 2) * (obj2.radius * 2);

    return distanceSquared < radiiSquared;
};

const randomize = (max, min) => Math.round(Math.random() * (max - min)) + min;

export { collisionBtn,
         collisionMeteor,
         randomize };
