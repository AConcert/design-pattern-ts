namespace Singleton_Pattern {
  // 单例模式
  class EagerSingleton {
    private static instance: EagerSingleton = new EagerSingleton();
    private constructor() {}
    public static getInstance(): EagerSingleton {
      return this.instance;
    }
  }
  /**
   * 在 TypeScript 或 JavaScript 中，你通常不需要担心线程安全问题，因为它们是单线程的语言，只有一个主线程来执行所有的 JavaScript 代码。这意味着在任何时候，只有一个操作（或者说一个函数调用）在执行，其他的操作都在等待执行。
   * 然而，如果你在 Node.js 中使用了 worker threads 或者在浏览器中使用了 Web Workers，那么你可能需要考虑线程安全问题。在这种情况下，你可能需要使用一些特殊的技术来保证线程安全，例如 Atomics 和 SharedArrayBuffer。
   * 在 LazySingleton 中，类是线程安全的，因为它只在一个线程中运行。如果 getInstance 方法在多个线程中同时调用，它们会按照它们被调用的顺序依次执行，不会同时执行。因此，this.instance 只会被初始化一次。
   */
  class LazySingleton {
    private static instance: LazySingleton;
    private constructor() {}
    public static getInstance(): LazySingleton {
      if (!this.instance) {
        this.instance = new LazySingleton();
      }
      return this.instance;
    }
  }
}

// 以下来自 copilot
// Java 中需要考虑线程安全问题，一般使用双重检查锁定（double-checked locking）来保证线程安全。
// Java 中实现单例最好的方式是使用枚举（enum）类型，因为 Java 中的枚举类型是线程安全的。
// 在 TypeScript 或 JavaScript 中，你可以使用闭包（closure）来实现线程安全的单例模式。
class ThreadSafeSingleton {
  private static instance: ThreadSafeSingleton;
  private constructor() {}
  public static getInstance(): ThreadSafeSingleton {
    if (!this.instance) {
      this.instance = new ThreadSafeSingleton();
    }
    return this.instance;
  }
}

// 刘伟：Java 中实现单例最好的方式是 IoDH（Initialization on Demand Holder）。使用静态内部类来实现单例模式，这种方式既保证了线程安全，又避免了同步带来的性能影响。
/* class IoDHSingleton {
  private constructor() {}
  private static class Holder {
    private static instance: IoDHSingleton = new IoDHSingleton();
  }
  public static getInstance(): IoDHSingleton {
    return Holder.instance;
  }
} */
