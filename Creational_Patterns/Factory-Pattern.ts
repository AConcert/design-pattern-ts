namespace FactoryPattern {
  // 工厂模式
  interface TV {
    play(): string;
  }

  class HaierTV implements TV {
    public play(): string {
      return "HaierTV playing";
    }
  }

  class TCLTV implements TV {
    public play(): string {
      return "TCLTV playing";
    }
  }

  abstract class TVFactory {
    public abstract produceTV(): TV;

    public someOperation(): string {
      const TV = this.produceTV();
      return `Factory: The same factory's code has just worked with ${TV.play()}`;
    }
  }

  class HaierTVFactory extends TVFactory {
    public produceTV(): TV {
      return new HaierTV();
    }
  }

  class TCLTVFactory extends TVFactory {
    public produceTV(): TV {
      return new TCLTV();
    }
  }

  function clientCode(factory: TVFactory) {
    console.log(
      "Client: I'm not aware of the factory's class, but it still works."
    );
    console.log(factory.someOperation());
  }

  console.log("App: Launched with the HaierTVFactory.");
  clientCode(new HaierTVFactory());
  console.log("");

  console.log("App: Launched with the TCLFactory.");
  clientCode(new TCLTVFactory());
}
