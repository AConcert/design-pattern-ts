namespace State_Pattern {
  // 状态模式
  // 环境类
  class ForumAccount {
    state: AbstractState;
    name: string;
    constructor(name: string) {
      this.name = name;
      this.state = new PrimaryState(this);
    }
    setState(state: AbstractState) {
      this.state = state;
    }
    getState() {
      return this.state;
    }
    setName(name: string) {
      this.name = name;
    }
    getName() {
      return this.name;
    }
    downloadFile(score: number) {
      this.state?.downloadFile(score);
    }
    writeNote(score: number) {
      this.state?.writeNote(score);
    }
    replyNote(score: number) {
      this.state?.replyNote(score);
    }
  }
  // 抽象状态类
  abstract class AbstractState {
    protected acc?: ForumAccount;
    protected point?: number;
    protected stateName?: string;
    abstract checkState(): void;
    downloadFile(score: number) {
      this.point = this.point !== undefined ? this.point - score : 0;
      if (this.point < 0) {
        console.log(
          "对不起，" + this.acc?.getName() + "，下载文件积分不足，下载失败！"
        );
        this.point += score;
        return;
      }
      console.log(this.acc?.getName() + "下载文件，扣除" + score + "积分。");
      this.checkState();
      console.log(
        "剩余积分为：" +
          this.point +
          "，当前级别为：" +
          this.acc?.getState().getStateName() +
          "。"
      );
    }
    writeNote(score: number) {
      console.log(this.acc?.getName() + "发布留言，增加" + score + "积分。");
      this.point = this.point !== undefined ? this.point + score : 0;
      this.checkState();
      console.log(
        "剩余积分为：" +
          this.point +
          "，当前级别为：" +
          this.acc?.getState().getStateName() +
          "。"
      );
    }
    replyNote(score: number) {
      console.log(this.acc?.getName() + "回复留言，增加" + score + "积分。");
      this.point = this.point !== undefined ? this.point + score : 0;
      this.checkState();
      console.log(
        "剩余积分为：" +
          this.point +
          "，当前级别为：" +
          this.acc?.getState().getStateName() +
          "。"
      );
    }
    setAcc(acc: ForumAccount) {
      this.acc = acc;
    }
    getAcc() {
      return this.acc;
    }
    setPoint(point: number) {
      this.point = point;
    }
    getPoint() {
      return this.point;
    }
    setStateName(stateName: string) {
      this.stateName = stateName;
    }
    getStateName() {
      return this.stateName;
    }
  }
  // 具体状态类：初级会员
  class PrimaryState extends AbstractState {
    constructor(stateOrAcc: AbstractState | ForumAccount) {
      super();
      if (stateOrAcc instanceof AbstractState) {
        // 在 TypeScript 中，protected 访问修饰符允许子类访问父类中的受保护成员，
        // 但只能通过该子类的实例来访问，而不能通过父类的实例来访问。这与 Java 中的访问控制规则略有不同。
        this.acc = stateOrAcc.getAcc();
        this.point = stateOrAcc.getPoint();
      } else {
        this.acc = stateOrAcc;
        this.point = 0;
      }
      this.stateName = "新手";
    }
    checkState() {
      console.log("!!!!", this.point);
      if (this.point !== undefined && this.point >= 1000) {
        this.acc?.setState(new HighState(this));
      } else if (this.point !== undefined && this.point >= 100) {
        this.acc?.setState(new MiddleState(this));
      }
    }
    downloadFile(score: number) {
      console.log(
        "对不起，" + this.acc?.getName() + "，您是初级用户，不能下载文件。"
      );
    }
  }
  // 具体状态类：中级会员
  class MiddleState extends AbstractState {
    constructor(state: AbstractState) {
      super();
      this.acc = state.getAcc();
      this.point = state.getPoint();
      this.stateName = "中级";
    }
    checkState() {
      if (this.point !== undefined && this.point >= 1000) {
        this.acc?.setState(new HighState(this));
      } else if (this.point !== undefined && this.point < 100) {
        this.acc?.setState(new PrimaryState(this));
      }
    }
    writeNote(score: number): void {
      console.log(
        this.acc?.getName() + "发布留言，增加" + score * 2 + "积分。"
      );
      this.point = this.point !== undefined ? this.point + score * 2 : 0;
      this.checkState();
      console.log(
        "剩余积分为：" +
          this.point +
          "，当前级别为：" +
          this.acc?.getState().getStateName() +
          "。"
      );
    }
  }
  // 具体状态类：高级会员
  class HighState extends AbstractState {
    constructor(state: AbstractState) {
      super();
      this.point = state.getPoint();
      this.acc = state.getAcc();
      this.stateName = "高级";
    }
    checkState() {
      if (this.point !== undefined && this.point < 1000) {
        this.acc?.setState(new MiddleState(this));
      } else if (this.point !== undefined && this.point < 100) {
        this.acc?.setState(new PrimaryState(this));
      }
    }
    writeNote(score: number): void {
      console.log(
        this.acc?.getName() + "发布留言，增加" + score * 2 + "积分。"
      );
      this.point = this.point !== undefined ? this.point + score * 2 : 0;
      this.checkState();
      console.log(
        "剩余积分为：" + this.point !==
          undefined +
            "，当前级别为：" +
            this.acc?.getState().getStateName() +
            "。"
      );
    }
    downloadFile(score: number): void {
      console.log(
        this.acc?.getName() + "下载文件，扣除" + score / 2 + "积分。"
      );
      this.point = this.point !== undefined ? this.point - score / 2 : 0;
      if (this.point < 0) {
        console.log(
          "对不起，" + this.acc?.getName() + "，下载文件积分不足，下载失败！"
        );
        this.point += score / 2;
        return;
      }
      this.checkState();
      console.log(
        "剩余积分为：" +
          this.point +
          "，当前级别为：" +
          this.acc?.getState().getStateName() +
          "。"
      );
    }
  }
  function clientCode() {
    const account = new ForumAccount("张三");
    account.writeNote(20);
    console.log("-----------------");
    account.downloadFile(20);
    console.log("-----------------");
    account.replyNote(100);
    console.log("-----------------");
    account.writeNote(40);
    console.log("-----------------");
    account.downloadFile(80);
    console.log("-----------------");
    account.downloadFile(150);
    console.log("-----------------");
    account.writeNote(1000);
    console.log("-----------------");
    account.downloadFile(80);
  }
  clientCode();
}
