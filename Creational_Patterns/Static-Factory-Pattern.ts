namespace StaticFactoryPattern {
  // 静态 or 简单工厂模式
  abstract class TV {
    abstract play(): void;
  }

  class HaierTV extends TV {
    play() {
      console.log("HaierTV playing");
    }
  }

  class HisenseTV extends TV {
    play() {
      console.log("HisenseTV playing");
    }
  }

  export class TVFactory {
    static produceTV(brand: string): TV {
      switch (brand) {
        case "Haier":
          return new HaierTV();
        case "Hisense":
          return new HisenseTV();
        default:
          throw new Error("No such TV");
      }
    }
  }

  const tv = TVFactory.produceTV("Haier");
  tv.play();
}
