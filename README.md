
# flunky

flunky is a dice rolling script written in python, and evaluates expressions after the dice are rolled.  
It works like this:
```
take the dice-string '(1d20*3d8)+1'

the individual dice-values are parsed and rolled, and their values are substituted
into the original string like this:
'(15*11)+1'

then, the program will evaluate this string (which you can turn off) and return a number:
-> 166
```

there is a javascript version, but it does not use cryptographically secure numbers
## usage

### python
```py
from flunky import Dice

# make a dice roll that will roll 2 dice with 20 sides, and sum their results 
dice1 = Dice('2d20')

# roll the dice
dice1.roll() # -> 16


# python syntax is allowed in roll-strings because they are evaluated in python
# after the dice are rolled
dice2 = Dice('1d20+10')

dice2.roll() # -> 25

# you can disable the evaluation like this. it will return the un-evaluated
# result as a string
dice2.roll(e=False) # -> '15+10'

# there are four modifiers that you can use for each roll
# this will roll 4 d6s, drop the lowest value, and sum the remaining values
dice3 = Dice('4d@6')
dice3.roll() # -> 17
```
---
### javascript
**NOTE: the javascript version of this program uses *cryptographically insecure* numbers**
```js
const Dice = require('./flunky.js').Dice;

// the usage is essentially the same 

// make a dice roll that will roll 2 dice with 20 sides, and sum their results 
let dice1 = Dice('2d20')

// roll the dice
dice1.roll() // -> 16


// javascript syntax is allowed in roll-strings because they are evaluated
// after the dice are rolled
let dice2 = Dice('1d20+10')
dice2.roll() // -> 25


// you can disable the evaluation like this. it will return the un-evaluated
// result as a string
dice2.roll(e=false) // -> '15+10'


// there are four modifiers that you can use for each roll
// this will roll 4 d6s, drop the lowest value, and sum the remaining values
let dice3 = Dice('4d@6')
dice3.roll() // -> 17
```

