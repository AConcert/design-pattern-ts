namespace Interpreter_Pattern {
  // 解释器模式
  interface Node {
    interpret: () => number;
  }
  // 终结符表达式
  class ValueNode implements Node {
    private value;
    constructor(value: number) {
      this.value = value;
    }
    interpret() {
      return this.value;
    }
  }
  // 非终结符表达式/符号表达式
  abstract class SymbolNode implements Node {
    left: Node;
    right: Node;
    constructor(left: Node, right: Node) {
      this.left = left;
      this.right = right;
    }
    abstract interpret(): number;
  }
  class StarNode extends SymbolNode {
    interpret(): number {
      return this.left.interpret() + this.right.interpret();
    }
  }
  class DollarNode extends SymbolNode {
    interpret(): number {
      return this.left.interpret() * this.right.interpret();
    }
  }
  class AtNode extends SymbolNode {
    interpret(): number {
      return this.left.interpret() - this.right.interpret();
    }
  }

  class Calculator {
    statement?: string;
    node?: Node;
    build(statement: string) {
      const statementArray = statement.split(" ");
      const operateTree: Node[] = [];
      let left: Node;
      let right: Node;
      for (let index = 0; index < statementArray.length; index++) {
        const element = statementArray[index];
        if (!isNaN(Number(element))) {
          const valueNode = new ValueNode(Number(element));
          operateTree.push(valueNode);
        } else if (element === "*") {
          left = operateTree.pop() as Node;
          right = new ValueNode(Number(statementArray[++index]));
          const starNode = new StarNode(left, right);
          operateTree.push(starNode);
        } else if (element === "$") {
          left = operateTree.pop() as Node;
          right = new ValueNode(Number(statementArray[++index]));
          const dollarNode = new DollarNode(left, right);
          operateTree.push(dollarNode);
        } else if (element === "@") {
          left = operateTree.pop() as Node;
          right = new ValueNode(Number(statementArray[++index]));
          const atNode = new AtNode(left, right);
          operateTree.push(atNode);
        }
      }
      this.node = operateTree.pop();
    }
    compute(): number {
      return this.node?.interpret() || 0;
    }
  }

  function clientCode() {
    const str: string = "2 $ 8 @ 8 * 8";
    const calculator = new Calculator();
    calculator.build(str);
    const result = calculator.compute();
    console.log(`表达式[${str}]的值为[${result}]`); //16
  }

  clientCode();
}
