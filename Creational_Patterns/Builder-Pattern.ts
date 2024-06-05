namespace Builder_Pattern {
  // 建造者模式
  class MealProduct {
    food: string;
    drink: string;
    constructor() {
      this.food = "";
      this.drink = "";
    }
    setFood(food: string) {
      this.food = food;
    }
    getFood() {
      return this.food;
    }
    setDrink(drink: string) {
      this.drink = drink;
    }
    getDrink() {
      return this.drink;
    }
  }

  abstract class MealBuilder {
    protected meal = new MealProduct();
    abstract buildFood(): void;
    abstract buildDrink(): void;
    getResult(): MealProduct {
      return this.meal;
    }
  }

  class MealDirector {
    mealBuilder: MealBuilder;

    constructor(mealBuilder: MealBuilder) {
      this.mealBuilder = mealBuilder;
    }

    construct(): MealProduct {
      this.mealBuilder.buildDrink(); //顺序可调
      this.mealBuilder.buildFood();
      return this.mealBuilder.getResult();
    }
  }

  class BurgerMealBuilder extends MealBuilder {
    buildFood(): void {
      this.meal.setFood("芝士牛堡");
    }
    buildDrink(): void {
      this.meal.setDrink("可乐");
    }
  }

  class BacosMealBuilder extends MealBuilder {
    buildDrink(): void {
      this.meal.setDrink("咖啡");
    }
    buildFood(): void {
      this.meal.setFood("卷饼");
    }
  }

  function client(builder: MealBuilder) {
    const waitress = new MealDirector(builder);
    const myMeal = waitress.construct();

    console.log(`疯狂星期四，吃${myMeal.getFood()}，喝${myMeal.getDrink()}`);
  }

  client(new BurgerMealBuilder());
  console.log("");
  client(new BacosMealBuilder());
}
