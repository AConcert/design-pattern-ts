namespace Prototype_Pattern {
  // 原型模式
  class subA {}
  class A {
    public propertyA: string;
    public propertyB: number;
    public subProperty: subA;
    constructor() {
      this.propertyA = "";
      this.propertyB = 1;
      this.subProperty = new subA();
    }
    shallowClone() {
      // return { ...this };
      return Object.assign({}, this);
    }

    deepClone(obj: any) {
      // return JSON.parse(JSON.stringify(this)); 不能复制函数和循环引用的对象
      if (typeof obj !== "object") {
        return obj;
      }
      const clonedObj = Array.isArray(obj) ? [] : {};
      for (const key in obj) {
        clonedObj[key] = this.deepClone(obj[key]);
      }
      return clonedObj; // 别忘了返回
    }
  }

  function clientCode() {
    const testA = new A();
    // const testB = testA.shallowClone();

    const testB = testA.deepClone(testA);
    console.log(testA.deepClone);
    console.log(testB.deepClone);
    console.log(testA.subProperty === testB.subProperty);
  }

  clientCode();
}
