#ToTo SG (CLI)
Grab singapore toto result

#How to install
`npm install -g totosg`

#How to use it
* Run `totosg` or `totosg get` from bash to get **latest** toto result.
* Run `totosg gen` or `totosg generate` from bash to generate 3 random draws.

#Example
```bash

totosg

Retrieving latest toto result......
Draw No. 3255 Group 1 Prize: $4,726,002
┌──────────────────┬─────┬─────┬───────┬──────┬──────┬─────┬───────────────────┐
│ Date             │ One │ Two │ Three │ Four │ Five │ Six │ Additional Number │
├──────────────────┼─────┼─────┼───────┼──────┼──────┼─────┼───────────────────┤
│ Thu, 06 Apr 2017 │ 10  │ 12  │ 20    │ 27   │ 43   │ 46  │ 26                │
└──────────────────┴─────┴─────┴───────┴──────┴──────┴─────┴───────────────────┘
Group 1 winning tickets sold at:
## 7-Eleven Plaza Singapura - 68 Orchard Rd Plaza Singapura  #01-51  ( 1 Ordinary Entry )
Group 2 winning tickets sold at:
## Singapore Pools Lor 8 Toa Payoh Branch - Blk 212 Lor 8 Toa Payoh #01-39 ( 1 QuickPick System 7 Entry )
## Singapore Pools New Upper Changi Branch - Blk 26 New Upp Changi Rd  #01-666/668 ( 1 System 7 Entry )
## Tuas View - 71 Pioneer Road Tuas Amenity Centre #02-02/03 ( 1 System 7 Entry )

Existing...
```

```bash

totosg gen

Quick Picks:
┌────────┬─────┬─────┬───────┬──────┬──────┬─────┐
│        │ One │ Two │ Three │ Four │ Five │ Six │
├────────┼─────┼─────┼───────┼──────┼──────┼─────┤
│ Draw 1 │ 3   │ 5   │ 7     │ 34   │ 36   │ 40  │
├────────┼─────┼─────┼───────┼──────┼──────┼─────┤
│ Draw 2 │ 2   │ 5   │ 7     │ 27   │ 39   │ 44  │
├────────┼─────┼─────┼───────┼──────┼──────┼─────┤
│ Draw 3 │ 6   │ 11  │ 13    │ 18   │ 46   │ 47  │
└────────┴─────┴─────┴───────┴──────┴──────┴─────┘

```

#Known problem & workaround

1. Get empty result occasionally. Try one or two more times.
