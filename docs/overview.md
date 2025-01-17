# TACT overview

TACT is a scallable and safe language to build smart contracts for TON.

* [Type System](/docs/types.md)
* [Functions](/docs/functions.md)
* [Statements](/docs/statements.md)
* [Contracts](/docs/contract.md)

## TLDR

```
import "@stdlib/ownable";

contract Sample with OwnableTransferable {
  owner: Address;
  counter: Int;
  
  init(owner: Address) {
    self.owner = owner;
    self.counter = 0;
  }
  
  receive("increment") {
    self.requireOwner();
    self.counter = self.counter + 1;
  }
  
  get fun counter(): Int {
    return self.counter;
  }
}
```
