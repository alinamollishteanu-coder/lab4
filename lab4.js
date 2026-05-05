class Item {
    /**
         * Конструктор класса - вызывается при создании нового объекта
         * @param {string} name - название предмета
         * @param {number} weight - вес предмета
         * @param {string} rarity - редкость предмета (common, uncommon, rare, legendary)
         */

    constructor(name, weight, rarity) {
        this.name = name;
        this.weight = weight;
        this.rarity = rarity;
    }

    /**
         * Метод getInfo - возвращает информацию о предмете
         * @returns {string} строка с описанием предмета
         */
    getInfo() {
        return `Предмет: ${this.name}, Вес: ${this.weight}, Редкость: ${this.rarity}`;
    }

    /**
     * Метод setWeight - изменяет вес предмета
     * @param {number} newWeight - новый вес предмета
     */
    setWeight(newWeight) {
        this.weight = newWeight;
        console.log(`Вес предмета "${this.name}" изменён на ${this.weight}`)
    }

}


/**
 * Класс Weapon - представляет оружие, наследуется от класса Item
 * @class Weapon
 * @extends Item
 */
class Weapon extends Item {
    /**
     * Конструктор класса Weapon
     * @param {string} name - название оружия
     * @param {number} weight - вес оружия
     * @param {string} rarity - редкость оружия
     * @param {number} damage - урон оружия
     * @param {number} durability - прочность оружия (0-100)
     */
    constructor(name, weight, rarity, damage, durability) {
        super(name, weight, rarity);//вызывает конструктор родительского класса Item

        this.damage = damage;
        this.durability = durability;
    }

    /**
    * Метод use - использует оружие, уменьшая его прочность
    */
    use() {
        if (this.durability > 0) {
            this.durability -= 10;
            console.log(`Оружие "${this.name}" использовано. Прочность: ${this.durability}`);
        } else {
            console.log(`Оружие "${this.name}" сломано! Нельзя использовать.`);
        }

    }
    /**
    * Метод repair - восстанавливает прочность до 100
    */
    repair() {
        this.durability = 100;
    }
    /**
     * Переопределённый метод getInfo - возвращает информацию об оружии
    * @returns { string } строка с описанием оружия
        */
    getInfo() {
        const baseInfo = super.getInfo(); // вызываем родительский метод getInfo
        return `${baseInfo}, Урон: ${this.damage}, Прочность: ${this.durability}`;
    }
}


//test class Item
const sword = new Item("Steel Sword", 3.5, "rare");
console.log(sword.getInfo());

sword.setWeight(4.0);

const healthPotion = new Item("Health Potion", 0.5, "common");
console.log(healthPotion.getInfo());


//test class Weapon
const bow = new Weapon("Longbow", 2.0, "uncommon", 15, 100);
console.log(bow.getInfo());

console.log("\n- Использование оружия -");
bow.use();   // 1
bow.use();   // 2
console.log(`Текущая прочность: ${bow.durability}`);

console.log("\n- Ремонт оружия -");
bow.repair();
console.log(`Прочность после ремонта: ${bow.durability}`);






//ФУНКЦИИ-КОНСТРУКТОРЫ
function ItemConstructor(name, weight, rarity) {
    this.name = name;
    this.weight = weight;
    this.rarity = rarity;
}

ItemConstructor.prototype.getInfo = function () {
    return `Предмет: ${this.name}, Вес: ${this.weight}, Редкость: ${this.rarity}`;
};

ItemConstructor.prototype.setWeight = function (newWeight) {
    this.weight = newWeight;
    console.log(`Вес предмета "${this.name}" изменён на ${this.weight}`);
};

//оружие
function WeaponConstructor(name, weight, rarity, damage, durability) {
    ItemConstructor.call(this, name, weight, rarity);  // вызываем родителя
    this.damage = damage;
    this.durability = durability;
}
//наследование
WeaponConstructor.prototype = Object.create(ItemConstructor.prototype);
WeaponConstructor.prototype.constructor = WeaponConstructor;

// Добавляем методы
WeaponConstructor.prototype.use = function () {
    if (this.durability > 0) {
        this.durability -= 10;
        console.log(`Оружие "${this.name}" использовано. Прочность: ${this.durability}`);
    }
};

WeaponConstructor.prototype.repair = function () {
    this.durability = 100;
    console.log(`Оружие "${this.name}" отремонтировано. Прочность: ${this.durability}`);
};

WeaponConstructor.prototype.getInfo = function () {
    return `${ItemConstructor.prototype.getInfo.call(this)}, Урон: ${this.damage}, Прочность: ${this.durability}`;
};


console.log("\nТЕСТ ФУНКЦИЙ-КОНСТРУКТОРОВ");

const sword2 = new ItemConstructor("Меч", 3.5, "редкий");
console.log(sword2.getInfo());
sword2.setWeight(4.0);

const bow2 = new WeaponConstructor("Лук", 2.0, "обычный", 15, 100);
console.log(bow2.getInfo());
bow2.use();
bow2.repair();

//опциональная цепочка
const player = null;

console.log(player?.name);

const hero = { name: "Артур", weapon: { type: "меч" } };

console.log(hero?.name);              
console.log(hero?.weapon?.type);      
console.log(hero?.inventory?.sword);