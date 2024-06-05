namespace Mediator_Pattern {
  // 中介者模式
  // 中介类
  abstract class AbstractChatroom {
    abstract register(...members: Member[]): void;
    sendText(from: string, to: string, message: string): void {}
    sendImage(from: string, to: string, image: string): void {}
  }
  // 同事类
  abstract class Member {
    private name: string;
    private chatRoom?: AbstractChatroom;
    constructor(name: string) {
      this.name = name;
    }
    setName(name: string) {
      this.name = name;
    }
    getName() {
      return this.name;
    }
    setChatroom(chatRoom: AbstractChatroom) {
      this.chatRoom = chatRoom;
    }
    getChatroom() {
      return this.chatRoom;
    }
    abstract sendText(to: string, message: string): void;
    abstract sendImage(to: string, image: string): void;
    receiveText(from: string, message: string) {
      console.log(`[${this.name}]收到来自[${from}]的消息：[${message}]`);
    }
    receiveImage(from: string, image: string) {
      console.log(`[${this.name}]收到来自[${from}]的图片：[${image}]`);
    }
  }
  class ChatGroup extends AbstractChatroom {
    memberMap = new Map();
    register(...members: Member[]): void {
      members.forEach((member) => {
        if (!this.memberMap.has(member.getName())) {
          this.memberMap.set(member.getName(), member);
          member.setChatroom(this);
        }
      });
    }
    sendText(from: string, to: string, message: string): void {
      const receiveMember: Member = this.memberMap.get(to);
      const filteredMessage = message.replace("日", "*");
      if (receiveMember) {
        receiveMember.receiveText(from, filteredMessage);
      }
    }
    sendImage(from: string, to: string, image: string): void {
      const receiveMember: Member = this.memberMap.get(to);
      // 模拟图片大小判断
      if (image.length > 5) {
        console.log("图片太大，发送失败");
        return;
      }
      if (receiveMember) {
        receiveMember.receiveImage(from, image);
      }
    }
  }
  class CommonMember extends Member {
    sendText(to: string, message: string): void {
      this.getChatroom()?.sendText(this.getName(), to, message);
    }
    sendImage(to: string, image: string): void {
      console.log("普通会员不能发送图片");
    }
  }
  class DiamondMember extends Member {
    sendText(to: string, message: string): void {
      this.getChatroom()?.sendText(this.getName(), to, message);
    }
    sendImage(to: string, image: string): void {
      this.getChatroom()?.sendImage(this.getName(), to, image);
    }
  }

  function clientCode() {
    const member1: Member = new DiamondMember("Sean");
    const member2: Member = new DiamondMember("Claire");
    const member3: Member = new DiamondMember("Anan");
    const member4: Member = new CommonMember("David");
    const member5: Member = new CommonMember("Ross");
    const chatGroup: AbstractChatroom = new ChatGroup();
    chatGroup.register(member1, member2, member3, member4, member5);
    member1.sendText("Claire", "你好，Claire");
    member2.sendText("Sean", "你好，Sean，今天天气很好");
    member3.sendImage("Claire", "我爱我家");
    member3.sendImage("Sean", "我爱我家");
    member4.sendText("Ross", "你好，Ross，今天天气很好,有日");
    member3.sendImage("Ross", "图片12345");
    member5.sendImage("David", "图片3");
  }

  clientCode();
}
