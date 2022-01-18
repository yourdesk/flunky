import secrets
import re
from enum import Enum

class RNG:
  def __init__(self, min, max):
    self.min = int(min)
    self.max = int(max)
    self.rand = secrets.SystemRandom()

  def getRand(self, n=1):
    return [self.rand.randrange(self.min, self.max+1) for _ in range(int(n))]


class DiceFlags(Enum):
  NONE = 0
  TAKE_HIGHEST = 1
  TAKE_LOWEST = 2
  DROP_HIGHEST = 3
  DROP_LOWEST = 4

class DiceFlagHandler:
  def __init__(self, arr):
    self.arr = arr
    self.conversionTable = {
      'd': DiceFlags.NONE,
      'd!': DiceFlags.TAKE_HIGHEST,
      'd*': DiceFlags.DROP_HIGHEST,
      'd_': DiceFlags.TAKE_LOWEST,
      'd@': DiceFlags.DROP_LOWEST
    }

  def convert(self, flagStr):
    return self.conversionTable[flagStr]

  def get(self, flag):
    A = self.arr

    if flag == DiceFlags.TAKE_HIGHEST:
      return max(A)
    elif flag == DiceFlags.TAKE_LOWEST:
      return min(A)
    elif flag == DiceFlags.DROP_HIGHEST:
      return sum(x if x != max(A) else 0 for x in A)
    elif flag == DiceFlags.DROP_LOWEST:
      return sum(x if x != min(A) else 0 for x in A)

    return sum(A)

class DiceParser:
  def __init__(self, dice):
    self.dice = dice

  def parse(self):
    return re.findall(r"(\d+)(d)([^\d]+)?(\d+)", self.dice)

class DiceFormatter:
  def __init__(self, dice):
    self.dice = dice

  def format(self):
    n = 0
    curEq = self.dice
    m = re.findall("\d+d(?:[^\d]+)?\d+", self.dice)
    for match in m:
      curEq = curEq.replace(match, f'${n}')
      n += 1

    return curEq.replace(';', '')

class DiceRoller:
  def __init__(self, dice):
    self.dice = dice
    f = DiceFormatter(dice)
    self.eq = f.format()

  def roll(self, e=True):
    diceParser = DiceParser(self.dice)
    n = self.eq
    for i, d in enumerate(diceParser.parse()):
      rand = RNG(1, d[-1])
      nums = rand.getRand(n=d[0])
      flagHandler = DiceFlagHandler(nums)
      flag = flagHandler.convert(''.join(d[1:-1]))
      num = flagHandler.get(flag)

      n = n.replace(f'${i}', str(num))

    return eval(n) if e else n

class Dice:
  def __init__(self, dice):
    self.dice = dice
    self.roller = DiceRoller(dice)

  def roll(self, e=True):
    return self.roller.roll(e=e)

  def rollN(self, n, e=True):
    t = []
    for _ in range(n):
      t.append(self.roll(e=e))

    return t
