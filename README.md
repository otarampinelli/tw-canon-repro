# Canonicalization leaves floating-point noise when folding `calc()`

`canonicalizeCandidates()` folds simple `calc()` expressions in arbitrary values.
For `+`, `-` and `*`, the raw JS float is written into the suggested class.

Run `npm install && npm start`. Expected vs. actual:

| Input | Actual | Expected |
|---|---|---|
| `w-[calc(0.1px+0.2px)]` | `w-[0.30000000000000004px]` | `w-[0.3px]` |
| `m-[calc(0.3px-0.1px)]` | `m-[0.19999999999999998px]` | `m-[0.2px]` |
| `w-[calc(0.1*3px)]` | `w-[0.30000000000000004px]` | `w-[0.3px]` |
| `p-[calc(0.1rem*3)]` | `p-[0.30000000000000004rem]` | `p-[0.3rem]` |

The output is equivalent, so this is cosmetic. #20221 fixed the same noise for division only.
