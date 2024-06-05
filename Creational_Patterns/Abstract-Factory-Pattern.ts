namespace Abstract_Factory {
  // 抽象工厂模式
  interface TV {
    play(): string;
  }

  abstract class AirCondition {
    abstract adjust(): string;
    enjoy(collaborator: TV) {
      console.log(`空调${this.adjust()}...WIFI..${collaborator.play()}`);
    }
  }

  class GreeTV implements TV {
    public play() {
      return "格力电视在播放中。。。";
    }
  }

  class GreeAirCondition extends AirCondition {
    adjust(): string {
      return "格力空调运行中。。。";
    }
  }

  class SonyTV implements TV {
    public play() {
      return "索尼电视在播放中。。。";
    }
  }

  class SonyAirCondition extends AirCondition {
    adjust(): string {
      return "索尼空调运行中。。。";
    }
  }

  abstract class Factory {
    abstract produceTV(): TV;
    abstract produceAirCondition(): AirCondition;
    doSomething(): void {
      console.log(
        `I'm happy to watch ${this.produceTV().play()} and use ${this.produceAirCondition().adjust()}`
      );
    }
  }

  class GreeFactory extends Factory {
    produceTV(): GreeTV {
      return new GreeTV();
    }
    produceAirCondition(): GreeAirCondition {
      return new GreeAirCondition();
    }
  }

  class SonyFactory extends Factory {
    produceTV(): SonyTV {
      return new SonyTV();
    }
    produceAirCondition(): SonyAirCondition {
      return new SonyAirCondition();
    }
  }

  function clientCode(factory: Factory) {
    // factory.doSomething();
    const tv = factory.produceTV();
    const airCondition = factory.produceAirCondition();
    airCondition.enjoy(tv);
  }

  clientCode(new SonyFactory());
  console.log("");
  clientCode(new GreeFactory());
}
