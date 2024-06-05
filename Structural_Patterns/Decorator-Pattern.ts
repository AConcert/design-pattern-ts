namespace DecoratorPattern {
  // 装饰器模式
  // 变形金刚
  interface Transformer {
    move(): void;
  }

  class Car implements Transformer {
    constructor() {
      console.log("变形金刚是一辆车。。。");
    }
    move(): void {
      console.log("变形金刚小汽车在陆地上开");
    }
  }

  class Changer implements Transformer {
    private transformer: Transformer;
    // 构造注入
    constructor(transformer: Transformer) {
      this.transformer = transformer;
    }
    move(): void {
      this.transformer.move();
    }
  }

  class Robot extends Changer {
    constructor(transformer: Transformer) {
      super(transformer);
      console.log("变成机器人。。。");
    }
    // 新增的业务方法
    say(): void {
      console.log("讲话");
    }
    /* 用于透明装饰器模式，实现对一个对象的多重装饰
    move(): void {
      super.move();
      this.say();
    } */
  }

  class Plane extends Changer {
    constructor(transformer: Transformer) {
      super(transformer);
      console.log("变成飞机。。。");
    }
    // 新增的业务方法
    fly(): void {
      console.log("在天空飞翔");
    }
    /* 用于透明装饰器模式，实现对一个对象的多重装饰
    move(): void {
      super.move();
      this.fly();
    } */
  }

  // 对于扩展一个对象的功能，装饰模式比继承更加灵活，不会导致类的个数急剧增加
  function semitransparent_clientCode() {
    // 使用抽象类型定义要装饰的对象
    const bee: Transformer = new Car();
    bee.move();
    console.log("----------------------------------");

    // 半透明装饰模式，用具体装饰类型定义装饰后的对象
    const robot: Robot = new Robot(bee);
    robot.move();
    // 客户端可以单独调用到在装饰类中新增加的方法，这是透明装饰模式做不到的，但不能实现对一个对象的多重装饰
    robot.say();
    const plane: Plane = new Plane(robot);
    plane.move();
    plane.fly();
  }

  semitransparent_clientCode();

  function transparent_clientCode() {
    // 使用抽象类型定义要装饰的对象
    const bee: Transformer = new Car();
    bee.move();
    console.log("----------------------------------");

    // 透明装饰模式，用抽象类型定义装饰后的对象
    const robot: Transformer = new Robot(bee);
    robot.move();
    // 客户端不可以单独调用到在装饰类中新增加的方法，但能实现对一个对象的多重装饰，需要在装饰类的move()中调用新增加的装饰方法
    // robot.say(); ERROR
    const plane: Transformer = new Plane(robot);
    plane.move();
  }

  // transparent_clientCode();
}
